import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  CloseTableResponse,
  OpenTableRequest,
  OpenTableResponse,
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

export const orderService = { openTable, closeTable };
