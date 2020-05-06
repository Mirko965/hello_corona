import React from "react";
import CasesRecovered from "./cases_recovered";
import Deaths from "./deaths";
import './lineChart.css'

const AllWorldCasesAndRecovered = ({countriesHistory, values}) => {
  return (
      <div className='allWorldCasesAndRecovered'>
        <Deaths
          countriesHistory={countriesHistory}
          values={values}
        />
        <CasesRecovered
          countriesHistory={countriesHistory}
          values={values}
        />
      </div>
    )
}
export default AllWorldCasesAndRecovered