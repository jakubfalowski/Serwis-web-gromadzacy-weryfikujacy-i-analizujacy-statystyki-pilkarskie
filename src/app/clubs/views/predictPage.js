"use client";

import {
  getAwayMatchesFromTeam,
  getBetimate,
  getDBTeams,
  getHomeMatchesFromTeam,
  getMatchById,
  getMatchesFromTeam,
} from "../../fetch/getData";
import { getAwayGoals, getGoals, getHomeGoals } from "../calculation/getGoals";

import { Grid, Image, RingProgress, Spoiler, Table, Text } from "@mantine/core";
import SevenSegmentDisplay from "react-seven-segment-display";
import { getAverageGoals } from "../calculation/getAverageGoals";
import { getResult } from "../calculation/getResult";
import { getPoints } from "../calculation/getTeamStrength";
import { getWinner } from "../calculation/getWinner";
import { appForebetHead } from "./tableHead";

function staticTranslateIDToNameTeam(id) {
  switch (id) {
    case 1:
      return "Miedź Legnica";
    case 2:
      return "Lech Poznań";
    case 3:
      return "Pogoń Szczecin";
    case 4:
      return "Raków Częstochowa";
    case 5:
      return "Legia Warszawa";
    case 8:
      return "Piast Gliwice";
    case 9:
      return "Lechia Gdańsk";
    case 12:
      return "Górnik Zabrze";
    case 14:
      return "Cracovia Kraków";
    case 16:
      return "Warta Poznań";
    case 17:
      return "Zagłębie Lubin";
    case 18:
      return "Radomiak Radom";
    case 19:
      return "Stal Mielec";
    case 20:
      return "Widzew Łódź";
    case 21:
      return "Korona Kielce";
    case 22:
      return "Jagiellonia Białystok";
    case 23:
      return "Śląsk Wrocław";
    case 25:
      return "Wisła Płock";
    default:
      return "";
  }
}

