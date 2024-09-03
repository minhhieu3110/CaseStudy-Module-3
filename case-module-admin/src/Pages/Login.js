import {Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";

export default function Login() {
    const navigate = useNavigate();
    const {login, setCurrentUser} = useContext(MyContext)
    return (
        <div className='form-login'>
            
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={values => {
                    axios.post('http://localhost:3000/users/login', values)
                        .then((res) => {
                            localStorage.setItem('dataLogin', JSON.stringify(res.data));
                            login(res.data);
                            setCurrentUser(res.data.user);
                            navigate('/home')
                        })
                        .catch((error) => {
                            console.error('Đăng nhập thất bại:', error);
                            alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
                        });
                }}
            >
                <div>
                    <h2 style={{textAlign: 'center'}}>Login</h2>
                    <Form>
                        <label htmlFor="username">Username:
                            <Field name="username" placeholder="Username" />
                        </label>
                        <label htmlFor="password">Password:
                            <Field type="password" name="password" placeholder="Password" />
                        </label>
                        <button type="submit">Login</button>
                    </Form>
                </div>
            </Formik>
        </div>
    );
}
