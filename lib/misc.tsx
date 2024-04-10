import { GcCity } from "@/types";

export const kelvinToCelsius = (kelvin: number) => Math.floor(kelvin - 273.15);

export const popularCities: GcCity[] = [
  {
    name: "Caracas",
    country: "VE",
    state: "Distrito Capital",
    lat: 10.5,
    lon: -66.916664,
  },
  {
    name: "Tokyo",
    country: "JP",
    state: "Tokyo",
    lat: 35.652832,
    lon: 139.839478,
  },
  {
    name: "Madrid",
    country: "ES",
    state: "Madrid",
    lat: 40.4165,
    lon: -3.7026,
  },
  {
    name: "London",
    country: "GB",
    state: "London",
    lat: 51.5074,
    lon: 0.1278,
  },
  {
    name: "Sydney",
    country: "AU",
    state: "New South Wales",
    lat: -33.8688197,
    lon: 151.2092955,
  },
];
