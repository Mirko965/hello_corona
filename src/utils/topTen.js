import isEmpty from '../form_module/component/isEmpty';

export const topTen = (countryData, x, y) => {
  return countryData.map(countries => {
    return { x: countries[x], y: countries[y] }
  })
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
}

export const dataGraph = (data, country, subData) => {
  const countries = data.filter((item) => item.country === country)[0]
  if (!isEmpty(countries)) {
    return Object.entries(countries.timeline[subData]).map(([key, value]) => {
      return { x: key, y: value }
    })
  }
}

/* export const dataGraph = (data, subData) => {
  return data.map((item) => {
    console.log(item.timeline)
  })
} */

export const exYu = (data, countries, x, y) => {
  const countriesData = countries.map(name => {
    return data.filter((country) => {
      return country.country === name
    })
  }).flat(1)
  return topTen(countriesData, x, y)
}
