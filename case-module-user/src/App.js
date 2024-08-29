import './App.css';
import Header from "./Components/Header";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Sports from "./Pages/Pages-Categories/Sports";
import DetailProducts from "./Pages/DetailProducts";
import {useContext} from "react";
import {MyContext} from "./MyContext";
import Technology from "./Pages/Pages-Categories/Technology";
import Travel from "./Pages/Pages-Categories/Travel";
import Education from "./Pages/Pages-Categories/Education";
import Art from "./Pages/Pages-Categories/Art";
import Cart from "./Pages/Cart";

function App() {
    return (
            <div className="App">
                <Header />
                <div className='container-body'>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path='the-thao' element={<Sports />} />
                        <Route path='cong-nghe' element={<Technology />} />
                        <Route path='du-lich' element={<Travel />} />
                        <Route path='giao-duc' element={<Education />} />
                        <Route path='nghe-thuat' element={<Art />} />
                        <Route path=':subdirectory/:nameId' element={<DetailProducts />} />
                        <Route path='cart' element={<Cart/>}/>
                        <Route path={'register'} element={<Register />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;