import { FormEvent, useContext, useState } from 'react';
import { validateEmail } from '../utils/validation';
import { register } from '../services/authService';
import { Link, useLocation } from 'wouter';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setAuthToken } = useContext(AuthContext);
  const [location, navigate] = useLocation();

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      setErrorMessage('Enter a valid email');

      return;
    }

    try {
      const token = await register(firstName, lastName, email, password);

      setAuthToken(token);
      navigate('~/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setErrorMessage(error.response?.data.message);
        } else {
          console.log(error);
        }
      }
    }
  }

  return (
    <div className='container !w-96 rounded-xl bg-primary !p-12'>
      <h1 className='mb-4 text-center text-2xl font-semibold text-primary-content'>
        Register
      </h1>
      <div>
        <form className='form-control gap-4' onSubmit={handleLoginSubmit}>
          <input
            type='text'
            placeholder='First Name'
            className='input input-bordered'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Last Name'
            className='input input-bordered'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
        <Link href='~/auth/login'>Already have an account? Log in</Link>
      </p>
    </div>
  );
}
