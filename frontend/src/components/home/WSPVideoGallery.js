import React, { useState, useEffect } from 'react';
import { Image, Card, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
const { Text } = Typography;

const WSPVideoGallery = () => {
    const [galleryImage, setGalleryImage] = useState([]);
    const [galleryVideos, setGalleryVideos] = useState([]);

    const getVideos = async () => {
        try {
            const response = await axios.get('http://172.16.0.92:8000/getVideos');
            console.log(response.data);
            setGalleryVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const url = 'http://172.16.0.92:8000/';
    const urltmb = 'http://172.16.0.92:8000';

    useEffect(() => {
        getVideos();
    }, []);

    const parentDivStyle = {
        height: '500px',  // Ajustez la hauteur selon vos besoins
        overflowY: 'auto',  // Activer le défilement vertical si nécessaire
        display: 'flex',  // Afficher les cartes en ligne
        flexWrap: 'wrap',  // Permettre aux cartes de passer à la ligne
        justifyContent: 'space-between',  // Espacement équitable entre les cartes
        padding: '0 16px',  // Ajouter un espacement sur les côtés
    };

    const cardStyle = {
        width: 'calc(25% - 16px)',  // Calculer la largeur pour quatre cartes par ligne
        marginBottom: '16px',  // Ajouter un espace entre les lignes
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    };



    useEffect(() => {
        getVideos();
    }, []);



    return (
        <div style={parentDivStyle}>

            {galleryVideos.map((item) => (
                <Card
                    key={item.id} // Ajoutez une clé unique pour chaque vidéo
                    hoverable
                    style={cardStyle}
                    cover={<img alt={item.titre} src={`${urltmb}${item.urlthm}`} onClick={() => {
                        window.open(`${url}${item.imageUrl}`, '_blank');
                    }} />}
                >
                    <PlayCircleOutlined onClick={() => { window.open(`${url}${item.imageUrl}`, '_blank'); }}
                        style={{
                            position: 'absolute',
                            top: '40%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '3em', // Ajustez la taille ici
                            color: '#009918', // Changez la couleur si nécessaire
                            cursor: 'pointer',

                        }} />
                    <Meta description={item.titre} />
                </Card>
            ))}

        </div>
    );
};

export default WSPVideoGallery;
