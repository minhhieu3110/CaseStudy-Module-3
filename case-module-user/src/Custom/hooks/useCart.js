import {useContext} from "react";
import {MyContext} from "../../MyContext";
import axios from "axios";

export function useCart(){
    const {cart, setCart, currentUser} = useContext(MyContext)
    const addToCart = async (product) => {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        let newCart;
        
        if (existingProductIndex >= 0) {
            newCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }
        
        setCart(newCart);
        const cartData = {
            id: newCart.length,
            user: currentUser.username,
            total: newCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            date: new Date().toISOString(),
            products: newCart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        };
    };
    return {addToCart}
}