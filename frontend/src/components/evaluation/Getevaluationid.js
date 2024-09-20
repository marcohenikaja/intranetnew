import React from 'react';
import { useParams } from 'react-router-dom';
import Cadre from './type/Cadre';
import Noncadre from './type/Noncadre';
import Cadrenonmanager from './type/Cadrenonmanager';

const Getevaluationid = () => {
    const { id, type } = useParams();

    let ComponentToRender;

    switch (type) {
        case 'Evaluation cadre':
            ComponentToRender = Cadre;
            break;
        case 'Evaluation non cadre':
            ComponentToRender = Noncadre;
            break;
        case 'Evaluation cadre non manager':
            ComponentToRender = Cadrenonmanager;
            break;

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

export default Getevaluationid;







