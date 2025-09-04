
import { useEffect, useState } from "react";
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from "react-redux";

import { fetchWeather, type WeatherData } from "./api/fetchWeather";
import { useFilteredHourlyData } from "./hooks/useFilteredHourlyData";
import { useTransformWeeklyData } from "./hooks/useTransformWeeklyData";
import { useLocationDateTime } from "./hooks/useLocationDateTime";
import Search from "./assets/search.svg?react";
import Gallery from "./components/Gallery";
import WeeklyForecastChart from "./components/WeeklyForecastChart";
import { setSelectedPlace } from "./store/selectedPlaceSlice";

import type { RootState } from "./store/store";
import SearchInputField from "./components/SearchInputField";

const App = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [query, setQuery] = useState('');
  const selectedPlace = useSelector((state: RootState) => state.selectedPlace.selected);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPlace) {
      fetchWeather(selectedPlace.lat, selectedPlace.lng)
        .then(data => setWeatherData(data))
        .catch(error => console.error("Error fetching weather data:", error));
    }
  }, [selectedPlace]);

  const locationDateTime = useLocationDateTime(weatherData);
  const transformedWeeklyData = useTransformWeeklyData(weatherData, locationDateTime);
  const filteredHourlyData = useFilteredHourlyData(weatherData?.hourly, locationDateTime);
  const locationStateString = selectedPlace?.address.split(',')[2] ? ', ' + selectedPlace?.address.split(',')[2] : '';
  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div className={`${selectedPlace ? 'animate-fade-out' : 'animate-fade-in'} opacity-100 relative flex flex-col h-full`}>
        <div className="md:flex justify-between p-8 pb-4 md:p-20 sm:mt-12 items-end">
          <h1 className="!text-4xl sm:!text-5xl lg:!text-6xl border-b md:border-0 pb-8 md:pb-0 font-medium w-[20%] text-wrap">The Weather App</h1>
          <SearchInputField
            query={query}
            setQuery={setQuery}
          />
        </div>
        <img src="intro.jpg" alt="Weather Landing Page Image" className="h-96 object-cover mt-6 m-8 sm:m-8 rounded-3xl" />
      </div>
      <div className={`${selectedPlace ? 'animate-fade-in' : 'animate-fade-out'} opacity-0 flex flex-col p-8 md:p-12 gap-5 h-full relative overflow-y-scroll`}>
        <div className="border-b pb-2 relative !text-sm md:!text-lg">
          <h1 className="!text-2xl sm:!text-4xl pb-2">{selectedPlace?.address.split(',')[0] || 'No location selected'}</h1>
          <h2 className="italic font-light">{selectedPlace?.address.split(',')[1] + locationStateString || ''}</h2>
          <span>{`${weatherData?.current.temperature_2m.toFixed(2)} °F`}</span>
          <p className="md:absolute relative bottom-2 right-0 pt-4">
            {locationDateTime.toLocaleString(DateTime.DATETIME_MED)}
          </p>
          <button
            onClick={() => {
              dispatch(setSelectedPlace(null));
              setQuery('');
            }}
            className="md:absolute top-4 right-0 p-2 flex gap-3 border rounded w-full md:w-fit h-fit !text-sm"
          >
            <Search className="h-4 w-4 self-center" />
            Search Again
          </button>
        </div>
        <h3 className="text-lg sm:text-xl italic">Hourly Forecast</h3>
        <Gallery data={filteredHourlyData} />
        <div className="flex-grow">
          <h3 className="text-lg sm:text-xl italic">Weekly Forecast</h3>
          <WeeklyForecastChart data={transformedWeeklyData} />
        </div>
        <p className="opacity-70 italic absolute bottom-2 text-sm md:text-md">Weather data provided by Open Meteo API</p>
      </div>
    </div>
  );
};

export default App;
