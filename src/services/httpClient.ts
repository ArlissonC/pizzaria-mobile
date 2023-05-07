import axios, { AxiosResponse } from "axios";

const baseURL = "https://arlissonc-pizzaria-api.onrender.com";

export const http = axios.create({
  baseURL,
});

const get = <T>(url: string, params?: object): Promise<AxiosResponse<T>> =>
  http.get(url, params);

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
