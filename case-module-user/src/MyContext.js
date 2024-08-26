import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const MyContext = createContext({});
const MyContextProvider = ({ children }) => {
    const [dataProducts, setDataProducts] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/products').then((res)=>{
            setDataProducts(res.data)
        })
    }, []);
    return(
        <MyContext.Provider value={{dataProducts, setDataProducts}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider