import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import Trail from './Trail';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearch } from 'wouter';
import { TrailType } from '../types';

export default function Explore() {
  const [trails, setTrails] = useState<TrailType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [locations, setLocations] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>('');
  const searchString = useSearch();

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchTrails(0);
  }, [locationFilter]);

  const fetchTrails = async (currentPage = page) => {
    try {
      const searchParams = new URLSearchParams(searchString);
      const search = searchParams.get('search') || '';
      const response = await axiosInstance.get(
        `/trails?page=${currentPage}&limit=8&location=${locationFilter}&search=${search}`
      );

      // Reset trails if on first page
      if (currentPage === 0) {
        setTrails(response.data);
      } else {
        setTrails((prevTrails) => [...prevTrails, ...response.data]);
      }

      setHasMore(response.data.length > 0);
      setPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axiosInstance.get('/trails/locations');

      setLocations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container min-h-screen'>
      <div className='flex items-center justify-between'>
        <h1 className='hidden text-center text-2xl font-bold sm:block sm:text-left'>
          Explore hiking trails in Bulgaria
        </h1>
        <details className='dropdown dropdown-end mx-auto sm:mx-0'>
          <summary className='btn btn-primary m-1'>Locations</summary>
          <ul className='menu dropdown-content z-[1] w-52 rounded-box bg-primary p-2 text-primary-content shadow'>
            {locations.map((location) => (
              <li key={location}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setLocationFilter(location);
                  }}
                >
                  {location}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <InfiniteScroll
        dataLength={trails.length}
        next={fetchTrails}
        hasMore={hasMore}
        loader={
          <div className='flex items-center justify-center'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        }
      >
        <div className='my-6 flex flex-wrap gap-6'>
          {trails.map((trail) => (
            <Trail key={trail._id} trail={trail} className='w-full sm:w-1/3' />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
