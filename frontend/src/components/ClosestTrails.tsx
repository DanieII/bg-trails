import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { TrailType } from '../types';
import Trail from './Trail';

export default function ClosestTrails() {
  const [userLocation, setUserLocation] = useState<[number, number]>();
  const [closestTrails, setClosestTrails] = useState<TrailType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Enable location access to get closest trails'
  );

  useEffect(() => {
    if (userLocation) {
      fetchClosestTrails();
    } else {
      getUserLocation();
    }
  }, [userLocation]);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
        setErrorMessage('');
      },
      () => setErrorMessage('Could not retrieve user location')
    );
  };

  const fetchClosestTrails = async () => {
    if (!userLocation) return;
    const [lat, lon] = userLocation;

    try {
      const response = await axiosInstance.get(
        `/trails/closest?lat=${lat}&lon=${lon}`
      );
      const trails = response.data;

      if (trails) {
        setClosestTrails(response.data);
      } else {
        setErrorMessage('No trails near you');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h2 className='mb-2 text-center text-3xl font-bold sm:text-left'>
        Explore trails near you
      </h2>
      <div className='carousel w-full'>
        <p className='mx-auto text-lg'>{errorMessage}</p>
        {closestTrails &&
          closestTrails.map((trail, i) => {
            const trailNumber = i + 1;

            return (
              <div
                key={trail._id}
                id={`closest-slide${trailNumber}`}
                className='carousel-item relative m-2 w-full overflow-visible'
              >
                <div className='w-full'>
                  <Trail trail={trail} mapID='closest' />
                </div>
                <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
                  <a
                    href={`#closest-slide${trailNumber > 1 ? trailNumber - 1 : trailNumber}`}
                    className='btn btn-circle'
                  >
                    ❮
                  </a>
                  <a
                    href={`#closest-slide${trailNumber < closestTrails.length ? trailNumber + 1 : trailNumber}`}
                    className='btn btn-circle'
                  >
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
