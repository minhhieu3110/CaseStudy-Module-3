import React, {useEffect, useState} from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import '../Styles/Header.css';
import UserIcon from "../Icons/UserIcon";
import CartIcon from "../Icons/CartIcon";
import SearchIcon from "../Icons/SearchIcon";
import Popup from "reactjs-popup";
import Login from "../Pages/Login";

export default function Header() {
    const [categories, setCategories] = useState([]);
    const location = useLocation().pathname === '/register';
    useEffect(() => {
        axios.get('http://localhost:3000/categories')
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className='container-header'>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" width={'150px'} height={'30px'} />
                </Link>
            </div>
            <div className="nav-mid">
                {categories.map(category => (
                    <Link key={category.id} to={`/${category.subdirectory}`}>{category.name}</Link>
                ))}
            </div>
            <div className="nav-right">
                <Popup
                    trigger={<Link to="#"><UserIcon /></Link>}
                >
                    {location ? null : <Login/>}
                </Popup>
                <Link id="cart-user" to="/cart">
                    <CartIcon />
                </Link>
                <Link id="search-user" to="/search">
                    <SearchIcon />
                </Link>
            </div>
        </div>
    );
}
