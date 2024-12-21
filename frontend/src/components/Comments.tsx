import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import AddComment from './AddComment';
import { CommentType } from '../types';

type CommentsProps = {
  trailId: string;
};

export default function Comments({ trailId }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`trails/${trailId}/comments`);

      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString();
  };

  return (
    <div className='mt-4'>
      <h2 className='text-xl font-bold'>Comments</h2>
      <AddComment trailId={trailId} fetchComments={fetchComments} />
      <div className='mt-4 flex flex-col gap-4'>
        {comments?.map((comment) => (
          <div key={comment._id}>
            <div className='flex gap-2'>
              <p className='font-bold'>
                {comment.user.firstName} {comment.user.lastName}
              </p>
              <p>{formatDate(comment.createdAt)}</p>
            </div>
            <p className='break-words'>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
