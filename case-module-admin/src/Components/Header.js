import '../Styles/Header.css'
import MenuIcon from "../Icons/MenuIcon";
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

export default function Header() {
    return (
        <div className='header-admin'>
            <div className='left-header'>
                <button className='menu-icon'>
                    <MenuIcon/>
                </button>
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
                            <Button className='dropdown'>Name</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='dropdown-content'>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className='dropdown-item'>Detail</DropdownMenuItem>
                            <DropdownMenuItem className='dropdown-item'>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='dropdown-item'>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                
                </div>
            </div>
        </div>
    )
}