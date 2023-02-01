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
  isLoggedIn: boolean;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    let localUser = window.localStorage.getItem(LOCALSTORAGE_KEY);
    if (localUser) {
      localUser = JSON.parse(localUser);
      if (!localUser) return window.localStorage.clear();
      setAccount(localUser as AuthUserType);
      setIsLoggedIn(true);
    }
  }, []);

  const login = function (user_id: number, username: string) {
    setAccount({
      user_id,
      username,
    });
    setIsLoggedIn(true);
    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        user_id,
        username,
      })
    );
  };
  return (
    <AuthContext.Provider value={{ account, login, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
