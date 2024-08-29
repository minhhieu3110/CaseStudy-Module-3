import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const MyContext = createContext({});
const MyContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({name:'', username: "", password: ""});
    const [cart, setCart] = useState([]);
    return(
        <MyContext.Provider value={{currentUser, setCurrentUser, cart, setCart}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider