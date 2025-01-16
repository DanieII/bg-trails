import { useEffect } from 'react';
import { Link } from 'wouter';
import { getMap } from '../utils/trails';
import { TrailType } from '../types';
import LikeBtn from './LikeBtn';
import { useRef } from 'react';

type TrailProps = {
  trail: TrailType;
  mapID: string;
  className?: string;
};

export default function Trail({ trail, mapID, className }: TrailProps) {
  const { _id: trailID, name, location, length, geometry } = trail;
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = getMap(geometry, mapID, trailID, false);
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`card relative flex-grow bg-base-100 shadow-md ${className}`}
    >
      <Link to={`~/explore/${trailID}`}>
        <figure>
          <div id={`map-${mapID}-${trailID}`} className='z-0 h-48 w-full'></div>
        </figure>
      </Link>
      <div className='card-body'>
        <Link to={`~/explore/${trailID}`}>
          <h2 className='card-title'>{name}</h2>
        </Link>
        <div className='mt-auto pt-2'>
          <div className='card-actions justify-end'>
            <div className='badge badge-primary'>{location}</div>
            <div className='badge badge-primary'>{length} km</div>
          </div>
        </div>
      </div>
      <div className='absolute right-5 top-5'>
        <LikeBtn trail={trail} />
      </div>
    </div>
  );
}
