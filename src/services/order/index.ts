import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  AddProductOrderRequest,
  AddProductOrderResponse,
  CloseTableResponse,
  FinishOrderRequest,
  FinishOrderResponse,
  OpenTableRequest,
  OpenTableResponse,
  RemoveProductOrderResponse,
} from "./order.types";

const openTable = async (
  params: OpenTableRequest,
): Promise<OpenTableResponse | undefined> => {
  try {
    const res = await httpClient.post<OpenTableResponse>("order", params);
    const data: OpenTableResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const closeTable = async (
  orderId: string,
): Promise<CloseTableResponse | undefined> => {
  try {
    const res = await httpClient.del<CloseTableResponse>(
      `order?order_id=${orderId}`,
    );
    const data: CloseTableResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const addProductsOrder = async (
  params: AddProductOrderRequest,
): Promise<AddProductOrderResponse | undefined> => {
  try {
    const res = await httpClient.post<AddProductOrderResponse>(
      "order/add",
      params,
    );
    const data: AddProductOrderResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const removeProductsOrder = async (
  item_id: string,
): Promise<RemoveProductOrderResponse | undefined> => {
  try {
    const res = await httpClient.del<RemoveProductOrderResponse>(
      `order/remove?item_id=${item_id}`,
    );
    const data: RemoveProductOrderResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

const finishOrder = async (
  params: FinishOrderRequest,
): Promise<FinishOrderResponse | undefined> => {
  try {
    const res = await httpClient.put<FinishOrderResponse>("order/send", params);
    const data: FinishOrderResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
    }
  }
};

export const orderService = {
  openTable,
  closeTable,
  addProductsOrder,
  removeProductsOrder,
  finishOrder,
};
