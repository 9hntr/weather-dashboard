import React, { Fragment } from "react";
import { CurrentWeather } from "./current-weather";
import { PopularCities } from "./popular-cities";
import { Hourly } from "./hourly-summary";
import { MapBox } from "./map-box";

export const GridLayout = () => {
  return (
    <Fragment>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 h-auto">
        <CurrentWeather />
        <div className="col-span-1 md:col-span-2 gap-4 bg-blue-300 rounded-lg">
          {/* <MapBox /> */}
        </div>
        <PopularCities />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 h-[18rem]">
        <div className="col-span-1 bg-blue-200 ">1</div>
        <div className="col-span-1 md:col-span-3 map flex flex-col flex-grow gap-4 rounded-md shadow-md dark:shadow-sm shadow-slate-200 dark:bg-dark-gray dark:shadow-slate-400 text-card-foreground">
          <Hourly />
        </div>
      </div>
    </Fragment>
  );
};
