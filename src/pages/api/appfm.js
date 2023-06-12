import cheerio from "cheerio";
import puppeteer from "puppeteer";

export async function AppFm() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://fminside.net/players");

  const content = await page.evaluate(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kliknięcie w input[name="league"]
    const leagueInput = document.querySelector('input[name="league"]');
    leagueInput.click();

    // Oczekiwanie na pojawienie się a[value="Premier League"]
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        const premierLeagueLink = document.querySelector(
          'a[value="Premier League"]'
        );
        if (premierLeagueLink) {
          premierLeagueLink.click();
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });

    // Oczekiwanie na załadowanie dodatkowych danych
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Kliknięcie w elementy .loadmore
    for (let i = 0; i <= 15; i++) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loadMoreButton = document.querySelector(".loadmore");
      if (loadMoreButton) {
        loadMoreButton.click();
      } else {
        break;
      }
    }

    return document.documentElement.innerHTML;
  });

  const $ = cheerio.load(content);
  const playerName = $(".name b a");
  const hrefTab = [];

  console.log(playerName.text());

  for (let i = 0; i < 100; i++) {
    const item = $(playerName[i]).attr("href");
    const playerPage = await browser.newPage();
    await playerPage.goto(`https://fminside.net/${item}`);
    await playerPage.waitForSelector("td.stat", { timeout: 2000 });
    const overall = await playerPage.$eval(
      "#ability",
      (element) => element.textContent
    );
    const stats = await playerPage.$$eval("td.stat", (elements) =>
      elements.map((element) => parseInt(element.textContent))
    );

    hrefTab.push({
      Name: $(playerName[i]).text(),
      Overall: overall,
      Pace: ((stats[28] + stats[33]) / 2) * 5,
      Physical:
        ((stats[30] + stats[31] + stats[32] + stats[34] + stats[35]) / 5) * 5,
      Shooting:
        ((stats[3] +
          stats[7] +
          stats[11] +
          stats[15] +
          stats[17] +
          stats[19] +
          stats[24]) /
          7) *
        5,
      Passing:
        ((stats[0] +
          stats[1] +
          stats[4] +
          stats[5] +
          stats[9] +
          stats[13] +
          stats[26]) /
          7) *
        5,
      Defense:
        ((stats[6] +
          stats[9] +
          stats[12] +
          stats[15] +
          stats[18] +
          stats[19] +
          stats[24]) /
          7) *
        5,
      Dribbling: ((stats[29] + stats[2] + stats[28]) / 3) * 5,
    });
    await playerPage.close();
  }

  await browser.close();

  return hrefTab;
}
