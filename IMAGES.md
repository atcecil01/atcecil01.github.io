Image optimization

This project includes a small image resizing script to generate responsive images and WebP variants.

Usage:

1. Install dependencies (once):

   npm install

2. Generate resized images (creates -w480, -w768, -w1200 .jpg files in `img/`):

   npm run images

Notes:
- The script uses `sharp` and generates files like `tea1-w480.jpg`.
- After running, refresh the site (hard refresh / dev tools disable cache) so `srcset` picks up the new images.
- You can adjust widths in `scripts/resize-images.js` if you need different breakpoints.
