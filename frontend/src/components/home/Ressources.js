import React from 'react';
import { Card, Row, Col, Anchor } from 'antd';
import { useState } from 'react';
import sg from '../../assets/logocompil/01 - SG coul.png';
import hsse from '../../assets/logocompil/02 - HSSE coul.png';
import mk from '../../assets/logocompil/03 - MKTG coul.png';
import dsi from '../../assets/logocompil/04 - DSI coul.png';
import supply from '../../assets/logocompil/05 - SUPPLY coul.png';
import rh from '../../assets/logocompil/06 - RH coul.png';
import finance from '../../assets/logocompil/07 - ADMIN coul.png';
import assist from '../../assets/logocompil/08 - CIA coul.png';
import cia from '../../assets/logocompil/09 - AsDir coul.png';
import { Button, Flex, Modal, Upload, Input, Select, Tooltip,message  } from 'antd';
import { Link } from "react-router-dom"
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import videos from '../../assets/video/Doc.mp4'
import Bannier from '../common/Bannier';
import { Typography } from 'antd';
const { Title } = Typography;
const { Meta } = Card;
const { TextArea } = Input;


const Ressources = () => {
    const styles = `
    /* ... Vos autres styles ... */
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
    }
  
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 100px; /* Espacement entre les colonnes */
    }
  
    .column {
      flex: calc(33.33% - 2px); /* Chaque colonne occupe environ 33.33% de l'espace, en tenant compte de la marge */
      padding: 0 10px; /* Espacement entre les colonnes */
      margin-bottom: 50px; /* Ajout d'un espacement en bas pour les colonnes */
      transition: transform 0.3s ease; /* Ajoutez cette ligne */
      border-radius: 80px;
    }
  
    .effect {
      position: relative;
    }
  
    .effect-img img {
      width: 100%;
      height: auto;
      display: block;
    }
  
    .effect-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  
    .effect:hover .effect-btn {
      opacity: 1;
    }
  
    .column:hover {
      transform: scale(1.1);
    }
  `;

    const [isModalOpens, setIsModalOpens] = useState(false);
    const statut = sessionStorage.getItem('poste');
    const [visible, setVisible] = useState(false);

    const showModals = () => {
        setIsModalOpens(true);
    };
    const handleCancels = () => {
        setIsModalOpens(false);
    };


    const url = 'http://172.16.0.92:8000/'
    const [opens, setOpens] = useState(false);
    const [alertsuc, setAlertsuc] = useState(false)
    const [ope, setOpe] = useState(false);
    const [alertsucs, setAlertsucs] = useState(false)
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [alertvide, setAlertvide] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const [dep, setDep] = useState('')
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [matricule, setMatricule] = useState('')
    const [alertcontact, setAlertcontact] = useState(false)



    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };




    const uploadImage = async () => {
        if (image === null) {
            openMessages()
            setAlertvide(true)
            setTimeout(() => {
                setAlertvide(false)
            }, 2000)

            return;
        } else if (image !== null) {
            const formData = new FormData();
            formData.append("image", image);
            console.log(image);
            try {
                const responseUpload = await axios.post(`${url}uploadImages`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setImageUrl(responseUpload.data.imageUrl);

                const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;
                const responseEnregitrermedia = await axios.post(`${url}Enregitrermedia`, { ids, imageUrl: imageUrlToSend, titre, dep, description, loggedInUser });

                if (responseEnregitrermedia.data['success'] === true) {
                    openMessage();
                    setDescription("");
                    setTitre("");
                    setImageUrl(null);

                    setAlertsucs(true)
                    setTimeout(() => {
                        setAlertsucs(false)
                        setOpen(false);
                        window.location.reload()
                    }, 1000)
                } else {
                    alert("false");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const openMessage = () => {
      messageApi.open({
        key,
        type: 'loading',
        content: 'Chargement...',
      });
      setTimeout(() => {
        messageApi.open({
          key,
          type: 'success',
          content: 'Document bien publié!',
          duration: 2,
        });
      }, 1000);
    };


    const openMessages = () => {
        messageApi.open({
          key,
          type: 'loading',
          content: 'Chargement...',
        });
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'error',
            content: 'Veuillez séléctionne un document!',
            duration: 1,
          });
        }, 1000);
      };



    const modalFooters = (
        <div style={{ textAlign: 'center' }}>
             {contextHolder}
     
        
            <Button type="primary" onClick={uploadImage}>
                Publier
            </Button>
        </div>
    );
    return (
        <>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <video autoPlay muted loop id="backgroundVideo" style={{ width: '100%', height: 'auto' }}>
                            <source src={videos} type="video/mp4" />
                            Votre navigateur ne prend pas en charge la balise vidéo.
                        </video>




                        <div className="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Ressources</Title>
                            <div style={{ textAlign: 'center', position: 'fixed', right: '50%', transform: 'translateX(50%)' }}>
                                {statut === 'Super admin' || statut === 'Admin' ? (
                                  <Button type="primary" onClick={showModals} >
                                  Publier ressources
                              </Button>
                                ) : (
                                    <Tooltip title="Veuillez vous connecter avant de publier">
                                        <Button type="primary" style={{ display: 'none' }}>
                                               Publier ressources
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>


                        </div>

                    </div>

                </div>

            </div>


                         <div id="about" className="block aboutBlock">
                <div className="container-fluid">
                    <div className="contentHolder">
                    <div className="titleHolder">
                            <h2> Nos ressources</h2>
                    </div>
                        <p >
                                      Le groupe NP AKADIN est vaste, et la grandeur d'un groupe nécessite une équipe de support à la hauteur. C'est là que NP AKADIN Services intervient en tant que fonction support pour chaque entité du groupe, en s'appuyant sur ses 9 pôles d'expertise dédiés. Dans le but de vous offrir un service toujours plus efficace, chaque pôle met à votre disposition ici ses ressources humaines et numériques. Cette démarche vise à faciliter votre compréhension et votre familiarisation avec nos processus internes. Chez NP AKADIN, nous sommes déterminés à vous fournir un accompagnement de qualité à chaque étape.
                        </p>

                       
                    </div>
                </div>
            </div>



            <style>{styles}</style>
            {/* <div className="row">
                <div className="column">
                    <div className="effect">
                        <div className="effect-img">
                            <img src={sg} alt="Service Généraux" />
                        </div>
                        <div className="effect-btn">

                            <div className="responsive-buttons">

                                <Link to='/resssg' target='_blank' style={{ textDecoration: 'none' }}>

                                    <Button type="primary">Visualiser</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div> */}

            <div className="row">
                
                <div className="column">
                <Link to='/resssg' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={sg} alt="Service Généraux" />
                        </div>
                        <div className="effect-btn">

                            <div className="responsive-buttons">

                                {/* <Link to='/resssg' target='_blank' style={{ textDecoration: 'none' }}>

                                    <Button type="primary">Visualiser</Button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>

                {/* Répétez la structure suivante pour chaque image */}
                <div className="column">
                <Link to='/Resshsse' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={hsse} alt="HSSE" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                             
                               

                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="column">
                <Link to='/ressmk' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={mk} alt="Marketing" />
                        </div>
                        <div className="effect-btn" >
                        </div>
                    </div>
                    </Link>
                </div >

                <div className="column">
                <Link to='/resssi' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={dsi} alt="DSI" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                              
                                   
                              

                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="column">
                <Link to='/resssup' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={supply} alt="Supply Chain" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                              
                                  
                                
                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="column">
                <Link to='/ressrh' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={rh} alt="Ressources Humaines" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                              
                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="column">
                <Link to='/ressaf' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={finance} alt="Finance" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                              
                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="column">
                <Link to='/resscia' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={assist} alt="Assistante de direction" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                               
                              
                             

                            </a>
                        </div>
                    </div>
                    </Link>
                </div>





                <div className="column">
                <Link to='/ressassdir' target='_blank' style={{ textDecoration: 'none' }}>
                    <div className="effect">
                        <div className="effect-img">
                            <img src={cia} alt="Assistante de direction" />
                        </div>
                        <div className="effect-btn" >

                            <a href="#" className="btn" style={{ color: 'white' }}>
                             
                            </a>
                        </div>
                    </div>
                    </Link>
                </div>

            </div >



            <Modal title={<div style={{ textAlign: 'center' }}>Publier document</div>} visible={isModalOpens} footer={modalFooters} onCancel={handleCancels} width={300}>
                <Input placeholder="Titre" allowClear onChange={(e) => setTitre(e.target.value)} />
                <br />
                <br />
                <TextArea placeholder="Description" allowClear autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setDescription(e.target.value)} />
                <br /> <br />

                <Select
                    style={{ width: 250 }}
                    placeholder="Pôle"
                    value={dep}
                    onChange={(value) => setDep(value)} // Utilisez simplement la valeur passée par onChange
                >
                    <Option value="Services généraux">Services généraux</Option>
                    <Option value="HSSE">HSSE</Option>
                    <Option value="Marketing et Communication">Marketing et Communication</Option>
                    <Option value="Système d'information">Système d'information</Option>
                    <Option value="Supply Chain">Supply Chain</Option>
                    <Option value="Ressources Humaines">Ressources Humaines</Option>
                    <Option value="Administratif et Financier">Administratif et Financier</Option>
                    <Option value="Contrôle Interne et Audit">Contrôle Interne et Audit</Option>
                    <Option value="Assistance de direction">Assistance de direction</Option>
                </Select>

                <br /> <br />

                <input type="file" accept=".txt, .xlx, .xlsx, .doc, .docx, .pdf" onChange={handleFileChange} />

                <Typography variant="subtitle1" color="textSecondary">
                    Formats acceptés :  .txt, .xlx,.xlsx,.doc,.docx,.pdf
                </Typography>
            </Modal>

        </>
    );
};

export default Ressources;