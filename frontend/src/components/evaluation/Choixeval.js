import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Row, Col, notification, Badge, Select, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import photo from '../../assets/images/eva.mp4';
import logonpa from './LOGO NPA.png';

const { Title } = Typography;
const url = 'http://localhost:8000/'; // Définir l'URL de votre API

const Choixeval = () => {
    const navigate = useNavigate();
    const loggedInUser = sessionStorage.getItem('loginUser');

    //const ids = sessionStorage.getItem('ids');

    const ids = 10

    const [nbreval, setNbreval] = useState(0);
    const [evaldata, setEvaldata] = useState([]);
    const [nbrcons, setNbrcons] = useState(0);

    const authorizedUsers = [
        "rakotobe.marco@npakadin.mg",
        "rakotorichard.jocelain@npakadin.mg",
        "razafimbelo.mariska@npakadin.mg",
        "andriamahonintsoa.rado@npakadin.mg",
        "direndre.sonal@npakadin.mg",
        "andriamandimbisoa.fy@npakadin.mg",
        "rakotoson.roger@npakadin.mg",
    ];



    const getPersonEvaluation = async () => {

        const getPersonEvaluation = await axios.post(`${url}fetchAndInsertDailyData`, { ids });
        console.log(getPersonEvaluation.data);

    }
    const getGecosEntries = async () => {

        const getPersonEvaluation = await axios.post(`${url}getGecosEntries`);
        console.log(getPersonEvaluation.data);

    }


    const getgataeva = async () => {
        try {
            const response = await axios.get(`${url}getgataevas/${loggedInUser}`);
            setNbreval(response.data.length);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchevalData = async () => {
        try {
            const response = await axios.get(`${url}fetchevaldatas`);
            console.log(response.data.length);

            setNbrcons(response.data.length)
            setEvaldata(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
            message.error('Erreur lors de la récupération des données.');
        }
    };



    const openNotification = (message) => {
        notification.error({
            message: 'Erreur',
            description: message,
            style: {
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'justify',
            },
        });
    };

    const handleClick = (path) => {
        if (!ids) {
            openNotification('Veuillez vous connecter avant de faire cette action');
        } else {
            navigate(path);
        }
    };

    useEffect(() => {
        getgataeva();
        fetchevalData();
    }, [loggedInUser]);

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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    marginTop: '100px',
                    zIndex: 1,
                }}
            >
                <Card
                    style={{
                        width: '90%',
                        maxWidth: '600px',
                        textAlign: 'center',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        zIndex: 1,
                    }}
                >
                    <img src={logonpa} width={180} height={100} alt="logo npa" />
                    <Title level={2}>Choix d'évaluation</Title>

                    {loggedInUser === 'rakotobe.marco@npakadin.mg' && (
                        <Button onClick={getPersonEvaluation}>Backup all data</Button>
                    )}


                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={24} sm={12}>
                            <Button type="primary" block onClick={() => handleClick(`/evaluation/${ids}/Evaluation cadre`)}>
                                Evaluation cadre
                            </Button>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Button type="primary" block onClick={() => handleClick(`/evalnoncadre/${ids}/Evaluation non cadre`)}>
                                Evaluation non cadre
                            </Button>
                        </Col>

                        <Col xs={24}>
                            <Button type="primary" block onClick={() => handleClick(`/evalcadrenonmanager/${ids}/Evaluation cadre non manager`)}>
                                Evaluation cadre non management
                            </Button>
                        </Col>


                        <Col xs={24}>
                            <Button
                                type="primary"
                                style={{ backgroundColor: '#00922E', borderColor: '#00922E', position: 'relative' }}
                                block
                                onClick={() => handleClick('/evaluateur')}
                            >
                                Evaluateur
                                <Badge
                                    count={nbreval}
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        position: 'absolute',
                                        top: -10,
                                        right: -25,
                                        boxShadow: '0 0 0 1px #fff, 0 0 0 2px #ff4d4f',

                                    }}
                                />
                            </Button>
                        </Col>


                        {authorizedUsers.includes(loggedInUser) && (
                            <Col xs={24}>
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: '#00922E', borderColor: '#00922E' }}
                                    block
                                    onClick={() => handleClick('/consolidation')}
                                >
                                    Consolidation & Historique
                                    <Badge
                                        count={nbrcons}
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            position: 'absolute',
                                            top: -10,
                                            right: -25,
                                            boxShadow: '0 0 0 1px #fff, 0 0 0 2px #ff4d4f',

                                        }}
                                    />
                                </Button>
                            </Col>
                        )}


                        <Col xs={24}>
                            {/* <Select
                               placeholder="Historique d'évaluation"
                                allowClear
                                options={[
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                ]}
                            /> */}
                            <Button
                                type="primary"
                                style={{ backgroundColor: '#00922E', borderColor: '#00922E', position: 'relative' }}
                                block
                                onClick={() => handleClick('/Choosehisto')}
                            >
                                Historique d'évaluation personnelle
                                <Badge
                                    // count={nbreval}
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        position: 'absolute',
                                        top: -10,
                                        right: -25,
                                        boxShadow: '0 0 0 1px #fff, 0 0 0 2px #ff4d4f',

                                    }}
                                />
                            </Button>
                        </Col>


                    </Row>
                </Card>
            </div>
        </div >
    );
};

export default Choixeval;
