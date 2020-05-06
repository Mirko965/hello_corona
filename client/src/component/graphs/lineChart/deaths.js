import React from "react";
import {dataGraph} from "../../../utils/topTen";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import './lineChart.css'

const Deaths = ({countriesHistory, values}) => {
  return (
    <div className='lineChart'>
      <ResponsiveContainer>
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
            dataKey="deaths"
            stroke="#f8042a"
            activeDot={{r: 8}}
          />
        </LineChart>
      </ResponsiveContainer>
    
    </div>
  )
}

export default Deaths