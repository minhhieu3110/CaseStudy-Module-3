import '../../Styles/HomeTop.css'
import {Card, Inset, Text} from "@radix-ui/themes";
import {useContext} from "react";
import {MyContext} from "../../MyContext";

export default function HomeTop() {
    const {listOrders, listProducts, listUsers} = useContext(MyContext)
    return (
        <div className='home-top'>
            <Card className='card'>
                <Inset>
                    <div className="card-header">Total Sales</div>
                    <div className="card-title">All-time sales revenue</div>
                </Inset>
                <Text>
                    <div className='card-text'>{listOrders.length}</div>
                </Text>
            </Card>
            <Card className='card'>
                <Inset>
                    <div className="card-header">Total Users</div>
                    <div className="card-title">All users added</div>
                </Inset>
                <Text>
                    <div className='card-text'>{listUsers.length}</div>
                </Text>
            </Card>
            <Card className='card'>
                <Inset>
                    <div className="card-header">Total Products</div>
                    <div className="card-title">All products added</div>
                </Inset>
                <Text>
                    <div className='card-text'>{listProducts.length}</div>
                </Text>
            </Card>
        </div>
    )
}