import { WeatherData } from '../App';

interface WeatherDisplayProps {
    weather: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
    return (
      <div>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>{weather.main.temp_min}°C (Min) - {weather.main.temp_max}°C (Max)</p>
        <p>Description: {weather.weather[0].description}</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Humidity: {weather.main.humidity} %</p>
      </div>
    )
}

export default WeatherDisplay;
