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
export const getCountryData = async () => {
  const getCountry = await axios.get('https://corona.lmao.ninja/v2/countries')
  try {
    return getCountry.data
  } catch (e) {
    console.log(e)
  }
}
