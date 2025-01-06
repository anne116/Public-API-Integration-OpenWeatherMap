export const resetAppState = (
    setWeather: Function,
    setError: Function,
    setFilters: Function,
    setCurrentPage: Function,
    fetchBatchAndWeather: Function
) => {
    setWeather(null);
    setError(null);
    setFilters({ tempRange: [-20, 50], humidityRange: [0, 100] });
    setCurrentPage(1);
    fetchBatchAndWeather(1);
}