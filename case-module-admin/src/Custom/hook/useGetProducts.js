import {useEffect, useState} from "react";
import axios from "axios";

export default function useGetProducts(urlProducts) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(urlProducts).then((response) => {
            setProducts(response.data)
        })
            .catch(err =>{
                console.log(err)
            })
    }, [urlProducts])
    return {products};
}