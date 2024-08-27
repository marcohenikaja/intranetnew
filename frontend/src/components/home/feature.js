import React from 'react';
import { Button, Row, Col, Card, Typography } from 'antd';
import Imagelist from './Imagelist';

import WSPVideoGallery from './WSPVideoGallery';
import logaakadin from '../../assets/images/akadin.png';
import logoguilmann from '../../assets/images/guilmann.png';
import logostta from '../../assets/images/stta.png';
import logospider from '../../assets/images/spider.png';
import logonpaservices from '../../assets/images/LOGO NPA - service.png';
import logostd from '../../assets/images/sttd.png';

import sg from '../../assets/logopng/01 - SG.png'
import hse from '../../assets/logopng/02 - HSSE.png'
import mk from '../../assets/logopng/03 - MKTG.png'
import dsi from '../../assets/logopng/04 - DSI.png'
import sup from '../../assets/logopng/05 - SUPPLY.png'
import rh from '../../assets/logopng/06 - RH.png'
import ad from '../../assets/logopng/07 - ADMIN.png'
import cia from '../../assets/logopng/08 - CIA.png'
import asdir from '../../assets/logopng/09 - AsDir.png'
import AppFaq from './faq';
import { Fade } from 'react-reveal';

import Bannier from '../common/Bannier';

const { Meta } = Card;
const { Text } = Typography;



