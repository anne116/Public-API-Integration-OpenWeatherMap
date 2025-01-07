import { useState } from 'react';
import { fetchWeatherForCity } from '../utils/singleCityApi';
import { fetchWeatherForBatch } from '../utils/batchCityApi';
import { getErrorMessage } from '../utils/errorHandler';
import { City } from '../utils/cityBatchHelper';
import fetchCityBatch from '../utils/cityBatchHelper';

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

const useWeatherData = (pageSize: number) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [cityBatch, setCityBatch] = useState<City[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

    const fetchWeatherByCity = async (city: string) => {
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

    const fetchWeatherBatch = async (page:number) => {
        const startIndex = (page - 1) * pageSize;
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

    return {
        weather,
        error,
        loading,
        cityBatch,
        weatherData,
        setError,
        setWeather,
        fetchWeatherByCity,
        fetchWeatherBatch,
    };
};

export default useWeatherData;
