import React, { useEffect, useState, useCallback } from 'react';
import './InfectedCountries.css'
import { getAllWorldData, getHistoricalAll, getHistoricalByCountryAll, getCountryData } from '../api/FetchData';
import GoogleMap from "./googleMap";
import CountriesList from "./countriesList";
import AllWorldCasesAndRecovered from "./graphs/lineChart/linechart";
import AllWorldBarChart from "./graphs/barChart/allWorld";
import ExYuBarChart from "./graphs/barChart/exYu";
import getMarkers from "../utils/getmarkers";

const InfectedCountries = () => {
  const initialOptions = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 2,
    mapTypeId: 'roadmap'
  }
  
  const [values, setValues] = useState({ country: 'All World' })
  const [country, setCountry] = useState({})
  const [countryData, setCountryData] = useState([])
  const [countriesHistory, setCountriesHistory] = useState([])
  const [options, setOptions] = useState(initialOptions)


  const markers = getMarkers(countryData)
  const exYuCountries = ['Serbia', 'Croatia', 'Bosnia', 'Slovenia', 'Macedonia', 'Montenegro']
  const countriesArray = countryData.map(item => item.country)

  const fetchData = useCallback(async () => {
    let allWorldData = await getAllWorldData()
    let countriesData = await getCountryData()
    let allWorldHistoryData = await getHistoricalAll()
    let countryHistory = await getHistoricalByCountryAll()

    setCountryData([{ ...allWorldData, countryInfo: { lat: 0, long: 0 }, country: 'All World' }].concat(countriesData))
    setCountriesHistory([{ timeline: allWorldHistoryData, country: 'All World', province: null }].concat(countryHistory))
    setCountry(allWorldData)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleChange = (event) => {
    event.preventDefault()
    const country = event.target.value || 'All World'
    return countryData.filter(item => {
      if (item.country === country) {
        setCountry(item)
        if (country !== 'All World') {
          setOptions({
            center: {
              lat: item.countryInfo.lat,
              lng: item.countryInfo.long
            },
            zoom: 5,
            mapTypeId: 'roadmap'
          })
        }
      }
      return setValues({ ...values, country })
    })
  }
  const handleMarker = (marker) => {
    const title = marker.getTitle()
    setValues({ ...values, country: title })
    countryData.filter(item => {
      if (item.country === title) {
        setCountry(item)
        setOptions({
          center: {
            lat: item.countryInfo.lat,
            lng: item.countryInfo.long
          },
          zoom: 5,
          mapTypeId: 'roadmap'
        })
      }
      return null
    })
  }
  return (
    <main>
      <div className='maps'>
        <GoogleMap
          markers={markers}
          options={options}
          handleMarker={handleMarker}
        />
      </div>
      <div className='country'>
        <CountriesList
          values={values}
          countriesArray={countriesArray}
          country={country}
          handleChange={handleChange}
        />
        <AllWorldCasesAndRecovered
          countriesHistory={countriesHistory}
          values={values}
        />
        
      </div>
      <div className='topTen'>
        <AllWorldBarChart
          countryData={countryData}
        />
      </div>
      <div className='topTen'>
        <ExYuBarChart
          countryData={countryData}
          exYuCountries={exYuCountries}
        />
      </div>
    </main>
  )
}

export default InfectedCountries
