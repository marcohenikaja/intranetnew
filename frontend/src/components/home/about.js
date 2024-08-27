import React from 'react';

import { Row, Col, Button, Modal, Image, Space } from 'antd';
import videos from '../../assets/video/debut.mp4'
import { Typography, Avatar } from 'antd';
import guilmann from '../../assets/images/guilmann.png'
import akadin from '../../assets/images/akadin.png'
import spider from '../../assets/images/spider.png'
import stta from '../../assets/images/stta.png'
import std from '../../assets/images/sttd.png'
import npas from '../../assets/images/npakadin.png'
import orga from '../../assets/images/organigramme des taches.png'
import { Fade } from '@mui/material';
import { useState } from 'react';

import './about.css'
const { Title } = Typography;
const items = [
  {
    key: '1',
    icon: <i className="fas fa-chart-pie"></i>,
    title: 'Pôle administratif et financier',
    content: 'Elevate your game with high-performance technology. Enjoy seamless, efficient and powerful experiences.',
  },
  {
    key: '2',
    icon: <i className="fas fa-desktop"></i>,
    title: 'Flat Design',
    content: 'Simplify your aesthetic with flat design. Clean, modern, and minimal design elements for a fresh look.',
  },
  {
    key: '3',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },

  {
    key: '4',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },

  {
    key: '5',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },

  {
    key: '6',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },

  {
    key: '7',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },
  {
    key: '8',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },
  {
    key: '9',
    icon: <i className="fas fa-database"></i>,
    title: 'Simplified Workflow',
    content: 'Streamline your work with our intuitive and efficient workflow solution. Get more done, faster and with ease.',
  },
]

function AppAbout() {
  const [random, setRandom] = useState();
  return (
    <div>
      <div className="titleHolder">
        <br /> <br /> <br />   <br />
        <div class="worksBlock">
          <div class="video-container">
            <video autoPlay muted loop id="backgroundVideo" style={{ width: '100%', height: 'auto' }}>
              <source src={videos} type="video/mp4" />
              Votre navigateur ne prend pas en charge la balise vidéo.
            </video>
            <div class="text-overlay">
              <br />    <br />   <br />
              <Fade in={true} timeout={3000}>
                <Typography variant="h1" style={{ color: 'white', fontSize: '50px', textAlign: 'center' }}>Notre histoire</Typography>
              </Fade>
            </div>
          </div>
          <div class="content">

          </div>
        </div>

        <br /><br />  <br /><br />
        <h2 style={{ color: '#00912B', fontSize: '28px' }}>Nos débuts</h2>
      </div>


      <div id="about" className="block aboutBlock">
        <div className="container-fluid">
          <div className="contentHolder">
            <p style={{ textAlign: 'justify' }}>
              Il y a 25 ans, une aventure entrepreneuriale débutait à Madagascar. Deux esprits visionnaires, Nadir HASSANALY et Pinou CHERALY, posaient les bases de ce qui allait devenir le groupe NP AKADIN. Leur rêve : construire une entreprise durable, capable d'évoluer et de laisser une empreinte positive.
              Leur première étape : la création de STTA pour le transport de poids lourds et d'hydrocarbures, et de SOREVA pour le rechapage. Deux sociétés qui ont ouvert la voie à une diversification audacieuse.
              STTA sillonnant les routes avec ses camions, SOREVA s'imposant dans le rechapage, le groupe NP AKADIN prenait son envol. Une nouvelle aventure s'est ensuite ajoutée avec STD, spécialisée dans les pièces détachées poids lourds.

            </p>
          </div>


          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>L’évolution </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
              L'arrivée de Guilmann et Spider a marqué un tournant majeur. Guilmann, spécialisé dans les travaux en bâtiments seconds œuvres, et Spider, expert en distribution d'accessoires électriques, de construction et sanitaire, ont apporté une expertise complémentaire et une nouvelle dimension au groupe.
              AKADIN est né, pour la promotion immobilière, ajoutant une nouvelle facette à l'histoire du groupe. Des immeubles érigés sur ses terres ont renforcé sa présence et sa diversification.

            </p>
          </div>

          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Un engagement qui résiste au temps </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
              NP AKADIN Services a ensuite été créé pour assurer les fonctions de support à chaque entité du groupe, devenant sa colonne vertébrale.
              Aujourd'hui, le groupe NP AKADIN est toujours fidèle à la vision de ses fondateurs. Il continue à écrire son histoire avec audace et détermination, pour un futur plus radieux pour Madagascar et au-delà.
              L'innovation, l'excellence et le changement positif sont au cœur de cette aventure passionnante. Chaque chapitre est une nouvelle opportunité de faire progresser la vision commune du groupe.

            </p>
          </div>



         
          <div className="contentHolder">
            <p style={{ textAlign: 'justify' }}>
              

             
              <h2 style={{ color: '#00912B',textAlign:'center' }}>Trois valeurs fondamentales guident le groupe NP AKADIN :</h2>

              <br />
        
              

              <Title level={4}>Être uni pour la croissance :</Title>
              Chez NP AKADIN, chaque initiative est guidée par notre engagement à être unis et à grandir ensemble, célébrant ainsi les valeurs de notre pays, Madagascar.

              <Title level={4}>Être inclusif et cohésif :</Title>
              Nous croyons en une culture d'inclusion, où la diversité est célébrée, favorisant un environnement où chacun se sent non seulement accepté mais aussi valorisé, tout en préservant notre identité malagasy.

              <Title level={4}>Être innovant et responsable :</Title>
              L'innovation chez NP AKADIN ne se mesure pas seulement par la technologie, mais aussi par l'impact positif sur la planète. Nous cherchons constamment des moyens innovants pour contribuer à un avenir durable de notre pays.


            </p>
          </div>

          <div className="titleHolder" style={{ textAlign: 'center', marginBottom: '20px' }}>

            <Space wrap size={16}>

            <Fade in={true} timeout={1000}>
                <a href="https://www.guilmann.mg/" target="_blank">
                  <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                    <img src={guilmann} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Avatar>
                </a>
              </Fade>
           


              <Fade in={true} timeout={3000}>
            <a href="https://www.akadin.mg/" target="_blank">
              <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                <img src={akadin} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Avatar>
            </a>
            </Fade>



            <Fade in={true} timeout={3000}>
            <a href="https://www.npakadin.mg/" target="_blank">
              <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                <img src={npas} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Avatar>
            </a>
            </Fade>

          
            <Fade in={true} timeout={3000}>
              <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                <img src={spider} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Avatar>
              </Fade>


              <Fade in={true} timeout={3000}>
            <a href="http://www.stta.mg/" target="_blank">
              <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                <img src={stta} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Avatar>
              </a>
              </Fade>


              <Fade in={true} timeout={3000}>
                <a href="https://www.std.mg/" target="_blank">
                <Avatar size={150} style={{ background: '#fff', boxShadow: '0px 4px 10px rgba(0, 128, 0, 0.5)' }}>
                  <img src={std} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Avatar>
                </a>
              </Fade>


            </Space>

            <br /> <br /> <br />
            <Space size={12}>
              <Image
                width='80%'
                src={orga}
                placeholder={
                  <Image
                    preview={false}
                    src={orga}
                    width={200}
                  />
                }
              />
            </Space>



          </div>



          {/* <Threetime /> */}

          {/* <Row gutter={[16, 16]}>
            {items.map(item => {
              return (
                <Col md={{ span: 8 }} key={item.key}>
                  <div className="content">
                    <div className="icon">
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </Col>
              );
            })}
          </Row> */}
        </div>
      </div>

    </div >

  );
}

export default AppAbout;