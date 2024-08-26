import {useEffect, useState} from "react";
import axios from "axios";

export default function ListUsers(){
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/users').then((res)=>{
            setListUsers(res.data)
        })
    })
    return(
        <>
            <table border={'1'}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Action</th>
                </tr>
                {listUsers.map((user, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <td>{user.dob}</td>
                        <td>Action</td>
                    </tr>
                ))}
            </table>
        </>
    )
}