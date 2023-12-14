// UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Initialize username from localStorage or default to an empty string
    return localStorage.getItem("username") || "";
  });

  const setUser = (newUsername) => {
    setUsername(newUsername);
    // Save the username to localStorage
    localStorage.setItem("username", newUsername);
  };

  // Cleanup localStorage on component unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("username");
    };
  }, []);

  return (
    <UserContext.Provider value={{ username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
