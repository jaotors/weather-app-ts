'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

import type { GeoLocationOptionType } from '../_types'

const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct'

const WeatherForm = (): JSX.Element => {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [selectedOption, setSlectedOption] =
    useState<GeoLocationOptionType | null>(null)

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim()
    setKeyword(value)

    const query = `q=${value.trim()}&limit=5&appid=${
      process.env.NEXT_PUBLIC_WEATHER_API_KEY
    }`
    const fetchUrl = `${GEO_API_URL}?${query}`

    if (value === '') return

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => setOptions(data))
  }

  const handleOptionSelect = (option: GeoLocationOptionType) => {
    setKeyword(option.name)
    setSlectedOption(option)
    setOptions([])
  }


  const handleSearch = () => {
    if (selectedOption === null) return

    const { lat, lon, name } = selectedOption

    router.push(`/weather/${name}/${lat}/${lon}`)
  }

  return (
    <section className='w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded'>
      <h1 className='text-4xl font-thin'>
        Weather <span className='font-black'>Forecast</span>
      </h1>
      <p className='text-sm mt-2'>
        Enter below a place you want to know the weather of and select an option
        from the dropdown
      </p>

      <div className='flex mt-10 md:mt-4 relative'>
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          className='px-2 py-1 rounded-l-md border-2 border-white text-zinc-500'
        />
        <ul className='absolute top-9 bg-white ml-1 rounded-b-md text-zinc-500'>
          {options.map((option: GeoLocationOptionType, index: number) => (
            <li key={`${option.name} - ${index}`}>
              <button
                onClick={() => handleOptionSelect(option)}
                className='text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1'
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSearch}
          className='rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1'
        >
          search
        </button>
      </div>
    </section>
  )
}

export default WeatherForm
