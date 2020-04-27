/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, useCallback } from 'react';
import {
  LineSeries,
  XAxis,
  XYPlot,
  YAxis,
  VerticalBarSeries,
  HorizontalGridLines
} from 'react-vis';
import isEmpty from '../form_module/component/isEmpty';
import { useForm, input } from '../form_module/component/useForm';
import { getAll, getAllByCountry, getAllCountries, getHistoricalAll, getHistoricalByCountry, getGeoLocation } from '../api/FetchData';
import GoogleMap from './GoogleMap';
import useAxios from '../hooks/useAxios';

const GetCountry = () => {
  const [country, setCountry] = useState({})
  const [options, setOptions] = useState({})
  const [geoLocation, setGeoLocation] = useState([])
  const [tenDeaths, setTenDeaths] = useState([])
  const [tenCasesPerOneMillion, setTenCasesPerOneMillion] = useState([])
  const [tenDeathsPerOneMillion, setTenDeathsPerOneMillion] = useState([])
  const [tenTestsPerOneMillion, setTenTestsPerOneMillion] = useState([])

  const [exYuDeaths, setExYuDeaths] = useState([])
  const [exYuCasesPerOneMillion, setExYuCasesPerOneMillion] = useState([])
  const [exYuDeathsPerOneMillion, setExYuDeathsPerOneMillion] = useState([])
  const [exYuTestsPerOneMillion, setExYuTestsPerOneMillion] = useState([])

  const [countryHistorical, setCountryHistorical] = useState({})
  const [getAllCountriesName, setGetAllCountriesName] = useState(['All World'])
  let dataDeaths
  let dataCases
  let dataRecovered


  const [stateNew] = useAxios('https://corona.lmao.ninja/v2/all')
  if (!stateNew) {
    console.log('loading...')
  } else {
    console.log(stateNew)
  }

  const selectCountry = input({
    country: {
      options: getAllCountriesName
    }
  })
  const { selectListGroup, values } = useForm({ input: [
    selectCountry
  ] });

  const links = geoLocation.map(item => {
    if (typeof item.countryInfo.lat === 'number' && typeof item.countryInfo.long === 'number') {
      return {
        coords: { lat: item.countryInfo.lat, lng: item.countryInfo.long },
        title: item.country,
        cases: item.cases,
        deaths: item.deaths,
        todayCases: item.todayCases,
        todayDeaths: item.todayDeaths,
        recovered: item.recovered
      }
    }
  })

  const countryData = useCallback(async () => {
    const {
      countriesNames,
      countriesDeaths,
      countryCasesPerOneMillion,
      countryDeathsPerOneMillion,
      countryTestsPerOneMillion,
      exYuDeaths,
      exYuCasesPerOneMillion,
      exYuDeathsPerOneMillion,
      exYuTestsPerOneMillion
    } = await getAllCountries()

    setGetAllCountriesName(getAllCountriesName.concat(countriesNames))
    setTenDeaths(countriesDeaths)
    setTenCasesPerOneMillion(countryCasesPerOneMillion)
    setTenDeathsPerOneMillion(countryDeathsPerOneMillion)
    setTenTestsPerOneMillion(countryTestsPerOneMillion)
    setExYuDeaths(exYuDeaths)
    setExYuCasesPerOneMillion(exYuCasesPerOneMillion)
    setExYuDeathsPerOneMillion(exYuDeathsPerOneMillion)
    setExYuTestsPerOneMillion(exYuTestsPerOneMillion)

    let getAllDataByCountry = {}
    let getHistoricalDataByCountry = {}
    if (isEmpty(values)) {
      getAllDataByCountry = await getAll()
      getHistoricalDataByCountry = await getHistoricalAll()
      const geo = await getGeoLocation()
      setCountry(getAllDataByCountry)
      setCountryHistorical(getHistoricalDataByCountry)
      setGeoLocation(geo)
      setOptions({
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 2,
        mapTypeId: 'roadmap'
      })
    } else if (!isEmpty(values)) {
      getAllDataByCountry = await getAllByCountry(values)
      getHistoricalDataByCountry = await getHistoricalByCountry(values)
      setCountry(getAllDataByCountry)
      const { country } = getHistoricalDataByCountry
      const { cases, deaths, recovered } = getHistoricalDataByCountry
      setCountryHistorical({ country, cases, deaths, recovered })
      setOptions({
        center: {
          lat: getAllDataByCountry.countryInfo.lat,
          lng: getAllDataByCountry.countryInfo.long
        },
        zoom: 7,
        mapTypeId: 'roadmap'
      })
    }
  }, [values])

  useEffect(() => {
    countryData()
  }, [countryData])

  if (!isEmpty(countryHistorical.deaths)) {
    dataDeaths = Object.entries(countryHistorical.deaths).map(([key, value]) => {
      return { x: key, y: value }
    })
    dataCases = Object.entries(countryHistorical.cases).map(([key, value]) => {
      return { x: key, y: value }
    })
    dataRecovered = Object.entries(countryHistorical.recovered).map(([key, value]) => {
      return { x: key, y: value }
    })
  }

  return (
    <div className='mine'>
      {/* <div className='maps'>
        <GoogleMap
          links={links}
          options={options}
        />
      </div> */}

      <div className='country'>
        <div className='dataText'>
          <h3><b>Country</b>: {selectListGroup(selectCountry)}</h3>
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
        <div className='graphs'>
          <div className='deaths'>
            <XYPlot
              height={250}
              width={700}
              xType="ordinal"
              stackBy="y"
              stroke='red'
            >
              <LineSeries
                data={dataDeaths}
                size={2}
              />
              <XAxis
                tickLabelAngle={-75}
                tickPadding={2}
                tickSize={1}
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#ADDDE1' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
              <YAxis
                tickSize={1}
                tickPadding={2}
                title="death"
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#ADDDE1' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
            </XYPlot>
          </div>
          <div className='cases'>
            <XYPlot
              height={250}
              width={700}
              xType="ordinal"
              stackBy="y"
              // stroke='red'
            >
              <LineSeries
                data={dataCases}
                size={2}
              />
              <XAxis
                tickLabelAngle={-75}
                tickPadding={2}
                tickSize={1}
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#091fe8' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
              <YAxis
                tickSize={3}
                tickPadding={8}
                tickLabelAngle={-75}
                title="Cases"
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#ADDDE1' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
              <LineSeries
                data={dataRecovered}
                size={2}
              />
              <XAxis
                tickLabelAngle={-75}
                tickPadding={2}
                tickSize={1}
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#091fe8' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
              <YAxis
                tickSize={3}
                tickPadding={8}
                tickLabelAngle={-75}
                title="Cases"
                style={{
                  line: { stroke: '#011517' },
                  ticks: { stroke: '#ADDDE1' },
                  text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 }
                }}
              />
            </XYPlot>
          </div>
        </div>
      </div>
      <div className='topTen'>
        <div className='barChart'>
          <h3>Countries with most deaths</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={tenDeaths} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Cases Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={tenCasesPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Deaths Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={tenDeathsPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Tests Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={tenTestsPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
      </div>
      <div className='topTen'>
        <div className='barChart'>
          <h3>Ex Yu Deaths</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={exYuDeaths} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Ex Yu Cases Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={exYuCasesPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Ex YU Deaths Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={exYuDeathsPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
        <div className='barChart'>
          <h3>Ex YU Tests Per One Million</h3>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={330}
            height={200}
          >
            <VerticalBarSeries data={exYuTestsPerOneMillion} />
            <HorizontalGridLines />
            <XAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
            <YAxis
              tickLabelAngle={-38}
              tickPadding={2}
              tickSize={1}
            />
          </XYPlot>
        </div>
      </div>
    </div>


  )
}

export default GetCountry
