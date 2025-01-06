import api from './api';

export const fetchWeatherForCity = async (city: string) => {
    const response = await api.get('weather', {
        params: {
            q: city,
        },
    });
    return response.data
}