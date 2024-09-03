import {Outlet, useLocation} from "react-router-dom";
import ListCategories from "./ListCategories";

export default function Categories(){
    const isListCategories = useLocation().pathname === '/categories'
    return(
        <>
            {isListCategories && <ListCategories />}
            <Outlet/>
        </>
    )
}