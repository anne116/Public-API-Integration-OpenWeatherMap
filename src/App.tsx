import { useState, useEffect } from 'react'
import './App.css'
import api from './api';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import fetchCityBatch from './utils/fetchCityBatch';
import FilterBar from './components/FilterBar';
import { Box, Container, Typography, Button, Grid2 as Grid } from '@mui/material';

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
  const pageSize = 12;

  const [filters, setFilters] = useState({
    tempRange: [-20, 50],
    humidityRange: [0,100],
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
  const handleFilterChange = (name: string, value: number[]) => {
    setFilters((prev) => ({...prev, [name]: value }));
  };

  //apply filters
  const applyFilters = () => {
    if (filters.tempRange[0] > filters.tempRange[1] || filters.humidityRange[0] > filters.humidityRange[1]) {
      return [];
    }
    return weatherData.filter((weather) => {
      const temp = weather.main.temp;
      const humidity = weather.main.humidity;
      const isTempValid = temp >= filters.tempRange[0] && temp <= filters.tempRange[1];
      const isHumidityValid = humidity >= filters.humidityRange[0] && humidity <= filters.humidityRange[1];
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
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" component="h1">Weather App</Typography>
      </Box>
      <SearchBar onSearch={fetchWeather} />

      {!weather && (
        <>
          <Box sx={{ marginBottom: 4 }}>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </Box>
        </>
      )} 

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {weather ? (
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>Search Result</Typography>
          <WeatherDisplay weather={weather} />
        </Box>
      ) : (
        filteredWeatherData.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Weather Data</Typography>
            <Grid container spacing={2} justifyContent="center">
              {filteredWeatherData.map((weather) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={weather.id}>
                  <WeatherDisplay weather={weather} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
              {currentPage > 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  sx={{ marginRight: 2 }}
                  disable={loading}
                >
                  Previous
                </Button>
              )}
              {cityBatch.length === pageSize && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disable={loading}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        )
      )}
    </Container>
  );
};

export default App;
