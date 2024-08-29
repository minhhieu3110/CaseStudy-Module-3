import useGetProducts from "../../Custom/hook/useGetProducts";
import useGetOrder from "../../Custom/hook/useGetOrder";

export default function ShoppingCart(){
    // const {products}= useGetProducts('http://localhost:3000/products');
    const {listOrder} = useGetOrder('http://localhost:3000/carts');
    return(
        <>
            <table border={'1'}>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Products</th>
                </tr>
                {listOrder.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.user}</td>
                        <td>{item.total}</td>
                        <td>{item.date}</td>
                        <td>
                            <table border={'1'}>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                {item.products.map((itemPro)=>(
                                    <tr>
                                        <td>{itemPro.name}</td>
                                        <td>{itemPro.quantity}</td>
                                        <td>{itemPro.price}</td>
                                    </tr>
                                ))}
                            </table>
                        </td>
                    </tr>
                ))}
            </table>
        </>
    )
}