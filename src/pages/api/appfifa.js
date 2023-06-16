import axios from "axios";
import cheerio from "cheerio";

const playerTab = new Array(11);
for (let i = 0; i <= 11; i++) playerTab[i] = new Array(0);

let numberOfPage = 0;

export function Fifa() {
  return new Promise((resolve, reject) => {
    for (numberOfPage; numberOfPage <= 15; numberOfPage++) {
      axios
        .get(
          `https://www.futwiz.com/en/fifa23/players?page=${numberOfPage}&leagues[]=13&release=nifgold`
        )
        .then((res) => {
          const $ = cheerio.load(res.data);
          const playerName = $("tr.table-row .player b");
          const rating = $(".otherversion23-txt");
          const pace = $("tr.table-row .statCol:nth-of-type(6) .stat");
          const shots = $("tr.table-row .statCol:nth-of-type(7) .stat");
          const passing = $("tr.table-row .statCol:nth-of-type(8) .stat");
          const dribbling = $("tr.table-row .statCol:nth-of-type(9) .stat");
          const defending = $("tr.table-row .statCol:nth-of-type(10) .stat");
          const physicality = $("tr.table-row .statCol:nth-of-type(11) .stat");
          const faceUrl = $(".player-img");
          const nationUrl = $("img.nation");
          const Club = $(".team a:nth-of-type(2)");
          const ClubUrl = $("img.club");

          $(playerName).each((i, el) => {
            const item = $(el).text();
            playerTab[0].push(item);
          });

          $(rating).each((i, el) => {
            const item = $(el).text();
            playerTab[1].push(item);
          });

          $(pace).each((i, el) => {
            const item = $(el).text();
            playerTab[2].push(item);
          });

          $(shots).each((i, el) => {
            const item = $(el).text();
            playerTab[3].push(item);
          });

          $(passing).each((i, el) => {
            const item = $(el).text();
            playerTab[4].push(item);
          });

          $(dribbling).each((i, el) => {
            const item = $(el).text();
            playerTab[5].push(item);
          });

          $(defending).each((i, el) => {
            const item = $(el).text();
            playerTab[6].push(item);
          });

          $(physicality).each((i, el) => {
            const item = $(el).text();
            playerTab[7].push(item);
          });

          $(faceUrl).each((i, el) => {
            const item = $(el).attr("src");
            playerTab[8].push(item);
          });

          $(nationUrl).each((i, el) => {
            const item = $(el).attr("src");
            playerTab[9].push(item);
          });

          $(Club).each((i, el) => {
            const item = $(el).text();
            playerTab[10].push(item);
          });

          $(ClubUrl).each((i, el) => {
            const item = $(el).attr("src");
            playerTab[11].push(item);
          });
        });
    }
    resolve(playerTab);
  });
}

export default Fifa;
