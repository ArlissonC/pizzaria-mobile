export type SignInResponse = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  data: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
};

export type GetUserResponse = {
  id: string;
  email: string;
  name: string;
};
