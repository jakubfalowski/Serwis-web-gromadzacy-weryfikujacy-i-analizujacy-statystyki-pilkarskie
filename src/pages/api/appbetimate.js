import axios from "axios";
import cheerio from "cheerio";

const playerTab = new Array(6);
for (let i = 0; i <= 6; i++) playerTab[i] = new Array(0);

function translate(item) {
  if (item === "Rakow Czestochowa") return "Raków Częstochowa";
  else if (item === "Zaglebie Lubin") return "Zagłębie Lubin";
  else if (item === "Pogon Szczecin") return "Pogoń Szczecin";
  else if (item === "Lech Poznan") return "Lech Poznań";
  else if (item === "Jagiellonia Bialystok") return "Jagiellonia Białystok";
  else if (item === "Miedz Legnica") return "Miedź Legnica";
  else if (item === "Gornik Zabrze") return "Górnik Zabrze";
  else if (item === "Legia Warsaw") return "Legia Warszawa";
  else if (item === "Slask Wroclaw") return "Śląsk Wrocław";
  else if (item === "Widzew Lodz") return "Widzew Łódź";
  else if (item === "Cracovia Krakow") return "Cracovia";
  else if (item === "Wisla Plock") return "Wisła Płock";
  else if (item === "Warta Poznan") return "Warta Poznań";
  else return item;
}

export function Betimate() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://betimate.com/en/football-predictions/poland/poland-ekstraklasa`
      )
      .then((res) => {
        const $ = cheerio.load(res.data);
        const homeTeam = $(".round-wrapper:nth-of-type(3) .homeTeam");
        const awayTeam = $(".round-wrapper:nth-of-type(3) .awayTeam");
        const predictWin = $(".round-wrapper:nth-of-type(3) .predict-win");
        const predictDraw = $(".round-wrapper:nth-of-type(3) .predict-draw");
        const predictLost = $(".round-wrapper:nth-of-type(3) .predict-lost");
        const predictResult = $(".round-wrapper:nth-of-type(3) .final-score");

        $(homeTeam).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.trim().replace(/\n/g, "");
          const translatedItem = translate(editedItem);
          playerTab[0].push(translatedItem);
        });

        $(awayTeam).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.trim().replace(/\n/g, "");
          const translatedItem = translate(editedItem);
          playerTab[1].push(translatedItem);
        });

        $(predictWin).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.replace(/[\s\n]/g, "");
          playerTab[2].push(editedItem);
        });

        $(predictDraw).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.replace(/[\s\n]/g, "");
          playerTab[3].push(editedItem);
        });

        $(predictLost).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.replace(/[\s\n]/g, "");
          playerTab[4].push(editedItem);
        });

        $(predictResult).each((i, el) => {
          const item = $(el).text();
          const editedItem = item.replace(/[\s\n]/g, "");
          playerTab[5].push(editedItem);
        });
      });

    resolve(playerTab);
  });
}

export default Betimate;
