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
