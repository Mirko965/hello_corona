import React from "react";
import {dataGraph} from "../../../utils/topTen";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import './lineChart.css'

const CasesRecovered = ({countriesHistory, values}) => {
  return (
    <div className='lineChart'>
      <ResponsiveContainer >
      <LineChart
        data={dataGraph(countriesHistory, values.country)}
        margin={{top: 5, right: 30, left: 10, bottom: 5}}
      >
        <XAxis dataKey="date"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend verticalAlign="top" height={36}/>
        <Line
          type="monotone"
          dataKey="cases"
          stroke="#f8cb04"
          activeDot={{r: 8}}
        />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke="#82ca9d"
          activeDot={{r: 8}}
        />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CasesRecovered