export function PredictPage(props) {
  const match = props.match;
  const home = props.home;
  const away = props.away;
  const round = props.round < 0 ? parseInt(props.round) * -1 : 0;

  console.log(round);

  const { data: matchData } = getMatchById(match);
  const { data: homeTeamMatchesData } = getMatchesFromTeam(home);
  const { data: awayTeamMatchesData } = getMatchesFromTeam(away);
  const { data: teamHomeMatchesData } = getHomeMatchesFromTeam(home);
  const { data: teamAwayMatchesData } = getAwayMatchesFromTeam(away);
  const { data: teamData } = getDBTeams();
  const { data: betimateData } = getBetimate(
    staticTranslateIDToNameTeam(parseInt(home)),
    staticTranslateIDToNameTeam(parseInt(away))
  );

  function getNameFromId(id, teamData) {
    if (teamData) {
      const team = teamData.find((team) => team.id === id);
      return team ? team.name : null;
    }
    return null;
  }

  const HomeTeamPercent =
    homeTeamMatchesData &&
    teamHomeMatchesData &&
    home &&
    getPoints(
      homeTeamMatchesData.slice(round, 15 + round),
      home,
      teamHomeMatchesData.slice(round, 5 + round)
    ).percentStrength;

  const HomeTeamPercentAllForm =
    homeTeamMatchesData &&
    teamHomeMatchesData &&
    home &&
    (
      (getPoints(
        homeTeamMatchesData.slice(round, 15 + round),
        home,
        teamHomeMatchesData.slice(round, 5 + round)
      ).lastMatchesPoints[14] /
        45) *
      100
    ).toFixed(2);

  const HomeTeamPercentHomeForm =
    homeTeamMatchesData &&
    teamHomeMatchesData &&
    home &&
    (
      (getPoints(
        homeTeamMatchesData.slice(round, 15 + round),
        home,
        teamHomeMatchesData.slice(round, 5 + round)
      ).HAMPoints[4] /
        15) *
      100
    ).toFixed(2);

  const AwayTeamPercent =
    awayTeamMatchesData &&
    teamAwayMatchesData &&
    away &&
    getPoints(
      awayTeamMatchesData.slice(round, 15 + round),
      away,
      teamAwayMatchesData.slice(round, 5 + round)
    ).percentStrength;

  const AwayTeamPercentAllForm =
    awayTeamMatchesData &&
    teamAwayMatchesData &&
    away &&
    (
      (getPoints(
        awayTeamMatchesData.slice(round, 15 + round),
        away,
        teamAwayMatchesData.slice(round, 5 + round)
      ).lastMatchesPoints[14] /
        45) *
      100
    ).toFixed(2);

  const AwayTeamPercentAwayForm =
    awayTeamMatchesData &&
    teamAwayMatchesData &&
    away &&
    (
      (getPoints(
        awayTeamMatchesData.slice(round, 15 + round),
        away,
        teamAwayMatchesData.slice(round, 5 + round)
      ).HAMPoints[4] /
        15) *
      100
    ).toFixed(2);

  const Home1X2Percent =
    HomeTeamPercent &&
    AwayTeamPercent &&
    getWinner(HomeTeamPercent, AwayTeamPercent).home;
  const Draw1X2Percent =
    HomeTeamPercent &&
    AwayTeamPercent &&
    getWinner(HomeTeamPercent, AwayTeamPercent).draw;
  const Away1X2Percent =
    HomeTeamPercent &&
    AwayTeamPercent &&
    getWinner(HomeTeamPercent, AwayTeamPercent).away;

  const TeamHomeGoals =
    teamHomeMatchesData &&
    getHomeGoals(teamHomeMatchesData.slice(round, 5 + round));
  const TeamAwayGoals =
    teamAwayMatchesData &&
    getAwayGoals(teamAwayMatchesData.slice(round, 5 + round));

  const HomeTeamGoals =
    homeTeamMatchesData && getGoals(homeTeamMatchesData.slice(0, 15), home);

  const AwayTeamGoals =
    awayTeamMatchesData && getGoals(awayTeamMatchesData.slice(0, 15), away);

  const HomeTeamProbabilityGoals =
    TeamHomeGoals &&
    HomeTeamGoals &&
    getAverageGoals(
      HomeTeamGoals.home,
      HomeTeamGoals.away,
      TeamHomeGoals.home,
      TeamHomeGoals.away
    );

  const AwayTeamProbabilityGoals =
    TeamAwayGoals &&
    AwayTeamGoals &&
    getAverageGoals(
      AwayTeamGoals.home,
      AwayTeamGoals.away,
      TeamAwayGoals.home,
      TeamAwayGoals.away
    );

  const formResult =
    Home1X2Percent &&
    HomeTeamProbabilityGoals &&
    getResult(
      Home1X2Percent,
      Draw1X2Percent,
      Away1X2Percent,
      HomeTeamProbabilityGoals.score,
      AwayTeamProbabilityGoals.lost,
      AwayTeamProbabilityGoals.score,
      AwayTeamProbabilityGoals.lost
    );

  const appRows = matchData && formResult && (
    <>
      <tr className="font-medium">
        <td>Ostatnia forma</td>
        <td>
          {Home1X2Percent}% - {(100 / Home1X2Percent).toFixed(2)}
        </td>
        <td>
          {Draw1X2Percent}% - {(100 / Draw1X2Percent).toFixed(2)}
        </td>
        <td>
          {Away1X2Percent}% - {(100 / Away1X2Percent).toFixed(2)}
        </td>
        <td className={matchData.result === formResult ? "underline" : ""}>
          {formResult}
        </td>
      </tr>
      <tr className="font-medium">
        <td>Kursy bukmachera</td>
        <td>
          {((1 / matchData.home_odd) * 100).toFixed(2)}% - {matchData.home_odd}
        </td>
        <td>
          {((1 / matchData.draw_odd) * 100).toFixed(2)}% - {matchData.draw_odd}
        </td>
        <td>
          {((1 / matchData.away_odd) * 100).toFixed(2)}% - {matchData.away_odd}
        </td>
        <td
          className={
            matchData.result_odd === matchData.result ? "underline" : ""
          }
        >
          {matchData.result_odd}
        </td>
      </tr>
      {betimateData && (
        <tr className="font-medium">
          <td>Betimate.com</td>
          <td>
            {betimateData.homePercent}% -{" "}
            {((1 / betimateData.homePercent) * 100).toFixed(2)}
          </td>
          <td>
            {betimateData.drawPercent}% -{" "}
            {((1 / betimateData.drawPercent) * 100).toFixed(2)}
          </td>
          <td>
            {betimateData.awayPercent}% -{" "}
            {((1 / betimateData.awayPercent) * 100).toFixed(2)}
          </td>
          <td
            className={
              betimateData.result === matchData.result ? "underline" : ""
            }
          >
            {betimateData.result}
          </td>
        </tr>
      )}
    </>
  );

  return (
    <div className="container mx-auto container-bg px-8">
      <h2 className="text-3xl py-8 font-bold text-center">
        {teamData &&
          home &&
          `${getNameFromId(parseInt(home), teamData)} ${
            matchData.result
          } ${getNameFromId(parseInt(away), teamData)}`}
      </h2>
      <Table
        className="text-center bg-white"
        horizontalSpacing="xl"
        verticalSpacing="xs"
        striped
        highlightOnHover
        withBorder
        withColumnBorders
      >
        <caption>Szacowany wynik meczu</caption>
        <thead className=" bg-[#A6F490] border-black border-1">
          {appForebetHead}
        </thead>
        <tbody>{appRows}</tbody>
      </Table>
      <div>
        <Grid>
          <Grid.Col span={12} md={6} className="text-center px-8">
            <h2 className="text-2xl mt-8 mb-3 font-bold">Gospodarze</h2>
            <div className="flex justify-center">
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {HomeTeamPercent}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      ogółem
                    </Text>
                  </>
                }
                sections={[{ value: HomeTeamPercent, color: "#22C55E" }]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {HomeTeamPercentAllForm}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      forma
                    </Text>
                  </>
                }
                sections={[{ value: HomeTeamPercentAllForm, color: "#22C55E" }]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {HomeTeamPercentHomeForm}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      mecze domowe
                    </Text>
                  </>
                }
                sections={[
                  { value: HomeTeamPercentHomeForm, color: "#22C55E" },
                ]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
            </div>
            <p className="font-bold my-8">
              Szacowane bramki:{" "}
              {HomeTeamProbabilityGoals && (
                <div className="flex justify-center">
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(HomeTeamProbabilityGoals.score.toFixed(1)).substr(
                        0,
                        1
                      )
                    )}
                    style={{
                      marginLeft:
                        String(
                          HomeTeamProbabilityGoals.score.toFixed(1)
                        ).substr(0, 1) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-extrabold text-3xl flex items-end ">
                    .
                  </span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(
                        HomeTeamProbabilityGoals.score.toFixed(1)
                      ).substring(2, 3)
                    )}
                    style={{
                      marginLeft:
                        String(
                          HomeTeamProbabilityGoals.score.toFixed(1)
                        ).substr(2, 3) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-extrabold text-3xl flex items-center mx-4">
                    -
                  </span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(
                        HomeTeamProbabilityGoals.lost.toFixed(1)
                      ).substring(0, 1)
                    )}
                    style={{
                      marginLeft:
                        String(HomeTeamProbabilityGoals.lost.toFixed(1)).substr(
                          0,
                          1
                        ) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-black text-3xl flex items-end">.</span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(
                        HomeTeamProbabilityGoals.lost.toFixed(1)
                      ).substring(2, 3)
                    )}
                    style={{
                      marginLeft:
                        String(HomeTeamProbabilityGoals.lost.toFixed(1)).substr(
                          2,
                          3
                        ) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                </div>
              )}
            </p>
            <Spoiler maxHeight={600} showLabel="Rozwiń" hideLabel="Zwiń">
              {homeTeamMatchesData &&
                homeTeamMatchesData.slice(round, round + 10).map((match) => (
                  <Grid className="md:m-8">
                    <Grid.Col span={2}>
                      <Image src={match.logo_home} alt="home" />
                    </Grid.Col>
                    <Grid.Col
                      span={8}
                      className="flex items-center font-medium justify-center gap-1"
                    >
                      <span>{getNameFromId(match.id_home, teamData)} </span>
                      <span className="min-w-[30px]">{match.result}</span>
                      <span> {getNameFromId(match.id_away, teamData)}</span>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Image src={match.logo_away} alt="away" />
                    </Grid.Col>
                  </Grid>
                ))}
            </Spoiler>
          </Grid.Col>
          <Grid.Col span={12} md={6} className="text-center px-8 ">
            <h2 className="text-2xl mt-8 mb-3 font-bold">Goście</h2>
            <div className="flex justify-center">
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {AwayTeamPercent}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      ogółem
                    </Text>
                  </>
                }
                sections={[{ value: AwayTeamPercent, color: "#A6F490" }]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {AwayTeamPercentAllForm}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      forma
                    </Text>
                  </>
                }
                sections={[{ value: AwayTeamPercentAllForm, color: "#A6F490" }]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
              <RingProgress
                label={
                  <>
                    <Text size="xs" align="center" className="font-semibold">
                      {AwayTeamPercentAwayForm}
                    </Text>
                    <Text size={8} align="center" className="font-semibold">
                      wyjazdy
                    </Text>
                  </>
                }
                sections={[
                  { value: AwayTeamPercentAwayForm, color: "#A6F490" },
                ]}
                rootColor="white"
                thickness={20}
                roundCaps
              />
            </div>
            <p className="font-bold my-8">
              Szacowane bramki:{" "}
              {AwayTeamProbabilityGoals && (
                <div className="flex justify-center">
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(AwayTeamProbabilityGoals.score.toFixed(1)).substr(
                        0,
                        1
                      )
                    )}
                    style={{
                      marginLeft:
                        String(
                          AwayTeamProbabilityGoals.score.toFixed(1)
                        ).substr(0, 1) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-extrabold text-3xl flex items-end">
                    .
                  </span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(AwayTeamProbabilityGoals.score.toFixed(1)).substr(
                        2,
                        3
                      )
                    )}
                    style={{
                      marginLeft:
                        String(
                          AwayTeamProbabilityGoals.score.toFixed(1)
                        ).substr(2, 3) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-extrabold text-3xl flex items-center mx-4">
                    -
                  </span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(
                        AwayTeamProbabilityGoals.lost.toFixed(1)
                      ).substring(0, 1)
                    )}
                    style={{
                      marginLeft:
                        String(
                          AwayTeamProbabilityGoals.score.toFixed(1)
                        ).substr(0, 1) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                  <span className="font-black text-3xl flex items-end">.</span>
                  <SevenSegmentDisplay
                    width={10}
                    onColor="black"
                    value={parseInt(
                      String(
                        AwayTeamProbabilityGoals.lost.toFixed(1)
                      ).substring(2, 3)
                    )}
                    style={{
                      marginLeft:
                        String(AwayTeamProbabilityGoals.lost.toFixed(1)).substr(
                          2,
                          3
                        ) === "1"
                          ? "-10px"
                          : undefined,
                    }}
                  />
                </div>
              )}
            </p>
            <Spoiler maxHeight={600} showLabel="Rozwiń" hideLabel="Zwiń">
              {awayTeamMatchesData &&
                awayTeamMatchesData.slice(round, round + 10).map((match) => (
                  <Grid className="md:m-8">
                    <Grid.Col span={2}>
                      <Image src={match.logo_home} alt="home" />
                    </Grid.Col>
                    <Grid.Col
                      span={8}
                      className="flex items-center font-medium justify-center gap-1"
                    >
                      <span>{getNameFromId(match.id_home, teamData)} </span>
                      <span className="min-w-[30px]">{match.result}</span>
                      <span> {getNameFromId(match.id_away, teamData)}</span>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Image src={match.logo_away} alt="away" />
                    </Grid.Col>
                  </Grid>
                ))}
            </Spoiler>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

export default PredictPage;
