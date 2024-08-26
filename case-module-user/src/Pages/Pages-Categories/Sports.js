import {useContext} from "react";
import {MyContext} from "../../MyContext";
import {useProductsAndCategories} from "../../Custom/hooks/useProductsAndCategories";

export default function Sports(){
    const {products, categories, getSubdirectory} = useProductsAndCategories('http://localhost:3000/products','http://localhost:3000/categories')
    const productsSport = products.filter(pro => pro.category ==='Thể thao')
    return(
        <>
            {productsSport.map((product) => (
                <li key={product.id}>
                    <h2>{product.name}</h2>
                </li>
            ))}
        </>
    )
}