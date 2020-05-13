import SelectListGroup from "../../form_module/input/SelectListGroup";
import './CountriesList.css'
import moment from "moment";
import React from "react";

const CountriesList = ({values, countriesArray, country, handleChange}) => {
  
  const countries = SelectListGroup(
    'select country',
    values.country,
    'kiki',
    countriesArray,
      '',
    handleChange)
  
  return (
    <div className='dataText'>
      <form>
        <h3>Country {countries}</h3>
      </form>
      <p><b>Updated: </b>{moment(country.updated).format('L LT').toString()}</p>
      <p><b>Cases</b>: {country.cases}</p>
      <p><b>Today Cases</b>: {country.todayCases}</p>
      <p><b>Deaths</b>: {country.deaths}</p>
      <p><b>Today Deaths</b>: {country.todayDeaths}</p>
      <p><b>Recovered</b>: {country.recovered}</p>
      <p><b>Active</b>: {country.active}</p>
      <p><b>Critical</b>: {country.critical}</p>
      <p><b>Cases Per One Million</b>: {country.casesPerOneMillion}</p>
      <p><b>Deaths Per One Million</b>: {country.deathsPerOneMillion}</p>
      <p><b>Tests</b>: {country.tests}</p>
      <p><b>Tests Per One Million</b>: {country.testsPerOneMillion}</p>
    </div>
  )
}

export default CountriesList
