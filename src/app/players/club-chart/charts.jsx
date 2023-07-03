import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Charts(data) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "1600px",
      }}
    >
      <h2 className="text-2xl py-8 font-bold pl-16">{data.description}</h2>
      {data.data && (
        <BarChart
          width={1500}
          height={400}
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Club" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={data.dataKey1} stackId="a" fill="#22C55E" />
          <Bar dataKey={data.dataKey2} stackId="b" fill="#A6F490" />
        </BarChart>
      )}
    </div>
  );
}

export default Charts;
