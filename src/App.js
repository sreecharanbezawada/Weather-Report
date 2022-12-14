import './App.css';
import PresentWeather from './components/search/present-weather/present-weather';
import Search from './components/search/search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/search/forecast/forecast';

function App() {
  const [presentWeather, setPresentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const presentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([presentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(err => console.log(err));
  }

  console.log(presentWeather, forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {presentWeather && <PresentWeather data={currentWeather} />} {/*shows up if data exists*/}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;