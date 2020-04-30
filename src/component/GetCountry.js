import React, { useEffect, useState, useCallback } from 'react';
import {
  LineSeries,
  XAxis,
  XYPlot,
  YAxis,
  VerticalBarSeries,
  HorizontalGridLines
} from 'react-vis';
import moment from 'moment'
import { getAllWorldData, getHistoricalAll, getHistoricalByCountryAll, getCountryData } from '../api/FetchData';
import GoogleMap from './GoogleMap';
import SelectListGroup from '../form_module/input/SelectListGroup';
import { topTen, dataGraph, exYu } from '../utils/topTen'

const GetCountry = () => {
  const [values, setValues] = useState({ country: 'All World' })
  const [country, setCountry] = useState({})
  const [countryData, setCountryData] = useState([])
  const [countriesHistory, setCountriesHistory] = useState([])
  const [options, setOptions] = useState({})


  const links = countryData.map(item => {
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
    setOptions({
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 2,
      mapTypeId: 'roadmap'
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleChange = (event) => {
    event.preventDefault()
    const country = event.target.value || 'All World'
    countryData.filter(item => {
      if (item.country === country) {
        setCountry(item)
        if (country === 'All World') {
          setOptions({
            center: {
              lat: 0,
              lng: 0
            },
            zoom: 2,
            mapTypeId: 'roadmap'
          })
        } else {
          setOptions({
            center: {
              lat: item.countryInfo.lat,
              lng: item.countryInfo.long
            },
            zoom: 6,
            mapTypeId: 'roadmap'
          })
        }
      }
      setValues({ ...values, country })
    })
  }
  const onClickMarker = (marker) => {
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
          zoom: 6,
          mapTypeId: 'roadmap'
        })
      }
    })
  }

  return (
    <div className='mine'>
      <div className='maps'>
        <GoogleMap
          links={links}
          options={options}
          onClick={onClickMarker}
        />
      </div>
      <div className='country'>
        <div className='dataText'>
          <form>
            <h3><b>Country</b>: {SelectListGroup(
              'select country',
              values.country,
              'kiki',
              countriesArray,
              '',
              handleChange
            )}
            </h3>
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
                data={dataGraph(countriesHistory, values.country, 'deaths')}
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
                data={dataGraph(countriesHistory, values.country, 'cases')}
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
                data={dataGraph(countriesHistory, values.country, 'recovered')}
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
            <VerticalBarSeries data={topTen(countryData, 'country', 'deaths').slice(1)} />
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
            <VerticalBarSeries data={topTen(countryData, 'country', 'casesPerOneMillion')} />
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
            <VerticalBarSeries data={topTen(countryData, 'country', 'deathsPerOneMillion')} />
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
            <VerticalBarSeries data={topTen(countryData, 'country', 'testsPerOneMillion')} />
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
            <VerticalBarSeries data={exYu(countryData, exYuCountries, 'country', 'deaths')} />
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
            <VerticalBarSeries data={exYu(countryData, exYuCountries, 'country', 'casesPerOneMillion')} />
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
            <VerticalBarSeries data={exYu(countryData, exYuCountries, 'country', 'deathsPerOneMillion')} />
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
            <VerticalBarSeries data={exYu(countryData, exYuCountries, 'country', 'testsPerOneMillion')} />
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
