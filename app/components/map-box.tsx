"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { selectTargetLocation } from "../state/reducers/weather.reducer";
import { useSelector } from "react-redux";

function FlyToActiveCity({ activeCityCords }: { activeCityCords: any }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 7;
      const flyToOptions = {
        duration: 0.5,
      };

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCords, map]);

  return null;
}

export default function MapBox() {
  const targetLocation = useSelector(selectTargetLocation);

  if (typeof window === "undefined") return null;

  return (
    <MapContainer
      center={[targetLocation.lat, targetLocation.lon]}
      zoom={100}
      scrollWheelZoom={false}
      className="rounded-lg w-full h-full"
      style={{ zIndex: 1 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FlyToActiveCity activeCityCords={targetLocation} />
    </MapContainer>
  );
}
