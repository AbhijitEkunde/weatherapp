/** @format */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temp, setTemp] = useState(0);
  const [cityname, setCityName] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e3a8e98b53acba8d539f496185fa6e0f&units=metric`
      );
      setTemp(res.data.main.temp);
      setCityName(res.data.name);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);
  return (
    <div className='app'>
      <div className='app_container'>
        <h1>{cityname}</h1>
        <h2>{temp}oC</h2>
        <h3>{weather}</h3>
      </div>
    </div>
  );
}

export default App;

// e3a8e98b53acba8d539f496185fa6e0f
