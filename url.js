const fs = require('fs');
const path = require('path');

// Helper to parse RFC 4180 CSV
function parseCSV(content) {
  const records = [];
  let currentField = '';
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote
          currentField += '"';
          i++; // skip next quote
        } else {
          // Closing quote
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentField);
        currentField = '';
      } else if (char === '\r' || char === '\n') {
        row.push(currentField);
        currentField = '';
        if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
          records.push(row);
        }
        row = [];
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }
  }
  if (currentField || row.length > 0) {
    row.push(currentField);
    records.push(row);
  }
  return records;
}

function main() {
  // Find CSV files in the current directory
  const files = fs.readdirSync(process.cwd());
  const csvFiles = files.filter(f => f.startsWith('Scraped Data') && f.endsWith('.csv'));

  if (csvFiles.length === 0) {
    console.error("No CSV files starting with 'Scraped Data' found in the current directory.");
    process.exit(1);
  }

  // Use the first CSV file found
  const csvFile = csvFiles[0];
  console.log(`Reading data from: ${csvFile}\n`);

  const content = fs.readFileSync(path.join(process.cwd(), csvFile), 'utf-8');
  const records = parseCSV(content);

  if (records.length < 2) {
    console.error("No data records found in CSV file.");
    process.exit(1);
  }

  const header = records[0];
  const sourceDataIndex = header.indexOf('source_data');

  if (sourceDataIndex === -1) {
    console.error("Could not find 'source_data' column in CSV header.");
    process.exit(1);
  }

  const urls = [];

  for (let i = 1; i < records.length; i++) {
    const row = records[i];
    const sourceDataStr = row[sourceDataIndex];
    if (!sourceDataStr) continue;

    try {
      const sourceData = JSON.parse(sourceDataStr);
      const slug = sourceData.clinic?.slug;
      const name = sourceData.clinic?.name || slug;
      if (slug) {
        const url = `https://gtrailssamdevjs.vercel.app/designwebsite/template4/${slug}`;
        urls.push({ name, url });
      }
    } catch (e) {
      // Ignore parsing errors for individual rows
      console.warn(`Warning: Failed to parse JSON for row ${i}: ${e.message}`);
    }
  }

  console.log("Generated URLs:");
  urls.forEach(item => console.log(item.url));

  // Write output to url.md
  const mdLines = [
    '# Generated Template 4 URLs',
    '',
    ...urls.map(item => `- [${item.name}](${item.url})`)
  ];
  const mdContent = mdLines.join('\n') + '\n';
  fs.writeFileSync(path.join(process.cwd(), 'url.md'), mdContent);
  console.log(`\nSuccessfully saved ${urls.length} URLs to url.md`);
}

main();
