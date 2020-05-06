import React from "react";
import DeathsPerOneMillion from "./deathsPerOneMilion";
import CasesPerOneMillion from "./casesPerOneMilion";
import MostDeaths from "./mostDeaths";
import TestsPerOneMillion from "./testPerOneMilion";
import '../barChart.css'

const AllWorldBarChart = ({countryData}) => {
  return (
    <>
      <MostDeaths
        countryData={countryData}
      />
      <DeathsPerOneMillion
        countryData={countryData}
      />
      <CasesPerOneMillion
        countryData={countryData}
      />
      <TestsPerOneMillion
        countryData={countryData}
      />
    </>
  )
}

export default AllWorldBarChart