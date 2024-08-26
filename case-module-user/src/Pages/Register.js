import {ErrorMessage, Field, Form, Formik} from "formik";
import '../App.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import bcrypt from 'bcryptjs'
export default function Register(){
    const navigate = useNavigate();
    const validate = Yup.object().shape({
        name: Yup.string().required('Tên không được để trống'),
        username: Yup.string().required('Tên đăng nhập không được để trống'),
        password: Yup.string().required("Mật khẩu không được để trống").min(8, 'Mật khẩu phải ít nhất 8 ký tự'),
        email: Yup.string().required('Email không được để trống').email('Email format: example@example.com'),
        dob: Yup.date().required('Ngày sinh không được để trống')
    });
    
    return (
        <div className='form-register'>
            <Formik
                validationSchema={validate}
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    email: '',
                    dob: ''
                }}
                onSubmit={async (values) => {
                    const hashedPassword = await bcrypt.hashSync(values.password, 10);
                    const registerData = {...values,password: hashedPassword}
                    axios.post('http://localhost:3000/users/register', registerData)
                        .then((res) => {
                            navigate('/');
                            alert('Register success!!!');
                        })
                        .catch(err => {
                            console.log(err);
                            alert('Username already exists');
                        })
                }}
            >
                
                    <Form>
                        <h4 style={{ textAlign: 'center' }}>Register</h4>
                        <label htmlFor='name'>Name:
                            <Field name={'name'} placeholder={'Name'} />
                            <ErrorMessage name={'name'} component="div" className="error-message" />
                        </label>
                        <label htmlFor='username'>Username:
                            <Field name={'username'} placeholder={'Username'} />
                            <ErrorMessage name={'username'} component="div" className="error-message" />
                        </label>
                        <label htmlFor='password'>Password:
                            <Field name={'password'} type={'password'} placeholder={'Password'} />
                            <ErrorMessage name={'password'} component="div" className="error-message" />
                        </label>
                        <label htmlFor='email'>Email:
                            <Field name={'email'} type={'email'} placeholder={'Email'} />
                            <ErrorMessage name={'email'} component="div" className="error-message" />
                        </label>
                        <label htmlFor='dob'>Date of birth:
                            <Field name={'dob'} type={'date'} placeholder={'Date of birth'} />
                            <ErrorMessage name={'dob'} component="div" className="error-message" />
                        </label>
                        <button type={'submit'}>Register</button>
                    </Form>
            </Formik>
        </div>
    );
}
