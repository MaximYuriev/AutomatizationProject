import { createContext, useState, useEffect } from "react";
import setting from "../../setting";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuth] = useLocalStorage("auth","false");
    const [userRole, setUserRole] = useLocalStorage("userRole","0");
    const [userId, setUserId] = useLocalStorage("userId","0");
    const toggleAuth = (id,role) =>{
      setAuth(isAuthenticated==="false" ? "true":"false")
      setUserRole(userRole==="0"?`${role}`:"0")
      setUserId(userId==="0"?`${id}`:"0")
    }
    return (
      <AuthContext.Provider value={{isAuthenticated, toggleAuth, userRole,userId}}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;