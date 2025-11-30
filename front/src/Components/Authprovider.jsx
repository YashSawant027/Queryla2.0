import React, { Children, createContext, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [islogin, setislogin] = useState(
        !!localStorage.getItem('accessToken')
    )
    return(
        <AuthContext.Provider value={{islogin, setislogin}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
export {AuthContext}