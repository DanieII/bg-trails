import { FormEvent, SyntheticEvent, useContext, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';
import { validatePassword } from '../utils/validation';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setAuthToken } = useContext(AuthContext);
  const [location, navigate] = useLocation();

  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const token = await login(email, password);
      setAuthToken(token);
      navigate('~/');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  }

  return (
    <div className='container !w-96 rounded-xl bg-primary !p-12'>
      <h1 className='mb-4 text-center text-2xl font-semibold text-primary-content'>
        Log in
      </h1>
      <div>
        <form className='form-control gap-4' onSubmit={handleLoginSubmit}>
          <input
            type='email'
            placeholder='Email'
            className='input input-bordered'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            className='input input-bordered'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
      </div>
      <p className='mx-auto mt-4 text-center text-primary-content underline'>
        <Link href='~/auth/register'>Don't have an account? Register</Link>
      </p>
    </div>
  );
}
