import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Sunrise, Sunset } from 'lucide-react';
import { CurrentWeather } from '../types/weather';
import { getWeatherIcon, formatTemperature, formatTime, getWindDirection } from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: CurrentWeather;
  unit: 'C' | 'F';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{weather.name}, {weather.sys.country}</h2>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.weather[0].icon, 'lg')}
          <div className="ml-4">
            <div className="text-4xl font-bold text-white">
              {formatTemperature(weather.main.temp, unit)}
            </div>
            <div className="text-lg text-white/80 capitalize">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 text-sm text-white/80">
          <span>Feels like {formatTemperature(weather.main.feels_like, unit)}</span>
          <span>•</span>
          <span>{formatTemperature(weather.main.temp_min, unit)} / {formatTemperature(weather.main.temp_max, unit)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Droplets className="w-5 h-5 text-blue-300 mr-2" />
            <span className="text-white/80 text-sm">Humidity</span>
          </div>
          <div className="text-xl font-semibold text-white">{weather.main.humidity}%</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Wind className="w-5 h-5 text-green-300 mr-2" />
            <span className="text-white/80 text-sm">Wind</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </div>
          <div className="text-sm text-white/70">{getWindDirection(weather.wind.deg)}</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Thermometer className="w-5 h-5 text-red-300 mr-2" />
            <span className="text-white/80 text-sm">Pressure</span>
          </div>
          <div className="text-xl font-semibold text-white">{weather.main.pressure} hPa</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <Eye className="w-5 h-5 text-purple-300 mr-2" />
            <span className="text-white/80 text-sm">Visibility</span>
          </div>
          <div className="text-xl font-semibold text-white">{(weather.visibility / 1000).toFixed(1)} km</div>
        </div>
      </div>

      <div className="flex justify-between mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center">
          <Sunrise className="w-5 h-5 text-yellow-300 mr-2" />
          <div>
            <div className="text-white/80 text-sm">Sunrise</div>
            <div className="text-white font-medium">{formatTime(weather.sys.sunrise)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Sunset className="w-5 h-5 text-orange-300 mr-2" />
          <div>
            <div className="text-white/80 text-sm">Sunset</div>
            <div className="text-white font-medium">{formatTime(weather.sys.sunset)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};