const getMarkers = (countryData) => {
  return countryData.map(item => {
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
    return null
  })
}

export default getMarkers
