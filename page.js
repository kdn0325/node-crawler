const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function crawl() {
  const browser = await puppeteer.launch({ headless: false }); // UI가 보이게 실행
  const page = await browser.newPage();

  console.log("🚀 브라우저 실행됨");

  await page.goto("https://s.clarity.ms/", { waitUntil: "networkidle2" });

  console.log("✅ 페이지 로드 완료");

  // 네트워크 요청 확인
  page.on("response", async (response) => {
    console.log("📡 요청된 URL:", response.url());
  });

  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5초 대기

  await browser.close();
}

crawl();
