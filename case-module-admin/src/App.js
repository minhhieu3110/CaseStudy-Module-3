import './App.css';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddProduct from "./Pages/Products/AddProduct";
import Products from "./Pages/Products/Products";
import EditProduct from "./Pages/Products/EditProduct";
import Categories from "./Pages/Categories/Categories";
import AddCategory from "./Pages/Categories/AddCategory";
import EditCategory from "./Pages/Categories/EditCategory";
import Users from "./Pages/User/Users";

function App() {
    return (
        <div className='container-admin'>
            <div className="left">
                <Sidebar/>
            </div>
            <div className="right">
                <Header/>
                <div className="main">
                    <Routes>
                        <Route path={''} element={<Home/>}/>
                        <Route path={'products'} element={<Products/>}>
                            <Route path={'add-product'} element={<AddProduct/>}/>
                            <Route path={'edit-product/:id'} element={<EditProduct/>}/>
                        </Route>
                        <Route path={'categories'} element={<Categories/>}>
                            <Route path={'add-category'} element={<AddCategory/>}/>
                            <Route path={'edit-category/:id'} element={<EditCategory/>}/>
                        </Route>
                        <Route path={'users'} element={<Users/>}>
                        
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
