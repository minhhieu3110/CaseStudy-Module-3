import React, { useContext, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../Custom/utils/FormatCurrency";
import { MyContext } from "../MyContext";
import { useProducts } from "../Custom/hooks/useProducts";

export default function Cart() {
    const { cart, setCart, currentUser } = useContext(MyContext);
    const { products } = useProducts('http://localhost:3000/products');
    const [notification, setNotification] = useState("");
    
    const handleQuantityChange = async (productId, delta) => {
        const product = products.find(p => p.id === productId);
        const newCart = cart.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + delta;
                if (newQuantity > product.quantity) {
                    setNotification(`Maximum quantity for ${product.name} is ${product.quantity}.`);
                    return item;
                } else if (newQuantity < 1) {
                    setNotification(`Minimum quantity is 1.`);
                    return item;
                } else {
                    setNotification("");
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCart(newCart);
    };
    
    const handleQuantityInputChange = async (productId, event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            const product = products.find(p => p.id === productId);
            if (value > product.quantity) {
                setNotification(`Maximum quantity for ${product.name} is ${product.quantity}.`);
            } else if (value < 1) {
                setNotification(`Minimum quantity is 1.`);
            } else {
                setNotification("");
                const newCart = cart.map(item => {
                    if (item.id === productId) {
                        return { ...item, quantity: value };
                    }
                    return item;
                });
                setCart(newCart);
            }
        }
    };
    
    const removeFromCart = async (productId) => {
        const newCart = cart.filter(item => item.id !== productId);
        setCart(newCart);
    };
    
    const handlePlaceOrder = async () => {
        const cartPayload = {
            id: cart.length,
            user: currentUser.username,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            date: new Date().toISOString(),
            products: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        };
        
        try {
            await axios.post('http://localhost:3000/carts', cartPayload);
            console.log('Order placed successfully:', cartPayload);
            setNotification("Đơn hàng đã được đặt thành công !!");
        } catch (error) {
            console.error('Error placing order:', error);
            setNotification("Error placing order. Please try again.");
        }
    };
    
    return (
        <div>
            {notification && <p style={{ color: 'red' }}>{notification}</p>}
            <table border={'1'} style={{ textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {cart.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                            <button
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                max={products.find(p => p.id === item.id)?.quantity || 0}
                                onChange={(event) => handleQuantityInputChange(item.id, event)}
                                style={{ width: '60px', textAlign: 'center' }}
                            />
                            <button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                disabled={item.quantity >= (products.find(p => p.id === item.id)?.quantity || 0)}
                            >
                                +
                            </button>
                        </td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                        <td>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h4>Total: {formatCurrency(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}</h4>
            <button onClick={handlePlaceOrder}>Đặt hàng</button>
        </div>
    );
}
