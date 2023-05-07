import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { http } from "../services/httpClient";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  loading: boolean;
  loadingAuth: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type SignInProps = {
  email: string;
  password: string;
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user.name;

  const signIn = async ({ email, password }: SignInProps) => {
    setLoadingAuth(true);
    const res = await authService.signIn({ email, password });

    if (res) {
      const { id, name, token } = res;
      await AsyncStorage.setItem("@pizzaria", JSON.stringify({ ...res }));

      setUser({
        id,
        name,
        email,
        token,
      });
    }

    setLoadingAuth(false);
  };

  const signOut = async () => {
    await AsyncStorage.clear().then(() => {
      setUser({} as UserProps);
    });
  };

  useEffect(() => {
    AsyncStorage.getItem("@pizzaria").then((data) => {
      const userData: UserProps = JSON.parse(data as string);
      if (userData?.name) {
        setUser({ ...userData });
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
      }
      setLoading(false);
    });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ loading, loadingAuth, isAuthenticated, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
