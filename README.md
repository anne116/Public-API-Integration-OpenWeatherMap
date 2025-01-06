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

## Code Architecture

1. Component-Based Architecture

- `App.tsx`: Acts as the central hub managing state and rendering child components.
- Reusable Components:
  - `SearchBar`: Handles user input for searching city weather.
  - `FilterBar`: Allows users to filter weather data by temperature and humidity.
  - `WeatherDisplay`: Dynamically displays weather details, either for a single city or a batch.
- Component Styling: MUI's pre-built and customizable components were used for styling, ensuring a clean and cohesive design system.
- Responsive Design: MUI's grid system and responsive utilities were used to create layouts that work seamlessly across devices.

2. **Utilities**

   - `cityBatchHelper.ts`: Fetches a batch of cities from the local dataset (`UpdatedWorldCities(withCityId).json`) for pagination. It uses `startIndex` and `pageSize` to determine the slice of cities to return, enabling efficient navigation through the dataset.
   - `singleCityApi.ts`: Manages API calls for fetching weather data for a single city, centralizing and encapsulating logic for individual city requests.
   - `batchCityApi.ts`: Handles API calls for fetching weather data for multiple cities in batches, ensuring reusable logic for bulk data requests.
   - `api.ts`: Configures the Axios instance with base URL and default parameters (e.g., appid, units). Provides a centralized configuration for all HTTP requests, making the API calls consistent and maintainable.

3. State Management

- `useState` hooks for managing individual states such as weather data, loading indicators, filters, and errors.
- `useEffect` to trigger data fetching when the application loads or when a user interacts (e.g., page navigation).

4. Data Handling

- Local Data: A JSON dataset (`UpdatedWorldCities(withCityId).json`) is used for batching and providing city metadata.
- API Integration: Fetches real-time weather data for selected cities via OpenWeatherMap's RESTful API.


## Key Decisions Made During Development

| **Decision**               | **Reason**                                                                                          | **Implementation**                                                                                                                                               |
|----------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Pagination and Batching** | To avoid API rate limits and improve performance.                                                 | Used the `fetchCityBatch` utility to fetch a batch of cities based on the current page and `pageSize`. API calls use batch city IDs.                              |
| **Error Handling**          | To provide meaningful feedback to users and handle edge cases.                                    | Centralized error management using `setError` state. Specific API error codes (e.g., `404`, `429`) are handled with tailored messages.                           |
| **Modular Design**          | To improve scalability, maintainability, and code reuse.                                           | Components (`SearchBar`, `FilterBar`, `WeatherDisplay`) encapsulate logic and styles independently.                                                              |
| **Responsive Design**       | To provide a seamless user experience across all device types.                                    | Leveraged Material-UI (MUI) for responsive, modern components and layouts.                                                                                   |
| **API Integration**         | To retrieve real-time weather data efficiently.                                                   | Integrated OpenWeatherMap API for real-time data. Local JSON dataset (`UpdatedWorldCities(withCityId).json`) supports efficient batching.                         |


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
