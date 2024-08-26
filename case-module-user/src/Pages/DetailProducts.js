import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios, {all} from "axios";
import ArrowPrev from "../Icons/ArrowPrev";
import ArrowNext from "../Icons/ArrowNext";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {formatCurrency} from "../Custom/utils/FormatCurrency";

export default function DetailProduct() {
    const {nameId} = useParams();
    const id = nameId.split('-').pop();
    const [product, setProduct] = useState({name: '', price: '', quantity: '', category: '', images: []});
    const mainSlider = useRef(null);
    const thumbSlider = useRef(null);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then((res) => {
                setProduct({
                    name: res.data.name,
                    price: res.data.price,
                    quantity: res.data.quantity,
                    category: res.data.category,
                    images: res.data.images
                });
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);
    
    const mainSettings = {
        asNavFor: thumbSlider.current,
        ref: mainSlider,
        arrowPrev: <ArrowPrev/>,
        arrowNext: <ArrowNext/>,
        arrows: false,
        fade: true,
    };
    
    const thumbSettings = {
        asNavFor: mainSlider.current,
        ref: thumbSlider,
        slidesToShow: 4,
        focusOnSelect: true,
        swipeToSlide: true,
    };
    
    return (
        <>
            <div className='detail-container'>
                <div className="image-product">
                    <Slider {...mainSettings} className="main-slider">
                        {product.images.map((image) => (
                            <div className='image-main-slider'><img src={image} alt="Slide 1"/></div>
                        ))}
                    </Slider>
                    
                    <Slider {...thumbSettings} className='thumb-slider'>
                        {product.images.map((image) => (
                            <div className='image-thumb-slider'><img src={image} alt="Slide 1"/></div>
                        ))}
                    </Slider>
                </div>
                <div className="detail-product">
                    <h1>{product.name}</h1>
                    <p>{formatCurrency(product.price)}</p>
                    <p>{product.category}</p>
                </div>
            </div>
        </>
    );
}
