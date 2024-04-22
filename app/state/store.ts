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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
