import {useEffect, useState} from "react";
import axios from "axios";

export default function useGetOrder(urlCart) {
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        axios.get(urlCart).then((response) => {
            setListOrder(response.data)
        })
            .catch(err=>{
                console.log(err)
            })
    },[])
    return {listOrder}
}