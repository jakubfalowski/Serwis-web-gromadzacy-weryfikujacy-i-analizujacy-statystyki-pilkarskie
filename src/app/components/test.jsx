import { SegmentedControl } from "@mantine/core";
import { useSearchParams } from "next/navigation";

import { getCompare } from "../fetch/getData";
import { ATable } from "./ATable";

export function Test() {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") || "Overall";
  const count = searchParams.get("count") || "10";
  const gameParam = searchParams.get("game") || "futhead";
  const typeParam = searchParams.get("sortBy") || "DESC";
  const data = getCompare(sortParam, gameParam, typeParam);
  console.log(data);
  console.log(parseInt(count));
  const tableValue = data.data && data.data.slice(0, parseInt(count));

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
          {
            label: (
              <div
                onClick={() =>
                  (window.location.href = `/players?sort=${sortParam}&count=200&game=${gameParam}&sortBy=${typeParam}`)
                }
              >
                200
              </div>
            ),
            value: "200",
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
