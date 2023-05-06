import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const baseURL = "http://192.168.0.158:3333";

const http = axios.create({
  baseURL,
});

AsyncStorage.getItem("@pizzaria").then((data) => {
  const token = JSON.parse(data as string)?.token;
  if (token) http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
});

const get = <T>(
  url: string,
  params?: object,
  headers?: object,
): Promise<AxiosResponse<T>> => http.get(url, { params, headers });

const post = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.post(url, data);

const put = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.put(url, data);

const del = <T>(url: string): Promise<AxiosResponse<T>> => http.delete(url);

export const httpClient = {
  get,
  post,
  put,
  del,
};
