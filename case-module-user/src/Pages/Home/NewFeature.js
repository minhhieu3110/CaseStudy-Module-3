import newFeatures from '../../assets/Banner/New-Features.png'
import {useEffect, useState} from "react";
import axios from "axios";
import '../../App.css'
import {Card} from "flowbite-react";
import StarRateIcon from "../../Icons/StarRateIcon";
import {Link} from "react-router-dom";
export default function NewFeature() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        Promise.all([
            axios.get('http://localhost:3000/products'),
            axios.get('http://localhost:3000/categories')
        ])
            .then(([productsRes, categoriesRes]) => {
                setProducts(productsRes.data)
                console.log(products)
                setCategories(categoriesRes.data)
            })
            .catch(err=>{
                console.log(err)
            })
    },[])
    const getSubdirectory = (categoryName)=>{
        const category = categories.find(cate => cate.name === categoryName);
        return category ? category.subdirectory : '#'
    }
    const reversedProducts = [...products].reverse()
    const limitProductsToShow = reversedProducts.splice(0, 8)
    const formatCurrency = (value) => {
        return Number(value).toLocaleString('vi',{
            style: 'currency',
            currency: 'vnd',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
        })
    }
    return(
        <div className='container-newFeature'>
            <div className="banner-newFeature">
                <img src={newFeatures} alt="image Banner"/>
            </div>
            <br/>
            <div className="list-newFeature">
                {limitProductsToShow.map((item)=>(
                    <div className='card'>
                        <Link to={`${getSubdirectory(item.category)}/${item.name}`}>
                            <img src={item.images[0]} alt=""/>
                        </Link>
                        <div className="card-body">
                            <Link to={'#'}><h5 className='cart-title'>{item.name}</h5></Link>
                            <div className="rate">
                                <StarRateIcon/>
                                <StarRateIcon/>
                                <StarRateIcon/>
                                <StarRateIcon/>
                                <StarRateIcon/>
                                <span className='number-rate'>5.0</span>
                            </div>
                            <div className="price">{formatCurrency(item.price)}</div>
                            <button className='btn-buy-product'>Mua ngay</button>
                        </div>
                    </div>
                ))}
            </div>
            <br/>
        </div>
    )
}