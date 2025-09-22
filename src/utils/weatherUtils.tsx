export const getWeatherIcon = (iconCode: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconMap: Record<string, string> = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌧️', // shower rain
    '09n': '🌧️',
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️'
  };

  return (
    <span className={`${sizeClasses[size]} flex items-center justify-center text-2xl`}>
      {iconMap[iconCode] || '🌤️'}
    </span>
  );
};

export const getWeatherBackground = (weatherCode: string, isNight: boolean = false) => {
  if (isNight) {
    return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
  }

  const backgroundMap: Record<string, string> = {
    '01': 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500', // clear sky
    '02': 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600', // few clouds
    '03': 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600', // scattered clouds
    '04': 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700', // broken clouds
    '09': 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800', // shower rain
    '10': 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700', // rain
    '11': 'bg-gradient-to-br from-purple-800 via-indigo-900 to-black', // thunderstorm
    '13': 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300', // snow
    '50': 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500' // mist
  };

  const code = weatherCode.substring(0, 2);
  return backgroundMap[code] || 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
};

export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'C') => {
  if (unit === 'F') {
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const getWindDirection = (degrees: number) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};