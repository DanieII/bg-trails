import { FormEvent, useContext, useState } from "react";
import { validateName, validatePassword } from "../utils/validation";
import { login, register } from "../services/authService";
import { Link, useLocation } from "wouter";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthToken } = useContext(AuthContext);
  const [location, navigate] = useLocation();

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    function validateAndSetError(
      validationFn: (value: string) => string,
      toValidate: string,
    ) {
      const validationError = validationFn(toValidate);
      if (validationError) {
        setErrorMessage(validationError);

        return true;
      }

      return false;
    }

    if (validateAndSetError(validateName, firstName)) return;
    if (validateAndSetError(validateName, lastName)) return;
    if (validateAndSetError(validatePassword, password)) return;

    try {
      const token = await register(firstName, lastName, email, password);
      setAuthToken(token);
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage);
    }
  }

  return (
    <section>
      <div className="container bg-primary rounded-xl !p-12 !w-96">
        <h1 className="text-primary-content text-center font-semibold text-2xl mb-4">
          Register
        </h1>
        <div>
          <form className="form-control gap-4" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && (
              <p className="text-error font-bold text-center mx-auto break-words">
                {errorMessage}
              </p>
            )}
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
        <p className="text-primary-content underline text-center mx-auto mt-4">
          <Link href="/login">Already have an account? Log in</Link>
        </p>
      </div>
    </section>
  );
}
