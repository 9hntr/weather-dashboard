"use client";

import {
  Sun,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  Cloudy,
  CloudFog,
} from "lucide-react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentWeather,
  selectUVIndex,
} from "../state/reducers/weather.reducer";

import { Clock } from "./clock";
import { kelvinToCelsius } from "@/lib/misc";
import { Skeleton } from "@/components/ui/skeleton";
import { Temperature } from "./temperature";
import { Humidity } from "./humidity";
import { Wind } from "./wind";
import { UvIndex } from "./uv-index";

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
    case "Mist":
      return <CloudFog size={iconSize} />;
    default:
      return <Sun size={iconSize} />;
  }
};

export const CurrentWeather = () => {
  const uvIndex = useSelector(selectUVIndex);
  const weatherData = useSelector(selectCurrentWeather);

  return (
    <div className="p-6">
      {!weatherData || !uvIndex ? (
        <Fragment>
          <div className="text-left space-y-2">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-4 w-[40px]" />
          </div>
          <Skeleton className="h-24 w-full rounded-sm mt-4" />
          <Skeleton className="h-10 w-full rounded-sm mt-4" />
        </Fragment>
      ) : (
        <Fragment>
          <div className="text-left">
            <p className="text-md font-bold flex">
              {weatherData && (
                <Fragment>
                  {weatherData.name}, {weatherData.sys.country}
                </Fragment>
              )}
            </p>

            <Clock timezone={weatherData.timezone} />
          </div>
          <div className="flex justify-center items-center py-2">
            <div className="mr-4 mt-[20px]">
              {weatherData &&
                getCurrentWeatherIcon(weatherData.weather[0].main, 60)}
            </div>
            <div className="flex flex-col pt-3">
              <span className="text-center text-3xl md:text-5xl font-extrabold">
                {weatherData && kelvinToCelsius(weatherData?.main?.temp)}
              </span>
              <p className="text-center text-sm mt-2">
                {weatherData && weatherData.weather[0].main}
              </p>
            </div>
            <span className="ml-2 mt-[-30px] text-2xl">°c</span>
          </div>
          <div className="grid grid-cols-4 pt-4">
            <Temperature data={kelvinToCelsius(weatherData.main.feels_like)} />
            <Humidity data={weatherData.main.humidity} />
            <Wind data={weatherData.wind.speed} />
            {uvIndex && <UvIndex data={uvIndex} />}
          </div>
        </Fragment>
      )}
    </div>
  );
};
