"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToActiveCity({ activeCityCords }: { activeCityCords: any }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
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

export const MapBox = () => {
  const activeCityCords = { lat: 51.505, lon: -0.09 };

  return (
    <MapContainer
      center={[activeCityCords.lat, activeCityCords.lon]}
      zoom={13}
      scrollWheelZoom={false}
      className="rounded-lg w-full h-full"
      style={{
        // height: "calc(100% - 2rem)",
        // width: "calc(100% - 2rem)",
        zIndex: 1,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FlyToActiveCity activeCityCords={activeCityCords} />
    </MapContainer>
  );
};
