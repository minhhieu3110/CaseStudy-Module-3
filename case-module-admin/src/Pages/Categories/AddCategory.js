import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {Label} from "@radix-ui/react-dropdown-menu";
export default function AddCategory(){
    const [notice, setNotice] = useState("");
    const navigate = useNavigate();
    const regex = new RegExp(`[a-z]+-[a-z]`)
    const validate = Yup.object().shape({
        name: Yup.string().required("Hãy nhập loại sản phẩm"),
        subdirectory: Yup.string().required('Hãy nhập subdirectory').matches(regex, 'example-example')
    })
    return(
        <div className={'form-add-category'}>
            <h2 style={{textAlign:'center'}}>Add Category</h2>
            <Formik initialValues={
                {
                    name:'',
                    subdirectory:''
                }
            }
                    validationSchema={validate}
                    onSubmit={values => {
                        axios.post('http://localhost:3000/categories',values).then((res) => {
                            setNotice('Add Category Success')
                            navigate('/categories');
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
                    <button>Thêm loại sản phẩm</button>
                </Form>
            </Formik>
        </div>
    )
}