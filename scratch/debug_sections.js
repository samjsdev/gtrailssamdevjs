const fs = require('fs');
const path = require('path');

const DESIGN_WEBSITE_DIR = path.join(process.cwd(), 'app', 'designwebsite');

const TEXT_ELEMENT_LOOKUPS = [
  { path: ['clinic', 'name'], label: 'Studio Name', type: 'text', patterns: [/clinic\??\.name/i, /cleanName/i] },
  { path: ['clinic', 'tagline'], label: 'Hero Tagline', type: 'text', patterns: [/clinic\??\.tagline/i, /cleanTagline/i] },
  { path: ['clinic', 'description'], label: 'Studio Description', type: 'textarea', patterns: [/clinic\??\.description/i, /cleanDesc/i] },
];

function readTextFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

function getLocalImportMap(filePath) {
  const content = readTextFile(filePath);
  const imports = {};
  const importRegex = /import\s+([\s\S]*?)\s+from\s+['"]((?:\.\/|\.\.\/)[^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importClause = match[1].trim();
    const target = resolveImportTarget(filePath, match[2]);
    if (!target) continue;

    const defaultMatch = importClause.match(/^([A-Za-z_$][\w$]*)/);
    if (defaultMatch) {
      imports[defaultMatch[1]] = target;
    }
  }

  return imports;
}

function resolveImportTarget(importerPath, importPath) {
  const resolvedPath = path.resolve(path.dirname(importerPath), importPath);
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];

  for (const ext of extensions) {
    const file = resolvedPath + ext;
    console.log(`Checking file existance: ${file} => ${fs.existsSync(file)}`);
    if (fs.existsSync(file)) return file;
  }

  return null;
}

function countMatches(input, regex) {
  return (input.match(regex) || []).length;
}

function collectJsxBlock(lines, startIndex, openingRegex, closingRegex) {
  const collected = [];
  let depth = 0;
  let foundOpening = false;

  for (let index = startIndex; index < lines.length; index++) {
    const line = lines[index];
    collected.push(line);
    const openings = countMatches(line, openingRegex);
    const closings = countMatches(line, closingRegex);
    const selfClosing = /\/>\s*(?:\)|,)?\s*$/.test(line);

    if (openings > 0) foundOpening = true;
    depth += openings;
    depth -= closings;
    if (foundOpening && (selfClosing || depth <= 0)) {
      return { block: collected.join('\n'), endIndex: index };
    }
  }

  return { block: collected.join('\n'), endIndex: lines.length - 1 };
}

function cleanSectionLabel(rawLabel, fallback) {
  const normalized = String(rawLabel || '')
    .replace(/[─━—\-_=]{2,}/g, ' ')
    .replace(/[^\w\s/&()+-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return fallback;
  return normalized;
}

function labelFromComponentName(componentName) {
  return componentName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^Client\s+/, '')
    .replace(/^Home\s+/, '')
    .trim() || componentName;
}

function extractTopLevelSections(filePath) {
  const content = readTextFile(filePath);
  const importMap = getLocalImportMap(filePath);
  const lines = content.split(/\r?\n/);
  const sections = [];
  let pendingLabel = null;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const commentMatch = line.match(/\{\/\*\s*([\s\S]*?)\s*\*\/\}/);
    if (commentMatch) {
      pendingLabel = cleanSectionLabel(commentMatch[1], pendingLabel);
    }

    if (/<section\b/.test(line)) {
      const label = pendingLabel || `${path.basename(path.dirname(filePath))} Section`;
      const collected = collectJsxBlock(lines, index, /<section\b/g, /<\/section>/g);
      sections.push({ label: cleanSectionLabel(label, 'Section'), block: collected.block, componentFile: null });
      pendingLabel = null;
      index = collected.endIndex;
      continue;
    }

    const componentMatch = line.match(/<([A-Z][A-Za-z0-9_]*)\b/);
    if (componentMatch && importMap[componentMatch[1]]) {
      const componentName = componentMatch[1];
      const label = pendingLabel || labelFromComponentName(componentName);
      const collected = collectJsxBlock(
        lines,
        index,
        new RegExp(`<${componentName}\\b`, 'g'),
        new RegExp(`</${componentName}>`, 'g')
      );
      sections.push({
        label: cleanSectionLabel(label, labelFromComponentName(componentName)),
        block: collected.block,
        componentFile: importMap[componentName]
      });
      pendingLabel = null;
      index = collected.endIndex;
    }
  }

  return sections;
}

const file = path.join(DESIGN_WEBSITE_DIR, 'template1', '[slug]', 'page.tsx');
console.log('Import Map:');
console.log(getLocalImportMap(file));
console.log('\nTop-Level Sections Parsed:');
console.log(extractTopLevelSections(file));
