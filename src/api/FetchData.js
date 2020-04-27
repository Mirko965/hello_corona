import axios from 'axios'

export const getAllCountries = async () => {
  const getAllCountryData = await axios.get('https://corona.lmao.ninja/v2/countries')
  const data = getAllCountryData.data
    .map(data => {
      /* console.log(data.countryInfo) */
      const { country, deaths, casesPerOneMillion, deathsPerOneMillion, testsPerOneMillion } = data
      const countryDeaths = { x: country, y: deaths }
      const countryCasesPerOneMillion = { x: country, y: casesPerOneMillion }
      const countryDeathsPerOneMillion = { x: country, y: deathsPerOneMillion }
      const countryTestsPerOneMillion = { x: country, y: testsPerOneMillion }
      return { country, countryDeaths, countryCasesPerOneMillion, countryDeathsPerOneMillion, countryTestsPerOneMillion }
    })

  const countriesNames = data.map(data => data.country)
  const serbia = getAllCountryData.data
    .filter(name => name.country === 'Serbia')
  const croatia = getAllCountryData.data
    .filter(name => name.country === 'Croatia')
  const bosnia = getAllCountryData.data
    .filter(name => name.country === 'Bosnia')
  const slovenia = getAllCountryData.data
    .filter(name => name.country === 'Slovenia')
  const makedonija = getAllCountryData.data
    .filter(name => name.country === 'Macedonia')
  const crnaGora = getAllCountryData.data
    .filter(name => name.country === 'Montenegro')
  const exYu = [serbia, croatia, bosnia, slovenia, makedonija, crnaGora].flat(1)

  const exYuDeaths = exYu
    .map(data => {
      return { x: data.country, y: data.deaths }
    })
    .sort((a, b) => b.y - a.y)
  const exYuCasesPerOneMillion = exYu
    .map(data => {
      return { x: data.country, y: data.casesPerOneMillion }
    })
    .sort((a, b) => b.y - a.y)

  const exYuDeathsPerOneMillion = exYu
    .map(data => {
      return { x: data.country, y: data.deathsPerOneMillion }
    })
    .sort((a, b) => b.y - a.y)

  const exYuTestsPerOneMillion = exYu
    .map(data => {
      return { x: data.country, y: data.testsPerOneMillion }
    })
    .sort((a, b) => b.y - a.y)

  const countriesDeaths = data
    .map(data => data.countryDeaths)
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
  const countryCasesPerOneMillion = data
    .map(data => data.countryCasesPerOneMillion)
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
  const countryDeathsPerOneMillion = data
    .map(data => data.countryDeathsPerOneMillion)
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
  const countryTestsPerOneMillion = data
    .map(data => data.countryTestsPerOneMillion)
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
  return {
    countriesNames,
    countriesDeaths,
    countryCasesPerOneMillion,
    countryDeathsPerOneMillion,
    countryTestsPerOneMillion,
    exYuDeaths,
    exYuCasesPerOneMillion,
    exYuDeathsPerOneMillion,
    exYuTestsPerOneMillion
  }
}


export const getAll = async () => {
  const getCountry = await axios.get('https://corona.lmao.ninja/v2/all')
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
export const getHistoricalAll = async () => {
  const getHistoricalByCountry = await axios.get('https://corona.lmao.ninja/v2/historical/all?lastdays=30')
  try {
    return getHistoricalByCountry.data
  } catch (e) {
    console.log(e)
  }
}
export const getAllByCountry = async (values) => {
  const getCountry = await axios.get(`https://corona.lmao.ninja/v2/countries/${values.country}`)
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
export const getHistoricalByCountry = async (values) => {
  const getCountry = await axios.get(`https://corona.lmao.ninja/v2/historical/${values.country}`)
  try {
    return getCountry.data.timeline
  } catch (e) {
    console.log(e)
  }
}
export const getGeoLocation = async () => {
  const getCountry = await axios.get('https://corona.lmao.ninja/v2/countries')
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
