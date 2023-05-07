import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import { ListCategoriesResponse } from "./category.types";

const listCategories = async (): Promise<
  ListCategoriesResponse[] | undefined
> => {
  try {
    const res = await httpClient.get<ListCategoriesResponse[]>("category");
    const data: ListCategoriesResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

export const categoryService = {
  listCategories,
};
