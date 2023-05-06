import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  GetUserResponse,
} from "./auth.types";

const signIn = async (
  param: SignInRequest,
): Promise<SignInResponse | undefined> => {
  try {
    const res = await httpClient.post<SignInResponse>("users/session", param);
    const data: SignInResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const signUp = async (
  param: SignUpRequest,
): Promise<SignUpResponse | undefined> => {
  try {
    const res = await httpClient.post<SignUpResponse>("users", param);
    const data: SignUpResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const getUser = async (): Promise<GetUserResponse | undefined> => {
  try {
    const res = await httpClient.get<GetUserResponse>("users/me");
    const data: GetUserResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

export const authService = {
  signIn,
  signUp,
  getUser,
};
