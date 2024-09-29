import { FormEvent, SyntheticEvent, useContext, useState } from "react";
import { Link, useLocation } from "wouter";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";
import { validatePassword } from "../utils/validation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthToken } = useContext(AuthContext);
  const [location, navigate] = useLocation();

  async function handleLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const token = await login(email, password);
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
          Log in
        </h1>
        <div>
          <form className="form-control gap-4" onSubmit={handleLoginSubmit}>
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
          <Link href="/register">Don't have an account? Register</Link>
        </p>
      </div>
    </section>
  );
}
