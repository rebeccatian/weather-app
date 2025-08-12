import { useMemo } from 'react';
import type { WeatherData } from '../api/fetchWeather';

export interface WeeklyForecastItem {
  time: string;
  temperature_max: number;
  temperature_min: number;
  precipitation_sum: number;
  precipitation_probability_max: number;
}

export const useTransformWeeklyData = (weatherData: WeatherData | undefined): WeeklyForecastItem[] => {
  const transformedWeeklyData = useMemo(() => {
    if (!weatherData?.daily?.time) {
      return [];
    }

    return weatherData.daily.time.map((time, index) => {
      const date = new Date(time);

      return {
        time: `${date.getMonth() + 1}/${date.getDate()}`,
        temperature_max: Number(weatherData.daily.temperature_2m_max?.[index]?.toFixed(2)) || 0,
        temperature_min: Number(weatherData.daily.temperature_2m_min?.[index]?.toFixed(2)) || 0,
        precipitation_sum: Number(weatherData.daily.precipitation_sum?.[index]?.toFixed(2)) || 0,
        precipitation_probability_max: Number(weatherData.daily.precipitation_probability_max?.[index]?.toFixed(2)) || 0,
      };
    });
  }, [weatherData]);

  return transformedWeeklyData;
};
