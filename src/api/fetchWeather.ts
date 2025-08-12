import { fetchWeatherApi } from "openmeteo";

export interface WeatherData {
    current: {
        time: Date;
        temperature_2m: number;
        precipitation: number;
    };
    hourly: {
        time: Date[];
        temperature_2m: Float32Array | null;
        precipitation_probability: Float32Array | null;
        rain: Float32Array | null;
        showers: Float32Array | null;
        snowfall: Float32Array | null;
    };
    daily: {
        time: Date[];
        temperature_2m_max: Float32Array | null;
        temperature_2m_min: Float32Array | null;
        precipitation_sum: Float32Array | null;
        precipitation_probability_max: Float32Array | null;
    };
    timezone: {
        name: string;
        utcOffsetSeconds: number;
    };
}

export const fetchWeather = async (lat: number, lng: number): Promise<WeatherData> => {
    const params = {
        "latitude": lat,
        "longitude": lng,
        "hourly": ["temperature_2m", "precipitation_probability", "precipitation"],
        "current": ["temperature_2m", "precipitation"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_sum", "precipitation_probability_max"],
        "wind_speed_unit": "mph",
        "temperature_unit": "fahrenheit",
        "timezone": "auto",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Get timezone information
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature_2m: current.variables(0)!.value(),
            precipitation: current.variables(1)!.value(),
        },
        hourly: {
            time: [...Array(48)] // forecast for the next 24 hours
                .map((_, i) => 
                    new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
            temperature_2m: hourly.variables(0)!.valuesArray()?.slice(0, 48) || null,
            precipitation_probability: hourly.variables(1)!.valuesArray()?.slice(0, 24) || null,
            rain: hourly.variables(2)?.valuesArray()?.slice(0, 48) || null,
            showers: hourly.variables(3)?.valuesArray()?.slice(0, 48) || null,
            snowfall: hourly.variables(4)?.valuesArray()?.slice(0, 48) || null
        },
        daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())] // forecast for the 7 days
                .map((_, i) => 
                    new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
            temperature_2m_max: daily.variables(0)!.valuesArray(),
            temperature_2m_min: daily.variables(1)!.valuesArray(),
            precipitation_sum: daily.variables(2)!.valuesArray(),
            precipitation_probability_max: daily.variables(3)!.valuesArray(),
        },
        timezone: {
            name: response.timezone() || 'UTC',
            utcOffsetSeconds: utcOffsetSeconds,
        }
    };// 'weatherData' now contains a simple structure with arrays with datetime and weather data

    return weatherData;

}