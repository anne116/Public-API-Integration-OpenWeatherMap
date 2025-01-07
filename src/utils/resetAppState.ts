export const resetAppState = (
    setWeather: Function,
    setError: Function,
    setFilters: Function,
    setCurrentPage: Function,
    fetchWeatherBatch: Function
) => {
    setWeather(null);
    setError(null);
    setFilters({ tempRange: [-20, 50], humidityRange: [0, 100] });
    setCurrentPage(1);
    fetchWeatherBatch(1);
}