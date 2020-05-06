import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import {topTen} from "../../../../utils/topTen";

const CasesPerOneMillion = ({countryData}) => {
  return (
    <div className='barChart'>
      <h3>Cases Per One Million</h3>
      <ResponsiveContainer  width={'100%'} height={250}>
        <BarChart data={topTen(countryData, 'country', 'casesPerOneMillion')}>
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

export default CasesPerOneMillion