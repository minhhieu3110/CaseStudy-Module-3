import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const MyContext = createContext({})
const MyContextProvider = ({ children }) => {
    const [listOrders, setListOrder] = useState([])
    const [listProducts, setListProducts] = useState([])
    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/carts').then((response) => {
            setListOrder(response.data)
        })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3000/products').then((response) => {
            setListProducts(response.data)
        })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3000/users').then((response) => {
            setListUsers(response.data)
        })
    }, []);
    return(
        <MyContext.Provider value={{listOrders, setListOrder, listProducts, setListProducts, listUsers, setListUsers}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider