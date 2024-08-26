import {useState} from "react";
import {storage} from './Firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

export default function UploadImg({setFieldValue, index}) {
    const [imageFile, setImageFile] = useState(null);
    
    const uploadImg = () => {
        if (imageFile === null) return;
        
        const imgRef = ref(storage, `images/${imageFile.name + v4()}`);
        uploadBytes(imgRef, imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setFieldValue(`images[${index}]`, url);
            });
        }).catch(error => {
            console.log(error.message);
        });
    };
    
    return (
        <>
            <input
                type="file"
                onChange={(event) => {
                    setImageFile(event.target.files[0]);
                }}
            />
            <button type="button" onClick={uploadImg}>Upload Image</button>
        </>
    );
}
