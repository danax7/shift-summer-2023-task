import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../app/constants/requestUrl";

const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (token) {
          const response = await axios.get(url + "/users/session", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success === true) {
            setIsAuth(true);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении сессии:", error);
      }
    };

    getSession();
  }, []);

  const updateSessionStatus = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        const response = await axios.get(url + "/users/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success === true) {
          setIsAuth(true);
        }
      }
    } catch (error) {
      console.error("Ошибка при обновлении сессии:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, updateSessionStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
