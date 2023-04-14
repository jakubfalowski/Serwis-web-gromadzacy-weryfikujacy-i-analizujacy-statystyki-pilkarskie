import { BarChart, Bar, CartesianGrid, XAxis, YAxis,Tooltip, Legend } from "recharts";

export function Charts(data, type, dataKey1, dataKey2, description){
    return(
        <div style={{
          backgroundColor: "#ffffff",
          width: "1600px"
        }}>
          <h2 className='center'>{data.description}</h2>
        <BarChart
        width={1500}
        height={400}
        data={data.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip  />
        <Legend />
        <Bar dataKey={data.dataKey1} stackId="a" fill="#4d331f" />
        <Bar dataKey={data.dataKey2} stackId="a" fill="#ad8881" />
      </BarChart>
      </div>
      )
}

export default Charts;