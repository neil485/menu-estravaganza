import { chromium, type Page } from "playwright";
import { execSync, spawn, type ChildProcess } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "../remotion/public/screenshots");
const BASE_URL = "http://localhost:4173";
const VIEWPORT = { width: 1920, height: 1080 };

async function waitForReady(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
}

async function capture(page: Page, name: string) {
  await page.screenshot({ path: path.join(OUTPUT_DIR, `${name}.png`) });
  console.log(`  Captured: ${name}.png`);
}

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Build the app first
  console.log("Building app...");
  execSync("npm run build", { cwd: path.resolve(__dirname, ".."), stdio: "inherit" });

  // Start preview server
  console.log("Starting preview server...");
  const server: ChildProcess = spawn("npx", ["vite", "preview", "--port", "4173"], {
    cwd: path.resolve(__dirname, ".."),
    stdio: "pipe",
  });

  // Wait for server to be ready
  await new Promise<void>((resolve) => {
    server.stdout?.on("data", (data: Buffer) => {
      if (data.toString().includes("Local")) resolve();
    });
    setTimeout(resolve, 5000);
  });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    // 1. Landing page
    console.log("Capturing landing page...");
    await page.goto(`${BASE_URL}/#/`);
    await waitForReady(page);
    await capture(page, "landing");

    // 2. Login page
    console.log("Capturing login page...");
    await page.goto(`${BASE_URL}/#/login`);
    await waitForReady(page);
    await capture(page, "login");

    // 3. Menu - hero (light mode)
    console.log("Capturing menu...");
    await page.goto(`${BASE_URL}/#/menu`);
    await waitForReady(page);
    await capture(page, "menu-hero");

    // 4. Menu - scroll to categories
    await page.evaluate(() => {
      const grid = document.querySelector("[class*='grid']");
      if (grid) grid.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(300);
    await capture(page, "menu-categorias");

    // 5. Menu - dark mode
    const darkToggle = page.locator("button").filter({ hasText: /dark|oscuro|moon/i }).first();
    if (await darkToggle.count() > 0) {
      await darkToggle.click();
      await page.waitForTimeout(500);
    } else {
      // Try clicking a theme toggle icon button
      const themeBtn = page.locator("[aria-label*='theme'], [aria-label*='dark'], [aria-label*='mode'], button:has(svg)").first();
      if (await themeBtn.count() > 0) {
        await themeBtn.click();
        await page.waitForTimeout(500);
      }
    }
    await capture(page, "menu-dark");

    // 6. Mesero - floor map
    console.log("Capturing waiter panel...");
    await page.goto(`${BASE_URL}/#/mesero`);
    await waitForReady(page);
    await capture(page, "mesero-mapa");

    // 7. Mesero - click a table to show order builder
    const tableCard = page.locator("[class*='table'], [class*='mesa'], [class*='Table']").first();
    if (await tableCard.count() > 0) {
      await tableCard.click();
      await page.waitForTimeout(500);
    }
    await capture(page, "mesero-ordenes");

    // 8. Cocina
    console.log("Capturing kitchen panel...");
    await page.goto(`${BASE_URL}/#/cocina`);
    await waitForReady(page);
    await capture(page, "cocina");

    // 9. Admin - KPIs (top of page)
    console.log("Capturing admin panel...");
    await page.goto(`${BASE_URL}/#/admin`);
    await waitForReady(page);
    await capture(page, "admin-kpis");

    // 10. Admin - scroll to orders table
    await page.evaluate(() => {
      window.scrollBy(0, 600);
    });
    await page.waitForTimeout(300);
    await capture(page, "admin-ordenes");

    // 11. Admin - scroll to table management
    await page.evaluate(() => {
      window.scrollBy(0, 600);
    });
    await page.waitForTimeout(300);
    await capture(page, "admin-mesas");

    console.log("\nAll screenshots captured successfully!");
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
