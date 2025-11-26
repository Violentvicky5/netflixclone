import { createContext, useEffect, useState } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(()=>{
    return localStorage.getItem("email")||"";
  });
  useEffect(()=>{
    localStorage.setItem("email",email);
  },[email]);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
