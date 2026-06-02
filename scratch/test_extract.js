const fs = require('fs');
const path = require('path');

const DESIGN_WEBSITE_DIR = path.join(process.cwd(), 'app', 'designwebsite');
const filePath = path.join(DESIGN_WEBSITE_DIR, 'template10', '[slug]', 'page.tsx');

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

function countMatches(input, regex) {
  return (input.match(regex) || []).length;
}

function collectJsxBlock(lines, startIndex, openingRegex, closingRegex, isSection = false) {
  const collected = [];
  let depth = 0;
  let foundOpening = false;

  const blockContent = lines.slice(startIndex).join('\n');
  const hasClosingTag = !isSection && closingRegex.test(blockContent);

  for (let index = startIndex; index < lines.length; index++) {
    const line = lines[index];
    collected.push(line);
    const openings = countMatches(line, openingRegex);
    const closings = countMatches(line, closingRegex);

    if (openings > 0) foundOpening = true;
    depth += openings;
    depth -= closings;

    if (isSection) {
      if (foundOpening && depth <= 0) {
        return { block: collected.join('\n'), endIndex: index };
      }
    } else {
      if (hasClosingTag) {
        if (foundOpening && depth <= 0) {
          return { block: collected.join('\n'), endIndex: index };
        }
      } else {
        const selfClosing = /\/>/.test(line);
        if (foundOpening && selfClosing) {
          return { block: collected.join('\n'), endIndex: index };
        }
      }
    }
  }

  return { block: collected.join('\n'), endIndex: lines.length - 1 };
}

function toTitleCase(label) {
  return label
    .toLowerCase()
    .replace(/\b[a-z]/g, char => char.toUpperCase())
    .replace(/\bCta\b/g, 'CTA')
    .replace(/\bFaq\b/g, 'FAQ');
}

function cleanSectionLabel(rawLabel, fallback) {
  const normalized = String(rawLabel || '')
    .replace(/[─━—\-_=]{2,}/g, ' ')
    .replace(/[^\w\s/&()+-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return fallback;
  if (normalized.length > 72) return fallback;

  return toTitleCase(normalized);
}

function labelFromComponentName(componentName) {
  return componentName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^Client\s+/, '')
    .replace(/^Home\s+/, '')
    .trim() || componentName;
}

const importMap = {
  ClientHero: path.join(DESIGN_WEBSITE_DIR, 'template10', '[slug]', 'ClientHero.tsx')
};

const sections = [];
let pendingLabel = null;

for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  const commentMatch = line.match(/\{\/\*\s*([\s\S]*?)\s*\*\/\}/);
  if (commentMatch) {
    pendingLabel = cleanSectionLabel(commentMatch[1], pendingLabel);
  }

  if (/<section\b/.test(line)) {
    const label = pendingLabel || `Section`;
    const collected = collectJsxBlock(lines, index, /<section\b/g, /<\/section>/g, true);
    sections.push({ label: cleanSectionLabel(label, 'Section'), block: collected.block, startLine: index + 1, endLine: collected.endIndex + 1 });
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
      startLine: index + 1,
      endLine: collected.endIndex + 1
    });
    pendingLabel = null;
    index = collected.endIndex;
  }
}

console.log('--- EXTRACTED SECTIONS ---');
sections.forEach(s => {
  console.log(`Label: "${s.label}" (lines ${s.startLine} to ${s.endLine})`);
  console.log(`Contains doctor.specialization? ${s.block.includes('doctor.specialization')}`);
  console.log(`Contains doctor.experience? ${s.block.includes('doctor.experience')}`);
  console.log(`Contains doctor.name? ${s.block.includes('doctor.name')}`);
});
