import { useMemo } from 'react';
import { DateTime } from 'luxon';
import type { WeatherData } from '../api/fetchWeather';

export const useLocationDateTime = (weatherData: WeatherData | undefined) => {
  const locationDateTime = useMemo(() => {
    if (!weatherData?.timezone) {
      return DateTime.now(); // Fallback to local time
    }

    // Try to use the timezone name if available, otherwise use UTC offset
    const timezoneName = weatherData.timezone.name;
    
    if (timezoneName && timezoneName !== 'UTC') {
      try {
        return DateTime.now().setZone(timezoneName);
      } catch (error) {
        console.warn('Failed to set timezone:', timezoneName, error);
      }
    }
    
    // Fallback: use UTC offset
    const offsetMinutes = weatherData.timezone.utcOffsetSeconds / 60;
    return DateTime.now().setZone(`UTC${offsetMinutes >= 0 ? '+' : ''}${Math.floor(offsetMinutes / 60)}:${Math.abs(offsetMinutes % 60).toString().padStart(2, '0')}`);
  }, [weatherData?.timezone]);

  return locationDateTime;
};
