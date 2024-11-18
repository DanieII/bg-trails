import { FormEvent, useContext, useState } from 'react';
import {
  validateName,
  validatePassword,
  validateEmail
} from '../utils/validation';
import { login, register } from '../services/authService';
import { Link, useLocation } from 'wouter';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setAuthToken } = useContext(AuthContext);
  const [location, navigate] = useLocation();

  const validateAndSetError = (
    validationFn: (value: string) => string,
    toValidate: string
  ) => {
    const validationError = validationFn(toValidate);
    if (validationError) {
      setErrorMessage(validationError);

      return true;
    }

    return false;
  };

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validations = [
      { validationFn: validateEmail, toValidate: email },
      { validationFn: validateName, toValidate: firstName },
      { validationFn: validateName, toValidate: lastName },
      { validationFn: validatePassword, toValidate: password }
    ];

    for (const { validationFn, toValidate } of validations) {
      if (validateAndSetError(validationFn, toValidate)) {
        return;
      }
    }

    try {
      const token = await register(firstName, lastName, email, password);
      setAuthToken(token);
      navigate('~/');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  }

  return (
    <section>
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
    </section>
  );
}
