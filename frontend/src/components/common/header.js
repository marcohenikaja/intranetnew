


import React, { useState, useEffect } from 'react';
import { Anchor, Drawer, Button, Modal, Input, Tooltip, Alert, Avatar, Image } from 'antd';
import logos from '../../assets/images/LOGO NPA.png';
import { InfoCircleOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import BirthdayBanner from './BirthdayBanner';

const { Link } = Anchor;

function AppHeader() {
  const url = 'http://172.16.0.92:8000/';
  const [visible, setVisible] = useState(false);
  const statut = sessionStorage.getItem('poste');
  const loggedInUser = sessionStorage.getItem('loginUser');
  const [alertvides, setAlertvides] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [alerterror, setAlerterror] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [birthdayName, setBirthdayName] = useState('');


  const [imgurl, setImgurl] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };



  const getFirstNameFromEmail = (email) => {
    if (!email) return '';
    const [firstPart] = email.split('@');
    const parts = firstPart.split('.');
    const firstName = parts.length > 1 ? parts[1] : parts[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  };



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

 

  const login = async () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@npakadin\.mg$/;
  
    // Remplacer les domaines par npakadin.mg
    const modifiedUsername = username.replace(/@(guilmann\.mg|spider\.mg|stta\.mg|std\.mg)$/, '@npakadin.mg');
  
    if (modifiedUsername === "" || password === "") {
      setAlertvides(true);
      setTimeout(() => {
        setAlertvides(false);
      }, 2000);
      return;
    } else if (!emailPattern.test(modifiedUsername)) {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 2000);
      return;
    } else {
      try {
        const response = await axios.post(`${url}login`, { username: modifiedUsername, password });
  
        if (response.data.success) {
          sessionStorage.setItem('ids', response.data.ids);
          sessionStorage.setItem('loginUser', response.data.login);
          sessionStorage.setItem('pwdUser', response.data.pwd);
          sessionStorage.setItem('poste', response.data.poste);
          window.location.reload();
        } else {
          setAlerterror(true);
          setTimeout(() => {
            setAlerterror(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Erreur lors de la requête POST :', error);
        setAlerterror(true);
        setTimeout(() => {
          setAlerterror(false);
        }, 2000);
      }
    }
  };

  const deconnexion = async () => {
    sessionStorage.removeItem('loginUser');
    sessionStorage.removeItem('pwdUser');
    sessionStorage.removeItem('poste');
    sessionStorage.removeItem('ids');
    window.location.reload();
  };

  const modalFooter = (
    <div style={{ textAlign: 'center' }}>
      <Button type="primary" onClick={login}>
        Connexion
      </Button>
    </div>
  );

  const getimg = async () => {
    try {
      const response = await axios.get(`${url}getimg`, { params: { user: loggedInUser } });
      console.log(response.data);
      setImgurl(response.data.imgUrl); // Assuming the response contains the image URL in `imgUrl`
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image :', error);
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      getimg();
    }
  }, [loggedInUser]);

  return (
    <div>
      <div className="container-fluid">

        <div className="header">
          <div className="logo">
            <a href="http://172.16.0.92:3000/">
              <img src={logos} style={{ width: '150px', height: '70px' }} alt="Logo" />
            </a>
          </div>

          <div className="mobileHidden">
            <Anchor targetOffset="65">
              <Link href="/" title="Accueil" />
              <Link href="histo" title="Notre histoire" />
              <Link href="team" title="Groupe" />
              <Link href="actus" title="Actualités" />
              <Link href="ressource" title="Ressources" />
              <Link href="annuaire" title="Annuaire du groupe" />

              {(loggedInUser === "rakotobe.marco@npakadin.mg") || (loggedInUser === "ravelomanatsoa.faniry@npakadin.mg") || (loggedInUser === "rafanomezantsoa.espoir@npakadin.mg") || (loggedInUser === "maholiarisoa.jeamis@npakadin.mg") ? (
                <Link href="pbxlogger" title="Pbxlogger" />
              ) : null}

              {(statut === "Super admin") ? (
                <Link href="listeuser" title="Liste utilisateur" />
              ) : null}

              {!loggedInUser ? (
                <Button type="primary" onClick={showModal}>Connexion</Button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={`${url}${imgurl}`}
                    onClick={handleOpenModal}
                    style={{ marginLeft: '100px', cursor: 'pointer', marginRight: '15px' }} // Added marginRight
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '15px' }}> {/* Added marginRight */}
                    <span>{getFirstNameFromEmail(loggedInUser)}</span>
                    <LogoutOutlined onClick={deconnexion} style={{ color: 'red', marginTop: '1px' }} />
                  </div>
                </div>
              )}

              <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCloseModal}
                centered
                style={{ textAlign: 'center', backgroundColor: 'transparent' }}
              >
                <img
                  src={`${url}${imgurl}`}
                  alt="Preview"
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    width: '100%'
                  }}
                />
              </Modal>
            </Anchor>


          </div>



          <div className="mobileVisible">
            <Button type="primary" onClick={showDrawer}>
              <i className="fas fa-bars"></i>
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Anchor targetOffset="65">
                <Link href="/" title="Accueil" />
                <Link href="histo" title="Notre histoire" />
                <Link href="team" title="Groupe" />
                <Link href="actus" title="Actualités" />
                <Link href="ressource" title="Ressources" />
                <Link href="annuaire" title="Annuaire du groupe" />

                {(loggedInUser === "rakotobe.marco@npakadin.mg") || (loggedInUser === "ravelomanatsoa.faniry@npakadin.mg") || (loggedInUser === "rafanomezantsoa.espoir@npakadin.mg") || (loggedInUser === "maholiarisoa.jeamis@npakadin.mg") ? (
                  <Link href="pbxlogger" title="Pbxlogger" />
                ) : null}

                {(statut === "Super admin") ? (
                  <Link to='/listeuser'>Liste utilisateur</Link>
                ) : null}

                {!loggedInUser ? (
                  <Button type="primary" onClick={showModal}>Connexion</Button>
                ) : (
                  <Button type="primary" danger onClick={deconnexion}>Déconnexion</Button>
                )}
              </Anchor>
            </Drawer>

            <Modal
              title={<div style={{ textAlign: 'center' }}>Connexion</div>}
              visible={isModalOpen}
              footer={modalFooter}
              onCancel={handleCancel}
              width={310}
            >
              {invalidEmail && (<Alert type="error" message=" Veuillez vérifier votre e-mail " showIcon />)}
              {alertvides && (<Alert message="Veuiller remplir les champs vides" type="error" showIcon />)}
              {alerterror && <Alert severity="error" message="Nom d'utilisateur ou mot de passe " showIcon />}
              <br />
              <Input
                placeholder="Entrer votre E-mail"
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="(nom.prenom@npakadin.mg) (nom.prenom@guilmann.mg) (nom.prenom@spider.mg)">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />
              <Input.Password placeholder="Mot de passe session windows" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <br />
            </Modal>
          </div>
        </div>

      </div>
      {isBirthday && <BirthdayBanner name={birthdayName} />}
    </div>
  );
}

export default AppHeader;



