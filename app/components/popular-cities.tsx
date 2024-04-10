"use client";

import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { selectPopularCitiesWeather } from "../state/reducers/weather.reducer";
import { getCurrentWeatherIcon } from "./current-weather";
import { kelvinToCelsius, popularCities } from "@/lib/misc";
import { Skeleton } from "@/components/ui/skeleton";

export const PopularCities = () => {
  const popularCitiesWeather = useSelector(selectPopularCitiesWeather);

  return (
    <div className="p-6">
      <p className="text-sm font-bold">Popular cities</p>
      <ul className="pt-2">
        {popularCitiesWeather.length ? (
          popularCitiesWeather.map((weatherData, idx: number) => (
            <li key={idx} className="flex items-center mt-4">
              {getCurrentWeatherIcon(weatherData.weather[0].main, 18)}
              <p className="ml-2 text-xs font-bold">
                {popularCities[idx].name}, {weatherData.sys.country}
              </p>
              <p className="ml-auto text-xs">
                {kelvinToCelsius(weatherData?.main?.temp)}°
              </p>
            </li>
          ))
        ) : (
          <div className="flex flex-col">
            <Skeleton className="h-5 mt-4 w-full" />
            <Skeleton className="h-5 mt-4 w-full" />
            <Skeleton className="h-5 mt-4 w-full" />
            <Skeleton className="h-5 mt-4 w-full" />
            <Skeleton className="h-5 mt-4 w-full" />
          </div>
        )}
      </ul>
    </div>
  );
};
