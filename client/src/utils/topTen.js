import isEmpty from '../form_module/component/isEmpty';

export const topTen = (countryData, x, y) => {
  return countryData.map(countries => {
    return { country: countries[x], [y]: countries[y] }
  })
    .sort((a, b) => b[y] - a[y])
    .slice(0, 10)
}

export const dataGraph = (data, count) => {
  const countries = data.filter((item) => item.country === count)[0]
  if (!isEmpty(countries)) {
    const { cases, deaths, recovered } = countries.timeline
    const casesArr = Object.entries(cases).map(([key,value]) => {
      return { date: key, cases: value }
  })
  const deathsArr = Object.entries(deaths).map(([key,value]) => {
    return { date: key, deaths: value }
  })
  const recoveredArr = Object.entries(recovered).map(([key,value]) => {
    return { date: key, recovered: value }
  })
    casesArr.map(item =>
      deathsArr.map(item2 =>
        recoveredArr.map(item3 => {
          if (item.date === item2.date && item.date === item3.date){
            return Object.assign(item,item2,item3)
          }
          return null
        })
      )
    )
    return [...casesArr]
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
