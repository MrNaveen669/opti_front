import React from "react";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [isAuth, setisAuth] = useState(() => {
    try {
      const savedAuth = localStorage.getItem('isAuthenticated');
      return savedAuth ? JSON.parse(savedAuth) : false;
    } catch (error) {
      console.error('Error reading auth state from localStorage:', error);
      return false;
    }
  });

  const [Authdata, setAuthData] = useState(() => {
    try {
      const savedAuthData = localStorage.getItem('authData');
      return savedAuthData ? JSON.parse(savedAuthData) : null;
    } catch (error) {
      console.error('Error reading auth data from localStorage:', error);
      return null;
    }
  });

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuth));
    } catch (error) {
      console.error('Error saving auth state to localStorage:', error);
    }
  }, [isAuth]);

  // Save auth data to localStorage whenever it changes
  useEffect(() => {
    try {
      if (Authdata) {
        localStorage.setItem('authData', JSON.stringify(Authdata));
      } else {
        localStorage.removeItem('authData');
      }
    } catch (error) {
      console.error('Error saving auth data to localStorage:', error);
    }
  }, [Authdata]);

  // Enhanced login function
  const login = (userData) => {
    setisAuth(true);
    setAuthData(userData);
  };

  // Enhanced logout function
  const logout = () => {
    setisAuth(false);
    setAuthData(null);
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authData');
    } catch (error) {
      console.error('Error clearing auth data from localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuth, 
      setisAuth, 
      Authdata, 
      setAuthData,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;