/**
 * Renders public/scout-logo-render.html to public/scout-logo-animation.mp4
 * Requires: npm install playwright && npx playwright install chromium
 * Requires: ffmpeg on PATH
 */
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const { pathToFileURL } = require("url");

async function main() {
  const { chromium } = require("playwright");
  const root = path.join(__dirname, "..");
  const htmlPath = path.join(root, "public", "scout-logo-render.html");
  const outMp4 = path.join(root, "public", "scout-logo-animation.mp4");
  const tmpDir = path.join(root, ".tmp-scout-video");

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing ${htmlPath}`);
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 512, height: 512 },
    recordVideo: { dir: tmpDir, size: { width: 512, height: 512 } },
  });
  const page = await context.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 5200));
  await context.close();
  await browser.close();

  const files = fs.readdirSync(tmpDir).filter((f) => f.endsWith(".webm"));
  if (!files.length) {
    throw new Error(`No webm in ${tmpDir}: ${fs.readdirSync(tmpDir).join(", ")}`);
  }
  const webm = path.join(tmpDir, files[0]);
  execSync(
    `ffmpeg -y -i "${webm}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${outMp4}"`,
    { stdio: "inherit" }
  );
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("Wrote", outMp4);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
