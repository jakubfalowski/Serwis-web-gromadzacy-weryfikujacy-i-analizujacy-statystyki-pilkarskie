import NextCors from "nextjs-cors";
import Fifa from "./appfifa";

export default async function FifaAPI(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const results = await Fifa();

  timeToFetch();

  function timeToFetch() {
    const playerStats = results[0].map((row, index) => {
      return results.map((attributes) => {
        return attributes[index];
      });
    });
    const jsonStats = playerStats.map((typeStat) => {
      return {
        name: typeStat[0],
        rating: typeStat[1],
        pace: typeStat[2],
        shots: typeStat[3],
        pass: typeStat[4],
        dribble: typeStat[5],
        defensive: typeStat[6],
        physicality: typeStat[7],
        faceUrl: typeStat[8],
        nationUrl: typeStat[9],
        Club: typeStat[10],
        ClubUrl: typeStat[11],
      };
    });
    res.json(jsonStats);
  }
}
