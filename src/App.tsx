import React, { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';
import { CurrentWeather, WeatherForecast } from './types/weather';
import { WeatherService } from './services/weatherService';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { getWeatherBackground } from './utils/weatherUtils';

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const weatherService = WeatherService.getInstance();

  const fetchWeatherData = async (lat: number, lon: number, locationName?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon),
        weatherService.getForecast(lat, lon)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCurrentLocation(locationName || `${weatherData.name}, ${weatherData.sys.country}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    fetchWeatherData(lat, lon, name);
  };

  const handleCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await weatherService.getUserLocation();
      await fetchWeatherData(location.lat, location.lon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get current location');
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (currentWeather) {
      fetchWeatherData(currentWeather.coord.lat, currentWeather.coord.lon, currentLocation);
    }
  };

  useEffect(() => {
    // Initialize with user's current location
    handleCurrentLocation();
  }, []);

  // Get background based on current weather
  const backgroundClass = currentWeather 
    ? getWeatherBackground(currentWeather.weather[0].icon)
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';

  const isNightTime = () => {
    if (!currentWeather) return false;
    const currentTime = Date.now() / 1000;
    return currentTime < currentWeather.sys.sunrise || currentTime > currentWeather.sys.sunset;
  };

  if (error && !currentWeather) {
    return (
      <div className={`min-h-screen ${backgroundClass} p-4 flex items-center justify-center`}>
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Weather App</h1>
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onCurrentLocation={handleCurrentLocation}
              isLoading={loading}
            />
          </div>
          <ErrorMessage message={error} onRetry={handleCurrentLocation} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 ease-in-out`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 lg:mb-0">Weather App</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              onCurrentLocation={handleCurrentLocation}
              isLoading={loading}
            />
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-200 disabled:opacity-50"
                title="Refresh weather data"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-2">
                <span className={`text-sm font-medium ${unit === 'C' ? 'text-white' : 'text-white/60'}`}>°C</span>
                <button
                  onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {unit === 'C' ? <ToggleLeft className="w-6 h-6" /> : <ToggleRight className="w-6 h-6" />}
                </button>
                <span className={`text-sm font-medium ${unit === 'F' ? 'text-white' : 'text-white/60'}`}>°F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <ErrorMessage message={error} onRetry={handleRefresh} />
          </div>
        ) : currentWeather && forecast ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeatherCard weather={currentWeather} unit={unit} />
            </div>
            <div className="lg:col-span-1">
              <ForecastCard forecast={forecast.list} unit={unit} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;