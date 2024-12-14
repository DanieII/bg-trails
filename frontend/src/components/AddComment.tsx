import { FormEvent, useState, useContext } from 'react';
import axiosInstance from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'wouter';

type AddCommentProps = {
  trailId: string;
  fetchComments: () => void;
};

export default function AddComment({
  trailId,
  fetchComments
}: AddCommentProps) {
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { authToken } = useContext(AuthContext);

  const addComment = async () => {
    try {
      await axiosInstance.post(`trails/${trailId}/comments`, {
        text: comment
      });
      setErrorMessage('');
      fetchComments();
    } catch (error) {
      console.log(error);
      setErrorMessage('Could not submit comment');
    }
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!comment || !comment.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setComment('');
    await addComment();
  };

  return (
    <div className='mt-4'>
      {authToken ? (
        <form className='form-control gap-2' onSubmit={handleCommentSubmit}>
          <textarea
            placeholder='Add a comment'
            required
            className='textarea textarea-bordered'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {errorMessage && (
            <p className='mx-auto break-words text-center font-bold text-error'>
              {errorMessage}
            </p>
          )}
          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
      ) : (
        <div className='flex flex-col gap-2 text-center'>
          <p>You need to log in to add a comment.</p>
          <Link to='~/auth/login' className='btn'>
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}
