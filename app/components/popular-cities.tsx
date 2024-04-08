"use client";

import React from "react";

import { useSelector } from "react-redux";
import { selectPopularCitiesWeather } from "../state/reducers/weather.reducer";
import { getCurrentWeatherIcon } from "./current-weather";
import { kelvinToCelsius, popularCities } from "@/lib/misc";

export const PopularCities = () => {
  const popularCitiesWeather = useSelector(selectPopularCitiesWeather);

  return (
    <div className="p-6 rounded-md shadow-md dark:shadow-sm shadow-slate-200 dark:bg-dark-gray dark:shadow-slate-400 text-card-foreground">
      <p className="text-sm font-bold mb-4">Popular cities</p>
      <ul>
        {popularCitiesWeather.length &&
          popularCitiesWeather.map((weatherData, idx: number) => (
            <li key={idx} className="flex items-center mt-4">
              {getCurrentWeatherIcon(weatherData.weather[0].main, 18)}
              <p className="ml-2 text-xs font-semibold">
                {popularCities[idx].name}, {weatherData.sys.country}
              </p>
              <p className="ml-auto text-xs">
                {kelvinToCelsius(weatherData?.main?.temp)}°
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
