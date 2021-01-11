import React from 'react';

const AuthenticationContext = React.createContext();

const authenticationReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": {
            return  {
                ...state,
                isAuthenticated: true,
                username: action.payload.user,
            };
        }
        case "LOGOUT": {
            return {
                ...state,
                isAuthenticated: false,
                username: "",
            }
        }
        default: {
            throw new Error(`Unknown action: ${action.type}`)
        }
    }
}

const AuthenticationProvider = (props) => {
    const [state, dispatch] = React.useReducer(authenticationReducer, {isAuthenticated: false, user: {
        username: "",
    }});
    const value = React.useMemo(() => [state, dispatch], [state]);
    return <AuthenticationContext.Provider value={value} {...props}/>
}

const useAuthentication = (authenticated) => {
    const context = React.useContext(AuthenticationContext);
    if(!context) {
        throw new Error("useAuthentication must be used within a AuthenticationProvider");
    }
    const [ state, dispatch ] = context;

    let auth;
    if(authenticated) {
        auth = () => dispatch({type: "LOGIN"})
    } else {
        auth = () => dispatch({type: "LOGOUT"})
    }

    return {
        state,
        dispatch,
        auth
    }
}

export { AuthenticationProvider, useAuthentication }