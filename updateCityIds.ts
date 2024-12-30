import * as fs from 'fs';
import * as Papa from 'papaparse';

interface RawCity {
  id: number;
  name: string;
  country: string;
}

interface CsvRow {
  city: string;
  iso2: string;
}

const cityList: RawCity[] = JSON.parse(
  fs.readFileSync('./raw_data/city.list.json', 'utf8')
);

const csvFile = fs.readFileSync('./raw_data/WorldCities.csv', 'utf8');
const csvData = Papa.parse(csvFile, { header: true }).data as CsvRow[];

const updatedData = csvData.map((row) => {
  const match = cityList.find(
    (city) =>
      city.name.toLowerCase() === row.city.toLowerCase() &&
      city.country === row.iso2.toUpperCase()
  );

  if (match) {
    return { ...row, cityId: match.id };
  } else {
    return { ...row, cityId: 'NOT_FOUND' };
  }
});

fs.writeFileSync(
  './src/data/UpdatedWorldCities(withCityId).json',
  JSON.stringify(updatedData, null, 2)
);

console.log('Updated CSV written to UpdatedWorldCities.csv');
