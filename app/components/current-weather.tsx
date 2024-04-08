"use client";

import {
  Sun,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  Cloudy,
  MapPin,
} from "lucide-react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentWeather,
  selectUVIndex,
} from "../state/reducers/weather.reducer";

// components
import { Clock } from "./clock";
import { kelvinToCelsius } from "@/lib/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { Temperature } from "./temperature";
import { Humidity } from "./humidity";
import { Wind } from "./wind";
import { UvIndex } from "./uv-index";

// todo: move this
export const getCurrentWeatherIcon = (
  weatherMain: string,
  iconSize: number
) => {
  switch (weatherMain) {
    case "Drizzle":
      return <CloudDrizzle size={iconSize} />;
    case "Rain":
      return <CloudRain size={iconSize} />;
    case "Snow":
      return <Snowflake size={iconSize} />;
    case "Clear":
      return <Sun size={iconSize} />;
    case "Clouds":
      return <Cloudy size={iconSize} />;
    default:
      return <Sun />;
  }
};

export const CurrentWeather = () => {
  const uvIndex = useSelector(selectUVIndex);
  const weatherData = useSelector(selectCurrentWeather);

  if (!weatherData || !uvIndex) {
    return <Skeleton className="w-full h-full rounded-full" />;
  }

  return (
    <div className="p-6 rounded-md shadow-md dark:shadow-sm shadow-slate-200 dark:bg-dark-gray dark:shadow-slate-400 text-card-foreground">
      <div className="text-left">
        <p className="text-md font-bold flex">
          {weatherData && (
            <Fragment>
              {weatherData.name}, {weatherData.sys.country}
            </Fragment>
          )}
          {/* <MapPin className="ml-2" size={15} /> */}
        </p>

        <Clock timezone={weatherData.timezone} />
      </div>
      <div className="flex justify-center items-center py-2">
        <div className="mr-4 mt-[20px]">
          {weatherData &&
            getCurrentWeatherIcon(weatherData.weather[0].main, 60)}
        </div>
        <div className="flex flex-col pt-3">
          <span className="text-center text-xl md:text-5xl font-extrabold">
            {weatherData && kelvinToCelsius(weatherData?.main?.temp)}
            {/* add ° */}
          </span>
          <p className="text-center text-sm mt-2">
            {weatherData && weatherData.weather[0].main}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 pt-4">
        <Temperature data={kelvinToCelsius(weatherData.main.feels_like)} />
        <Humidity data={weatherData.main.humidity} />
        <Wind data={weatherData.wind.speed} />
        {uvIndex && <UvIndex data={uvIndex} />}
      </div>
    </div>
  );
};
