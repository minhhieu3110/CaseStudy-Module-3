import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";

export default function ListCategories() {
    const [listCategories, setListCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const getDataCategory = () => {
        axios.get('http://localhost:3000/categories')
            .then((response) => {
                setListCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    useEffect(() => {
        getDataCategory();
    }, []);
    
    const checkBox = (id) => {
        setSelectedCategories(prev =>
            prev.includes(id)
                ? prev.filter(categoryId => categoryId !== id)
                : [...prev, id]
        );
    };
    
    const removeCategory = async (id) => {
        const confirm = window.confirm('Bạn có muốn xóa loại sản phẩm này không?');
        if (confirm) {
            await axios.delete(`http://localhost:3000/categories/${id}`)
                .then(() => {
                    getDataCategory();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    
    const removedCategories = async () => {
        const confirm = window.confirm('Bạn có muốn xóa những loại sản phẩm này không?');
        if (confirm && selectedCategories.length > 0) {
            await Promise.all(
                selectedCategories.map(id =>
                    axios.delete(`http://localhost:3000/categories/${id}`)
                        .then(() => {
                            getDataCategory();
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                )
            );
            setSelectedCategories([]); // Clear selection after deletion
        }
    };
    
    return (
        <>
            <Link to={'add-category'}>
                <button>+ Add Category</button>
            </Link>
            <button onClick={removedCategories} disabled={selectedCategories.length === 0}>
                Xóa nhiều loại sản phẩm
            </button>
            <table border={'1'}>
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Subdirectory</th>
                    <th colSpan={'2'}>Action</th>
                </tr>
                </thead>
                <tbody>
                {listCategories.map((cate, index) => (
                    <tr key={cate.id}>
                        <td>
                            <input
                                type="checkbox"
                                onChange={() => checkBox(cate.id)}
                                checked={selectedCategories.includes(cate.id)}
                            />
                        </td>
                        <td>{index + 1}</td>
                        <td>{cate.name}</td>
                        <td>{cate.subdirectory}</td>
                        <td>
                            <Link to={`edit-category/${cate.id}`}>
                                <EditIcon />
                            </Link>
                        </td>
                        <td>
                            <button className='btn-action' onClick={() => removeCategory(cate.id)}>
                                <DeleteIcon />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
