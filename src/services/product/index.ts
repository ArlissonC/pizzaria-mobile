import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  GetProductsByCategoryRequest,
  GetProductsByCategoryResponse,
} from "./product.types";

const getProductsByCategory = async (
  params: GetProductsByCategoryRequest,
): Promise<GetProductsByCategoryResponse[] | undefined> => {
  try {
    const res = await httpClient.get<GetProductsByCategoryResponse[]>(
      "product/categories",
      {
        params: {
          ...params,
        },
      },
    );

    const data: GetProductsByCategoryResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

export const productService = {
  getProductsByCategory,
};
