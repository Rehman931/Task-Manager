// src/Context/JwtContext.js
import { createContext, useState } from "react";

export const JwtContext = createContext();

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState(""); // store JWT token here

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};
