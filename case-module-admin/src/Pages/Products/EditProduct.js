import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Label } from "@radix-ui/react-dropdown-menu";
import * as Yup from "yup";
import UploadImg from "../../UploadImg";

export default function EditProduct() {
    const { id } = useParams();
    const [notice, setNotice] = useState("");
    const [listCategories, setListCategories] = useState([]);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        images: ['']
    });
    const navigate = useNavigate();
    
    const validate = Yup.object().shape({
        name: Yup.string().required('Hãy nhập tên sản phẩm'),
        price: Yup.number().required('Hãy nhập giá sản phẩm').positive('Giá phải lớn hớn 0'),
        quantity: Yup.number().required('Hãy nhập số lượng sản phẩm').integer('Số lượng là số nguyên dương').positive('Số lượng lớn hơn 0'),
        category: Yup.string().required('Hãy nhập loại sản phẩm').notOneOf(['default'], 'Hãy chọn loại sản phẩm hợp lệ'),
        images: Yup.array().of(Yup.string().required('Hãy nhập ảnh sản phẩm')).min(1, 'Ít nhất là một ảnh').max(10, "Nhiều nhất là 10 ảnh")
    });
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`).then((res) => {
            setUpdatedProduct({
                name: res.data.name,
                price: res.data.price,
                quantity: res.data.quantity,
                category: res.data.category,
                images: res.data.images
            });
        });
    }, [id]);
    useEffect(() => {
        axios.get('http://localhost:3000/categories').then(res => {
            setListCategories(res.data)
        })
    }, []);
    return (
        <div className={'form-edit-product'}>
            <Formik
                initialValues={updatedProduct}
                enableReinitialize
                validationSchema={validate}
                onSubmit={(values) => {
                    axios.put(`http://localhost:3000/products/${id}`, values)
                        .then((res) => {
                            setNotice('Edit Product Success!!!');
                            navigate('/products');
                            console.log(res.data);
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }}
            >
                {({ values, setFieldValue }) => (
                    <div>
                        <h2 style={{ textAlign: 'center' }}>Edit Product</h2>
                        <Form>
                            <Label htmlFor='name'>Name:
                                <Field name={'name'} placeholder={'Nhập tên sản phẩm'} /><br />
                                <ErrorMessage name="name" />
                            </Label>
                            <Label htmlFor='price'>Price:
                                <Field name={'price'} placeholder={'Nhập giá sản phẩm'} /><br />
                                <ErrorMessage name='price' component="div" />
                            </Label>
                            <Label htmlFor='quantity'>Quantity:
                                <Field name={'quantity'} placeholder={'Nhập số lượng'} /><br />
                                <ErrorMessage name='quantity' component="div" />
                            </Label>
                            <Label htmlFor='category'>Category:
                                <Field as={'select'} name={'category'} placeholder={'Nhập loại sản phẩm'}>
                                    <option value={'default'} >Select Category</option>
                                    {listCategories.map((category) => (
                                        <option value={category.name}>{category.name}</option>
                                    ))}
                                </Field><br/>
                                <ErrorMessage name='category' component="div" />
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
                                                            <img src={url} alt={`Uploaded ${index}`} width={100} />
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
                            <button type="submit">Cập nhật sản phẩm</button>
                        </Form>
                    </div>
                )}
            </Formik>
            <div>{notice}</div>
        </div>
    );
}
