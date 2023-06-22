import { LoadingOverlay } from "@mantine/core";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAverageRatings } from "../../fetch/getData";

export default function GameChart() {
  const data = getAverageRatings();
  const formatedData = data &&
    data.data &&
    data.data[0] && [
      {
        name: "Ocena ogólna FIFA",
        fifa: data.data[0].overallFIFA,
      },
      {
        name: "Ocena ogólna FM",
        fm: data.data[0].overallFM,
      },
      {
        name: "Szybkość FIFA",
        fifa: data.data[0].paceFIFA,
      },
      {
        name: "Szybkość FM",
        fm: data.data[0].paceFM,
      },
      {
        name: "Atak FIFA",
        fifa: data.data[0].shootingFIFA,
      },
      {
        name: "Atak FM",
        fm: data.data[0].shootingFM,
      },
      {
        name: "Drybling FIFA",
        fifa: data.data[0].dribblingFIFA,
      },
      {
        name: "Drybling FM",
        fm: data.data[0].dribblingFM,
      },
      {
        name: "Podania FIFA",
        fifa: data.data[0].overallFIFA,
      },
      {
        name: "Podania FM",
        fm: data.data[0].passingFM,
      },
      {
        name: "Defensywa FIFA",
        fifa: data.data[0].defenseFIFA,
      },
      {
        name: "Defensywa FM",
        fm: data.data[0].defenseFM,
      },
      {
        name: "Fizyczność FIFA",
        fifa: data.data[0].physicalFIFA,
      },
      {
        name: "Fizyczność FM",
        fm: data.data[0].physicalFM,
      },
    ];

  return (
    <div>
      {data ? (
        <div className="container mx-auto container-bg ">
          <h2 className="text-2xl py-8 pl-16 font-bold">
            Średnia ocena danej statystyki
          </h2>
          <BarChart
            width={1500}
            height={400}
            data={formatedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="fifa" stackId="a" fill="#22C55E" />
            <Bar dataKey="fm" stackId="a" fill="#A6F490" />
          </BarChart>
        </div>
      ) : (
        <LoadingOverlay visible={true} overlayBlur={2} />
      )}
    </div>
  );
}
