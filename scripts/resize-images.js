/*
 * Resize and compress images for responsive srcset.
 * Usage:
 *   npm install
 *   npm run images
 * This script requires 'sharp'. It's configured to generate widths [480,768,1200]
 * and produces files like 'tea1-w480.jpg'.
 */

const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

const widths = [480, 768, 1200];
const inputDir = path.join(__dirname, '..', 'img');
const allowedExt = ['.jpg', '.jpeg', '.png', '.JPG', '.PNG'];

(async function main(){
  try {
    const files = await fs.readdir(inputDir);
    const images = files.filter(f => allowedExt.includes(path.extname(f)) && !/-w\d+\./.test(f));

    for (const file of images){
      const inPath = path.join(inputDir, file);
      // preserve original extension for checking, but derive basename using the actual file extension
      const ext = path.extname(file);
      const extLower = ext.toLowerCase();
      const name = path.basename(file, ext); // removes extension regardless of case

      for (const w of widths){
        const outJpg = path.join(inputDir, `${name}-w${w}.jpg`);

        // resize + jpeg
        await sharp(inPath)
          .resize({ width: w })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(outJpg);

        console.log(`wrote ${outJpg}`);
      }
    }

    console.log('All images processed.');
  } catch (err){
    console.error('Error processing images', err);
    process.exit(1);
  }
})();