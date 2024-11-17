import { useEffect } from 'react';
import L from 'leaflet';

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
  geometry
}: TrailProps) {
  useEffect(() => {
    const map = L.map(`map-${_id}`, {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    });
    const trailData: GeoJSON.Feature = {
      type: 'Feature',
      properties: {},
      geometry: geometry
    };
    const trail = L.geoJSON(trailData).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const bounds = trail.getBounds();
    map.fitBounds(bounds);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className='card w-96 flex-grow bg-base-100 shadow-xl sm:basis-1/3'>
      <figure>
        <div id={`map-${_id}`} className='z-0 h-48 w-full'></div>
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <div className='card-actions mt-auto justify-end pt-2'>
          <div className='badge badge-outline'>{location}</div>
          <div className='badge badge-outline'>{length} km</div>
        </div>
      </div>
    </div>
  );
}
