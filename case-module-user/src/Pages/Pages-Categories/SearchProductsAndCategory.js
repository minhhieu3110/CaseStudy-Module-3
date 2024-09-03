import { useState } from "react";
import { useProductsAndCategories } from "../../Custom/hooks/useProductsAndCategories";
import { Link } from "react-router-dom";
import StarRateIcon from "../../Icons/StarRateIcon";
import { formatCurrency } from "../../Custom/utils/FormatCurrency";
import { useCart } from "../../Custom/hooks/useCart";

export default function SearchProductsAndCategory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name'); // Mặc định tìm kiếm theo tên
    const [filteredProducts, setFilteredProducts] = useState([]); // Lưu trữ kết quả tìm kiếm
    
    const { products, generateUrl } = useProductsAndCategories('http://localhost:3000/products', 'http://localhost:3000/categories');
    const { addToCart } = useCart();
    
    const handleSearch = () => {
        const filterResults = products.filter((pro) => {
            if (searchOption === 'name') {
                return pro.name.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchOption === 'category') {
                return pro.category.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
        });
        setFilteredProducts(filterResults);
    };
    
    return (
        <div className='container-search'>
            <div className="search-filters">
                <div id="search">
                    <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                        <option value="name">Tìm kiếm theo tên</option>
                        <option value="category">Tìm kiếm theo loại</option>
                    </select>
                    <input
                        type="text"
                        placeholder={searchOption === 'name' ? "Nhập tên sản phẩm" : "Nhập loại sản phẩm"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button onClick={handleSearch} className='btn-action-search'>Search</button>
            </div>
            <div className="list-newFeature">
                {filteredProducts.map((item) => (
                    <div className='card' key={item.id}>
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
        </div>
    );
}
