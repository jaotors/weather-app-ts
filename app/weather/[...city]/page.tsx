const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

export default async function Weather({
  params,
}: {
  params: { city: string[] }
}) {
  const [city, lat, lon] = params.city
  const query = `lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  const fetchUrl = `${WEATHER_API_URL}?${query}`

  const forecastData = await fetch(fetchUrl)
    .then((response) => response.json())
    .then((data) => data)

  return (
    <main className='flex justify-center items-center h-[100vh] w-full'>
      <h1>{city}</h1>
      <p>
        {lat} {lon}
      </p>
    </main>
  )
}
