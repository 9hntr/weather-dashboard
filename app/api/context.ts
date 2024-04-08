import axios from "axios";

export const openWeatherApiKey = process.env.OPENWEATHERMAP_API_KEY;

export const weatherApiCtx = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const geoApiCtx = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0/",
});

export const meteoApiCtx = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
});
