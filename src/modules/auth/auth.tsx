import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOCALSTORAGE_KEY } from "../../config/constants";

type AuthUserType = {
  user_id?: number;
  username?: string;
};
type AuthContextType = {
  account: AuthUserType;
  login: (user_id: number, username: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [account, setAccount] = useState<AuthUserType>({});
  useEffect(() => {
    let localUser = window.localStorage.getItem(LOCALSTORAGE_KEY);
    if (localUser) {
      localUser = JSON.parse(localUser);
      if (!localUser) return window.localStorage.clear();
      setAccount(localUser as AuthUserType);
    }
  }, []);

  const login = function (user_id: number, username: string) {
    setAccount({
      user_id,
      username,
    });
  };
  return (
    <AuthContext.Provider value={{ account, login }}>
      {children}
    </AuthContext.Provider>
  );
}
