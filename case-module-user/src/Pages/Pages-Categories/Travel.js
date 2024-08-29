import {useContext} from "react";
import {MyContext} from "../../MyContext";
import {useProductsAndCategories} from "../../Custom/hooks/useProductsAndCategories";
import {Link} from "react-router-dom";
import StarRateIcon from "../../Icons/StarRateIcon";
import {formatCurrency} from "../../Custom/utils/FormatCurrency";
import {useCart} from "../../Custom/hooks/useCart";

export default function Travel(){
    const {products, categories, getSubdirectory, generateUrl} = useProductsAndCategories('http://localhost:3000/products','http://localhost:3000/categories')
    const {addToCart} = useCart();
    const productsTravel = products.filter(pro => pro.category ==='Du lịch')
    return(
        <>
            <div className="list-newFeature">
                {productsTravel.map((item) => (
                    <div className='card' key={item.id}>
                        <Link to={generateUrl(item.category, item.name, item.id)}>
                            <img src={item.images[0]} alt=""/>
                        </Link>
                        <div className="card-body">
                            <Link to={generateUrl(item.category, item.name, item.id)}><h5
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
                            <button className='btn-add-to-cart' onClick={() => addToCart(item)}>Thêm giỏ hàng</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}