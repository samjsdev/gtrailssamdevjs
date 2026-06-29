const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('./node_modules/sharp');

const images = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2560',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2560'
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
        const filename = `hero-${index + 6}.webp`;
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
    console.log(`Processing image ${i + 6}...`);
    try {
      await downloadAndConvert(images[i], i);
    } catch (e) {
      console.error(e);
    }
  }
  console.log('Done!');
}

run();
