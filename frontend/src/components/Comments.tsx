import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import AddComment from './AddComment';

interface CommentsProps {
  trailId: string;
}

interface Comment {
  text: string;
  user: string;
  createdAt: Date;
}

export default function Comments({ trailId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>();

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`trails/${trailId}/comments`);

      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className='mt-4'>
      <h2 className='text-lg font-bold'>Comments</h2>
      <AddComment trailId={trailId} fetchComments={fetchComments} />
      <div className='mt-4 flex flex-col gap-4'>
        {comments?.map((comment) => (
          <div className='chat'>
            <div className='chat-bubble bg-primary text-primary-content'>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
