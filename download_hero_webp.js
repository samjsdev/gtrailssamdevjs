const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const images = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2560',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2560',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2560',
  'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&q=80&w=2560',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2560'
];

const outDir = path.join('/Users/samuvelraja/dev/Webagency/gtrails/public/images/template8/hero-pool');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAndConvert(url, index) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const filename = `hero-${index + 1}.webp`;
        const outPath = path.join(outDir, filename);
        
        sharp(buffer)
          .webp({ quality: 80 })
          .toFile(outPath)
          .then(info => {
            console.log(`Saved ${filename}:`, info);
            resolve(outPath);
          })
          .catch(err => {
            console.error(`Error converting ${filename}:`, err);
            reject(err);
          });
      });
    }).on('error', err => {
      reject(err);
    });
  });
}

async function run() {
  for (let i = 0; i < images.length; i++) {
    console.log(`Processing image ${i + 1}...`);
    try {
      await downloadAndConvert(images[i], i);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('Done!');
}

run();
