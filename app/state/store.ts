import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weather.reducer";
import citiesReducer from "./reducers/cities.reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
      cities: citiesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
