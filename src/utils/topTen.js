import isEmpty from '../form_module/component/isEmpty';

export const topTen = (countryData, x, y) => {
  return countryData.map(countries => {
    return { x: countries[x], y: countries[y] }
  })
    .sort((a, b) => b.y - a.y)
    .slice(0, 10)
}

export const dataGraph = (data, subData) => {
  if (!isEmpty(data)) {
    return Object.entries(data[subData]).map(([key, value]) => {
      return { x: key, y: value }
    })
  }
}

export const exYu = (data, countries, x, y) => {
  const countriesData = countries.map(name => {
    return data.filter((country) => {
      return country.country === name
    })
  }).flat(1)
  return topTen(countriesData, x, y)
}
