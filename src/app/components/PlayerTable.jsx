import { Button, Grid, Menu } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../fetch/client";
import { getCompare, setSofaPlayers } from "../fetch/getData";
import { ATable } from "./ATable";

let i = 0;
let index = 0;

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

  async function handleAddSofa() {
    if (i === 0) {
      let intervalId = null;
      const sofaHeader = {
        "X-RapidAPI-Key": "0c9455a446msh97e79af488aa513p1a114fjsneb4cb16023d6",
        "X-RapidAPI-Host": "sofasport.p.rapidapi.com",
      };

      if (names && names.length === 157) {
        i++;
        intervalId = setInterval(() => {
          client(
            `https://sofasport.p.rapidapi.com/v1/search/multi?group=players&query=${names[index]}`,
            { headers: sofaHeader }
          ).then((data) => {
            client(
              `https://sofasport.p.rapidapi.com/v1/players/statistics/result?player_id=${data.data[0].id}&unique_tournament_id=17&seasons_id=41886&player_stat_type=overall`,
              { headers: sofaHeader }
            ).then((value) => {
              mutateSofa({
                Name: names[index],
                Dribbling:
                  value.data.statistics.minutesPlayed > 89
                    ? value.data.statistics.successfulDribbles /
                      (value.data.statistics.minutesPlayed / 90)
                    : value.data.statistics.successfulDribbles,
                BeingFouled: value.data.statistics.wasFouled,
                PercentHeader: value.data.statistics.aerialDuelsWonPercentage,
                PercentGround: value.data.statistics.groundDuelsWonPercentage,
                Goals: value.data.statistics.goals,
                Shots: value.data.statistics.totalShots,
                Interceptions: value.data.statistics.interceptions,
                Tackles: value.data.statistics.tackles,
                Clearances: value.data.statistics.clearances,
                Assists: value.data.statistics.assists || 1,
                KeyPasses: value.data.statistics.keyPasses,
                DangerousSituation: value.data.statistics.bigChancesCreated,
                PercentAccuracyPasses:
                  value.data.statistics.accuratePassesPercentage,
                Rating: value.data.statistics.rating,
                Minutes: value.data.statistics.minutesPlayed,
              });
              index++;
            });
          });

          if (index === names.length) {
            clearInterval(intervalId);
          }
        }, 5000);
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mt-16 mb-12 pl-4">Tabela zawodników</h1>
      <Grid style={{ backgroundColor: "black" }}>
        <Grid.Col sm={3}>
          <Menu trigger="hover" id="sortMenu">
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  width: "100%",
                }}
                id="button"
              >
                Statystyka
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Overall&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Ocena ogólna
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Pace&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                  id="pace"
                >
                  Szybkość
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Passing&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Podania
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Shooting&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Atak
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Dribbling&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Drybling
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Defense&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Defensywa
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=Physical&count=${count}&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  Fizyczność
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col sm={3}>
          <Menu trigger="hover">
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  width: "100%",
                }}
                id="count"
              >
                Ilość
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=10&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  10
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=30&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  30
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=50&game=${gameParam}&sortBy=${typeParam}`)
                  }
                  id="50"
                >
                  50
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=10&game=${gameParam}&sortBy=${typeParam}`)
                  }
                >
                  100
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col sm={3}>
          <Menu trigger="hover">
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  width: "100%",
                }}
                id="game"
              >
                Gra
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=${count}&game=futhead&sortBy=${typeParam}`)
                  }
                >
                  FIFA
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=${count}&game=fminside&sortBy=${typeParam}`)
                  }
                  id="fm"
                >
                  Football Manager
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col sm={3}>
          <Menu trigger="hover">
            <Menu.Target>
              <Button
                style={{
                  backgroundColor: "black",
                  borderRadius: "0px",
                  width: "100%",
                }}
                id="sort"
              >
                Sortowanie
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=${count}&game=${gameParam}&sortBy=DESC`)
                  }
                >
                  Malejąco
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  onClick={() =>
                    (window.location.href = `/players?sort=${sortParam}&count=${count}&game=${gameParam}&sortBy=ASC`)
                  }
                  id="ASC"
                >
                  Rosnąco
                </div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
        <Grid.Col sm={12}>
          <p className="text-white text-xs pl-4">
            Aktualne filtry: {sortParam}, {count}
            {", "}
            {gameParam === "futhead" ? "FIFA" : "Football Manager"}
            {", "}
            {typeParam === "DESC" ? "Malejąco" : "Rosnąco"}
          </p>
        </Grid.Col>
      </Grid>
      {tableValue && <ATable value={tableValue} />}
      <button onClick={handleAddSofa} style={{ display: "none" }}>
        Sofa
      </button>
    </div>
  );
}
