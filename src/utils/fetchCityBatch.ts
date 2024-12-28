import UpdatedWorldCities from '../data/UpdatedWorldCities(withCityId).json';

interface City {
  IDs: string;
  cityId: number;
  city: string;
  country: string;
  lat: string;
  lng: string;
}

const fetchCityBatch = (startIndex: number, pageSize: number): City[] => {
  const cities: City[] = UpdatedWorldCities;
  return cities.slice(startIndex, startIndex + pageSize);
};

export default fetchCityBatch;
