import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const MyContext = createContext({});
const MyContextProvider = ({ children }) => {
    
    return(
        <MyContext.Provider value={{}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider