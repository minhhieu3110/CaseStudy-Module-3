import '../Styles/Sidebar.css';
import Package2Icon from "../Icons/Package2Icon";
import {Link} from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon";
import PackageIcon from "../Icons/PackageIcon";
import UsersIcon from "../Icons/UsersIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon";
import CategoriesIcon from "../Icons/CategoriesIcon";
import {useContext} from 'react';
import {MyContext} from "../MyContext";

export default function Sidebar() {
    const {isLoggedIn, isAdmin} = useContext(MyContext)
    return (
        <div className='container-sidebar'>
            <div className="logo-admin">
                <Package2Icon/>
                <Link to={'home'}>
                    <div>C03 Shop Admin</div>
                </Link>
            </div>
            <nav className='menu-sidebar'>
                <ul>
                    <li><Link to={"/home"}><HomeIcon/> Dashboard</Link></li>
                    <li className={!isLoggedIn ? 'disabled' : ''}>
                        <Link to={'/cart'}><ShoppingCartIcon/> Shopping Cart</Link>
                    </li>
                    <li className={!isAdmin ? 'disabled' : ''}>
                        <Link to={'/products'}><PackageIcon/> Products</Link>
                    </li>
                    <li className={!isAdmin ? 'disabled' : ''}>
                        <Link to={'/categories'}><CategoriesIcon/> Categories</Link>
                    </li>
                    <li className={!isAdmin ? 'disabled' : ''}>
                        <Link to={'/users'}><UsersIcon/> Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
