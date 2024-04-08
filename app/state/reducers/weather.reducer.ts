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
    console.log("fetchWeatherByLocation data* ", response.data);

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

    return cities;
  }
);

export const fetchUVByLocation = createAsyncThunk(
  "fetchUVByLocation",
  async (_, { getState }) => {
    // @ts-ignore
    const { lat, lon } = getState().weather.targetLocation;
    const response = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

    // todo: handle error
    // console.log("fetchUVByLocation data* ", response.data);

    return response.data;
  }
);

interface State extends DefaultState {
  currentWeather: any;
  targetLocation: Location;
  uvIndex: number;
  popularCitiesWeather: any[];
}

const initialState: State = {
  isError: false,
  isLoading: false,
  uvIndex: 0,
  popularCitiesWeather: [],
  currentWeather: null,
  targetLocation: siteConfig.defaultLocation,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setTargetLocation: (state, action) => {
      state.targetLocation = action.payload;
      console.log("setTargetLocation");
    },
  },
  // todo: handle loading/error/success states
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

    // fetchUVByLocation
    builder.addCase(fetchUVByLocation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUVByLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uvIndex = Math.floor(action.payload?.daily.uv_index_max[0]);
    });
    builder.addCase(fetchUVByLocation.rejected, (state) => {
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

export default weatherSlice.reducer;
