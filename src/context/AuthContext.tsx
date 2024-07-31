import { createContext, FC, ReactNode, useEffect, useState } from "react";
import User from "../types/user.types";
import api from "../utils/api";
import { AxiosError } from "axios";
import { displayNotification } from "../utils/helper";

interface AuthContextState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  initializeUser: (user: User) => void;
}

const initialAuthState: AuthContextState = {
  isAuthenticated: false,
  user: null,
  login: async () => {
    return false;
  },
  logout: () => {},
  updateUser: () => {},
  initializeUser: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialAuthState);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      const parseData = JSON.parse(storeUser);
      setUser({
        id: parseData.id,
        name: parseData.name,
        email: parseData.email,
        profilePicture: parseData?.profilePicture,
        phoneNumber: parseData.phoneNumber,
        isVerified: parseData.isVerified,
        accessToken: parseData.accessToken,
      } as User);
      setIsAuthenticated(true);
    }
  }, []);

  const initializeUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const newUser: User = {
        ...user,
        ...updates,
      };
      setUser(newUser);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data;
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData?.profilePicture,
        phoneNumber: userData.phoneNumber,
        isVerified: userData.isVerified,
        accessToken: userData.accessToken,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      displayNotification(res.data.message, "success");
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errMessage = error.response?.data.message;
        displayNotification(errMessage, "error");
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    displayNotification("Logout successfully", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        updateUser,
        initializeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
