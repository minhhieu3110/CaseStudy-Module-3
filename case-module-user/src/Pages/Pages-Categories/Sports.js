import {useContext} from "react";
import {MyContext} from "../../MyContext";

export default function Sports(){
    const {dataProducts} = useContext(MyContext)
    const productsSport = () =>{
        return dataProducts.filter(product => product.category === 'Thể thao')
    }
    return(
        <>
            {productsSport().map((product) => (
                <li key={product.id}>
                    <h2>{product.name}</h2>
                </li>
            ))}
        </>
    )
}