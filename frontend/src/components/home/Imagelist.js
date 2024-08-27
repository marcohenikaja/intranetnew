import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import { Pagination } from 'antd';
import axios from 'axios';

const Imagelist = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImage, setGalleryImage] = useState([]);

    const parentDivStyle = {
        height: '500px',  // Ajustez la hauteur selon vos besoins
        overflowY: 'auto',  // Activer le défilement vertical si nécessaire
    };

    const getImage = async () => {
        try {
            const response = await axios.get('http://172.16.0.92:8000/getImage');
            setGalleryImage(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const url = 'http://172.16.0.92:8000/medias/';

    useEffect(() => {
        getImage();
    }, []);

    const handleImageClick = (item) => {
        setSelectedImage(item);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <div style={parentDivStyle}>
            <Image.PreviewGroup
                preview={{
                    visible: !!selectedImage,
                    onVisibleChange: (visible) => {
                        if (!visible) {
                            handleClose();
                        }
                    },
                }}
                sx={{ width: '80%', height: 500 }} cols={4} rowHeight={164}
            >
                {galleryImage.map((item) => (
                    <Image
                        key={item}  // Ajoutez une clé unique pour chaque image
                        width={350}
                        src={`${url}${item}`}
                        onClick={() => handleImageClick(item)}

                    />
                ))}

            </Image.PreviewGroup>
        </div>
    );
};

export default Imagelist;