function AppFeature() {
  const url = 'http://172.16.0.92:3000/';
  const handleClick1 = () => {
    window.open('https://www.akadin.mg/', '_blank');
  };
  return (
    <div id="feature" className="block featureBlock bgGray">
      <div className="container-fluid">
        <div className="titleHolder">
         
          
            <Fade in={true} timeout={3000}>
                <p style={{textAlign:'justify'}}>
                  Bienvenue sur l'intranet du groupe NP AKADIN, votre portail dédié à la communication interne et à l'exploration approfondie de notre univers professionnel. À travers cet espace numérique, plongez au cœur de notre groupe et découvrez les facettes qui le composent. Explorez les profils de nos dirigeants, découvrez leurs visions et aspirations pour le groupe NP AKADIN. Nous croyons en la transparence et l'échange,  c'est ici que vous trouverez les informations essentielles pour comprendre notre leadership et notre direction. Naviguez, découvrez, et restez connectés. L'intranet est bien plus qu'un simple outil de communication ; c'est votre fenêtre privilégiée pour comprendre et participer activement à l'essence même du groupe NP AKADIN. Bienvenue !
                </p>
              </Fade>
         
         
          <br /><br /><br />
          <Fade top>
            <h2>Découvrez nos sociétés</h2>
          </Fade>
        </div>

        <Row gutter={[16, 16]}>
      
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade left>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                src={logaakadin}
                style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}
                onClick={handleClick1}
              /> 
               <br />
              <Meta title="Promotion immobilière."  /> 
              <br />  <br /> 
              <Button type="primary" ghost onClick={handleClick1}>En savoir plus</Button>
            </Card>
            </Fade>
          </Col>
          

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade top>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
               <a href="https://www.guilmann.mg/" target="_blank" rel="noopener noreferrer">
                <img
                  alt="Construction et exploitation immobilière"
                  src={logoguilmann}
                  style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}
                /> 
             </a>
             <Meta title="Ingénieries, études, installations " />
             <Meta title="et maintenances." /> <br/>
            
              <a href="https://www.guilmann.mg/" target="_blank" rel="noopener noreferrer">
              <Button type="primary" ghost>
                En savoir plus
              </Button>
             </a>
            </Card>
            </Fade>
          </Col>


          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade right>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <br />
              <a href="http://www.stta.mg/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Construction et exploitation immobilière"
                src={logostta}
                style={{ width: '50%', margin: '0 auto', marginTop: '0px' }}
              /> 
              </a>
              <br />  
              <Meta title="Transport d'hydrocarbures terrestre." /> 
            
              <br /> <br />
                 <a href="http://www.stta.mg/" target="_blank" rel="noopener noreferrer">
               <Button type="primary" ghost>   En savoir plus </Button>
              </a>
            </Card>
            </Fade >
          </Col>


          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade left>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <a href="https://spider.mg/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Construction et exploitation immobilière"
                src={logospider}
                style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}
              /></a>
               <br />  
              <Meta title="Distribution de matériels électriques , " />
              <Meta title=" climatisations et sanitaires." />
              <br /> <br />
              <a href="https://spider.mg/" target="_blank" rel="noopener noreferrer">
              <Button type="primary" ghost>   En savoir plus </Button>
              </a>
              
            </Card>
            </Fade>
          </Col>


          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade bottom>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <a href="https://www.npakadin.mg/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Construction et exploitation immobilière"
                src={logonpaservices}
                style={{ width: '50%', margin: '0 auto', marginTop: '45px' }}
              />   </a><br />  <br />
              <Meta title="Fonction support pour chaque " />
              <Meta title=" entité du groupe." />
              <br /> <br />
              <a href="https://www.npakadin.mg/" target="_blank" rel="noopener noreferrer">
                <Button type="primary" ghost>
                  En savoir plus
                </Button>
              </a>
            </Card>
            </Fade>
          </Col>



          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
          <Fade right>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
               <a href="https://www.std.mg/" target="_blank" rel="noopener noreferrer">
              <img
                alt="Construction et exploitation immobilière"
                src={logostd}
                style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}
              />
              </a>
              <Meta title="Vente de pièces détachées poids lourds." />
              {/* <Text type="secondary">Vente de pièces détachées poids lourds</Text> */}
              <br /> <br />
              <br />
              <a href="https://www.std.mg/" target="_blank" rel="noopener noreferrer">
                <Button type="primary" ghost>
                  En savoir plus
                </Button>
              </a>
           
            </Card>
            </Fade>
          </Col>
        </Row>




        {/* pole */}
        <div className="titleHolder">
          <br /><br /><br /> <br /><br />
          <Fade top>
             <h2>Découvrez les pôles de NP AKADIN Services</h2>
          </Fade>
        

        </div>
        <Row gutter={[16, 16]}>
          
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={sg}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}serv`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Services Généraux" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}serv`, '_blank'); }} >   En savoir plus </Button>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={hse}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}hsse`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="HSSE" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}hsse`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={mk}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}mk`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Marketing et Communication" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}mk`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>



          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={dsi}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}si`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Système d'information" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}si`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>


          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={sup}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}sup`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Supply Chain" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}sup`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={rh}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}rh`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Ressources Humaines" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}rh`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={ad}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}af`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Administratif et Financier" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}af`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={cia}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}cia`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Contrôle Interne et Audit" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}cia`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>

          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
            <Card
              hoverable
              style={{ textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderRadius: '15px', }}
            >
              <img
                alt="Construction et exploitation immobilière"
                src={asdir}
                style={{ width: '25%', margin: '0 auto', marginTop: '20px' }} onClick={() => { window.open(`${url}assdir`, '_blank'); }}
              /> <br />  <br /> <br />
              <Meta title="Assistance de Direction" /> <br /> <br />
              <Button type="primary" ghost onClick={() => { window.open(`${url}assdir`, '_blank'); }}>   En savoir plus </Button>
            </Card>
          </Col>



        </Row>



        {/* gallery dimage */}


        <div className="titleHolder">
          <br /><br /><br /><br />
          <h2>Découvrez notre galerie d'images</h2>
          <br /><br />
          <Imagelist />
        </div>


        <Bannier/>


        <div className="titleHolder">
          <br /><br />
          <h2>Découvrez notre galerie de vidéos</h2>
          <br /><br />
          <WSPVideoGallery />
        </div>
        <AppFaq />

      </div>
    </div>
  );
}

export default AppFeature;