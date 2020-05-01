import React, { useCallback, useEffect } from 'react';
import axios from 'axios';

const GetHistoricalByCountry = () => {
  const getCountriesName = useCallback(async () => {
    const getCountry = await axios.get('https://corona.lmao.ninja/v2/historical/Serbia')
    return getCountry.data.timeline
  }, [])

  useEffect(() => {
    console.log('hello useEffect')
    getCountriesName()
  }, [getCountriesName])

  return (
    <div>
      <h2>Hello</h2>
    </div>
  )
}

export default GetHistoricalByCountry
