import WeatherForm from './_components/weather-form'

export default function Home(): JSX.Element {
  return (
    <main className='flex justify-center items-center h-[100vh] w-full'>
      <WeatherForm />
    </main>
  )
}
