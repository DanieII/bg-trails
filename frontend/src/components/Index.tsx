import Header from "./Header";
import { useEffect } from "react";
import L from "leaflet";

export default function Index() {
  // Add leaflet map
  //useEffect(() => {
  //  const map = L.map("map");
  //
  //  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //    maxZoom: 19,
  //    attribution: "© OpenStreetMap contributors",
  //  }).addTo(map);
  //
  //  const trailData = {
  //    type: "Feature",
  //    geometry: {
  //      type: "LineString",
  //      coordinates: [
  //        [23.2920517, 42.5833441],
  //        [23.2919593, 42.5832758],
  //        [23.2918336, 42.5832243],
  //        [23.2915168, 42.5831016],
  //        [23.2913931, 42.583069],
  //        [23.2911815, 42.5830861],
  //        [23.2910017, 42.5832334],
  //        [23.2906845, 42.5835547],
  //        [23.2905087, 42.5837615],
  //        [23.2903532, 42.5839386],
  //        [23.290257, 42.584089],
  //      ],
  //    },
  //  };
  //
  //  const trail = L.geoJSON(trailData).addTo(map);
  //
  //  // Position map on trail
  //  const bounds = trail.getBounds();
  //  map.fitBounds(bounds);
  //
  //  return () => {
  //    map.remove();
  //  };
  //}, []);

  return (
    <>
      <Header />
      <div id="map" className="h-48"></div>
    </>
  );
}
