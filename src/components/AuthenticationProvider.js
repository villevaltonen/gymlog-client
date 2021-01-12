import React from 'react';

const AuthenticationContext = React.createContext();

const useAuthentication = () => {
    const context = React.useContext(AuthenticationContext);
    if(!context) {
        throw new Error("useAuthentication must be used within a AuthenticationProvider");
    }
    return context;
}

const AuthenticationProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const value = React.useMemo(() => [isAuthenticated, setIsAuthenticated], [isAuthenticated]);
    return <AuthenticationContext.Provider value={value} {...props}/>
}

export { AuthenticationProvider, useAuthentication }