/**
 * Dynamic Template Code Auditor
 * 
 * Static analysis tool that scans template TSX files to find hardcoded
 * copy and static assets that should be bound dynamically to the database.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DESIGN_WEBSITE_DIR = path.join(PROJECT_ROOT, 'app', 'designwebsite');

// Target business strings that should ALWAYS be dynamic
const CRITICAL_TARGETS = [
  { term: 'Arjun Mehta', replacement: '{doctor?.name || "Arjun Mehta"}', path: 'doctor.name' },
  { term: 'Kavitha Rajan', replacement: '{doctor2?.name || "Kavitha Rajan"}', path: 'doctor2.name' },
  { term: 'Sir J.J. College', replacement: '{doctor?.credentials || "..."}', path: 'doctor.credentials' },
  { term: 'NID', replacement: '{doctor2?.credentials || "..."}', path: 'doctor2.credentials' },
  { term: 'Residential & Commercial Interior Planning', replacement: '{doctor?.specialization || "..."}', path: 'doctor.specialization' },
  { term: 'biophilic color composition', replacement: '{doctor2?.bio || "..."}', path: 'doctor2.bio' },
  { term: 'With over a decade of design experience', replacement: '{doctor?.bio || "..."}', path: 'doctor.bio' },
  { term: 'Sourcing & Joinery', replacement: 'Milestone description is hardcoded', path: 'about.journey' }
];

// Typical static Unsplash image patterns
const UNSPLASH_IMAGE_REGEX = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-?&=%]+/g;

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  const issues = [];

  // Check 1: Scan for critical terms that aren't wrapped in dynamic expressions
  CRITICAL_TARGETS.forEach(target => {
    lines.forEach((line, idx) => {
      if (line.includes(target.term)) {
        // A dynamic expression usually has curly braces and database model names in proximity
        const isDynamic = line.includes('doctor?.') || 
                          line.includes('doctor2?.') || 
                          line.includes('clinic?.') || 
                          line.includes('business?.') ||
                          line.includes('data.');

        if (!isDynamic) {
          issues.push({
            lineNum: idx + 1,
            type: 'Hardcoded Text',
            detail: `Found hardcoded string "${target.term}"`,
            lineContent: line.trim(),
            suggestion: `Replace with dynamic binding: ${target.replacement} (database path: ${target.path})`
          });
        }
      }
    });
  });

  // Check 2: Scan for hardcoded Unsplash image URLs inside JSX instead of dynamic arrays
  lines.forEach((line, idx) => {
    const matches = line.match(UNSPLASH_IMAGE_REGEX);
    if (matches) {
      // Ignore static import configs, files that specify image fallback lists, or helper files
      const isConfigOrImport = line.includes('import') || line.includes('export const') || line.includes('INTERIOR_HERO_IMAGES');
      const isDynamic = line.includes('media?.') || line.includes('clinicImages') || line.includes('otherImages') || line.includes('treatmentImages');

      if (!isConfigOrImport && !isDynamic) {
        issues.push({
          lineNum: idx + 1,
          type: 'Static Image Asset',
          detail: `Found hardcoded Unsplash URL: ${matches[0].substring(0, 50)}...`,
          lineContent: line.trim(),
          suggestion: 'Replace with dynamic image path (e.g. media?.clinicImages?.[x] or media?.otherImages?.[y])'
        });
      }
    }
  });

  return issues;
}

function scanDir(dirPath, allIssues = {}) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      scanDir(fullPath, allIssues);
    } else if (item.isFile() && item.name.endsWith('.tsx')) {
      const fileIssues = auditFile(fullPath);
      if (fileIssues.length > 0) {
        const rel = path.relative(PROJECT_ROOT, fullPath);
        allIssues[rel] = fileIssues;
      }
    }
  }
}

function main() {
  console.log('\n🔍 ===================================================');
  console.log('   STARTING TEMPLATE CODESPOT AUDIT: HARDCODE DETECTION');
  console.log('   ===================================================\n');

  if (!fs.existsSync(DESIGN_WEBSITE_DIR)) {
    console.error('❌ Template directory not found!');
    process.exit(1);
  }

  const allIssues = {};
  scanDir(DESIGN_WEBSITE_DIR, allIssues);

  const filesWithIssues = Object.keys(allIssues);
  if (filesWithIssues.length === 0) {
    console.log('🎉 Excellent work! All templates are perfectly templatized. Zero hardcode leakage found!');
    return;
  }

  console.log(`⚠️ Detected hardcoded leakage in ${filesWithIssues.length} template files:\n`);

  filesWithIssues.forEach(file => {
    console.log(`📂 File: \x1b[36m${file}\x1b[0m`);
    allIssues[file].forEach(issue => {
      console.log(`  \x1b[33m[Line ${issue.lineNum}]\x1b[0m \x1b[1m${issue.type}\x1b[0m: ${issue.detail}`);
      console.log(`     ↳ Code: \x1b[90m"${issue.lineContent}"\x1b[0m`);
      console.log(`     ↳ Fix:  \x1b[32m${issue.suggestion}\x1b[0m\n`);
    });
  });

  console.log('===================================================');
  console.log(`👉 Total affected files: ${filesWithIssues.length}`);
  console.log('👉 Action needed: Refactor highlighted lines before running the schema generator.');
  console.log('===================================================\n');
}

main();
