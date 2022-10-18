import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App(){

  const[CurrentWeather, setCurrentWeather] = useState(null);
  const[forecast, setForecast] = useState(null);

  
  const handleOnSearchChange=(searchData)=>{
    const [lat, lon] = searchData.value.split(" ");
    const CurrentWeather = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

    Promise.all([CurrentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city:searchData.label, ...weatherResponse});
      setForecast({city:searchData.label, ...forecastResponse});
  
    })
    .catch((err) => console.log(err));
  }

  console.log(CurrentWeather);
  console.log(forecast);


  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/> 
    </div>
  );
}

export default App;