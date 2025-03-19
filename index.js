require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

const url = process.env.BASE_URL;

async function crawl() {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": process.env.USER_AGENT,
      },
    });
    const $ = cheerio.load(data);
    console.log($);
    const stores = [];

    $("tbody tr").each((index, element) => {
      const number = $(element).find("td").eq(0).text().trim(); // 번호
      const location = $(element).find("td.date").text().trim(); // 지역
      const name = $(element).find("td.name").text().trim(); // 상호명
      const title = $(element).find("td.left a").text().trim(); // 제목
      const link = $(element).find("td.left a").attr("href"); // 링크
      const views = $(element).find("td").last().text().trim(); // 조회수

      if (title) {
        stores.push({
          number,
          location,
          name,
          title,
          link,
          views,
        });
      }
    });
    console.log(stores);
  } catch (error) {
    console.error("크롤링 오류:", error.message);
  }
}

crawl();
