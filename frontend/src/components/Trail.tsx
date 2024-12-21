import { useEffect } from 'react';
import { Link } from 'wouter';
import { getMap } from '../utils/trails';
import { TrailType } from '../types';
import LikeBtn from './LikeBtn';

type TrailProps = {
  trail: TrailType;
  className?: string;
};

export default function Trail({ trail, className }: TrailProps) {
  const { _id, name, location, length, geometry } = trail;

  useEffect(() => {
    const map = getMap(geometry, _id, false);

    return () => {
      map?.remove();
    };
  }, []);

  return (
    <div
      className={`card relative flex-grow bg-base-100 shadow-md ${className}`}
    >
      <Link to={`~/explore/${_id}`}>
        <figure>
          <div id={`map-${_id}`} className='z-0 h-48 w-full'></div>
        </figure>
      </Link>
      <div className='card-body'>
        <Link to={`~/explore/${_id}`}>
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
