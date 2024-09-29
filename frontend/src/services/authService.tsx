import { AxiosError } from "axios";
import axiosInstance from "../axiosConfig";

async function login(email: string, password: string) {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });

  return response.data.token;
}

async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const response = await axiosInstance.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });

  return response.data.token;
}

export { login, register };
