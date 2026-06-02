const fs = require('fs');
const path = require('path');

const DESIGN_WEBSITE_DIR = path.join(process.cwd(), 'app', 'designwebsite');

function readTextFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return '';
  }
}

function resolveImportTarget(importerPath, importPath) {
  const resolvedPath = path.resolve(path.dirname(importerPath), importPath);
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];

  for (const ext of extensions) {
    const file = resolvedPath + ext;
    if (fs.existsSync(file)) return file;
  }

  return null;
}

function resolveImports(filePath, currentDepth = 0, maxDepth = 3) {
  if (currentDepth >= maxDepth) return [];
  
  let content = readTextFile(filePath);
  const importRegex = /import\s+((?:(?!import)[\s\S])*?)\s+from\s+['"]((?:\.\/|\.\.\/)[^'"]+)['"]/g;
  const dir = path.dirname(filePath);
  let importedFiles = [];
  
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const relativePath = match[2];
    const resolvedPath = path.resolve(dir, relativePath);
    
    // Check possible extensions
    const extensions = ['.tsx', '.ts', '.jsx', '.js'];
    let actualFile = null;
    for (const ext of extensions) {
      const p = resolvedPath + ext;
      if (fs.existsSync(p)) {
        actualFile = p;
        break;
      }
    }
    
    if (actualFile && !importedFiles.includes(actualFile)) {
      importedFiles.push(actualFile);
      const childImports = resolveImports(actualFile, currentDepth + 1, maxDepth);
      childImports.forEach(c => {
        if (!importedFiles.includes(c)) importedFiles.push(c);
      });
    }
  }
  
  return importedFiles;
}

function scanFileElements(filePath, pageId = '') {
  const content = readTextFile(filePath);
  console.log(`Scanning File: ${path.basename(filePath)} | pageId: "${pageId}"`);
  if (content.includes('getServiceImage')) {
    console.log(`   -> contains getServiceImage!`);
  }
  return [];
}

const file = path.join(DESIGN_WEBSITE_DIR, 'template1', '[slug]', 'page.tsx');
const filesToScan = [file, ...resolveImports(file, 0, 3)];
console.log('Files to Scan:');
console.log(filesToScan.map(f => path.basename(f)));

console.log('\nScanning:');
for (const f of filesToScan) {
  scanFileElements(f, 'home');
}
