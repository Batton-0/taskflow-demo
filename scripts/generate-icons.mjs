import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

await mkdir('public/icons', { recursive: true });
for (const size of [192, 512]) {
  await sharp('public/icons/icon.svg').resize(size, size).png().toFile(`public/icons/icon-${size}.png`);
  console.log(`Generated ${size}x${size}`);
}
// Keep the entire checkmark inside the central maskable safe zone.
const maskable = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" fill="#2563eb"/><path d="M170 260 L230 320 L350 190" fill="none" stroke="white" stroke-width="36" stroke-linecap="round" stroke-linejoin="round"/></svg>');
await sharp(maskable).png().toFile('public/icons/icon-maskable-512.png');
console.log('Generated maskable 512x512');
