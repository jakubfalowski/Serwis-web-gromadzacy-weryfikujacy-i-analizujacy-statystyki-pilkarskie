import Fifa from "../fifa";
import dictPlayers from "../dictPlayers";
import { Fifa21 } from "../fifa21";

import NextCors from 'nextjs-cors';

export default async function FifaAPI(req,res) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
 });

  res.json(Fifa21)
    // const results = await Fifa();

    // const interval = setInterval(timeToFetch, 1);
    // function timeToFetch() {
    //     if (results[0].length > 645){
    //         clearInterval(interval);
    //         const playerStats = results[0].map((row, index) => {
    //             return results.map((attributes) => {
    //               return attributes[index]
    //             })
    //           });
    //           const jsonStats = playerStats.map((typeStat =>{
    //             return {"name": dictPlayers(typeStat[0]), "rating": typeStat[1], "pace": typeStat[2], "shots":typeStat[3], "pass": typeStat[4], "dribble": typeStat[5], "defensive": typeStat[6], "physicality":typeStat[7]}
    //           }));
    //         res.json(jsonStats);
    //     }
      
    // }
}

