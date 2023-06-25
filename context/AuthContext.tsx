"use client";
import {
  getSessionItem,
  removeSessionItem,
  setSessionItem,
} from "@/utils/sessionStorage";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextData {
  name: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  name: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const username = getSessionItem("user-name");
    if (username) {
      setName(username);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  const login = (name: string) => {
    setName(name);
    setSessionItem("user-name", name);
    router.push("/dashboard");
  };

  const logout = () => {
    setName(null);
    removeSessionItem("user-name");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
