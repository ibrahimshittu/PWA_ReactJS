import { useState } from 'react';
import './App.css';
import fetchWeather from './api/fetchWeather';

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === 'Enter') {
      await fetchWeather(query).then(setWeather);
      setQuery('');
    }
  };

  return (
    <div className='main-container'>
      <input type="text" className='search' placeholder="SEARCH.."  value={query} 
        onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>

        { weather.main && (
          <div className="city">
              <h2 className="city-name">
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
              </h2>
              <div className="city-temp">
                  {Math.round(weather.main.temp)}
                  <sup>&deg;C</sup>
              </div>
              <div className="info">
                  <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                  <p>{weather.weather[0].description}</p>
              </div>
          </div> )
        }
    </div>
  );
}

export default App;
