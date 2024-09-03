import {createContext, useEffect, useState} from "react";

export const MyContext = createContext({})
const MyContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState({name: ''});
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataLogin'));
        console.log(data)
        if (data) {
            setIsLoggedIn(true);
            setIsAdmin(data.user.role = 'admin');
        } else {
            setIsLoggedIn(false)
            setIsAdmin(false)
        }
    }, []);
    const login = (data) => {
        localStorage.setItem('dataLogin', JSON.stringify(data));
        setIsLoggedIn(true);
        setIsAdmin(data.user.role === 'admin');
    };
    const logout = () => {
        localStorage.removeItem('dataLogin');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setCurrentUser('')
    };
    return (
        <MyContext.Provider value={{isLoggedIn, isAdmin, currentUser, setCurrentUser, login, logout}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider