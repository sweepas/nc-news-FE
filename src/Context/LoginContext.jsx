import { useContext, useState, useEffect, createContext } from "react";

export const LoginContext = createContext();

export const useAuth = () => {
  return useContext(LoginContext);
};

export const LoginProvider = (props) => {
  const [authUser, setAuthUser] = useState("");
  const [logedIn, setLogedIn] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    logedIn,
    setLogedIn,
  };

  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};
