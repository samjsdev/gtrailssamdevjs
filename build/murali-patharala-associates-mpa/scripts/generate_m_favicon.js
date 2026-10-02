const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '../public');
const logoPath = path.join(publicDir, 'mpa-3d-logo.webp');

// Keep every favicon format derived from the site's existing 3D logo.
async function generate() {
  const sizes = [16, 32, 48, 180, 192, 512];
  const images = new Map();
  for (const size of sizes) {
    images.set(size, await sharp(logoPath).resize(size, size).png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer());
  }

  const outputs = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['apple-icon.png', 180],
    ['icon.png', 192],
    ['icon-512x512.png', 512],
  ];
  for (const [filename, size] of outputs) {
    await fs.writeFile(path.join(publicDir, filename), images.get(size));
  }

  const icoSizes = [16, 32, 48];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icoSizes.length, 4);
  let offset = header.length + icoSizes.length * 16;
  const entries = icoSizes.map(size => {
    const buffer = images.get(size);
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return entry;
  });
  const ico = Buffer.concat([header, ...entries, ...icoSizes.map(size => images.get(size))]);
  await fs.writeFile(path.join(publicDir, 'favicon.ico'), ico);
  console.log('Generated the 3D MPA favicon suite.');
}

generate().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
