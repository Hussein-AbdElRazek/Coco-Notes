import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    logIn: (token) => { },
    logOut: () => { }
})

export const AuthContextProvider = (props) =>
{
    const initialToken = localStorage.getItem("token");
    const [token, setToken] = useState(initialToken);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!initialToken)

    const loginHandler = (token) =>
    {
        setToken(token)
        localStorage.setItem("token", token);
        setUserIsLoggedIn(true)
    }

    const logOutHandler = () =>
    {
        setToken(null);
        setUserIsLoggedIn(false);
        localStorage.clear()
    }


    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        logIn: loginHandler,
        logOut: logOutHandler
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;