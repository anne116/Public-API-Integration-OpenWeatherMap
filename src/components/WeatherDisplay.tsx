import { Card, CardContent, Typography } from '@mui/material';
import { WeatherData } from '../App';

const WeatherDisplay = ({ weather }: { weather: WeatherData }) => (
  <Card style={{ margin: '10px' }}>
    <CardContent>
      <Typography variant="h6">{weather.name}</Typography>
      <Typography variant="body1">
        Temperature: {weather.main.temp}°C
      </Typography>
      <Typography variant="body1">
        {weather.main.temp_min}°C (Min) - {weather.main.temp_max}°C (Max)
      </Typography>
      <Typography variant="body1">
        Wind Speed: {weather.wind.speed} m/s
      </Typography>
      <Typography variant="body1">
        Description: {weather.weather[0].description}
      </Typography>
      <Typography variant="body1">
        Humidity: {weather.main.humidity} %
      </Typography>
    </CardContent>
  </Card>
);

export default WeatherDisplay;
