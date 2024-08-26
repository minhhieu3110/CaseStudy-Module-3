import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Label} from "@radix-ui/react-dropdown-menu";
import * as Yup from "yup";

export default function EditCategory(){
    const [updateCategory,setUpdateCategory]=useState({name:''})
    const {id}= useParams();
    const regex = new RegExp(`[a-z]+-[a-z]`)
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/categories/${id}`).then((response)=> {
            setUpdateCategory({
                name: response.data.name,
                subdirectory: response.data.subdirectory,
            })
        })
    },[id])
    const validate = Yup.object().shape({
        name: Yup.string().required("Hãy nhập loại sản phẩm"),
        subdirectory: Yup.string().required('Hãy nhập subdirectory').matches(regex, 'example-example')
    })
    const navigate = useNavigate();
    return(
        <div className={'form-edit-category'}>
            <Formik initialValues={updateCategory}
                    enableReinitialize
                    onSubmit={values => {
                        axios.put(`http://localhost:3000/categories/${id}`, values).then((res)=>{
                            navigate('/categories')
                        })
                    }}>
                <Form>
                    <Label htmlFor={'name'}>Name:
                        <Field name={'name'} placeholder={'Category Name'} />
                        <ErrorMessage name={'name'} component={'div'}/>
                    </Label>
                    <Label htmlFor={'subdirectory'} >Subdirectory:
                        <Field name={'subdirectory'} placeholder={'Subdirectory'} />
                        <ErrorMessage name={'subdirectory'} component={'div'}/>
                    </Label>
                    <button>Cập nhập</button>
                </Form>
            </Formik>
        </div>
    )
}