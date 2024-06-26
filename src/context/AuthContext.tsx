import { createContext, FC, ReactNode, useEffect, useState } from "react";
import User from "../types/user.types";
import toast from "react-hot-toast";
import api from "../utils/api";
import { AxiosError } from "axios";

interface AuthContextState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialAuthState: AuthContextState = {
  isAuthenticated: false,
  user: null,
  login: async () => {
    return false;
  },
  logout: () => {},
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
        profilePicture: parseData?.profile_picture,
        role: parseData.role ?? "user",
        phoneNumber: parseData.phone_number,
        accessToken: parseData.accessToken,
      } as User);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.data;
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        profilePicture: userData?.profile_picture,
        phoneNumber: userData.phone_number,
        accessToken: userData.accessToken,
      } as User);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsAuthenticated(true);
      toast.success(res.data.message);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errMessage = error.response?.data.message;
        toast.error(errMessage);
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.success("Logout successfully");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
