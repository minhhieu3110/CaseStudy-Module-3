import '../Styles/Sidebar.css'
import Package2Icon from "../Icons/Package2Icon";
import {Link} from "react-router-dom";
import HomeIcon from "../Icons/HomeIcon";
import PackageIcon from "../Icons/PackageIcon";
import UsersIcon from "../Icons/UsersIcon";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon";
import CategoriesIcon from "../Icons/CategoriesIcon";

export default function Sidebar() {
    return (
        <div className='container-sidebar'>
            <div className="logo-admin">
                <Package2Icon></Package2Icon>
                <div>C03 Shop Admin</div>
            </div>
            <nav className='menu-sidebar'>
                <ul>
                    <li><Link to={""}><HomeIcon/> Dashboard</Link></li>
                    <li><Link to={'cart'}><ShoppingCartIcon/> Shopping Cart</Link></li>
                    <li><Link to={'products'}><PackageIcon/> Products</Link></li>
                    <li><Link to={'categories'}><CategoriesIcon/> Categories</Link></li>
                    <li><Link to={'users'}><UsersIcon/> Users</Link></li>
                </ul>
            </nav>
        </div>
    );
}
