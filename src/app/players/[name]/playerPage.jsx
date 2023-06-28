import { Grid, Image, Rating, Slider, Tooltip } from "@mantine/core";
import "../../../index.css";
import { getMaxRatings, getPlayerData } from "../../fetch/getData";

const bestRating = 7.778125;
const marks = [
  { value: 50, label: "50" },
  { value: 60, label: "60" },
  { value: 70, label: "70" },
  { value: 80, label: "80" },
  { value: 90, label: "90" },
  { value: 100, label: "100" },
];

const color = {
  fifa: "darkseagreen",
  fm: "darkgreen",
  default: " dimgray",
};

export function PlayerPage(props) {
  const { data } = getPlayerData(props.player);
  const { data: maxRatings } = getMaxRatings();
  console.log(data, maxRatings);
  return (
    <div className="bg-white container container-bg mx-auto pl-8">
      {data && maxRatings && (
        <>
          <Grid>
            <Grid.Col sm={12} md={4}>
              <h2
                className="text-2xl mb-3 font-bold text-center"
                id="playerName"
              >
                {data[0].Name}
              </h2>
              <Image
                maw={240}
                mx="auto"
                radius="md"
                src={data[0].faceUrl}
                alt={data[0].Name || "player"}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4}>
              <h2 className="text-2xl mb-3 font-bold text-center">
                {data[0].Club}
              </h2>
              <Image
                maw={240}
                mx="auto"
                radius="md"
                src={data[0].ClubUrl}
                alt={data[0].Name || "club"}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4}>
              <h2 className="text-2xl mb-3 font-bold text-center">
                Narodowość
              </h2>
              <Image
                maw={240}
                mx="auto"
                my="auto"
                radius="md"
                src={data[0].nationUrl}
                alt={data[0].Name || "nation"}
                style={{ marginBlock: "50px" }}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col sm={12} md={4} sx={{ padding: "20px 40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Ocena ogólna FIFA</h2>
              <Tooltip label={`Ocena ogólna FIFA: ${data[0].Overall}`}>
                <Rating
                  defaultValue={parseInt(data[0].Overall) / 10}
                  count={10}
                  readOnly
                />
              </Tooltip>
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "20px 40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Ocena ogólna FM</h2>
              <Tooltip label={`Ocena ogólna FM: ${data[0].overalFM}`}>
                <Rating
                  defaultValue={parseInt(data[0].overalFM) / 10}
                  count={10}
                  readOnly
                />
              </Tooltip>
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "20px 40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">
                Ocena ogólna Sofascore
              </h2>
              <Tooltip
                label={`Ocena ogólna: ${parseInt(
                  (data[0].Rating / bestRating) * 100
                )}`}
              >
                <Rating
                  defaultValue={parseInt((data[0].Rating / bestRating) * 10)}
                  count={10}
                  readOnly
                />
              </Tooltip>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Szybkość</h2>
              <Tooltip label={`Szybkość FIFA: ${data[0].Pace}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].Pace}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Szybkość FM: ${data[0].paceFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].paceFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Atak</h2>
              <Tooltip label={`Atak FIFA: ${data[0].Shooting}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].Shooting}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Atak FM: ${data[0].shootingFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].shootingFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <p className="font-medium">Gole: {data[0].Goals}</p>
              <Slider
                disabled
                max={maxRatings.Goals}
                value={data[0].Goals}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">Strzały: {data[0].Shots}</p>
              <Slider
                disabled
                max={maxRatings.Shots}
                value={data[0].Shots}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Podania</h2>
              <Tooltip label={`Podania FIFA: ${data[0].Passing}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].Passing}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Podania FM: ${data[0].passingFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].passingFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <p className="font-medium">Asysty: {data[0].Assists}</p>
              <Slider
                disabled
                max={maxRatings.Assists}
                value={data[0].Assists}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">
                Niebezpieczne sytuacje: {data[0].DangerousSituation}
              </p>
              <Slider
                disabled
                max={maxRatings.DangerousSituation}
                value={data[0].DangerousSituation}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">
                Kluczowe podania: {data[0].KeyPasses}
              </p>
              <Slider
                disabled
                max={maxRatings.KeyPasses}
                value={data[0].KeyPasses}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">
                Procent dokładnych podań:{" "}
                {data[0].PercentAccuracyPasses.toFixed(2)}
              </p>
              <Slider
                disabled
                max={maxRatings.PercentAccuracyPasses}
                value={data[0].PercentAccuracyPasses}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Drybling</h2>
              <Tooltip label={`Drybling FIFA: ${data[0].dribblingFIFA}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].dribblingFIFA}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Drybling FM: ${data[0].dribblingFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].dribblingFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <p className="font-medium">Faulowany: {data[0].BeingFouled}</p>
              <Slider
                disabled
                max={maxRatings.BeingFouled}
                value={data[0].BeingFouled}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">
                Dryblingi na mecz: {data[0].Dribbling.toFixed(2)}
              </p>
              <Slider
                disabled
                max={maxRatings.Dribbling}
                value={data[0].Dribbling}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Defensywa</h2>
              <Tooltip label={`Defensywa FIFA: ${data[0].Defense}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].Defense}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Defensywa FM: ${data[0].defenseFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].defenseFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <p className="font-medium">Wybicia: {data[0].Clearances}</p>
              <Slider
                disabled
                max={maxRatings.Clearances}
                value={data[0].Clearances}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">Odbiory: {data[0].Interceptions}</p>
              <Slider
                disabled
                max={maxRatings.Interceptions}
                value={data[0].Interceptions}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">Wślizgi: {data[0].Tackles}</p>
              <Slider
                disabled
                max={maxRatings.Tackles}
                value={data[0].Tackles}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
            </Grid.Col>
            <Grid.Col sm={12} md={4} sx={{ padding: "40px" }}>
              <hr />
              <h2 className="text-2xl mb-3 font-bold">Fizyczność</h2>
              <Tooltip label={`Fizyczność FIFA: ${data[0].Physical}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].Physical}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fifa,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <Tooltip label={`Fizyczność FM: ${data[0].physicalFM}`}>
                <Slider
                  disabled
                  min={50}
                  value={data[0].physicalFM}
                  styles={() => ({
                    bar: {
                      backgroundColor: color.fm,
                    },
                  })}
                  sx={{ marginBottom: "50px" }}
                  marks={marks}
                />
              </Tooltip>
              <p className="font-medium">
                Procent wygranych pojedynków górą:{" "}
                {data[0].PercentHeader.toFixed(2)}
              </p>
              <Slider
                disabled
                max={maxRatings.PercentHeader}
                value={data[0].PercentHeader}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
              <p className="font-medium">
                Procent wygranych pojedynków ziemią:{" "}
                {data[0].PercentGround.toFixed(2)}
              </p>
              <Slider
                disabled
                max={maxRatings.PercentGround}
                value={data[0].PercentGround}
                styles={() => ({
                  bar: {
                    backgroundColor: color.default,
                  },
                })}
                sx={{ marginBottom: "20px" }}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
    </div>
  );
}
