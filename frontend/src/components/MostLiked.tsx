import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { TrailType } from '../types';
import Trail from './Trail';

export default function MostLiked() {
  const [mostLikedTrails, setMostLikedTrails] = useState<TrailType[]>([]);

  useEffect(() => {
    fetchMostLikedTrails();
  }, []);

  const fetchMostLikedTrails = async () => {
    try {
      const response = await axiosInstance.get('/trails/most-liked');
      setMostLikedTrails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h2 className='mb-2 text-center text-3xl font-bold sm:text-left'>
        Most liked across Bulgaria
      </h2>
      <div className='carousel w-full'>
        {mostLikedTrails &&
          mostLikedTrails.map((trail, i) => {
            const trailNumber = i + 1;

            return (
              <div
                key={trail._id}
                id={`liked-slide${trailNumber}`}
                className='carousel-item relative m-2 w-full overflow-visible'
              >
                <div className='w-full'>
                  <Trail trail={trail} mapID='most-liked' />
                </div>
                <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
                  <a
                    href={`#liked-slide${trailNumber > 1 ? trailNumber - 1 : trailNumber}`}
                    className='btn btn-circle'
                  >
                    ❮
                  </a>
                  <a
                    href={`#liked-slide${trailNumber < mostLikedTrails.length ? trailNumber + 1 : trailNumber}`}
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
