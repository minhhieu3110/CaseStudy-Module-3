import './App.css';
import Header from "./Components/Header";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Sports from "./Pages/Pages-Categories/Sports";
import DetailProducts from "./Pages/DetailProducts";
import {useContext} from "react";
import {MyContext} from "./MyContext";

function App() {
    const {categoryData} = useContext(MyContext)
    return (
            <div className="App">
                <Header />
                <div className='container-body'>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path='the-thao' element={<Sports />} />
                        <Route path=':subdirectory/:nameId' element={<DetailProducts />} />
                        <Route path={'register'} element={<Register />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;