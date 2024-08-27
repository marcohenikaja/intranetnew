import React from 'react';
import { Typography } from 'antd';
import { useState } from 'react';
import './about.css'
const { Title } = Typography;


function Orgaspider() {
    const [random, setRandom] = useState();
    return (
        <div>
            




            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h2 style={{ color: '#00912B', fontSize: '28px', marginBottom: '20px' }}>Organigramme Spider</h2>
                <div style={{ width: '90vw' }}>
                    <iframe style={{ border: '1px solid rgba(0, 0, 0, 0.1)', width: '100%', height: '550px' }} src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FIFBi9uCRIq8DkUWHXHJPQa%2Fspider-Orga%3Ftype%3Dwhiteboard%26node-id%3D0%253A1%26t%3D3UaMctX2hsK1ikoa-1" allowfullscreen></iframe>
                </div>
            </div>




        </div >

    );
}

export default Orgaspider;