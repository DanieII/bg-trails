import { useContext, useEffect, useState } from 'react';
import { useParams } from 'wouter';
import axiosInstance from '../axiosConfig';
import { getMap } from '../utils/trails';
import Comments from './Comments';
import { TrailType } from '../types';
import LikeBtn from './LikeBtn';
import { AuthContext } from '../context/AuthContext';

export default function TrailDetails() {
  const [trail, setTrail] = useState<TrailType>();
  const params = useParams();
  const trailId = params.id;
  const { authToken, userId } = useContext(AuthContext);

  const fetchTrail = async () => {
    try {
      const response = await axiosInstance.get(`/trails/${trailId}`);

      setTrail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            className='mt-4 h-96 w-full rounded-lg'
          />
          <LikeBtn trail={trail} authToken={authToken} userId={userId} />
        </div>
      )}
      {trail && <Comments trailId={trail._id} />}
    </div>
  );
}
