import newFeatures from '../../assets/Banner/New-Features.png'
import {useEffect, useState} from "react";
import axios from "axios";
import '../../App.css'
import StarRateIcon from "../../Icons/StarRateIcon";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../Custom/utils/FormatCurrency";
import {useProductsAndCategories} from "../../Custom/hooks/useProductsAndCategories";

export default function NewFeature() {
    const {
        products,
        categories,
        getSubdirectory
    } = useProductsAndCategories('http://localhost:3000/products', 'http://localhost:3000/categories');
    const reversedProducts = [...products].reverse()
    const limitProductsToShow = reversedProducts.splice(0, 8)
    return (
        <div className='container-newFeature'>
            <div className="banner-newFeature">
                <img src={newFeatures} alt="image Banner"/>
            </div>
            <br/>
            <div className="list-newFeature">
                {limitProductsToShow.map((item) => (
                    <div className='card'>
                        <Link to={`${getSubdirectory(item.category)}/${item.name}-${item.id}`}>
                            <img src={item.images[0]} alt=""/>
                        </Link>
                        <div className="card-body">
                            <Link to={`${getSubdirectory(item.category)}/${item.name}-${item.id}`}><h5
                                className='cart-title'>{item.name}</h5></Link>
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