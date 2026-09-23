const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = '/Users/samuvelraja/.gemini/antigravity-ide/brain/204319ad-b70f-4b0a-a060-a038e2880c5c';
const projectDir = '/Users/samuvelraja/dev/Webagency/gtrails/build/murali-patharala-associates-mpa';
const publicDir = path.join(projectDir, 'public');
const appDir = path.join(projectDir, 'app');

const heroImagePath = path.join(brainDir, 'mpa_og_hero_1790157895672.jpg');
const faviconSymbolPath = path.join(brainDir, 'mpa_favicon_symbol_1790158027548.jpg');

async function generateFaviconSuite() {
  console.log('Generating Favicon Suite...');

  // Ensure directories exist
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  // Source image for favicon
  const baseImg = sharp(faviconSymbolPath);

  // Generate 512x512
  const buf512 = await baseImg.clone().resize(512, 512, { fit: 'cover' }).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-512x512.png'), buf512);

  // Generate 192x192
  const buf192 = await sharp(buf512).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), buf192);
  fs.writeFileSync(path.join(appDir, 'icon.png'), buf192);

  // Generate Apple Touch Icon 180x180
  const buf180 = await sharp(buf512).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), buf180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), buf180);

  // Generate 32x32 & 16x16
  const buf32 = await sharp(buf512).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buf32);
  const buf16 = await sharp(buf512).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buf16);

  // Next.js App Router and browsers love standard favicon.ico
  // A clean 32x32 / 48x48 PNG can be written or standard ICO header
  // Sharp can write ICO directly if supported, or we can use PNG as favicon or create a multi-layer ICO
  // Let's create standard ICO file with 16x16 and 32x32 PNG entries
  function createIco(buffers) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // icon type 1
    header.writeUInt16LE(buffers.length, 4); // number of images

    let offset = 6 + (buffers.length * 16);
    const directoryEntries = [];
    const imageBodies = [];

    for (const { width, height, buffer } of buffers) {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(width === 256 ? 0 : width, 0);
      entry.writeUInt8(height === 256 ? 0 : height, 1);
      entry.writeUInt8(0, 2); // color palette
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(buffer.length, 8); // size
      entry.writeUInt32LE(offset, 12); // offset

      directoryEntries.push(entry);
      imageBodies.push(buffer);
      offset += buffer.length;
    }

    return Buffer.concat([header, ...directoryEntries, ...imageBodies]);
  }

  const icoBuf = createIco([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuf);

  // Generate web manifest
  const manifest = {
    name: "Murali Patharala & Associates (MPA)",
    short_name: "MPA Architects",
    description: "Architecture, Residential Construction & Luxury Interiors in Chennai",
    start_url: "/",
    display: "standalone",
    background_color: "#121418",
    theme_color: "#EA580C",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('✓ Favicon suite generated successfully.');
}

async function generateOgImage() {
  console.log('Generating Open Graph (OG) Image (1200x630)...');

  // Base 1200x630 background from the photorealistic twilight villa hero
  const resizedHero = await sharp(heroImagePath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Create SVG overlay with MPA architectural branding, typography and service tags
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark gradient vignette for readability -->
        <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0c0e12" stop-opacity="0.82" />
          <stop offset="40%" stop-color="#121418" stop-opacity="0.45" />
          <stop offset="70%" stop-color="#0c0e12" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#08090b" stop-opacity="0.96" />
        </linearGradient>

        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#181a20" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#0f1115" stop-opacity="0.95" />
        </linearGradient>

        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>

      <!-- Full Vignette Overlay -->
      <rect width="1200" height="630" fill="url(#vignette)" />

      <!-- Top Accent Bar -->
      <rect x="0" y="0" width="1200" height="6" fill="#EA580C" />

      <!-- Top Header Brand Row -->
      <g transform="translate(60, 52)">
        <!-- Logo Icon Box -->
        <rect x="0" y="0" width="46" height="46" rx="4" fill="#EA580C" />
        <rect x="17" y="17" width="12" height="12" fill="#111111" />

        <!-- Brand Text -->
        <text x="60" y="24" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="3" fill="#FFFFFF">MPA</text>
        <text x="60" y="40" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2.5" fill="#EA580C">MURALI PATHARALA &amp; ASSOCIATES</text>
      </g>

      <!-- Top Right Trust Badge -->
      <g transform="translate(860, 52)">
        <rect x="0" y="0" width="280" height="44" rx="4" fill="#181a20" stroke="#2a2e36" stroke-width="1.5" />
        <circle cx="24" cy="22" r="5" fill="#EA580C" />
        <text x="38" y="26" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" fill="#FFFFFF">28+ YEARS IN CHENNAI</text>
      </g>

      <!-- Center / Lower Content Card -->
      <g transform="translate(60, 240)">
        <!-- Tagline / Eyebrow -->
        <rect x="0" y="0" width="220" height="28" rx="2" fill="#EA580C" fill-opacity="0.15" stroke="#EA580C" stroke-width="1" />
        <text x="14" y="18" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="800" letter-spacing="2" fill="#EA580C">PREMIER ARCHITECTURE PRACTICE</text>

        <!-- Main Heading -->
        <text x="0" y="80" font-family="'Georgia', serif" font-size="52" font-weight="700" fill="#FFFFFF" letter-spacing="-0.5">
          Architecture, Construction
        </text>
        <text x="0" y="140" font-family="'Georgia', serif" font-size="52" font-weight="700" fill="#FFFFFF" letter-spacing="-0.5">
          &amp; Bespoke Interiors
        </text>

        <!-- 3 Core Service Pills -->
        <g transform="translate(0, 185)">
          <!-- Pillar 1: Architecture & Design -->
          <g transform="translate(0, 0)">
            <rect width="250" height="52" rx="4" fill="url(#cardGrad)" stroke="#333842" stroke-width="1.5" filter="url(#shadow)" />
            <rect x="14" y="16" width="20" height="20" rx="3" fill="#EA580C" />
            <text x="24" y="30" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="900" fill="#111111" text-anchor="middle">01</text>
            <text x="44" y="26" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">ARCHITECTURE</text>
            <text x="44" y="40" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" font-weight="500" fill="#9ca3af">Vastu &amp; 3D Floor Plans</text>
          </g>

          <!-- Pillar 2: Construction -->
          <g transform="translate(265, 0)">
            <rect width="250" height="52" rx="4" fill="url(#cardGrad)" stroke="#333842" stroke-width="1.5" filter="url(#shadow)" />
            <rect x="14" y="16" width="20" height="20" rx="3" fill="#EA580C" />
            <text x="24" y="30" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="900" fill="#111111" text-anchor="middle">02</text>
            <text x="44" y="26" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">CONSTRUCTION</text>
            <text x="44" y="40" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" font-weight="500" fill="#9ca3af">ARCH Foundation &#8226; Turnkey</text>
          </g>

          <!-- Pillar 3: Interiors -->
          <g transform="translate(530, 0)">
            <rect width="250" height="52" rx="4" fill="url(#cardGrad)" stroke="#333842" stroke-width="1.5" filter="url(#shadow)" />
            <rect x="14" y="16" width="20" height="20" rx="3" fill="#EA580C" />
            <text x="24" y="30" font-family="'Helvetica Neue', Arial, sans-serif" font-size="11" font-weight="900" fill="#111111" text-anchor="middle">03</text>
            <text x="44" y="26" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">LUXURY INTERIORS</text>
            <text x="44" y="40" font-family="'Helvetica Neue', Arial, sans-serif" font-size="10" font-weight="500" fill="#9ca3af">Modular Kitchens &amp; Joinery</text>
          </g>
        </g>

        <!-- Bottom Footer Meta inside Card -->
        <g transform="translate(0, 275)">
          <text x="0" y="0" font-family="'Helvetica Neue', Arial, sans-serif" font-size="13" font-weight="600" fill="#D1D5DB" letter-spacing="1">
            Anna Nagar East, Chennai &#8226; Coimbatore &#8226; Bangalore &#8226; Pondicherry
          </text>
          <text x="780" y="0" font-family="'Helvetica Neue', Arial, sans-serif" font-size="13" font-weight="700" fill="#EA580C" letter-spacing="1">
            +91 98410 98490
          </text>
        </g>
      </g>
    </svg>
  `);

  // Composite the SVG onto the 1200x630 background image
  const ogImageBuffer = await sharp(resizedHero)
    .composite([
      {
        input: svgOverlay,
        top: 0,
        left: 0,
      }
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

  const ogPngBuffer = await sharp(ogImageBuffer).png().toBuffer();

  // Write to public/ and app/
  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogImageBuffer);
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPngBuffer);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogPngBuffer);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.jpg'), ogImageBuffer);

  console.log('✓ Open Graph images generated successfully.');
}

async function main() {
  try {
    await generateFaviconSuite();
    await generateOgImage();
    console.log('ALL ASSETS GENERATED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error generating assets:', err);
    process.exit(1);
  }
}

main();
