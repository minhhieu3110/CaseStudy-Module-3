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
        switch(categoryName) {
            case 'Thể thao':
                return 'the-thao';
            case 'Công nghệ':
                return 'cong-nghe';
            case 'Du lịch':
                return 'du-lich';
            case 'Giáo dục':
                return 'giao-duc';
            case 'Nghệ thuật':
                return 'nghe-thuat';
            default:
                return 'other';
        }
    }
    const generateUrl = (category, productName, productId) => {
        const subdirectory = getSubdirectory(category);
        const urlParts = subdirectory.split('/');
        const uniqueSubdirectory = [...new Set(urlParts)].join('/');
        
        return `/${uniqueSubdirectory}/${productName}-${productId}`;
    };
    return {products, categories, getSubdirectory, generateUrl}
}