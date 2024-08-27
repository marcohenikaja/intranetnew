import React from 'react';
import videos from '../../assets/video/debut.mp4'
import { Typography } from 'antd';
import cgu from '../../assets/pole/cgu.png'
import './about.css'
const { Title } = Typography;


function Cgu() {
  return (
    <div>
      <div className="titleHolder">
        <br /> <br /> <br />   <br />
        <div class="worksBlock">
          <div class="video-container">
            <img src={cgu} alt='cgu' width='100%'/>
            <div class="text-overlay">
              <Title style={{ color: 'white', fontSize: '50px' }}>CGU</Title>
            </div>
          </div>
        </div>
      </div>


      <div id="about" className="block aboutBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Conditions Générales D’utilisation</h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Bienvenue sur l'intranet de notre entreprise. Nous sommes ravis de vous offrir cet outil collaboratif conçu pour améliorer la communication interne et la diffusion d'informations au sein de notre organisation. Avant de commencer à utiliser notre intranet, veuillez prendre quelques instants pour lire et comprendre les conditions générales d'utilisation (CGU) ci-dessous.
            </p>
          </div>



          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Objectif de l'intranet :Objectif de l'intranet </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            L'intranet est avant tout un outil collaboratif conçu pour faciliter la communication interne, accélérer le partage d'informations au sein de l'entreprise, et favoriser la collaboration entre les membres de notre organisation.
            </p>
          </div>


          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Respect mutuel et courtoisie</h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Nous encourageons un respect mutuel dans toutes les communications sur l'intranet. Nous vous rappelons qu'il est possible d'être cordial tout en exprimant des opinions et des commentaires de manière constructive et respectueuse.
            </p>
          </div>




          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Accès aux informations par département </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Chaque direction au sein de l'entreprise disposera d'un accès au menu de son département sur l'intranet. Cette fonctionnalité permet à chaque département de partager des informations pertinentes pour ses membres.
            </p>
          </div>




          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Super administrateurs </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Deux super administrateurs seront de veille pour modérer le site et veiller à son bon fonctionnement. Ils auront des droits étendus pour gérer les contenus et les utilisateurs.
            </p>
          </div>



          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Menu Actualités </h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Le menu "Actualités" est ouvert à tous les membres de l'entreprise pour partager des informations. Il est divisé en trois sections : "Bons Plans" : Partagez vos astuces, recommandations, ou opportunités bénéfiques pour les membres de l'entreprise. "Actu Collaborateurs" : Restez informés des actualités et événements liés à vos collègues. "Actus Entreprises" : Tenez-vous au courant des dernières nouvelles et mises à jour de l'entreprise. En utilisant notre intranet, vous acceptez de respecter ces conditions générales d'utilisation. Nous nous réservons le droit de mettre à jour ces CGU à tout moment. Il est de votre responsabilité de consulter régulièrement cette page pour vous tenir informé des éventuelles modifications. En cas de non-respect des présentes CGU, nous nous réservons le droit de prendre des mesures appropriées, y compris la révocation de l'accès à l'intranet. Nous vous remercions de contribuer à faire de notre intranet un outil de communication interne efficace et respectueux de tous les membres de l'entreprise.
            </p>
          </div>


          <div className="titleHolder">
            <h2 style={{ color: '#00912B' }}>Évolution du design du site</h2>
          </div>
          <div className="contentHolder">

            <p style={{ textAlign: 'justify' }}>
            Le design du site évoluera en fonction des besoins internes et des retours des utilisateurs, afin de garantir une expérience optimale pour tous.


En utilisant notre intranet, vous acceptez de respecter ces conditions générales d'utilisation. Nous nous réservons le droit de mettre à jour ces CGU à tout moment. Il est de votre responsabilité de consulter régulièrement cette page pour vous tenir informé des éventuelles modifications. En cas de non-respect des présentes CGU, nous nous réservons le droit de prendre des mesures appropriées, y compris la révocation de l'accès à l'intranet. Nous vous remercions de contribuer à faire de notre intranet un outil de communication interne efficace et respectueux de tous les membres de l'entreprise.
            </p>
          </div>



        </div>
      </div>

    </div >

  );
}

export default Cgu;