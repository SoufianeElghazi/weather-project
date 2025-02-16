import axios from 'axios';
import { WeatherData, HistoricalData } from '../types/weather';

const API_KEY = 'YOUR API KEY'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/3.0';

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: response.data.main.pressure,
      uvIndex: 0, // UV index requires a separate API call
      precipitation: response.data.rain ? response.data.rain['1h'] || 0 : 0,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchHistoricalWeather = async (city: string, days: number): Promise<HistoricalData[]> => {
  try {
    // Get city coordinates first
    const cityResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY
      }
    });

    const { lat, lon } = cityResponse.data.coord;

    // Fetch 5 day / 3 hour forecast data (free tier limitation)
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return response.data.list.slice(0, days * 8).map((item: any) => ({
      timestamp: item.dt,
      temperature: Math.round(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6),
      pressure: item.main.pressure
    }));
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};