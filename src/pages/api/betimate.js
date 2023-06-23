import NextCors from "nextjs-cors";
import Betimate from "./appbetimate";

let i = 0;

export default async function BetimateAPI(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const results = await Betimate();

  timeToFetch();

  function timeToFetch() {
    const playerStats = results[0].slice(0, 8).map((row, index) => {
      return results.map((attributes) => {
        return attributes[index];
      });
    });
    const jsonStats = playerStats.map((typeStat) => {
      return {
        homeName: typeStat[0],
        awayName: typeStat[1],
        predictHome: typeStat[2],
        predictDraw: typeStat[3],
        predictAway: typeStat[4],
        predictResult: typeStat[5],
      };
    });

    res.json(jsonStats);
  }
}
