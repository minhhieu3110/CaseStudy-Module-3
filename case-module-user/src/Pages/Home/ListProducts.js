import {useProductsAndCategories} from "../../Custom/hooks/useProductsAndCategories";
import listProducts from '../../assets/Banner/List-products.png'
import {Link} from "react-router-dom";
import StarRateIcon from "../../Icons/StarRateIcon";
import {formatCurrency} from "../../Custom/utils/FormatCurrency";
import {useCart} from "../../Custom/hooks/useCart";
export default function ListProducts(){
    const {products, generateUrl} = useProductsAndCategories('http://localhost:3000/products', 'http://localhost:3000/categories')
    const {addToCart} = useCart()
    return(
        <div className='container-list-products'>
            <div className="banner-listProducts">
                <img src={listProducts} />
            </div>
            <br/>
            <div className="list-products">
                {products.map(item=>(
                    <div className='card'>
                        <Link to={generateUrl(item.category, item.name, item.id)}>
                            <img src={item.images[0]} alt=""/>
                        </Link>
                        <div className="card-body">
                            <Link to={generateUrl(item.category, item.name, item.id)}>
                                <h5 className='card-title'>{item.name}</h5>
                            </Link>
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
        </div>
    )
}