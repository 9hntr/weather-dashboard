"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  fetchDailyForecast,
  fetchHourlySummaryByLocation,
  fetchWeatherByLocation,
  setTargetLocation,
} from "@/app/state/reducers/weather.reducer";

import {
  selectCities,
  setDefaultCities,
  fetchCities,
} from "@/app/state/reducers/cities.reducer";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GcCity, Location } from "@/types";

import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";

export const SearchDialog = () => {
  const [cityUserInput, setCityUserInput] = useState<any>("");
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);

  const setSelectedTargetLocation = (location: Location) => {
    dispatch(setTargetLocation(location));
    dispatch(fetchWeatherByLocation());
    dispatch(fetchHourlySummaryByLocation());
    dispatch(fetchDailyForecast());
  };

  const handleCityUserInput = (e: any) => {
    setCityUserInput(e.target.value);

    if (!e.target.value?.length) dispatch(setDefaultCities());
  };

  useEffect(() => {
    const debouncedFetch = debounce(() => {
      // ! no deberia dar problemas, ignora el error de ts
      dispatch(fetchCities(cityUserInput));
    }, 500);

    if (cityUserInput) debouncedFetch(cityUserInput);

    // cleanup
    return () => debouncedFetch.cancel();
  }, [cityUserInput]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm inline-flex">
          <p className="text-sm text-muted-foreground">Search location</p>
          <div className="flex rounded-sm py-[3px] ml-8 items-center gap-2">
            <SearchIcon size={15} />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <Command>
          <CommandInput
            className="border-0 focus:ring-0"
            value={cityUserInput}
            onChangeCapture={handleCityUserInput}
            placeholder="Search city"
          />
          <CommandList>
            <ul className="px-3 pb-2">
              <p className="p-2 mt-1 text-xs text-muted-foreground">
                Suggestions
              </p>
              {cities.length ? (
                cities.map(
                  ({ name, state, country, lat, lon }: GcCity, idx: number) => (
                    <li
                      onClick={() => setSelectedTargetLocation({ lat, lon })}
                      key={idx}
                      className="my-2 p-2 hover:bg-accent rounded-sm cursor-pointer"
                    >
                      <DialogClose asChild>
                        <p className="text-sm">
                          {name}, {state && state + ", "}
                          {country}
                        </p>
                      </DialogClose>
                    </li>
                  )
                )
              ) : (
                <span className="p-2">No locations found.</span>
              )}
            </ul>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
