import { useMemo } from 'react';
import { DateTime } from 'luxon';
import type { WeatherData } from '../api/fetchWeather';

export interface WeeklyForecastItem {
  time: string;
  temperature_max: number;
  temperature_min: number;
  precipitation_sum: number;
  precipitation_probability_max: number;
}

export const useTransformWeeklyData = (weatherData: WeatherData | undefined, locationDateTime?: DateTime): WeeklyForecastItem[] => {
  const transformedWeeklyData = useMemo(() => {
    if (!weatherData?.daily?.time) {
      return [];
    }

    return weatherData.daily.time.map((time, index) => {
      // Convert to location timezone if available
      const dateTime = locationDateTime 
        ? DateTime.fromJSDate(time).setZone(locationDateTime.zone)
        : DateTime.fromJSDate(time);

      return {
        time: dateTime.toFormat('M/d'),
        temperature_max: Number(weatherData.daily.temperature_2m_max?.[index]?.toFixed(2)) || 0,
        temperature_min: Number(weatherData.daily.temperature_2m_min?.[index]?.toFixed(2)) || 0,
        precipitation_sum: Number(weatherData.daily.precipitation_sum?.[index]?.toFixed(2)) || 0,
        precipitation_probability_max: Number(weatherData.daily.precipitation_probability_max?.[index]?.toFixed(2)) || 0,
      };
    });
  }, [weatherData, locationDateTime]);

  return transformedWeeklyData;
};
