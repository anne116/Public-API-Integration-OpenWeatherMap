import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import FilterBar from './components/FilterBar';
import { applyFilters } from './utils/filterUtils';
import { resetAppState } from './utils/resetAppState';
import useWeatherData from './hooks/useWeatherData';
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

const App: React.FC = () => {
  const pageSize = 8;
  const {
    weather,
    error,
    loading,
    cityBatch,
    weatherData,
    setError,
    setWeather,
    fetchWeatherByCity,
    fetchWeatherBatch,
  } = useWeatherData(pageSize);

  const [filters, setFilters] = useState({
    tempRange: [-20, 50],
    humidityRange: [0, 100],
  });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchWeatherBatch(1);
  }, []);

  const handleFilterChange = (name: string, value: number[]) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchWeatherBatch(newPage);
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
        <ButtonBase onClick={() => resetAppState(setWeather, setError, setFilters, setCurrentPage, fetchWeatherBatch )}>
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
          <SearchBar onSearch={fetchWeatherByCity} />
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
              {filteredWeatherData.map((weather, index) => (
                <Grid key={weather.cityId || `weather-${index}`}>
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
