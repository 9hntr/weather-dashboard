"use client";

import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectDailyForecast } from "../state/reducers/weather.reducer";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Forecast = () => {
  const data = useSelector(selectDailyForecast);

  return (
    <div className="p-6">
      <p className="text-sm font-bold">7-day Forecast</p>
      <div className="pt-4">
        {!data.time ? (
          <Fragment>
            <Skeleton className="h-5 w-full rounded-sm" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
            <Skeleton className="h-5 w-full rounded-sm mt-4" />
          </Fragment>
        ) : (
          <ul>
            {data.time.map((time: string, idx: number) => {
              if (idx === 0) return;
              const timeObj = moment(time);

              return (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <li className="pt-4 flex justify-between">
                        <div className="flex">
                          <div className="text-xs font-semibold flex">
                            {Math.floor(data.temperature_2m_max[idx])}°
                          </div>
                          <div className="flex justify-center items-center w-4 mx-2">
                            <span
                              data-disabled=""
                              data-orientation="horizontal"
                              className="relative h-1.5 w-full grow select-none overflow-hidden rounded-full"
                            >
                              <span
                                data-orientation="horizontal"
                                data-disabled=""
                                className="absolute h-full rounded-full bg-gradient-to-l from-slate-300 to-blue-600"
                                style={{ left: "13.8144%", right: "3.64261%" }}
                              ></span>
                            </span>
                          </div>
                          <div className="text-xs font-semibold flex">
                            {Math.floor(data.temperature_2m_min[idx])}°
                          </div>
                        </div>
                        <div className="text-xs flex w-20">
                          {idx === 0 && (
                            <span className="font-bold">Today</span>
                          )}
                          {idx === 1 && (
                            <span className="font-bold">Tomorrow</span>
                          )}
                          {![0, 1].includes(idx) && (
                            <Fragment>
                              <span className="font-bold mr-1">
                                {timeObj.format("DD")}
                              </span>
                              {timeObj.format("dddd")}
                            </Fragment>
                          )}
                        </div>
                      </li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>Max / Min</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
