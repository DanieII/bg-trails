import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { TrailType } from '../types';
import { Link } from 'wouter';

type LikeBtnProps = {
  trail: TrailType;
  authToken: string | null;
  userId: string | null;
};

export default function LikeBtn({ trail, authToken, userId }: LikeBtnProps) {
  const [isLiked, setIsLiked] = useState<boolean>(
    userId ? (trail.likes?.includes(userId) ?? false) : false
  );

  const likeTrail = async () => {
    try {
      await axiosInstance.post(`/trails/${trail._id}/like`);
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {authToken ? (
        <button
          className='btn btn-circle absolute right-5 top-5 z-[1000]'
          onClick={likeTrail}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill={`${isLiked ? 'currentColor' : 'none'}`}
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </button>
      ) : (
        <>
          <button
            className='btn btn-circle absolute right-5 top-5 z-[1000]'
            onClick={() => {
              const modal = document.getElementById(
                'like_modal'
              ) as HTMLDialogElement;
              modal.showModal();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </button>
          <dialog id='like_modal' className='modal'>
            <div className='modal-box'>
              <h3 className='text-lg font-bold'>
                You need to be logged in in order to like.
              </h3>
              <p className='flex pt-4'>
                <Link href='/auth/login' className='btn mx-auto'>
                  Log in
                </Link>
              </p>
            </div>
            <form method='dialog' className='modal-backdrop'>
              <button>close</button>
            </form>
          </dialog>
        </>
      )}
    </>
  );
}
