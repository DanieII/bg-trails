import { useEffect } from 'react';
import { Link } from 'wouter';
import L from 'leaflet';
import { getMap } from '../utils/trails';

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
    const map = getMap(geometry, _id, false);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className='card w-96 flex-grow bg-base-100 shadow-xl sm:basis-1/3'>
      <Link to={`~/explore/${_id}`}>
        <figure>
          <div id={`map-${_id}`} className='z-0 h-48 w-full'></div>
        </figure>
      </Link>
      <div className='card-body'>
        <Link to={`~/explore/${_id}`}>
          <h2 className='link card-title'>{name}</h2>
        </Link>
        <div className='card-actions mt-auto justify-end pt-2'>
          <div className='badge badge-primary'>{location}</div>
          <div className='badge badge-primary'>{length} km</div>
        </div>
      </div>
    </div>
  );
}
