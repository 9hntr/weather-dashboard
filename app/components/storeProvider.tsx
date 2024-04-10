"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../state/store";

import {
  fetchWeatherByLocation,
  fetchPopularCitiesWeather,
  fetchHourlySummaryByLocation,
  fetchDailyForecast,
} from "../state/reducers/weather.reducer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      storeRef.current!.dispatch(fetchWeatherByLocation());
      storeRef.current!.dispatch(fetchPopularCitiesWeather());
      storeRef.current!.dispatch(fetchHourlySummaryByLocation());
      storeRef.current!.dispatch(fetchDailyForecast());
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
