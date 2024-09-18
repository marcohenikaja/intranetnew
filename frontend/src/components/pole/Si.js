import React from 'react';
import videos from '../../assets/video/si.mp4'
import '../../assets/video/si.mp4'
import { useEffect, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Table, AutoComplete, Input, Modal, Badge, Image, Tooltip, Row, Col, Typography, Pagination, notification } from 'antd';
import Highlighter from 'react-highlight-words';
import { message, Popconfirm } from 'antd';
import { Avatar } from 'antd';
import { Statistic } from 'antd';
const formatter = (value) => <CountUp end={value} separator="," />;
import CountUp from 'react-countup';
import axios from 'axios';
import { Card } from 'antd';
const { Meta } = Card;
const { Title } = Typography;





const Si = () => {
    const url = 'http://172.16.0.92:8000/'
    const statut = sessionStorage.getItem('poste');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const ids = sessionStorage.getItem('ids');
    const [visibleCount, setVisibleCount] = useState(8); // état pour le nombre de cartes visibles

    const pageSize = 8; // nombre de cartes par page




    const getGecosEntries = async () => {
        if (!loggedInUser) {
            notification.info({
                message: 'Info',
                description: 'Veuillez vous connecter pour faire cette action.',
                placement: 'top',
            });
            return; // Sort de la fonction si l'utilisateur n'est pas connecté
        }

        try {
            const response = await axios.post(`${url}getGecosEntries`, { loggedInUser });

            notification.success({
                message: 'Youpiiii!!',
                description: `Votre mot de passe d'imprimante est : ${response.data.gecos}.`,
                placement: 'top',
            });
            setTimeout(() => {
                sessionStorage.removeItem('loginUser');
            }, 3000);

        } catch (error) {
            notification.error({
                message: 'Erreur de serveur',
                description: 'Une erreur est survenue lors de la récupération des données.',
                placement: 'top',
            });
        }
    };


    const handlePageChange = (page) => {
        const startIndex = (page - 1) * pageSize;
        setVisibleCount(startIndex + pageSize);
    };

    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const [open, setOpen] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [poste, setPoste] = useState('');
    const [desc, setDesc] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [tel, setTel] = useState("")
    const [mail, setMail] = useState("")
    const postes = sessionStorage.getItem('poste')
    const [rsg, setRsg] = useState([])


    const [ouvrir, setOuvrir] = useState(false)
    const [sokafana, setSokafana] = useState(false)
    const [alertup, setAlertup] = useState(false)
    const [alertsup, setAlertsup] = useState(false)
    const [nomupdate, setNomupdate] = useState("")
    const [prenomupdate, setPrenomupdate] = useState("")
    const [telupdate, setTelupdate] = useState("")
    const [mailupdate, setMailupdate] = useState("")
    const [posteupdate, setPosteupdate] = useState("")
    const [descupdate, setDescupdate] = useState("")
    const [idup, setIdup] = useState("")
    const [idsuppr, setIdsuppr] = useState("")

    const [si, setSi] = useState([])
    const [sis, setSis] = useState([])




    const recupeaf = async () => {

        try {
            const recupeservig = await axios.get(`${url}recupesi`);
            setSi(recupeservig.data)
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const recupesis = async () => {

        try {
            const recupesis = await axios.get(`${url}recupesis`);
            setSis(recupesis.data.count)
            console.log(sis);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }




    const confsupprimeraf = async (e) => {
        try {
            const confsupprimeraf = await axios.delete(`${url}supprimerPersonnes/${e}`)
            setAlertsup(true)

            recupeaf()
            setTimeout(() => {
                setAlertsup(false)
                setSokafana(false)

            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }


    const confirm = (e) => {
        message.success('Suppression avec succes');
        confsupprimeraf(e)
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };



    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const ajouteraf = async () => {

        const data = { nom, prenom, poste, tel, mail, desc, image };

        ;
        const formData = new FormData();
        formData.append("image", image);
        try {
            const responseUpload = await axios.post(`${url}UploadImagesi`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(responseUpload.data.imageUrl);

            const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
            const ajouteraf = await axios.post(`${url}ajoutersi`, { nom, prenom, poste, tel, mail, desc, imageUrlToSend, });

            window.location.reload();


        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }


    const updatedataaf = async () => {
        const data = { nomup: nomupdate, prenomup: prenomupdate, posteup: posteupdate, mailup: mailupdate, telup: telupdate, descup: descupdate };
        try {
            const up = await axios.put(`${url}updatedata/${idup}`, data)
            message.success('Modification avec succes');
            recupeaf()
            setTimeout(() => {
                setIsModalOpens(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }




    const modalFooter = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={ajouteraf} >
                Ajouter
            </Button>
        </div>
    );


    const modalFooters = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={updatedataaf}>
                Modifier
            </Button>
        </div>
    );



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    const showModals = (no, pre, post, tel, mai, mat, id) => {
        setNomupdate(no)
        setPrenomupdate(pre)
        setPosteupdate(post)
        setTelupdate(tel)
        setMailupdate(mai)
        setIdup(id)
        setIsModalOpens(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancels = () => {
        setIsModalOpens(false);
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    useEffect(() => {
        recupeaf()
        recupesis()
    }, [])


    return (
        <div>



            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>Nos collaborateurs</h2> <br />

                {statut === 'Super admin' || statut === 'Admin' ? (
                    <Button type="primary" onClick={showModal}>Ajouter un collaborateur</Button>
                ) : (
                    <Tooltip title="Veuillez vous connecter avant de publier">
                        <Button type="primary" style={{ display: 'none' }}>
                            Publier actualités
                        </Button>
                    </Tooltip>
                )}
                <Row gutter={16} align="middle" justify="center">
                    <Col span={3}>
                        <Statistic title="Personnes" value={sis} formatter={formatter} />
                    </Col>
                </Row>
            </div>


            <Row gutter={[16, 16]}>
                {si.slice(0, visibleCount).map((c, index) => ( // limiter le mapping aux 8 premiers éléments
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card style={{ margin: ' 0 auto', width: 300, height: 570, textAlign: 'center', boxShadow: '0px 4px 8px rgba(0.8, 0.8, 0.8, 0.8)' }}>
                            <Avatar
                                style={{
                                    width: 200, height: 200, margin: 'auto', marginTop: 2, backgroundColor: '#F2F6F7', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={url + c.imageUrl}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down',
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>

                            <br /><br />
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Badge.Ribbon text={c.mat} color="green" style={{ width: 250 }}>
                                    <br />
                                    <Card size="small"> {c.prenom} {c.nom}</Card>
                                    <Card size="small">Fonction: {c.poste}</Card>
                                    <Card size="small">Téléphone: {c.tel}</Card>
                                    <Card size="small">
                                        E-mail:<a href={`mailto:${c.mail}`}> {c.mail}</a>
                                    </Card>
                                </Badge.Ribbon>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Pagination
                    defaultCurrent={1} // page par défaut
                    defaultPageSize={pageSize} // nombre d'éléments par page
                    total={si.length} // nombre total d'éléments
                    onChange={handlePageChange} // gestionnaire de changement de page
                /> <br /> <br />
                <Button onClick={getGecosEntries}>Cliquez ici si vous avez oublié le mot de passe de votre imprimante.</Button>
            </div>




            <br /> <br /><br /><br /><br />

            <Modal
                title={<div style={{ textAlign: 'center' }}>Nouveau collaborateur</div>}
                visible={isModalOpen}
                footer={modalFooter}
                onCancel={handleCancel}
                width={310}
            >
                <br />
                <Input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Poste" value={poste} onChange={(e) => setPoste(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Téléphone" value={tel} onChange={(e) => setTel(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Description" />
                <br />
                <br />
                <input type="file" accept="image/*" onChange={handleFileChange} sx={{ mt: 2, fontSize: 14 }} />
                <br />
                <br />
            </Modal>




            <Modal
                title={<div style={{ textAlign: 'center' }}>Modification</div>}
                visible={isModalOpens}
                footer={modalFooters}
                onCancel={handleCancels}
                width={310}
            >
                <br />
                <Input placeholder="Nom" value={nomupdate} onChange={(e) => setNomupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" value={prenomupdate} onChange={(e) => setPrenomupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Poste" value={posteupdate} onChange={(e) => setPosteupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Téléphone" value={telupdate} onChange={(e) => setTelupdate(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Mail" value={mailupdate} onChange={(e) => setMailupdate(e.target.value)} />
                <br />
                <br />

            </Modal>
        </div >
    );
};

export default Si;