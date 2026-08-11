const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function processLogo() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const logoPath = path.resolve('public/logo.png');
  const logoBase64 = fs.readFileSync(logoPath).toString('base64');
  const logoDataUrl = `data:image/png;base64,${logoBase64}`;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; background: transparent; }
          canvas { display: block; }
        </style>
      </head>
      <body>
        <canvas id="c1"></canvas>
        <canvas id="cHorizontal"></canvas>
        <script>
          const img = new Image();
          img.src = "${logoDataUrl}";
          img.onload = () => {
            // 1. Process original logo to transparent background
            const c1 = document.getElementById('c1');
            const ctx1 = c1.getContext('2d');
            c1.width = img.width;
            c1.height = img.height;
            ctx1.drawImage(img, 0, 0);

            const imgData = ctx1.getImageData(0, 0, c1.width, c1.height);
            const data = imgData.data;

            // Target background color around #EBECEC / #F0F2F5 (light gray/off-white)
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i+1];
              const b = data[i+2];

              // Check if pixel is background (light gray/off-white with low saturation)
              const maxC = Math.max(r, g, b);
              const minC = Math.min(r, g, b);
              const isLight = minC > 215;
              const isLowSat = (maxC - minC) < 25;

              if (isLight && isLowSat) {
                data[i + 3] = 0; // Set Alpha to 0 (Transparent)
              }
            }
            ctx1.putImageData(imgData, 0, 0);

            // 2. Crop to tight bounding box
            let minX = c1.width, minY = c1.height, maxX = 0, maxY = 0;
            for (let y = 0; y < c1.height; y++) {
              for (let x = 0; x < c1.width; x++) {
                const alpha = data[(y * c1.width + x) * 4 + 3];
                if (alpha > 10) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }

            const cropW = maxX - minX + 1;
            const cropH = maxY - minY + 1;

            // Create tight cropped canvas
            window.tightCanvas = document.createElement('canvas');
            window.tightCanvas.width = cropW;
            window.tightCanvas.height = cropH;
            const tightCtx = window.tightCanvas.getContext('2d');
            tightCtx.drawImage(c1, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

            // 3. Create Horizontal Layout: Box Mark on Left (top ~60%), Text & Tagline on Right (bottom ~40%)
            const cH = document.getElementById('cHorizontal');
            const ctxH = cH.getContext('2d');

            const boxH = Math.round(cropH * 0.58); // Box mark height
            const textY = Math.round(cropH * 0.56); // Text start line
            const textH = cropH - textY; // Text height

            const boxW = cropW; // Box width roughly equals cropW inside box area

            // Canvas dimensions for Horizontal Layout
            const hHeight = boxH + 20;
            const hWidth = boxW + 700;

            cH.width = hWidth;
            cH.height = hHeight;

            // Draw Box Mark on Left
            ctxH.drawImage(window.tightCanvas, 0, 0, cropW, boxH, 0, 10, boxW * 0.9, boxH);

            // Draw Text & Tagline on Right (stretched horizontally with clear spacing)
            ctxH.drawImage(window.tightCanvas, 0, textY, cropW, textH, boxW * 0.95, Math.round((hHeight - textH) / 2), Math.round(cropW * 1.55), textH * 1.15);

            window.ready = true;
          };
        </script>
      </body>
    </html>
  `);

  await page.waitForFunction('window.ready === true');

  // Save Transparent Square Logo
  const transparentBase64 = await page.evaluate(() => {
    return window.tightCanvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
  });
  fs.writeFileSync('public/logo-transparent.png', Buffer.from(transparentBase64, 'base64'));

  // Save Horizontal Transparent Logo
  const horizontalBase64 = await page.evaluate(() => {
    const cH = document.getElementById('cHorizontal');
    return cH.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
  });
  fs.writeFileSync('public/logo-horizontal.png', Buffer.from(horizontalBase64, 'base64'));

  console.log('Successfully generated transparent logos!');
  await browser.close();
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
