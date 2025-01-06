import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import fetchCityBatch from './utils/cityBatchHelper';
import FilterBar from './components/FilterBar';
import { City } from './utils/cityBatchHelper';
import { fetchWeatherForCity } from './utils/singleCityApi';
import { fetchWeatherForBatch } from './utils/batchCityApi';
import { getErrorMessage } from './utils/errorHandler';
import { applyFilters } from './utils/filterUtils';
import { getPaginationIndexes } from './utils/paginationHelper';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid2 as Grid,
  Tabs,
  Tab,
  ButtonBase,
} from '@mui/material';

export interface WeatherData {
  name: string;
  cityId: number;
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
  const [cityBatch, setCityBatch] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;
  const [filters, setFilters] = useState({
    tempRange: [-20, 50],
    humidityRange: [0, 100],
  });
  const [tabIndex, setTabIndex] = useState<number>(0);

  const resetAppState = () => {
    setWeather(null);
    setError(null);
    setFilters({ tempRange: [-20, 50], humidityRange: [0, 100] });
    setCurrentPage(1);
    fetchBatchAndWeather(1);
  };

  const fetchBatchAndWeather = async (page: number) => {
    const { startIndex } = getPaginationIndexes(page, pageSize)
    setLoading(true);
    setError(null);
    try {
      const batch = fetchCityBatch(startIndex, pageSize);
      setCityBatch(batch);
      const cityIds = batch.map((city) => city.cityId).join(',');
      const data = await fetchWeatherForBatch(cityIds);
      setWeatherData(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
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
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherForCity(city);
      setWeather(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name: string, value: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchBatchAndWeather(newPage);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setWeather(null);
  };

  const filteredWeatherData = applyFilters(weatherData, filters);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <ButtonBase onClick={resetAppState}>
          <Typography variant="h4" component="h1" sx={{ cursor: 'pointer' }}>
            🛰️WeatherWiz
          </Typography>
        </ButtonBase>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Search by City" />
        <Tab label="Filter Weather Data" />
      </Tabs>

      {tabIndex === 0 && (
        <Box sx={{ marginTop: 4 }}>
          <SearchBar onSearch={fetchWeather} />
        </Box>
      )}

      {tabIndex === 1 && (
        <Box sx={{ marginTop: 4 }}>
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </Box>
      )}

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {weather ? (
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Search Result
          </Typography>
          <WeatherDisplay weather={weather} />
        </Box>
      ) : (
        filteredWeatherData.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Results:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {filteredWeatherData.map((weather) => (
                <Grid key={weather.cityId}>
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
                  disabled={loading}
                >
                  Previous
                </Button>
              )}
              {cityBatch.length === pageSize && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={loading}
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
