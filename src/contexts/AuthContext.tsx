import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ loading, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
