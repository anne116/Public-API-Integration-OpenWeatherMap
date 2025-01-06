import api from './api';

export const fetchWeatherForBatch = async (cityIds: string) => {
    const response = await api.get('group', { params: { id: cityIds } });
    return response.data.list;
};