import { useState, useEffect } from 'react'
import './App.css'
import api from './api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import fetchCityBatch from './utils/fetchCityBatch';
import FilterBar from './components/FilterBar';

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

  const [cityBatch, setCityBatch] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    minTemp: '',
    maxTemp: '',
    minHumidity: '',
    maxHumidity: '',
  });

  const fetchBatchAndWeather = async (page: number) => {
    const startIndex = (page - 1) * pageSize;

    setLoading(true);
    setError(null);

    try{
      // Fetch the current batch of cities
      const batch = fetchCityBatch(startIndex, pageSize);
      setCityBatch(batch);

      // Fetch weather data for the batch
      const cityIds = batch.map(city => city.cityId).join(',');
      console.log(`Fetching weather data for city IDs: ${cityIds}`);
      const response = await api.get('group', {params: {id: cityIds } });

      setWeatherData(response.data.list);
    } catch (error) {
      console.log('Error fetching weather data: ', error);
      setError('Failed to fetch city or weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchAndWeather(1);
  }, []);

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

  // filter change handler
  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({...prev, [name]: value }));
  };

  //apply filters
  const applyFilters = () => {
    return weatherData.filter((weather) => {
      const temp = weather.main.temp;
      const humidity = weather.main.humidity;

      const isTempValid = 
        (!filters.minTemp || temp >= parseFloat(filters.minTemp)) &&
        (!filters.maxTemp || temp <= parseFloat(filters.maxTemp));

      const isHumidityValid = 
        (!filters.minHumidity || humidity >= parseFloat(filters.minHumidity)) &&
        (!filters.maxHumidity || humidity <= parseFloat(filters.maxHumidity));

      return isTempValid && isHumidityValid
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchBatchAndWeather(newPage);
  };

  // filtered weather data
  const filteredWeatherData = applyFilters();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && !weatherData.length && <WeatherDisplay weather={weather} />}
      {filteredWeatherData.length > 0 && 
        filteredWeatherData.map(weather => <WeatherDisplay key={weather.id} weather={weather} />)}
      <div>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {cityBatch.length === pageSize && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default App;
