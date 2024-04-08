import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { popularCities } from "@/lib/misc";
import { DefaultState, GcCity } from "@/types";

export const fetchCities = createAsyncThunk(
  "fetchCity",
  async (queryStr: string) => {
    console.log("queryStr* ", queryStr);
    const response = await axios.get(`api/geo?query=${queryStr}`);

    // todo: handle error
    console.log("fetchCities data* ", response.data);

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
  // todo: handle loading/error/success states in components
  extraReducers: (builder) => {
    // fetchCities
    builder.addCase(fetchCities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload.length) state.cities = popularCities;
      else state.cities = action.payload;
    });
    builder.addCase(fetchCities.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const { setDefaultCities } = citiesSlice.actions;

export const selectCities = (state: RootState) => state.cities.cities;

export default citiesSlice.reducer;
