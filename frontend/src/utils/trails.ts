import L from 'leaflet';

const getMap = (
  geometry: GeoJSON.Geometry,
  _id: string,
  interactive: boolean = true
) => {
  const trailData: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: geometry
  };
  const mapOptions = interactive
    ? {}
    : {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
      };
  const map = L.map(`map-${_id}`, mapOptions);
  const trail = L.geoJSON(trailData).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const bounds = trail.getBounds();
  map.fitBounds(bounds);

  return map;
};

export { getMap };
