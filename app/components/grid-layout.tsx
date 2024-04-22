import React from "react";
import dynamic from "next/dynamic";
import { CurrentWeather } from "./current-weather";
import { PopularCities } from "./popular-cities";
import { Hourly } from "./hourly-summary";
import { Forecast } from "./forecast";
import { CardContainer } from "./cardContainer";

const MapBox = dynamic(() => import("./map-box"), { ssr: false });

export const GridLayout = () => {
  return (
    <div className="h-auto mb-6">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 h-auto">
        <CardContainer>
          <CurrentWeather />
        </CardContainer>
        <div className="col-span-1 md:col-span-2 gap-4">
          <MapBox />
        </div>
        <CardContainer>
          <PopularCities />
        </CardContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[18rem] h-auto">
        <div className="col-span-1">
          <CardContainer>
            <Forecast />
          </CardContainer>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col flex-grow gap-4">
          <CardContainer>
            <Hourly />
          </CardContainer>
        </div>
      </div>
    </div>
  );
};
