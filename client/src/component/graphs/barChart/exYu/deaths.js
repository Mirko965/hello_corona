import React from "react";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {exYu} from "../../../../utils/topTen";

const ExYuMostDeaths = ({countryData, exYuCountries}) => {
  return (
    <div className='barChart'>
      <h3>Ex Yu Deaths</h3>
      <ResponsiveContainer width={'100%'} height={250} >
        <BarChart data={exYu(countryData, exYuCountries, 'country', 'deaths')}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" interval={0} height={80} angle={-35} textAnchor="end"/>
          <YAxis />
          <Tooltip />
          <Bar dataKey="deaths" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default ExYuMostDeaths