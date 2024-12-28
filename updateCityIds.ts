import * as fs from 'fs';
import * as Papa from 'papaparse';

// Load city list JSON
const cityList = JSON.parse(
  fs.readFileSync('./raw_data/city.list.json', 'utf8')
);

// Load your CSV file
const csvFile = fs.readFileSync('./raw_data/WorldCities.csv', 'utf8');
const csvData = Papa.parse(csvFile, { header: true }).data;

// Match and add city IDs
const updatedData = csvData.map((row: any) => {
  const match = cityList.find(
    (city: any) =>
      city.name.toLowerCase() === row.city.toLowerCase() &&
      city.country === row.iso2.toUpperCase()
  );

  if (match) {
    return { ...row, cityId: match.id };
  } else {
    return { ...row, cityId: 'NOT_FOUND' }; // Mark as unmatched
  }
});

// Write the updated CSV
fs.writeFileSync(
  './src/data/UpdatedWorldCities(withCityId).json',
  JSON.stringify(updatedData, null, 2)
);

console.log('Updated CSV written to UpdatedWorldCities.csv');
