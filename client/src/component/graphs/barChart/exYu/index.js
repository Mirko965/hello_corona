import React from "react";
import ExYuMostDeaths from "./deaths";
import ExYuDeathsPerOneMillion from "./deathsPerOneMillion";
import ExYuCasesPerOneMillion from "./casesPerOneMilion";
import ExYUTestsPerOneMillion from "./testsPerOneMillion";
import '../barChart.css'

const ExYuBarChart = ({countryData, exYuCountries}) => {
  return (
    <>
      <ExYuMostDeaths
        countryData={countryData}
        exYuCountries={exYuCountries}
      />
      <ExYuDeathsPerOneMillion
        countryData={countryData}
        exYuCountries={exYuCountries}
      />
      <ExYuCasesPerOneMillion
        countryData={countryData}
        exYuCountries={exYuCountries}
      />
      <ExYUTestsPerOneMillion
        countryData={countryData}
        exYuCountries={exYuCountries}
      />
    </>
  )
}

export default ExYuBarChart
