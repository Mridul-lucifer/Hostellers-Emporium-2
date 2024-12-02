import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
    const [image, setImage] = useState(null);

    const upload = async (event) => {
        // Prevent form from submitting the traditional way
        event.preventDefault();
        // alert("enterd")
        if (!image) {
            alert('Please select an image');
            return;
        }

        
        // Prepare form data for file upload
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const response = await axios.post('http://localhost:5000/addImage', formData, {
            
                    'Content-Type': 'multipart/form-data'
                
            });

            if (response.data.path) {
                localStorage.setItem('imagePath', response.data.path);
                alert('Image uploaded successfully');
            } else {
                alert('Error uploading image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(error);
        }
    };

    return (
        <div>
            <form onSubmit={upload}>
                <input
                    type="file"
                    onChange={(event) => setImage(event.target.files[0])}
                    accept="image/*"
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
