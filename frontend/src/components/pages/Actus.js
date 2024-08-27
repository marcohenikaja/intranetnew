import React from 'react';
import AppWorks from '../home/works';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Upload, Button, Modal, Typography, Input, message, Select, notification, Space, Tooltip, Badge, Card } from 'antd';
import { Fade } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import videos from '../../assets/video/Actu.mp4';
import Bonplan from './Bonplan';
import Actusentre from './Actusentre';
import Actuscollab from './Actuscollab';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const Actus = () => {
    const url = 'http://172.16.0.92:8000/'
    const statut = sessionStorage.getItem('poste');
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const postes = sessionStorage.getItem('poste');
    const [opens, setOpens] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [alertvide, setAlertvide] = useState(false);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [alertmety, setAlertmety] = useState(false);
    const [pole, setPole] = useState('');
    const [thumb, setThumb] = useState(null);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Actualités bien publiés',
            description:
                '',
        });
    };

    const openNotificationWithIcons = (type) => {
        api[type]({
            message: "Veuillez sélectionner un type d'actualité.",
            description:
                '',
        });
    };

    const handleFileChange = async (event) => {
        try {
            // Assurez-vous que 'event' est défini
            if (event && event.file) {
                const selectedFile = event.file;
                setImage(selectedFile); // Utilisez 'selectedFile' plutôt que 'event.target.files[0]'
            } else {
                console.error("L'événement n'a pas la propriété 'file'.", event);
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du fichier:', error);
        }
    };







    const uploadImages = async () => {
        if (image === null) {
            if (pole == '' || pole == null) {
                openNotificationWithIcons('error');
                return;
            } else {
                const responseEnregitrermedia = await axios.post(`${url}Enregitrermediact`, { ids, imageUrl: 'null.vide', titre, description, loggedInUser, pole });
                setDescription("");
                setTitre("");
                setImageUrl(null);
                setAlertmety(true)
                setTimeout(() => {
                    setAlertmety(false)
                    setOpens(false);
                    window.location.reload()
                }, 1000);

                return;
            }

        } else if (image !== null) {

            const formData = new FormData();
            formData.append("image", image);
            try {
                const responseUpload = await axios.post(`${url}uploadImage`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });


                setThumb(responseUpload.data.thumbnailUrl);
                setImageUrl(responseUpload.data.imageUrl);

                const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
                const tmbToSend = responseUpload.data.thumbnailUrl || thumb;

                const responseEnregitrermedia = await axios.post(`${url}Enregitrermediact`, { ids, imageUrl: imageUrlToSend, titre, description, loggedInUser, pole, urlthm: tmbToSend });

                if (responseEnregitrermedia.data['success'] === true) {
                    openNotificationWithIcon('success');
                    setDescription("");
                    setTitre("");
                    setImageUrl(null);
                    setAlertmety(true)
                    setTimeout(() => {
                        setAlertmety(false)
                        setOpens(false);
                        window.location.reload()
                    }, 1000);

                } else {
                    alert("false");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const modalFooter = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={uploadImages} >
                Publier
            </Button>
        </div>
    );

    return (
        <>
            {contextHolder}

            <div className="titleHolder">
                <div class="worksBlock">
                    <div class="video-container">
                        <video autoPlay muted loop id="backgroundVideo" style={{ width: '100%', height: 'auto' }}>
                            <source src={videos} type="video/mp4" />
                            Votre navigateur ne prend pas en charge la balise vidéo.
                        </video>
                        <div class="text-overlay">
                            <br /><br /><br /><br /><br /><br />
                            <Fade in={true} timeout={3000}>
                                <Title style={{ color: 'white', fontSize: '50px' }}>Actualités</Title>
                            </Fade>


                            <div style={{ textAlign: 'center', position: 'fixed', right: '50%', transform: 'translateX(50%)' }}>
                                {statut === 'Super admin' || statut === 'Admin' ? (
                                    <Button type="primary" onClick={showModal}>
                                        Publier actualités
                                    </Button>
                                ) : (
                                    <Tooltip title="Veuillez vous connecter avant de publier">
                                        <Button type="primary" style={{ display: 'none' }}>
                                            Publier actualités
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>


                        </div>
                    </div>
                    <div class="content">

                    </div>
                </div>
            </div>


            <div className="titleHolder">


                <div style={{ textAlign: 'center' }}>
                    <Fade in={true} timeout={3000}>
                        <Title style={{ color: '#009918', fontSize: '50px' }}>Actualités</Title>
                    </Fade>
                    <p style={{ textAlign: 'justify', padding: '0 50px' }}>La Bienvenue dans la section "Actualités" de notre site intranet, l'espace dédié à partager les nouvelles qui marquent la vie dynamique de notre entreprise. Nous avons structuré ce menu en trois catégories distinctes pour une navigation claire et efficace :</p>
                    <p> Bons Plans - Actus Collaborateurs - Actus Entreprises </p>
                    <p style={{ textAlign: 'justify', padding: '0 50px' }}>Découvrez ci-dessous le contenu de chaque rubrique. Nous vous invitons à explorer ces sections régulièrement pour rester informé, inspiré et connecté à la vie florissante de notre entreprise. N'hésitez pas à contribuer, partager et échanger dans cet espace dédié aux actualités qui font la richesse de notre communauté.</p>

                </div>







                <h2>Bons plans</h2>
                <p style={{ textAlign: 'justify', padding: '0 50px' }}>
                    Dans cette rubrique, partageons ensemble les petits trésors qui font toute la différence au quotidien. Que ce soient des astuces pratiques, des bons plans économiques ou de petites idées qui ont un grand impact sur notre bien-être, c'est l'endroit idéal pour échanger et s'inspirer mutuellement. Ensemble, construisons une boîte à outils pleine de ressources pour rendre notre quotidien encore plus agréable et efficace.
                </p>
            </div>

            <Bonplan />
            <br />


            <div className="titleHolder">
                <h2>Actus entreprises</h2>
                <p style={{ textAlign: 'justify', padding: '0 50px' }}>
                    Dans cette section, découvrons et célébrons les points forts de notre entreprise. Qu'il s'agisse de réalisations remarquables, de nouveaux projets passionnants, ou de réussites collectives, c'est le lieu où nous mettons en avant la vitalité et la croissance de notre organisation. Ensemble, partageons la fierté d'appartenir à une entreprise dynamique et tournée vers l'avenir.
                </p>
            </div>
            <Actusentre />




            <div className="titleHolder">
                <h2>Actus collaborateurs</h2>
                <p style={{ textAlign: 'justify', padding: '0 50px' }}>
                    Ici, célébrons les réussites et les réalisations exceptionnelles de nos collègues. Mettons en lumière les moments de fierté, partageons les succès et encourageons-nous mutuellement. C'est également l'espace dédié aux nouvelles moins joyeuses qui requièrent notre solidarité. En tant que communauté, nous sommes là les uns pour les autres, prêts à soutenir nos collègues dans les hauts comme dans les bas. C'est dans l'union que nous renforçons nos liens et que nous faisons face aux défis.
                </p>
            </div>
            <Actuscollab />
            <br /><br /><br /><br /><br />

            <Modal title={<div style={{ textAlign: 'center' }}>Publier actualités</div>} visible={isModalOpen} footer={modalFooter} onCancel={handleCancel} width={300}>
                <Input placeholder="Titre de l'actualité" allowClear onChange={(e) => setTitre(e.target.value)} />
                <br />
                <br />
                <TextArea placeholder="Contenu de l'actualité" allowClear autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setDescription(e.target.value)} />
                <br /> <br />
                <Select
                    style={{ width: 250 }}
                    onChange={(value) => setPole(value)}
                    value={pole}
                >
                    <Option value="Bons plans">Bons plans</Option>
                    <Option value="Actus collaborateurs">Actus collaborateurs</Option>
                    <Option value="Actus entreprises">Actus entreprises</Option>
                </Select>
                <br /> <br />
                <Upload
                    accept=".jpg,.png,.mp4" // Types de fichiers acceptés
                    beforeUpload={() => false} // Pour éviter le téléchargement automatique
                    showUploadList={false} // Pour cacher la liste des fichiers téléchargés
                    onChange={handleFileChange} // Assurez-vous que cette fonction est correctement implémentée
                >
                    <Button icon={<UploadOutlined />} style={{ margin: '0 auto', display: 'block' }}>
                        Cliquer ici pour joindre un fichier
                    </Button>
                </Upload>


                <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '10px' }}>
                    Formats acceptés : .jpg, .png, .mp4...
                </Typography>
            </Modal>



        </>
    );
};

export default Actus;

