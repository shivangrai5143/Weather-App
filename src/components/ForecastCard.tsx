import React from 'react';
import { ForecastItem } from '../types/weather';
import { getWeatherIcon, formatTemperature, formatDate } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastItem[];
  unit: 'C' | 'F';
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  // Group forecast by day and take the first item of each day
  const dailyForecast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {} as Record<string, ForecastItem>);

  const forecastItems = Object.values(dailyForecast).slice(0, 5);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecastItems.map((item, index) => (
          <div key={item.dt} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
            <div className="flex items-center flex-1">
              <div className="w-16 text-white/80 text-sm font-medium">
                {index === 0 ? 'Today' : formatDate(item.dt)}
              </div>
              <div className="flex items-center ml-4">
                {getWeatherIcon(item.weather[0].icon, 'sm')}
                <span className="ml-2 text-white/80 text-sm capitalize">
                  {item.weather[0].description}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">
                {formatTemperature(item.main.temp_max, unit)}
              </span>
              <span className="text-white/60">
                {formatTemperature(item.main.temp_min, unit)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};