import { WeatherData } from '../App';

export const applyFilters = (
    weatherData: WeatherData[],
    filters: { tempRange: number[], humidityRange: number[] }
): WeatherData[] => {
    const { tempRange, humidityRange } = filters;

    if (tempRange[0] > tempRange[1] || humidityRange[0] > humidityRange[1]) {
        return [];
    }
    return weatherData.filter((weather) => {
        const temp = weather.main.temp;
        const humidity = weather.main.humidity;
        return (
            temp >= tempRange[0] &&
            temp <= tempRange[1] &&
            humidity >= humidityRange[0] &&
            humidity <= humidityRange[1]
        );
    });
};