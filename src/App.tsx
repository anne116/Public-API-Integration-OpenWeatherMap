import { useState } from 'react'
import './App.css'
import api from './api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

export interface WeatherData {
  name: string;
  main: { 
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: { 
    description: string;
    icon: string;
  }[];
  wind: { 
    speed: number;
  };
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name. City name cannot be empty.');
      setWeather(null);
      return ;
    }

    setLoading(true); 
    setError(null); 

    try {
      const response = await api.get('weather', {
        params: {
          q:city
        },
      });
      setWeather(response.data);
    } catch (err: any) {
      console.error('API Error: ', err);
      if (err.response?.status === 404 ) {
        setError(`City "${city}" not found. Please try another city in English.`);
      } else if (err.response?.status === 429 ) {
        setError('API quota exceeded. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );

};

export default App;
