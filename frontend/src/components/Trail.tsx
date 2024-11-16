import { useState, useEffect } from "react";
import L from "leaflet";

interface TrailProps {
  _id: string;
  name: string;
  location: string;
  length: number;
  geometry: GeoJSON.GeometryObject;
}

export default function Trail({
  _id,
  name,
  location,
  length,
  geometry,
}: TrailProps) {
  useEffect(() => {
    const map = L.map(`map-${_id}`, {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    });
    const trailData: GeoJSON.Feature = {
      type: "Feature",
      properties: {},
      geometry: geometry,
    };
    const trail = L.geoJSON(trailData).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const bounds = trail.getBounds();
    map.fitBounds(bounds);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="card bg-base-100 w-96 shadow-2xl flex-grow sm:basis-1/3">
      <figure>
        <div id={`map-${_id}`} className="h-48 w-full"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{location}</p>
        <p>{length} km</p>
      </div>
    </div>
  );
}
