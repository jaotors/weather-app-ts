import Feels from './icons/feels'
import Humidity from './icons/humidity'
import Pop from './icons/pop'
import Pressure from './icons/pressure'
import Sunrise from './icons/sunrise'
import Sunset from './icons/sunset'
import Visibility from './icons/visibility'
import Wind from './icons/wind'

type Props = {
  icon:
    | 'feels'
    | 'humidity'
    | 'pop'
    | 'pressure'
    | 'sunrise'
    | 'sunset'
    | 'visibility'
    | 'wind'
  title: string
  info: string | JSX.Element
  description: string
}

const icons = {
  feels: Feels,
  humidity: Humidity,
  pop: Pop,
  pressure: Pressure,
  sunrise: Sunrise,
  sunset: Sunset,
  visibility: Visibility,
  wind: Wind,
}

export default function Tile({
  icon,
  title,
  info,
  description,
}: Props): JSX.Element {
  const Icon = icons[icon]

  return (
    <article className='w-[140px] h-[130px] bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between'>
      <div className='flex items-center text-sm font-bold'>
        <Icon /> <h4 className='ml-1 '>{title}</h4>
      </div>
      <h3 className='mt-2 text-lg'>{info}</h3>
      <p className='text-xs font-bold'>{description}</p>
    </article>
  )
}
