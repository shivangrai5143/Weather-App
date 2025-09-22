const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

import { CurrentWeather, WeatherForecast, LocationSuggestion } from '../types/weather';

export class WeatherService {
  private static instance: WeatherService;
  private apiKey: string;

  private constructor() {
    this.apiKey = API_KEY;
  }

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  private checkApiKey(): void {
    if (!this.apiKey) {
      throw new Error('OpenWeatherMap API key is required. Please add VITE_OPENWEATHER_API_KEY to your environment variables.');
    }
    if (this.apiKey === 'demo_key') {
      throw new Error('Please replace "your_api_key_here" in the .env file with your actual OpenWeatherMap API key. Get one free at https://openweathermap.org/api');
    }
  }

  async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
    this.checkApiKey();
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather data fetch failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getCurrentWeatherByCity(city: string): Promise<CurrentWeather> {
    this.checkApiKey();
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather data fetch failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async getForecast(lat: number, lon: number): Promise<WeatherForecast> {
    this.checkApiKey();
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast data fetch failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  async searchLocations(query: string): Promise<LocationSuggestion[]> {
    if (query.length < 2) return [];
    
    this.checkApiKey();
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Location search failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  getUserLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    });
  }
}