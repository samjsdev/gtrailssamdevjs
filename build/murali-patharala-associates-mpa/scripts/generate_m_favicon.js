const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectDir = '/Users/samuvelraja/dev/Webagency/gtrails/build/murali-patharala-associates-mpa';
const publicDir = path.join(projectDir, 'public');
const appDir = path.join(projectDir, 'app');
const brainDir = '/Users/samuvelraja/.gemini/antigravity-ide/brain/204319ad-b70f-4b0a-a060-a038e2880c5c';

// Architectural "M" SVG design
const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7A1A" />
      <stop offset="100%" stop-color="#EA580C" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181a20" />
      <stop offset="100%" stop-color="#0e1013" />
    </linearGradient>
  </defs>

  <!-- Dark Obsidian Architectural Base -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="#EA580C" stroke-width="4" stroke-opacity="0.25" />

  <!-- Bold Architectural 'M' Structural Monogram -->
  <path
    d="M 116 388 
       L 116 124 
       L 182 124 
       L 256 256 
       L 330 124 
       L 396 124 
       L 396 388 
       L 334 388 
       L 334 220 
       L 274 324 
       L 238 324 
       L 178 220 
       L 178 388 
       Z"
    fill="url(#mGrad)"
  />

  <!-- Subtle Architectural Keystone Dot -->
  <rect x="246" y="348" width="20" height="20" rx="4" fill="#EA580C" fill-opacity="0.8" />
</svg>
`;

async function generate() {
  console.log('Generating "M" Favicon Suite...');

  const svgBuffer = Buffer.from(svgContent);

  // High-res 512x512
  const buf512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512x512.png'), buf512);

  // 192x192
  const buf192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), buf192);
  fs.writeFileSync(path.join(appDir, 'icon.png'), buf192);

  // 180x180 Apple Touch Icon
  const buf180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), buf180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), buf180);

  // 32x32 & 16x16
  const buf32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buf32);

  const buf16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buf16);

  // Copy to brainDir for preview and walkthrough
  fs.writeFileSync(path.join(brainDir, 'm_favicon.png'), buf512);
  fs.writeFileSync(path.join(brainDir, 'icon.png'), buf192);

  // Generate ICO (standard multi-size header)
  function createIco(buffers) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(buffers.length, 4);

    let offset = 6 + buffers.length * 16;
    const directoryEntries = [];
    const imageBodies = [];

    for (const { width, height, buffer } of buffers) {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(width === 256 ? 0 : width, 0);
      entry.writeUInt8(height === 256 ? 0 : height, 1);
      entry.writeUInt8(0, 2);
      entry.writeUInt8(0, 3);
      entry.writeUInt16LE(1, 4);
      entry.writeUInt16LE(32, 6);
      entry.writeUInt32LE(buffer.length, 8);
      entry.writeUInt32LE(offset, 12);

      directoryEntries.push(entry);
      imageBodies.push(buffer);
      offset += buffer.length;
    }

    return Buffer.concat([header, ...directoryEntries, ...imageBodies]);
  }

  const icoBuf = createIco([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

  console.log('✓ Successfully generated "M" favicon suite.');
}

generate().catch(console.error);
