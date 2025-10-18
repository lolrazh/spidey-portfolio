import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';

const SOURCE_DIR = path.join(process.cwd(), 'public/uploads');
const OUTPUT_DIR = path.join(process.cwd(), 'public/optimized-images');
const SIZES = [640, 750, 828, 1080, 1200, 1920]; // Common device widths
const FORMATS = ['webp', 'avif'];
const DEFAULT_QUALITY = { quality: 80 }; // Adjust quality as needed

async function optimizeImages() {
  console.log('Starting image optimization...');

  // Ensure output directory exists
  await fs.ensureDir(OUTPUT_DIR);

  // Find all image files (jpg, jpeg, png)
  const imagePaths = await glob('**/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { 
    cwd: SOURCE_DIR, 
    absolute: true 
  });

  if (imagePaths.length === 0) {
    console.log('No images found in', SOURCE_DIR);
    return;
  }

  console.log(`Found ${imagePaths.length} images to optimize.`);

  let optimizedCount = 0;

  try {
    for (const [index, imgPath] of imagePaths.entries()) {
      const baseName = path.parse(imgPath).name;
      console.log(`Processing ${baseName} (${index + 1}/${imagePaths.length})`);

      for (const size of SIZES) {
        for (const format of FORMATS) {
          const outputFileName = `${baseName}-${size}w.${format}`;
          const outputPath = path.join(OUTPUT_DIR, outputFileName);

          try {
            if (await fs.pathExists(outputPath)) {
              continue;
            }

            await sharp(imgPath)
              .resize(size)
              .toFormat(format, DEFAULT_QUALITY)
              .toFile(outputPath);
            optimizedCount++;
          } catch (err) {
            console.error(`Error optimizing ${imgPath} to ${outputPath}:`, err);
          }
        }
      }
    }

    console.log(`Image optimization complete. ${optimizedCount} new optimized files created.`);
  } catch (error) {
    console.error('Error during image processing:', error);
  }
}

optimizeImages(); 