import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { DefaultState, Location } from "@/types";
import siteConfig from "@/app/siteConfg";
import { popularCities } from "@/lib/misc";

export const fetchWeatherByLocation = createAsyncThunk(
  "fetchWeatherByLocation",
  async (_, { getState }) => {
    // @ts-ignore
    const { lat, lon } = getState().weather.targetLocation;
    const response = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

    // todo: handle error

    console.log("called fetchWeatherByLocation");

    return response.data;
  }
);

export const fetchPopularCitiesWeather = createAsyncThunk(
  "fetchPopularCitiesWeather",
  async () => {
    let cities: any = []; // todo: extend CityGc

    for (let { lat, lon } of popularCities) {
      const response = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      cities.push(response.data);
    }

    console.log("called fetchPopularCitiesWeather");

    return cities;
  }
);

export const fetchDailyForecast = createAsyncThunk(
  "fetchForecast",
  async (_, { getState }) => {
    // @ts-ignore
    const { lat, lon } = getState().weather.targetLocation;
    const response = await axios.get(
      `api/daily-forecast?lat=${lat}&lon=${lon}&days=8`
    );

    // todo: handle error

    console.log("called fetchDailyForecast");

    return response.data;
  }
);

export const fetchHourlySummaryByLocation = createAsyncThunk(
  "fetchHourlySummaryByLocation",
  async (_, { getState }) => {
    // @ts-ignore
    const { lat, lon } = getState().weather.targetLocation;
    const response = await axios.get(`api/hourly?lat=${lat}&lon=${lon}`);

    // todo: handle error

    console.log("called fetchHourlySummaryByLocation");

    return response.data;
  }
);

interface State extends DefaultState {
  currentWeather: any;
  targetLocation: Location;
  uvIndex: number;
  popularCitiesWeather: any[];
  forecastDaily: any; // todo: add types
  hourlySummary: any;
}

const initialState: State = {
  isError: false,
  isLoading: false,
  uvIndex: 0,
  popularCitiesWeather: [],
  currentWeather: null,
  hourlySummary: {},
  forecastDaily: {},
  targetLocation: siteConfig.defaultLocation,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTargetLocation: (state, action) => {
      state.targetLocation = action.payload;
    },
  },
  // ? será esta la luz y el camino?
  extraReducers: (builder) => {
    // fetchWeatherByLocation
    builder.addCase(fetchWeatherByLocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentWeather = action.payload;
    });
    builder.addCase(fetchWeatherByLocation.rejected, (state) => {
      state.isError = true;
    });

    // fetchPopularCitiesWeather
    builder.addCase(fetchPopularCitiesWeather.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPopularCitiesWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      state.popularCitiesWeather = action.payload;
    });
    builder.addCase(fetchPopularCitiesWeather.rejected, (state) => {
      state.isError = true;
    });

    // fetchHourlySummaryByLocation
    builder.addCase(fetchHourlySummaryByLocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHourlySummaryByLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hourlySummary = action.payload?.hourly;
    });
    builder.addCase(fetchHourlySummaryByLocation.rejected, (state) => {
      state.isError = true;
    });

    // fetchDailyForecast
    builder.addCase(fetchDailyForecast.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDailyForecast.fulfilled, (state, action) => {
      state.isLoading = false;
      state.forecastDaily = action.payload?.daily;
      state.uvIndex = Math.floor(action.payload?.daily.uv_index_max[0]);
    });
    builder.addCase(fetchDailyForecast.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { setTargetLocation } = weatherSlice.actions;

export const selectPopularCitiesWeather = (state: RootState) =>
  state.weather.popularCitiesWeather;
export const selectUVIndex = (state: RootState) => state.weather.uvIndex;
export const selectCurrentWeather = (state: RootState) =>
  state.weather.currentWeather;
export const selectTargetLocation = (state: RootState) =>
  state.weather.targetLocation;
export const selectHourlySummary = (state: RootState) =>
  state.weather.hourlySummary;
export const selectDailyForecast = (state: RootState) =>
  state.weather.forecastDaily;

export default weatherSlice.reducer;
