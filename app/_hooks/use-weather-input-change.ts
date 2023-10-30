import { useState, useEffect, ChangeEvent } from 'react'
import { useDebounce } from 'usehooks-ts'

import type { GeoLocationOptionType } from '../_types'
import getGeoLocation from '../_api/getGeoLocation'

const useWeatherInputChange = () => {
  const [keyword, setKeyword] = useState<string>('')
  const debounceValue = useDebounce<string>(keyword, 500)
  const [options, setOptions] = useState<[]>([])
  const [selectedOption, setSlectedOption] =
    useState<GeoLocationOptionType | null>(null)

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value

    if (value === '') return
    setKeyword(value)
  }

  const handleOptionSelect = (option: GeoLocationOptionType) => {
    setKeyword(option.name)
    setSlectedOption(option)
    setOptions([])
  }

  useEffect(() => {
    if (debounceValue !== '') {
      getGeoLocation(debounceValue).then((data) => setOptions(data))
    }
  }, [debounceValue])

  return {
    keyword,
    options,
    selectedOption,
    onInputChange: handleInputChange,
    onOptionSelect: handleOptionSelect,
  }
}

export default useWeatherInputChange
