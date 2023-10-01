import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { storage } from '../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid';

const DoTask = () => {
    let { unique_id } = useParams();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, "images/");
    const location = useLocation();

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Uploaded");
            getDownloadURL(imageRef).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        }) 
    }

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url])
                })
            })
        })
    }, [location.key]);

    return (
        <div>
            <form>
                <input type="file" accept='image/*' name="image" onChange={(e) => setImageUpload(e.target.files[0])} />
                <button onClick={uploadImage} type='button' className='btn btn-danger' >
                    Upload Image
                </button>
            </form>
            {imageList.map((url) => {
                return <img src={url} />
            })}
        </div>
    )
}

export default DoTask
