import { useMemo } from 'react';
import { DateTime } from 'luxon';
import type { WeatherData } from '../api/fetchWeather';

export interface FilteredHourlyItem {
  time: string;
  formattedTime: string;
  temperature: number;
  rain: number;
  index: number;
  dateString: string;
}

export const useFilteredHourlyData = (hourlyData: WeatherData['hourly'] | undefined): FilteredHourlyItem[] => {
  const filteredHourlyData = useMemo(() => {
    const dt = DateTime.now();
    const currentHour = dt.hour;
    const currentDate = dt.toISODate(); // Get current date in YYYY-MM-DD format

    if (!hourlyData) {
      return [];
    }
    
    const filtered = hourlyData.time
      .map((time, index) => {
        // Parse as local time to avoid timezone conversion
        const date = time; // time is already a Date object
        const dateString = date.toString().split('2025')[0];
        console.log(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12; // Convert to 12-hour format
        const displayMinutes = minutes.toString().padStart(2, '0');
        const formattedTime = `${displayHours}:${displayMinutes}${ampm}`;

        return {
          time: time.toISOString(), // Convert Date to string for the interface
          dateString,
          formattedTime,
          temperature: hourlyData.temperature_2m?.[index] ?? 0,
          rain: hourlyData.rain?.[index] ?? 0,
          index
        };
      })
      .filter(item => {
        const itemDate = DateTime.fromISO(item.time);
        const itemHour = itemDate.hour;
        const itemDateStr = itemDate.toISODate();
        
        // Include times from NEXT hour onwards today, or all times for future days
        return (itemDateStr === currentDate && itemHour > currentHour) || 
               (itemDateStr !== null && itemDateStr > currentDate);
      });

    return filtered;
  }, [hourlyData]);

  return filteredHourlyData;
};
