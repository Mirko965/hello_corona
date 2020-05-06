import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {exYu} from "../../../../utils/topTen";

const ExYuCasesPerOneMillion = ({countryData, exYuCountries}) => {
  return (
    <div className='barChart'>
      <h3>Ex Yu Cases Per One Million</h3>
      <ResponsiveContainer width={'100%'} height={250} >
      <BarChart data={exYu(countryData, exYuCountries, 'country', 'casesPerOneMillion')}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="casesPerOneMillion" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExYuCasesPerOneMillion

