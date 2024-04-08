"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../state/store";

import {
  fetchWeatherByLocation,
  fetchUVByLocation,
  fetchPopularCitiesWeather,
} from "../state/reducers/weather.reducer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(fetchWeatherByLocation());
    storeRef.current.dispatch(fetchUVByLocation());
    storeRef.current.dispatch(fetchPopularCitiesWeather());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
