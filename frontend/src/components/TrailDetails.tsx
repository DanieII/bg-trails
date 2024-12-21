import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import axiosInstance from '../axiosConfig';
import { getMap } from '../utils/trails';
import Comments from './Comments';
import { TrailType } from '../types';
import LikeBtn from './LikeBtn';

export default function TrailDetails() {
  const [trail, setTrail] = useState<TrailType>();
  const params = useParams();
  const trailId = params.id;

  useEffect(() => {
    fetchTrail();
  }, []);

  useEffect(() => {
    let map: L.Map;

    if (trail) map = getMap(trail.geometry, trail._id);

    return () => {
      map?.remove();
    };
  }, [trail]);

  const fetchTrail = async () => {
    try {
      const response = await axiosInstance.get(`/trails/${trailId}`);

      setTrail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>{trail?.name}</h1>
        {trail && (
          <div className='flex gap-2'>
            <span className='badge badge-primary'>{trail?.location}</span>
            <span className='badge badge-primary'>{trail?.length} km</span>
          </div>
        )}
      </div>
      {trail && (
        <div className='relative'>
          <div
            id={`map-${trail._id}`}
            className='z-0 mt-4 h-96 w-full rounded-lg'
          />
          <div className='absolute right-5 top-5'>
            <LikeBtn trail={trail} />
          </div>
        </div>
      )}
      {trail && <Comments trailId={trail._id} />}
    </div>
  );
}
