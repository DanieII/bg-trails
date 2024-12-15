import { useLocation } from 'wouter';
import background from '../assets/header-bg.webp';
import { useState } from 'react';

export default function Header() {
  const [location, setLocation] = useLocation();
  const [search, setSearch] = useState<string>('');

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(`/explore?search=${search}`);
  };

  return (
    <header className='relative flex h-[60vh] items-center justify-center'>
      <div className='container my-auto !w-[initial]'>
        <h1 className='text-center text-4xl font-bold text-white'>
          Find hiking trails in Bulgaria
        </h1>
        <form onSubmit={handleSearchFormSubmit}>
          <label className='input input-bordered mt-2 flex items-center gap-2'>
            <input
              type='text'
              className='grow'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search for a trail'
            />
            <button type='submit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </label>
        </form>
      </div>
      <div className='absolute left-0 top-0 z-[-1] h-full w-full'>
        <img
          src={background}
          alt='mountains'
          className='h-full w-full object-cover'
        />
      </div>
    </header>
  );
}
