import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {topTen} from "../../../../utils/topTen";

const MostDeaths = ({countryData}) => {
  return (
    <div className='barChart'>
      <h3>Countries with most deaths</h3>
      <ResponsiveContainer width={'100%'} height={250} >
        <BarChart data={topTen(countryData, 'country', 'deaths').slice(1)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deaths" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default MostDeaths