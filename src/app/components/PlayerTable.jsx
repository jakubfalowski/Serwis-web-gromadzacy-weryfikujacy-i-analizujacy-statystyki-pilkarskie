import { SegmentedControl } from "@mantine/core";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { client } from "../fetch/client";
import { getCompare, setSofaPlayers } from "../fetch/getData";
import { ATable } from "./ATable";

let i = 0;
export function PlayerTable() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") || "Overall";
  const count = searchParams.get("count") || "10";
  const gameParam = searchParams.get("game") || "futhead";
  const typeParam = searchParams.get("sortBy") || "DESC";
  const data = getCompare(sortParam, gameParam, typeParam);
  const tableValue = data.data && data.data.slice(0, parseInt(count));
  const [names, setNames] = useState([]);
  const { mutate: mutateSofa } = setSofaPlayers();

  useEffect(() => {
    const extractedNames =
      data && data.data && data.data.map((imie) => imie.Name);
    setNames(extractedNames);
  }, [data]);

  useEffect(() => {
    names && XD();
  }, [names]);

  async function XD() {
    if (i === 0) {
      let intervalId = null;
      let index = 0;
      const sofaHeader = {
        "X-RapidAPI-Key": "551e98c5c3mshd0988d9c99175fcp1dd8fajsn02d2cf82f9a8",
        "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
      };

      if (names && names.length === 157) {
        i++;
        intervalId = setInterval(() => {
          client(
            `https://sofascore.p.rapidapi.com/players/search?name=${names[index]}`,
            { headers: sofaHeader }
          ).then((data) => {
            console.log(data);
            // client(
            //   `https://sofascore.p.rapidapi.com/players/get-statistics?playerId=${data.players[0].id}&tournamentId=17&seasonId=41886&typ=overall`,
            //   { headers: sofaHeader }
            // ).then((value) =>
            //   mutateSofa({
            //     Name: names[index],
            //     Dribbling:
            //       value.statistics.minutesPlayed > 89
            //         ? value.statistics.successfulDribbles /
            //           (value.statistics.minutesPlayed / 90)
            //         : value.statistics.successfulDribbles,
            //     BeingFouled: value.statistics.wasFouled,
            //     PercentHeader: value.statistics.aerialDuelsWonPercentage,
            //     PercentGround: value.statistics.groundDuelsWonPercentage,
            //     Goals: value.statistics.goals,
            //     Shots: value.statistics.totalShots,
            //     Interceptions: value.statistics.interceptions,
            //     Tackles: value.statistics.tackles,
            //     Clearances: value.statistics.clearances,
            //     Assists: value.statistics.assists,
            //     KeyPasses: value.statistics.keyPasses,
            //     DangerousSituation: value.statistics.bigChancesCreated,
            //     PercentAccuracyPasses:
            //       value.statistics.accuratePassesPercentage,
            //     Rating: value.statistics.rating,
            //     Minutes: value.statistics.minutesPlayed,
            //   })
            // );
          });

          index++;

          if (index === names.length) {
            clearInterval(intervalId);
          }
        }, 1000);
      }
    }
  }

  return (
    <div className="container mx-auto bg-white rounded-2xl overflow-hidden">
      <SegmentedControl
        value={sortParam}
        data={[
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Overall&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Ocena ogólna
              </div>
            ),
            value: "Overall",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Pace&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Szybkość
              </div>
            ),
            value: "Pace",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Passing&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Podania
              </div>
            ),
            value: "Passing",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Shooting&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Atak
              </div>
            ),
            value: "Shooting",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Dribbling&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Drybling
              </div>
            ),
            value: "Dribbling",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Defense&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Defensywa
              </div>
            ),
            value: "Defense",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=Physical&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                Fizyczność
              </div>
            ),
            value: "Physical",
          },
        ]}
      />
      <br />
      <SegmentedControl
        value={count}
        data={[
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=10&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                10
              </div>
            ),
            value: "10",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=30&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                30
              </div>
            ),
            value: "30",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=50&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                50
              </div>
            ),
            value: "50",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=100&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                100
              </div>
            ),
            value: "100",
          },
        ]}
      />
      <br />
      <SegmentedControl
        value={gameParam}
        data={[
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=${count}&game=futhead&sortBy=${typeParam}`)
                }
              >
                FIFA
              </div>
            ),
            value: "futhead",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=${count}&game=fminside&sortBy=${typeParam}`)
                }
              >
                Football Manager
              </div>
            ),
            value: "fminside",
          },
        ]}
      />
      <br />
      <SegmentedControl
        value={typeParam}
        data={[
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=${count}&game=${gameParam}&sortBy=DESC`)
                }
              >
                Malejąco
              </div>
            ),
            value: "DESC",
          },
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=${count}&game=${gameParam}&sortBy=ASC`)
                }
              >
                Rosnąco
              </div>
            ),
            value: "ASC",
          },
        ]}
      />
      {tableValue && <ATable value={tableValue} />}
    </div>
  );
}
