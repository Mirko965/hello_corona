import axios from 'axios'

export const getAllWorldData = async () => {
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
export const getHistoricalByCountryAll = async () => {
  const getCountry = await axios.get('https://corona.lmao.ninja/v2/historical')
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
export const getCountryData = async () => {
  const getCountry = await axios.get('https://corona.lmao.ninja/v2/countries')
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
