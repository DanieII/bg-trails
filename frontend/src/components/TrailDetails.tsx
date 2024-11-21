import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import axiosInstance from '../axiosConfig';
import { getMap } from '../utils/trails';
import { AxiosError } from 'axios';
import Comments from './Comments';

interface Trail {
  _id: string;
  name: string;
  location: string;
  length: number;
  geometry: GeoJSON.GeometryObject;
}

export default function TrailDetails() {
  const [trail, setTrail] = useState<Trail>();
  const [map, setMap] = useState<L.Map>();
  const params = useParams();
  const trailId = params.id;

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
    let newMap: L.Map;

    if (trail) {
      newMap = getMap(trail.geometry, trail._id);
      setMap(newMap);
    }

    return () => {
      newMap?.remove();
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
        <div
          id={`map-${trail._id}`}
          className='mt-4 h-96 w-full rounded-lg'
        ></div>
      )}
      {trail && <Comments trailId={trail._id} />}
    </div>
  );
}
