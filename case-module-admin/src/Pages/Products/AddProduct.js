import {useEffect, useState} from "react";
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import '../../Styles/AddProduct.css';
import {Label} from "@radix-ui/react-dropdown-menu";
import UploadImg from "../../UploadImg";
import '../../App.css'
export default function AddProduct() {
    const [notice, setNotice] = useState('');
    const navigate = useNavigate();
    const [listCategories, setListCategories] = useState([]);
    const validate = Yup.object().shape({
        name: Yup.string().required('Hãy nhập tên sản phẩm'),
        price: Yup.number().required('Hãy nhập giá sản phẩm').positive('Giá phải lớn hớn 0'),
        quantity: Yup.number().required('Hãy nhập số lượng sản phẩm').integer('Số lượng là số nguyên dương').positive('Số lượng lớn hơn 0'),
        category: Yup.string().required('Hãy nhập loại sản phẩm').notOneOf(['default'], 'Hãy chọn loại sản phẩm hợp lệ'),
        images: Yup.array().of(Yup.string().required('Hãy nhập ảnh sản phẩm')).min(1, 'Ít nhất là một ảnh').max(10, "Nhiều nhất là 10 ảnh")
    });
    useEffect(() => {
        axios.get('http://localhost:3000/categories').then(res => {
            setListCategories(res.data)
        })
    }, []);
    return (
        <div className='form-add-product'>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    quantity: '',
                    category: '',
                    images: []  // Initialize with an empty array
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                    try {
                        await axios.post('http://localhost:3000/products', values);
                        setNotice('Add Product Success!!!');
                        navigate('/products');
                    } catch (error) {
                        console.log(error.message);
                    }
                }}
            >
                {({values, setFieldValue}) => (
                    <div>
                        <h2 style={{textAlign: 'center'}}>Add Product</h2>
                        <Form>
                            <Label htmlFor='name'>Name:
                                <Field name={'name'} placeholder={'Nhập tên sản phẩm'}/><br/>
                                <ErrorMessage name="name"/>
                            </Label>
                            <Label htmlFor='price'>Price:
                                <Field name={'price'} placeholder={'Nhập giá sản phẩm'}/><br/>
                                <ErrorMessage name='price' component="div"/>
                            </Label>
                            <Label htmlFor='quantity'>Quantity:
                                <Field name={'quantity'} placeholder={'Nhập số lượng sản phẩm'}/><br/>
                                <ErrorMessage name='quantity' component="div"/>
                            </Label>
                            <Label htmlFor='category'>Category:
                                <Field as={'select'} name={'category'} placeholder={'Nhập loại sản phẩm'}>
                                    <option value={'default'}>Select Category</option>
                                    {listCategories.map((category) => (
                                        <option value={category.name}>{category.name}</option>
                                    ))}
                                </Field><br/>
                                <ErrorMessage name='category' component="div"/>
                            </Label>
                            <Label htmlFor='images'>Images:
                                <FieldArray name={'images'}>
                                    {({push, remove}) => (
                                        <div>
                                            {values.images.map((url, index) => (
                                                <div key={index} className='images-container'>
                                                    <UploadImg setFieldValue={setFieldValue} index={index}/>
                                                    {url && (
                                                        <>
                                                            <img src={url} alt={`Uploaded ${index}`} width={100}/>
                                                            <button type="button" onClick={() => remove(index)}>Remove</button>
                                                        </>
                                                    )}
                                                    <ErrorMessage name={`images[${index}]`} component="div"/>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push('')}>+ Add Image</button>
                                        </div>
                                    )}
                                </FieldArray>
                            </Label>
                            <button type="submit">Thêm sản phẩm</button>
                        </Form>
                    </div>
                )}
            </Formik>
            <div>{notice}</div>
        </div>
    );
}
