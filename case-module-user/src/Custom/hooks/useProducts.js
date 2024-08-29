import {useEffect, useState} from "react";
import axios from "axios";

export  function useProducts(urlProducts) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(urlProducts).then(res => {
            setProducts(res.data)
        })
            .catch(err =>{
                console.log(err)
            })
    }, []);
    return {products}
}