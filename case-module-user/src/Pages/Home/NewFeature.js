import newFeatures from '../../assets/Banner/New-Features.png'
import '../../App.css'
import StarRateIcon from "../../Icons/StarRateIcon";
import {Link} from "react-router-dom";
import {formatCurrency} from "../../Custom/utils/FormatCurrency";
import {useProductsAndCategories} from "../../Custom/hooks/useProductsAndCategories";
import {useCart} from "../../Custom/hooks/useCart";

export default function NewFeature() {
    const {
        products, generateUrl
    } = useProductsAndCategories('http://localhost:3000/products', 'http://localhost:3000/categories');
    const reversedProducts = [...products].reverse()
    const limitProductsToShow = reversedProducts.splice(0, 4)
    const {addToCart} = useCart()
    return (
        <div className='container-newFeature'>
            <div className="banner-newFeature">
                <img src={newFeatures} alt="image Banner"/>
            </div>
            <br/>
            <div className="list-newFeature">
                {limitProductsToShow.map((item) => (
                    <div className='card'>
                        <Link to={generateUrl(item.category, item.name, item.id)}>
                            <img src={item.images[0]} alt=""/>
                        </Link>
                        <div className="card-body">
                            <Link to={generateUrl(item.category, item.name, item.id)}><h5
                                className='cart-title'>{item.name}</h5></Link>
                            <div className="rate">
                                {[...Array(5)].map((_, i) => <StarRateIcon key={i}/>)}
                                <span className='number-rate'>5.0</span>
                            </div>
                            <div className="price">{formatCurrency(item.price)}</div>
                            <button className='btn-add-to-cart' onClick={() => addToCart(item)}>Thêm giỏ hàng</button>
                        </div>
                    </div>
                ))}
            </div>
            <br/>
        </div>
    )
}