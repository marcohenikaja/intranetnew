
import React from 'react';
import { useParams } from 'react-router-dom';
import Cadrepdf from './Cadrepdf';
import Noncadrpdf from './Noncadrpdf';
import Cadrenomanagerpdf from './Cadrenomanagerpdf';
const Choix = () => {
    const { id, type } = useParams();

    let ComponentToRender;

    switch (type) {
        case 'Evaluation cadre':
            ComponentToRender = Cadrepdf;
            break;
        case 'Evaluation non cadre':
            ComponentToRender = Noncadrpdf;
            break;
        case 'Evaluation cadre non manager':
            ComponentToRender = Cadrenomanagerpdf;
            break;
        // Ajoutez d'autres cas selon vos besoins
        default:
            ComponentToRender = () => <div>Type inconnu</div>;
    }

    return (
        <div>
            {/* <h1 style={{ marginTop: '100px' }}>Evaluation ID: {id} ,{type}</h1> */}
            <ComponentToRender />
        </div>
    );
};

export default Choix;