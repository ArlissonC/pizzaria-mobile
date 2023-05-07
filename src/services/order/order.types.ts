export type OpenTableRequest = {
  table: number;
};

export type OpenTableResponse = {
  created_at: string;
  draft: boolean;
  id: string;
  name: string | null;
  status: boolean;
  table: number;
  updated_at: string;
};

export type CloseTableResponse = {
  id: string;
  table: number;
};

export type AddProductOrderRequest = {
  order_id: string;
  product_id: string;
  amount: number;
};

export type AddProductOrderResponse = {
  id: string;
  amount: number;
  product_id: string;
};

export type RemoveProductOrderResponse = {
  id: string;
  amout: string;
  product_id: string;
  order_id: string;
};

export type FinishOrderRequest = {
  order_id: string;
};

export type FinishOrderResponse = {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name: string;
};
