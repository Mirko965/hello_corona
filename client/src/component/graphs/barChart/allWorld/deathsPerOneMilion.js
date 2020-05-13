import React from "react";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {topTen} from "../../../../utils/topTen";

const DeathsPerOneMillion = ({countryData}) => {
  return (
    <div className='barChart'>
      <h3>Deaths Per One Million</h3>
      <ResponsiveContainer width={'100%'} height={260}>
        <BarChart  data={topTen(countryData, 'country', 'deathsPerOneMillion')}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" interval={0} height={80} angle={-35} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="deathsPerOneMillion" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default DeathsPerOneMillion