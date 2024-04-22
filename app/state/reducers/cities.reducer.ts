import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { popularCities } from "@/lib/misc";
import { DefaultState, GcCity } from "@/types";

export const fetchCities = createAsyncThunk(
  "fetchCity",
  async (queryStr: string) => {
    const response = await axios.get(`api/geo?query=${queryStr}`);

    return response.data;
  }
);

interface State extends DefaultState {
  cities: GcCity[];
}

const initialState: State = {
  isError: false,
  isLoading: false,
  cities: popularCities,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setDefaultCities: (state) => {
      state.cities = popularCities;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = action.payload;
    });
    builder.addCase(fetchCities.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { setDefaultCities } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities.cities;

export default citiesSlice.reducer;
