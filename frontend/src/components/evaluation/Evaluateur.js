import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Table, notification, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo from '../../assets/images/eva.mp4';
import logonpa from './LOGO NPA.png';
import { EyeOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';


const url = 'http://172.16.0.92:8000/';

const Evaluateur = () => {
    const navigate = useNavigate();
    const [dataeva, setDataeva] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const loggedInUser = sessionStorage.getItem('loginUser');
   
    const columns = [
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            width: 120,
        },
        {
            title: 'Prénom(s)',
            dataIndex: 'prenom',
            key: 'prenom',
            width: 120,
        },
        {
            title: ' N+1',
            dataIndex: 'emailn1',
            key: 'emailn1',
            width: 120,
        },
        {
            title: ' N+2',
            dataIndex: 'emailn2',
            key: 'emailn2',
            width: 120,
        },
        {
            title: ' Directeur de rattachement',
            dataIndex: 'emaildr',
            key: 'emaildr',
            width: 120,
        },
        {
            title: 'SG',
            dataIndex: 'emailsg',
            key: 'emailsg',
            width: 120,
        },
        {
            title: ' DG',
            dataIndex: 'emaildg',
            key: 'emaildg',
            width: 120,
        },
        {
            title: ' DRH',
            dataIndex: 'emaildrh',
            key: 'emaildrh',
            width: 120,
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => {
                const canEdit = loggedInUser === record.emailn1 || loggedInUser === record.emailn2 || loggedInUser === record.emaildr;
            
                return (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Tooltip title="Visualiser">
                            <Button
                                type="text"
                                icon={<EyeOutlined />}
                                onClick={() => navigateToEvaluations(record.id_pers, record.evaluatorType)}
                                style={{ fontSize: '16px', color: '#1890ff' }}
                            />
                        </Tooltip>
            
                        <Tooltip title="Modifier">
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => navigateToEvaluation(record.id_pers, record.evaluatorType)}
                                style={{ fontSize: '16px', color: '#40A9FF' }}
                                disabled={!canEdit} // Disable when canEdit is false
                            />
                        </Tooltip>
                      
                    </div>
                );
            }
            
        }
    ];

    const getgataeva = async () => {
        try {
            const getgataeva = await axios.get(`${url}getgataevas/${loggedInUser}`);
            console.log(getgataeva.data.length);
            setDataeva(getgataeva.data);
        } catch (error) {
            console.log(error);
        }
    };

    const enregistrement = async (noms, prenoms, id) => {
        try {
            const enrg = await axios.post(`${url}enregistrement/${id}`, {
                // Ajoutez ici les données nécessaires pour l'enregistrement
            });
        } catch (error) {
            console.log(error);
        }
    };

    const navigateToEvaluation = (id_pers, typeeval) => {
        navigate(`/getevaluationid/${id_pers}/${typeeval}`);
    };

    const navigateToEvaluations = (id_pers, typeeval) => {
        navigate(`/choose/${id_pers}/${typeeval}`);
    };



    useEffect(() => {
        getgataeva();
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <video
                src={photo}
                autoPlay
                loop
                muted
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '100px', zIndex: 1 }}>
                {contextHolder}
                <div style={{ width: '90%', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)', padding: '20px', zIndex: 1 }}>
                    <img src={logonpa} width={180} height={100} alt="logo npa" />
                    <h1 style={{ color: 'black', marginBottom: '20px' }}>Tableau d'évaluations</h1>
                    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                        <Table
                            columns={columns}
                            dataSource={dataeva}
                            rowKey="id_pers"
                            pagination={false}
                            scroll={{ x: true }}
                            style={{
                                '--ant-table-header-bg': '#1890ff', /* Bleu primaire */
                                '--ant-table-header-color': '#ffffff', /* Couleur du texte en blanc */
                                '--ant-table-header-font-weight': 'bold' /* Texte en gras */
                            }}
                            components={{
                                header: {
                                    cell: (props) => (
                                        <th
                                            {...props}
                                            style={{
                                                backgroundColor: '#1890ff', /* Bleu primaire */
                                                color: 'white', /* Couleur du texte en blanc */
                                                fontWeight: 'bold' /* Texte en gras */
                                            }}
                                        >
                                            {props.children}
                                        </th>
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Evaluateur;
