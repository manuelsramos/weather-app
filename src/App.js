import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherServices';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({ q: 'Buenos Aires' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {

      const message = query.q ? query.q : 'current location.'

      toast.info('Looking weather for ' + message)
      await getFormattedWeatherData({ ...query, units })
        .then(
          (data) => {

            toast.success(`Successfully finded weather for ${data.name}, ${data.country}`)
            setWeather(data)
          });
    };

    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const limitWeather = units === 'metric' ? 20 : 60;
    if (weather.temp <= limitWeather) return 'from-cyan-700 to-blue-700';


    return 'from-yellow-700 to-orange-700';
  }



  return (
    <div className={`mx-auto w-full max-w-screen-md mt-4 py-5 px-32 
    bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeLocation weather={weather} />
          <TemperatureDetails weather={weather} />

          {/*        <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} /> */}
        </div>
      )}


      <ToastContainer autoClose={900} theme='colored' newestOnTop={true} />


    </div>

  );
}

export default App;
