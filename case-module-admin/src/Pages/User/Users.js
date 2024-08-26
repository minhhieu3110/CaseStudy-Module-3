import {useLocation} from "react-router-dom";
import ListUsers from "./ListUsers";

export default function Users(){
    const isListUsers = useLocation().pathname === '/users'
    return(
        <>
            {isListUsers && <ListUsers/>}
        </>
    )
}