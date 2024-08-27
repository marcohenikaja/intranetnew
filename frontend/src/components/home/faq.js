import React from 'react';
import AppWorks from './works';
import { Collapse, Button } from 'antd';

const { Panel } = Collapse;

function AppFaq() {
  return (
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Foire aux questions</h2>
        </div>
        <Collapse defaultActiveKey={['1']}>

          <Panel header="Qui est Guilman en réalité?" key="2">
            <p>Fondée en décembre 2009, la société Guilmann est une société d’installation et d’ingénierie, partenaire de diverses marques de renommée mondiale.</p>
          </Panel>
          <Panel header="Quelle est la véritable signification de STTA ?" key="3">
            <p>STTA signifie (SOCIETE DE TRANSPORT ET DE TERRASSEMENT D’ANTSIRABE).</p>
          </Panel>
          <Panel header="C'est quoi Akadin ?" key="4">
            <p>AKADIN est la société de promotion immobilière du Groupe NP AKADIN. </p>
          </Panel>
          <Panel header="Que fait vraiment STD ?" key="5">
            <p>STD est l'entreprise au sein du groupe NP AKADIN spécialisée dans la vente de pièces détachées poids lourds.</p>
          </Panel>
          <Panel header="Qui est NP AKADIN Services?" key="6">
            <p>NP AKADIN Services est la branche du groupe en charge des fonctions supports de toutes les entités.</p>
          </Panel>
        </Collapse>

        <AppWorks />


      </div>
    </div>
  );
}

export default AppFaq;