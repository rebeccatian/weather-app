import { useMemo } from 'react';
import { DateTime } from 'luxon';
import type { WeatherData } from '../api/fetchWeather';

export interface FilteredHourlyItem {
  time: string;
  formattedTime: string;
  temperature: number;
  precipitation_probability: number;
  index: number;
  dateString: string;
}

export const useFilteredHourlyData = (hourlyData: WeatherData['hourly'] | undefined, locationDateTime?: DateTime): FilteredHourlyItem[] => {
  const filteredHourlyData = useMemo(() => {
    const dt = locationDateTime || DateTime.now();
    const currentHour = dt.hour;
    const currentDate = dt.toISODate(); // Get current date in YYYY-MM-DD format

    if (!hourlyData) {
      return [];
    }
    
    const filtered = hourlyData.time
      .map((time, index) => {
        // Convert to location timezone if available
        const dateTime = locationDateTime 
          ? DateTime.fromJSDate(time).setZone(locationDateTime.zone)
          : DateTime.fromJSDate(time);
        
        const dateString = dateTime.toFormat('EEE MMM dd');
        const formattedTime = dateTime.toFormat('h:mm a');

        return {
          time: time.toISOString(), // Keep as ISO string for the interface
          dateString,
          formattedTime,
          temperature: hourlyData.temperature_2m?.[index] ?? 0,
          precipitation_probability: hourlyData.precipitation_probability?.[index] ?? 0,
          index
        };
      })
      .filter(item => {
        const itemDate = locationDateTime 
          ? DateTime.fromISO(item.time).setZone(locationDateTime.zone)
          : DateTime.fromISO(item.time);
        const itemHour = itemDate.hour;
        const itemDateStr = itemDate.toISODate();
        
        // Include times from NEXT hour onwards today, or all times for future days
        return (itemDateStr === currentDate && itemHour > currentHour) || 
               (itemDateStr !== null && currentDate !== null && itemDateStr > currentDate);
      });

    return filtered;
  }, [hourlyData, locationDateTime]);

  return filteredHourlyData;
};
