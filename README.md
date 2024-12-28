# WeatherWiz 🌤️

**WeatherWiz** is a full-stack weather application that allows users to:

- Search for real-time weather data by city.
- Filter weather data by temperature and humidity ranges.
- View detailed weather metrics, including temperature, humidity, wind speed, and weather conditions.
- Navigate through batches of weather data for multiple cities using pagination.

## Features

- 🔍 **Search by City**: Find real-time weather details for any city.
- 🌡️ **Filter Weather Data**: Apply temperature and humidity filters to explore weather patterns across cities.
- 📄 **Pagination**: Easily browse through weather data for multiple cities in batches of 8 at a time.
- ⚡ **Fast and Responsive**: Built with Vite, React, and Material UI for a seamless user experience.

## Tech Stack

- **Frontend**: React, TypeScript, Material UI.
- **Backend**: OpenWeatherMap API integration.
- **Build Tool**: Vite for fast development and build processes.
- **Testing**: Jest for unit testing and edge case validation.
- **Deployment**: Deployed on [Vercel](https://vercel.com/).

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Installation

1. Clone the repository:
   `git clone https://github.com/anne116/Public-API-Integration-OpenWeatherMap.git`

`cd Public-API-Integration-OpenWeatherMap`

2. Install dependencies:
   `npm install`

3. Add your OpenWeatherMap API key to an `.env` file:
   `VITE_OPENWEATHER_API_KEY=your_api_key`

4. Running the Application

- Development mode:
  `npm run dev`
- Run tests:
  `npm test`

5. Deployment
   Deployed via Vercel. Visit the live application [here](https://public-api-integration-open-weather-map.vercel.app).

### How It Works

1. Search by City:

- Enter a city name to fetch real-time weather details.

2. Filter Weather Data:

- Use sliders to filter cities based on temperature and humidity ranges.

3. Pagination:

- Weather data is displayed in batches of 8 cities. Use "Previous" and "Next" buttons to navigate through pages seamlessly.

### Testing

- Framework: Jest
- Coverage: Unit tests and edge case validation to ensure application functionality and robustness.
- Examples:
  - Validating user interactions such as search with city name, or with filter adjustments.
  - Handling edge cases like invalid city names, empty input, or input with redundant spaces.

### Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

### License

This project is open-source and available under the MIT License.
