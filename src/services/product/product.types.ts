export type GetProductsByCategoryRequest = {
  category_id: string;
};
export type GetProductsByCategoryResponse = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
};
