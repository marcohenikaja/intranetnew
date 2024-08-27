
import React from 'react';
import logos from '../../assets/images/LOGO NPA.png'
import { BackTop, Divider } from 'antd';
import { LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';
import Cgu from '../home/Cgu';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
const { Title } = Typography;

function AppFooter() {
  const handleClick = () => {
    window.open('https://www.facebook.com/groupe.np.akadin', '_blank');
  };


  const handleClicks = () => {
    window.open('https://www.linkedin.com/company/groupe-np-akadin/', '_blank');
  };
  return (

    <div className="container-fluid">
      <div className="footer">
        <div className="logo" >
          <img src={logos} style={{ width: '150px', height: '70px', backgroundColor: 'white', borderRadius: '5px' }} />
        </div>

        <Title level={5} style={{ color: '#DCDCDC' }}>Innover aujourd'hui, pour un lendemain meilleur.</Title>
        <div>
          <Divider style={{ borderColor: 'white' }} />
        </div>

        <div className="blocks-container">
          <div className="blockS">
            <Title level={4} style={{ color: '#DCDCDC' }}>SUIVEZ-NOUS</Title> <br />
            <a href="https://www.facebook.com/groupe.np.akadin" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
              <FacebookOutlined style={{ fontSize: '40px', color: '#9c9c9c' }} />
            </a>
            <a href="https://www.linkedin.com/company/groupe-np-akadin/" target="_blank" rel="noopener noreferrer" onClick={handleClicks}>
              <LinkedinOutlined style={{ fontSize: '40px', color: '#9c9c9c' }} />
            </a>
          </div>

          <div className="blockS">
            <Title level={4} style={{ color: '#DCDCDC' }}>LIENS UTILES</Title>
            <br />
            <Link to="/"> <Title level={5} style={{ color: '#9c9c9c' }}>Accueil</Title></Link> <br />
            <Link to="/team"> <Title level={5} style={{ color: '#9c9c9c' }}>Groupes</Title></Link>  <br />
            <Link to="/ressource"> <Title level={5} style={{ color: '#9c9c9c' }}>Ressources</Title></Link>  <br />
            <Link to="/actus"> <Title level={5} style={{ color: '#9c9c9c' }}>Actualités</Title></Link>  <br />
            <Link to="/histo"> <Title level={5} style={{ color: '#9c9c9c' }}>Notre histoire</Title></Link>  <br />
            <Link to="/annuaire"> <Title level={5} style={{ color: '#9c9c9c' }}>Annuaire du groupe</Title></Link>

          </div>

          <div className="blockS">
            <Title level={4} style={{ color: '#DCDCDC' }}>MENTIONS LÉGALES</Title> <br />
            <a href="/cgu" target="_blank" rel="noopener noreferrer">
              <Title level={4} style={{ color: '#9c9c9c' }}>Conditions générales d'utilisation</Title>
            </a>
            <br />
            {/* <Title level={4} style={{ color: '#DCDCDC' }}>ASSISTANCE</Title>
            <Title level={5} style={{ color: '#9c9c9c' }}>FAQ</Title>
            <Title level={5} style={{ color: '#9c9c9c' }}>Coordonnées</Title> */}

          </div>

          <div className="blockS">
            <Title level={4} style={{ color: '#DCDCDC' }}>NOS ENTREPRISES</Title>
           
            <br/>
            <a href="https://www.std.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>STD</Title>
            </a>



            <br/>
            <a href="http://www.stta.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>STTA</Title>
            </a>


            <br/>
            <a href="https://spider.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>SPIDER</Title>
            </a>
            
            <br/>
            <a href="https://www.guilmann.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>GUILMANN</Title>
            </a>


            <br/>
            <a href="https://www.akadin.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>AKADIN</Title>
            </a>
            <br/>
            <a href="https://www.npakadin.mg/" target="_blank" rel="noopener noreferrer">
              <Title level={5} style={{ color: '#9c9c9c' }}>NP AKADIN Services</Title>
            </a>

           
            

          </div>

        </div>

        <div>
          <Divider style={{ borderColor: 'white' }} />
        </div>

        <div className="copyright">Copyright &copy; 2023 DSI NP AKADIN Services</div> <br/>

        <div>
            <p>Tout le contenu du site INTRANET est protégé par le droit d’auteur et appartient à la Société. Il est interdit d’utiliser tout ou une partie de ce contenu sans l’autorisation écrite de la Société. Pour faire une demande, veuillez envoyer un mail à l’adresse suivante : <a href="mailto:dsi@npakadin.mg">dsi@npakadin.mg</a></p>
          </div>


        <BackTop>
          <div className="goTop"><i className="fas fa-arrow-circle-up"></i></div>
        </BackTop>
      </div>
    </div>



  );
}

export default AppFooter;