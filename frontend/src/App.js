import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import AppFaq from './components/home/faq';
import AppHeader from './components/common/header';
import AppFooter from './components/common/footer';
import AppHome from './views/home';
import AppAbout from './components/home/about';
import Ressources from './components/home/Ressources';
import Team from './components/home/Team';
import Annuaire from './components/home/Annuaire';
import Actus from './components/pages/Actus';
import Threetime from './components/pages/Threetime';
//pole
import Af from './components/pole/Af';
import Assdir from './components/pole/Assdir';
import Cia from './components/pole/Cia';
import Hsse from './components/pole/Hsse';
import Mk from './components/pole/Mk';
import Rh from './components/pole/Rh';
import Serv from './components/pole/Serv';
import Si from './components/pole/Si';
import Sup from './components/pole/Sup';
//ressource
import Ressaf from './components/resspole/Ressaf';
import Ressassdir from './components/resspole/Ressassdir';
import Resscia from './components/resspole/Resscia';
import Resshsse from './components/resspole/Resshsse';
import Ressmk from './components/resspole/Ressmk';
import Ressrh from './components/resspole/Ressrh';
import Resssg from './components/resspole/Resssg';
import Resssi from './components/resspole/Resssi';
import Resssup from './components/resspole/Resssup';

import Organpakadin from './components/home/Organpakadin';

import Listeuser from './components/common/Listeuser';
//cgu
import Cgu from './components/home/Cgu';

import Profil from './components/pages/Profil';
//ORGANIGRAMME
import Orgaakadin from './components/home/Orgaakadin';
import Orgastta from './components/home/Orgastta';
import Orgaguilmann from './components/home/Orgaguilmann';
import Orgastd from './components/home/Orgastd';
import Orgaspider from './components/home/Orgaspider';
import Evaluation from './components/evaluation/Evaluation';
import Evaluateur from './components/evaluation/Evaluateur';

//file manager 
import Filemanager from './components/file manager/Filemanager';

import Test from './components/evaluation/Test';

//pbx
import Pbxlogger from './components/pbxlogger/Pbxlogger';


import Getevaluationid from './components/evaluation/Getevaluationid';
import Cadre from './components/evaluation/type/Cadre';
import Noncadre from './components/evaluation/type/Noncadre';
import Cadrenonmanager from './components/evaluation/type/Cadrenonmanager';

import Consolidation from './components/evaluation/Consolidation';
import Choixeval from './components/evaluation/Choixeval';
import Chatbot from './components/chat/Chatbot';
import Evaluationnoncadre from './components/evaluation/Evaluationnoncadre';
import Evaluationcadrenonmanager from './components/evaluation/Evaluationcadrenonmanager';
import Choosehisto from './components/evaluation/histoeval/Choosehisto';
import ChoosehistoRH from './components/evaluation/histoeval/Choosehistorh';
import Page from './components/pages/Page';

import { useNavigate } from 'react-router-dom';

import { Layout } from 'antd';




import Cadrepdf from './components/evaluation/pdf/Cadrepdf';
import Eva from './components/evaluation/Eva';
import Choix from './components/evaluation/pdf/Choix';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="mainLayout">
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Routes>


            <Route path="/eva" element={<Eva />} />


            <Route path="/" element={<AppHome />} />
            <Route path="/faq" element={<AppFaq />} />
            <Route path="/histo" element={<AppAbout />} />
            <Route path="/team" element={<Team />} />
            <Route path="/ressource" element={<Ressources />} />
            <Route path="/annuaire" element={<Annuaire />} />
            <Route path="/actus" element={<Actus />} />
            <Route path="/listeuser" element={<Listeuser />} />



            <Route path="/af" element={<Af />} />
            <Route path="/assdir" element={<Assdir />} />
            <Route path="/cia" element={<Cia />} />
            <Route path="/hsse" element={<Hsse />} />
            <Route path="/mk" element={<Mk />} />
            <Route path="/rh" element={<Rh />} />
            <Route path="/serv" element={<Serv />} />
            <Route path="/si" element={<Si />} />
            <Route path="/sup" element={<Sup />} />
            <Route path="/page" element={<Page />} />

            {/* ressources */}


            <Route path="/ressaf" element={<Ressaf />} />
            <Route path="/ressassdir" element={<Ressassdir />} />
            <Route path="/resscia" element={<Resscia />} />
            <Route path="/resshsse" element={<Resshsse />} />
            <Route path="/ressrh" element={<Ressrh />} />
            <Route path="/resssg" element={<Resssg />} />
            <Route path="/ressmk" element={<Ressmk />} />
            <Route path="/resssi" element={<Resssi />} />
            <Route path="/resssup" element={<Resssup />} />


            {/* Cgu */}
            <Route path="/cgu" element={<Cgu />} />



            <Route exact path='/profil/:id' element={<Profil />} />
            {/* organigramme */}
            <Route path="/organpakadin" element={<Orgaakadin />} />
            <Route path="/orgaakadin" element={<Organpakadin />} />
            <Route path="/orgastta" element={<Orgastta />} />
            <Route path="/orgastd" element={<Orgastd />} />
            <Route path="/orgastta" element={<Orgastta />} />
            <Route path="/orgaspider" element={<Orgaspider />} />
            <Route path="/orgaguilmann" element={<Orgaguilmann />} />


            {/* evaluation */}
            <Route path="/evaluation/:ids/Evaluation cadre" element={<Evaluation />} />
            <Route path="/evalnoncadre/:ids/Evaluation non cadre" element={<Evaluationnoncadre />} />
            <Route path="/evalcadrenonmanager/:ids/Evaluation cadre non manager" element={<Evaluationcadrenonmanager />} />


            <Route path="/evaluateur" element={<Evaluateur />} />
            <Route path="/getevaluationid/:id/:type" element={<Getevaluationid />} />
            <Route path="/choose/:id/:type" element={<Choix />} />



            <Route path="/evalnoncadre" element={<Evaluationnoncadre />} />
            <Route path="/cadre" element={<Cadre />} />
            <Route path="/noncadre" element={<Noncadre />} />
            <Route path="/cadrenonmanager" element={<Cadrenonmanager />} />



            <Route path="/consolidation" element={<Consolidation />} />
            <Route path="/Choosehisto" element={<Choosehisto />} />
            <Route path="/choosehistorh/:id" element={<ChoosehistoRH />} />

            {/* separator */}



            <Route path="/directorytree" element={<Filemanager />} />


            <Route path="/test" element={<Test />} />


            <Route path="/pbxlogger" element={<Pbxlogger />} />
            <Route path="/chooseeval" element={<Choixeval />} />

            <Route path="/chatbot" element={<Chatbot />} />



            {/* cadre pdf */}
            <Route path="/chatbot" element={<Chatbot />} />


            {/* CHOIXPDF  */}


          </Routes>
        </Content>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    </Router>
  );
}

//30/07/2

export default App;
