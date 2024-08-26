import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import '../App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import bcrypt from 'bcryptjs';

export default function Login() {
    const navigate = useNavigate();
    
    
    return (
        <div className="form-login">
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={ (values) => {
                    axios.post('http://localhost:3000/users/login', values).then((res) => {
                        navigate('/')
                        alert('Login success!!!');
                    })
                        .catch(err => {
                            alert('Username or Password Invalid');
                            console.log(err);
                        })
                }}
            >
                <Form>
                    <h4 style={{textAlign: 'center'}}>Login</h4>
                    <label htmlFor="username">Username:
                        <Field name={'username'} placeholder={'Username'}/>
                    </label>
                    <label htmlFor={'password'}>Password:
                        <Field name={'password'} type={'password'} placeholder={'Password'}/><br/>
                    </label>
                    <button type="submit">Login</button>
                    <div>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to={'/register'}>Đăng ký</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
