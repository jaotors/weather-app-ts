import type { ForecastType } from '../_types'

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast'

const getForecast = async (lat: string, lon: string): Promise<ForecastType> => {
  const query = `lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  const fetchUrl = `${WEATHER_API_URL}?${query}`

  const forecastData: ForecastType = await fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => {
      return {
        ...data.city,
        list: data.list.slice(0, 16),
      }
    })

  return forecastData
}

export default getForecast
