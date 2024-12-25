
# Weather Dashboard

## Overview
The Weather Dashboard is a web application that provides real-time weather information. It is built using Node.js, Express, MongoDB, and various weather APIs. Users can search for weather information by city or location and view a 7-day weather forecast, sunrise & sunset times, humidity, pressure, and visibility details.

## Features
- **Real-Time Weather Information**: Displays current weather data fetched from an external API.
- **City and Location Search**: Users can search for weather information by entering a city name or using their current location.
- **7-Day Forecast**: Shows a detailed weather forecast for the next 7 days.
- **Additional Weather Details**: Provides information on sunrise & sunset times, humidity, pressure, and visibility.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user-related data.
- **Weather API**: Fetches real-time weather data.
- **HTML/CSS**: Frontend for the user interface.

## Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/weather-dashboard.git
    cd weather-dashboard
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your API key:
    ```plaintext
    API_KEY=your_openweathermap_api_key
    MONGODB_URI=your_mongodb_uri
    ```

4. **Run the Application**
    ```bash
    npm start
    ```

5. **Access the Application**
    Open your browser and navigate to `http://localhost:3000`

## Usage

### Searching for Weather by City
1. Open the application.
2. Enter the city name in the search bar and press enter.
3. View the current weather information and 7-day forecast for the specified city.

### Getting Weather Information by Location
1. Click on the "Get Weather by Location" button.
2. Allow the browser to access your location.
3. View the current weather information and 7-day forecast for your current locatio
