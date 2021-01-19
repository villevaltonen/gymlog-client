import React from "react";

const AuthenticationContext = React.createContext();

const useAuthentication = () => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within a AuthenticationProvider"
    );
  }
  return context;
};

const AuthenticationProvider = (props) => {
  const [authentication, setAuthentication] = React.useState({
    isAuthenticated: false,
    loginTime: "",
    credentials: {
      username: "",
      password: "",
    },
    cookieConsent: false,
  });
  const value = React.useMemo(() => [authentication, setAuthentication], [
    authentication,
  ]);
  return <AuthenticationContext.Provider value={value} {...props} />;
};

export { AuthenticationProvider, useAuthentication };
