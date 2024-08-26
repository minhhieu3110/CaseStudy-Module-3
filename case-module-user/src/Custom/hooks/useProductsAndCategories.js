import {useEffect, useState} from "react";
import axios from "axios";

export function useProductsAndCategories(urlProducts, urlCategories) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        Promise.all([
            axios.get(urlProducts),
            axios.get(urlCategories)
        ])
            .then(([productsRes, categoriesRes]) => {
                setProducts(productsRes.data)
                setCategories(categoriesRes.data)
            })
            .catch(err=>{
                console.log(err.messages)
            })
    }, [urlProducts, urlCategories])
    
    const getSubdirectory = (categoryName)=>{
        const category = categories.find(category => category.name === categoryName);
        return category ? category.subdirectory : '#'
    }
    
    return {products, categories, getSubdirectory}
}