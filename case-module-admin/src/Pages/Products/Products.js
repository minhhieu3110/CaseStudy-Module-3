import {Outlet, useLocation} from "react-router-dom";
import ListProducts from "./ListProducts";

export default function Products(){
    const isListProducts =useLocation().pathname ==='/products'
    return(
        <>
            {isListProducts && <ListProducts/>}
            <Outlet/>
        </>
    )
}