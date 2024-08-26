import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import '../../Styles/Products.css'
import axios from "axios";

export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    const getData = () => {
        axios.get('http://localhost:3000/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    useEffect(() => {
        getData();
    }, []);
    
    const checkBox = (id) => {
        setSelectedProducts(prev =>
            prev.includes(id)
                ? prev.filter(productId => productId !== id)
                : [...prev, id]
        );
    };
    
    const removeProduct = async (id) => {
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (confirm) {
            await axios.delete(`http://localhost:3000/products/${id}`)
                .then(() => {
                    getData();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    
    const removedProducts = async () => {
        const confirm = window.confirm('Bạn có muốn xóa những sản phẩm này không?');
        if (confirm && selectedProducts.length > 0) {
            await Promise.all(
                selectedProducts.map(id =>
                    axios.delete(`http://localhost:3000/products/${id}`)
                        .then(() => {
                            getData();
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                )
            );
            setSelectedProducts([]); // Clear selection after deletion
        }
    };
    
    const filterProducts = products.filter((pro) => {
        const nameProduct = pro.name.toLowerCase().includes(searchProduct.toLowerCase());
        const categoryProduct = pro.category.toLowerCase().includes(searchCategory.toLowerCase());
        return nameProduct && categoryProduct;
    });
    
    return (
        <div>
            <Link to={'add-product'}>
                <button className='btn-add-product'>+ Add Product</button>
            </Link>
            <button onClick={removedProducts} disabled={selectedProducts.length === 0}>Xóa nhiều sản phẩm</button>
            <input
                placeholder={'Search Name Product'}
                onChange={(e) => setSearchProduct(e.target.value)}
            />
            <input
                placeholder={'Search Category Product'}
                onChange={(e) => setSearchCategory(e.target.value)}
            />
            <h2>Products</h2>
            <table border={'1'} style={{textAlign: 'center'}}>
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Categories</th>
                    <th>Images</th>
                    <th colSpan={'2'}>Action</th>
                </tr>
                </thead>
                <tbody>
                {filterProducts.map((product, index) => (
                    <tr key={product.id}>
                        <td>
                            <input
                                type="checkbox"
                                onChange={() => checkBox(product.id)}
                                checked={selectedProducts.includes(product.id)}
                            />
                        </td>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td style={{textAlign: 'left'}}>{product.images.join(", ")}</td>
                        <td>
                            <Link to={`edit-product/${product.id}`}>
                                <EditIcon />
                            </Link>
                        </td>
                        <td>
                            <button className='btn-action' onClick={() => removeProduct(product.id)}>
                                <DeleteIcon />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
