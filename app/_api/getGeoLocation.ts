const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct'

const getGeoLocation = (value: string): Promise<[]> => {
  const query = `q=${value}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  const fetchUrl = `${GEO_API_URL}?${query}`

  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err))
}

export default getGeoLocation
