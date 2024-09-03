import '../Styles/Header.css'
import SearchIcon from "../Icons/SearchIcon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import {Button} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";

export default function Header() {
    const {logout, currentUser} = useContext(MyContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div className='header-admin'>
            <div className='left-header'>
                <h4>Dashboard</h4>
            </div>
            <div className="right-header">
                <div className='search'>
                    <SearchIcon className="search-icon"/>
                    <input type="search" placeholder={'Search'}/>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='dropdown'>Hello {currentUser.name}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='dropdown-content'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className='dropdown-item'>Detail</DropdownMenuItem>
                            <DropdownMenuItem className='dropdown-item'>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='dropdown-item' onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                
                </div>
            </div>
        </div>
    )
}