import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, PDFViewer, Image } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import moment from 'moment';
import { Button, message, Steps, Checkbox, notification, AutoComplete, Space } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';
import { DatePicker, Select } from 'antd';
import photo from '../../../assets/images/eva.mp4'
import logonpa from '../LOGO NPA.png'
import Histocadre from './Histocadre';
import axios from 'axios';
import { Popconfirm } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;




const CheckboxGroup = Checkbox.Group;

const url = 'http://localhost:8000/'

const ChoosehistoRH = () => {
    const { id } = useParams();
    const ids = id;
    const [dates, setDates] = useState([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [histoData, setHistoData] = useState(null);
    const loggedInUser = sessionStorage.getItem('loginUser');
    const [etaeval, setEtateval] = useState('');

    //all etat 
    const [emails, setEmails] = useState([]);
    const [emailn1, setEmailn1] = useState("");
    const [emailn2, setEmailn2] = useState("");
    const [emaildr, setEmaildr] = useState("");
    const [emailsg, setEmailsg] = useState("");
    const [emaildg, setEmaildg] = useState("");
    const [emaildrh, setEmaildrh] = useState("");
    const [emailN2Valid, setEmailN2Valid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const targetUser = 'boucher.edouard@npakadin.mg';
    const isInputEnabled = loggedInUser === targetUser;

    const [searchValueN2, setSearchValueN2] = useState('');
    const [searchValueDr, setSearchValueDr] = useState('');


    const enregistrementvalide = async () => {

        try {
            const enrg = await axios.post(`${url}ajouteval/${id}`, {
                nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission,
                objectifs, resultat, selectedValue1, selectedValue2, selectedVal1, selectedVal2, selectedVal3, selectedVal4, selectedVal5, selectedVal6, selectedVal7, selectedVal8, selectedVal9, selectedVal10, selectedVal11, selectedVal12, selectedVal13, selectedVal14, selectedVal15,
                cmt1, cmt2, cmt3, cmt4, cmt5, r1, r2, r3, r4, r5, cdc1, cdc2, cdc3, cdc4, cdc5, nivactus, nouvnivs, concl, ancienneteniv, com, pg, classification, idr,
                f1, f2, f3, f4, f5, c1, c2, c3, c4, c5, am1, am2, am3, am4, am5, c21, c22, c23, c24, c25,
                t1, t2, t3, t4, compac1, compac2, compac3, compac4, apav1, apav2, apav3, apav4, apap1, apap2, apap3, apap4, comm1, comm2, comm3, comm4,
                ccd1, ccd2, ccd3, ccd4, catcomp1, catcomp2, catcomp3, catcomp4, motif1, motif2, motif3, motif4, pa1, pa2, pa3, pa4, dp1, dp2, dp3, dp4,
                ct1, ct2, ct3, mt1, mt2, mt3, ml1, ml2, ml3, cpr1, cpr2, cpr3, cg1, cg2, cg3, comcollab, objectifs1, resultat1, somme, todayis, alp1, alp2, emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh, loggedInUser, ids
            });
            console.log(enrg.data);
            if (enrg.data.success === false) {
                const placement = 'top';
                notification.error({
                    message: `Notification`,
                    description: "Vous ne pouvez pas changer d'évaluateur.",
                    placement,
                });
                return;
            } else {
                next();
            }
        } catch (error) {
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code de statut
                // qui tombe hors de la plage de 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);

                if (error.response.status === 400) {
                    const placement = 'top';
                    notification.error({
                        message: `Notification`,
                        description: error.response.data.message || "Erreur de mise à jour",
                        placement,
                    });
                } else {
                    // Gérer les autres statuts d'erreur si nécessaire
                    notification.error({
                        message: `Notification`,
                        description: `Erreur: ${error.response.status}`,
                        placement,
                    });
                }
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error(error.request);
                notification.error({
                    message: `Notification`,
                    description: "Aucune réponse du serveur",
                    placement: 'top',
                });
            } else {
                // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
                console.error('Erreur', error.message);
                notification.error({
                    message: `Notification`,
                    description: `Erreur: ${error.message}`,
                    placement: 'top',
                });
            }
        }
    };






    const handleSearchN2 = (value) => {
        //setSearchValueN2(value);
        setEmailn2(value);
        setEmailN2Valid(emails.includes(value));
    };
    const onSelectN2 = (value) => {
        setEmailn2(value);
    };

    const handleSearchDr = (value) => {
        setSearchValueDr(value);
        setEmaildr(value)
    };



    const [options1, setOptions1] = useState([])
    const [options2, setOptions2] = useState([])

    const [options, setOptions] = useState([
        { value: 'Formation', label: 'Formation' },
        { value: 'Coaching', label: 'Coaching' },
        { value: 'Accompagnement', label: 'Accompagnement' },
        { value: "Stage d'immersion", label: "Stage d'immersion" },
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newOption, setNewOption] = useState('');
    const handleAddOption = () => {
        if (newOption) {
            setOptions([...options, { value: newOption, label: newOption }]);
            setNewOption('');
            setIsAdding(false);
        }
    };




    const handleSearchdr = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions1(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectdr = (value) => {
        setEmaildr(value);
    };

    const handleChangedr = (value) => {
        setEmaildr(value);
        handleSearchdr(value); // Optionnel : met à jour les options lors de la modification
    };



    const handleSearchn2 = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions2(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectn2 = (value) => {
        setEmailn2(value);
    };

    const handleChangen2 = (value) => {
        setEmailn2(value);
        handleSearchn2(value); // Optionnel : met à jour les options lors de la modification
    };




    const transformData = (data) => {
        return [
            {
                libelle: data.libelle1,
                poids: data.poids1,
                notation: data.notation1,
                commentaire: data.commentaire1
            },
            {
                libelle: data.libelle2,
                poids: data.poids2,
                notation: data.notation2,
                commentaire: data.commentaire2
            },
            {
                libelle: data.libelle3,
                poids: data.poids3,
                notation: data.notation3,
                commentaire: data.commentaire3
            },
            {
                libelle: data.libelle4,
                poids: data.poids4,
                notation: data.notation4,
                commentaire: data.commentaire4
            }
        ];
    };


    const transformDatas = (data) => {
        return [
            {
                libelle: data.libelleend1,
                poids: data.poidsend1,
                notation: data.notationend1,
                commentaire: data.commentaireend1
            },
            {
                libelle: data.libelleend2,
                poids: data.poidsend2,
                notation: data.notationend2,
                commentaire: data.commentaireend2
            },
            {
                libelle: data.libelleend3,
                poids: data.poidsend3,
                notation: data.notationend3,
                commentaire: data.commentaireend3
            },
            {
                libelle: data.libelleend4,
                poids: data.poidsend4,
                notation: data.notationend4,
                commentaire: data.commentaireend4
            }
        ];
    };




    const getAlldataevaluation = async () => {
        try {
            const response = await axios.get(`${url}getAlldataevaluations/${id}/${type}`);
            const data = response.data;

            console.log(data[0]);

            if (data && data.length > 0) {
                console.log(data[0].nom);

                setEmailn1(data[0].emailn1)
                setEmailn2(data[0].emailn2)
                setEmaildr(data[0].emaildr)
                setEmailsg(data[0].emailsg)
                setEmaildg(data[0].emaildg)
                setEmaildrh(data[0].emaildrh)

                setNom(data[0].nom);
                setPrenom(data[0].prenom);
                setMat(data[0].mat);
                setDaty(data[0].dateentree);
                setDir(data[0].direction);
                setNomeval(data[0].nomeval);
                setFonc(data[0].fonc);
                setDatys(data[0].datedu);
                setDatyss(data[0].dateau);
                setMission(data[0].mission);
                setResultat(data[0].res1);
                setR1(data[0].r1);
                setR2(data[0].r2);
                setR3(data[0].r3);
                setR4(data[0].r4);
                setPoste(data[0].posteeval);
                setCmt1(data[0].com1);
                setCmt2(data[0].com2);
                setCmt3(data[0].com3);
                setCmt4(data[0].com4);
                setCmt5(data[0].com5);
                setNivactus(data[0].nivactus);
                setConcl(data[0].conclusion);
                setNouvnivs(data[0].nouvnivs);
                setCom(data[0].comment);
                setAncienneteniv(data[0].ancienneteniv);
                setIdr(data[0].idr);
                setF1(data[0].f1);
                setF2(data[0].f2);
                setF3(data[0].f3);
                setF4(data[0].f4);
                setF5(data[0].f5);

                setC1(data[0].c1);
                setC2(data[0].c2);
                setC3(data[0].c3);
                setC4(data[0].c4);
                setC5(data[0].c5);

                setAm1(data[0].am1);
                setAm2(data[0].am2);
                setAm3(data[0].am3);
                setAm4(data[0].am4);
                setAm5(data[0].am5);


                setC21(data[0].c21);
                setC22(data[0].c22);
                setC23(data[0].c23);
                setC24(data[0].c24);
                setC25(data[0].c25);


                setT1(data[0].t1);
                setT2(data[0].t2);
                setT3(data[0].t3);
                setT4(data[0].t4);

                setCompac1(data[0].compac1);
                setCompac2(data[0].compac2);
                setCompac3(data[0].compac3);
                setCompac4(data[0].compac4);

                setApav1(data[0].apav1);
                setApav2(data[0].apav2);
                setApav3(data[0].apav3);
                setApav4(data[0].apav4);

                setApap1(data[0].apap1);
                setApap2(data[0].apap2);
                setApap3(data[0].apap3);
                setApap4(data[0].apap4);

                setComm1(data[0].comm1);
                setComm2(data[0].comm2);
                setComm3(data[0].comm3);
                setComm4(data[0].comm4);







                setCcd1(data[0].ccd1);
                setCcd2(data[0].ccd2);
                setCcd3(data[0].ccd3);
                setCcd4(data[0].ccd4);


                setCatcomp1(data[0].catcomp1);
                setCatcomp2(data[0].catcomp2);
                setCatcomp3(data[0].catcomp3);
                setCatcomp4(data[0].catcomp4);

                setMotif1(data[0].motif1);
                setMotif2(data[0].motif2);
                setMotif3(data[0].motif3);
                setMotif4(data[0].motif4);

                setPa1(data[0].pa1);
                setPa2(data[0].pa2);
                setPa3(data[0].pa3);
                setPa4(data[0].pa4);


                setDp1(data[0].dp1);
                setDp2(data[0].dp2);
                setDp3(data[0].dp3);
                setDp4(data[0].dp4);

                setCt1(data[0].ct1);
                setCt2(data[0].ct2);
                setCt3(data[0].ct3);

                setMt1(data[0].mt1);
                setMt2(data[0].mt2);
                setMt3(data[0].mt3);


                setMl1(data[0].ml1);
                setMl2(data[0].ml2);
                setMl3(data[0].ml3);


                setCpr1(data[0].cpr1);
                setCpr2(data[0].cpr2);
                setCpr3(data[0].cpr3);

                setCg1(data[0].cg1);
                setCg2(data[0].cg2);
                setCg3(data[0].cg3);



                setComcollab(data[0].comcollab);

                setSelectedValue1(data[0].val1);
                setSelectedValue2(data[0].val2);

                setSelectedVal1(data[0].v1);
                setSelectedVal2(data[0].v2);
                setSelectedVal3(data[0].v3);
                setSelectedVal4(data[0].v4);
                setSelectedVal5(data[0].v5);
                setSelectedVal6(data[0].v6);
                setSelectedVal7(data[0].v7);
                setSelectedVal8(data[0].v8);
                setSelectedVal9(data[0].v9);
                setSelectedVal10(data[0].v10);
                setSelectedVal11(data[0].v11);
                setSelectedVal12(data[0].v12);
                setSelectedVal13(data[0].v13);
                setSelectedVal14(data[0].v14);
                setSelectedVal15(data[0].v15);

                setAlp1(data[0].alp1);
                setAlp2(data[0].alp2);


                const l1 = data[0].libelle1
                const p1 = parseInt(data[0].poids1);
                const n1 = parseInt(data[0].notation1)
                const cmts1 = data[0].commentaire1



                const l2 = data[0].libelle2
                const p2 = parseFloat(data[0].poids2);
                const n2 = parseFloat(data[0].notation2)
                const cmts2 = data[0].commentaire2

                const l3 = data[0].libelle3
                const p3 = parseFloat(data[0].poids3);
                const n3 = parseFloat(data[0].notation3)
                const cmts3 = data[0].commentaire3


                const l4 = data[0].libelle4
                const p4 = parseFloat(data[0].poids4);
                const n4 = parseFloat(data[0].notation4)
                const cmts4 = data[0].commentaire4






                const l11 = data[0].libelleend1
                const p11 = parseInt(data[0].poidsend1);
                const n11 = parseInt(data[0].notationend1)
                const cmts11 = data[0].commentaireend1



                const l21 = data[0].libelleend2
                const p21 = parseFloat(data[0].poidsend2);
                const n21 = parseFloat(data[0].notationend2)
                const cmts21 = data[0].commentaireend2

                const l31 = data[0].libelleend3
                const p31 = parseFloat(data[0].poidsend3);
                const n31 = parseFloat(data[0].notationend3)
                const cmts31 = data[0].commentaireend3


                const l41 = data[0].libelleend4
                const p41 = parseFloat(data[0].poidsend4);
                const n41 = parseFloat(data[0].notationend4)
                const cmts41 = data[0].commentaireend4






                const dataFromDB = {
                    libelle1: l1,
                    poids1: p1,
                    notation1: n1,
                    commentaire1: cmts1,

                    libelle2: l2,
                    poids2: p2,
                    notation2: n2,
                    commentaire2: cmts2,

                    libelle3: l3,
                    poids3: p3,
                    notation3: n3,
                    commentaire3: cmts3,

                    libelle4: l4,
                    poids4: p4,
                    notation4: n4,
                    commentaire4: cmts4,
                };


                const dataFromDBs = {
                    libelle1: l11,
                    poids1: p11,
                    notation1: n11,
                    commentaire1: cmts11,

                    libelle2: l21,
                    poids2: p21,
                    notation2: n21,
                    commentaire2: cmts21,

                    libelle3: l31,
                    poids3: p31,
                    notation3: n31,
                    commentaire3: cmts31,

                    libelle4: l41,
                    poids4: p41,
                    notation4: n41,
                    commentaire4: cmts41,
                };


                const transformedObjectifs1 = transformData(dataFromDBs);
                setObjectifs1(transformedObjectifs1);


                const transformedObjectifs = transformData(dataFromDB);
                setObjectifs(transformedObjectifs);

                console.error('Les données reçues sont vides ou invalides');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }

    }



    //validation
    const validerEvaluation = async () => {
        const placement = 'top';

        if (emailn2 === "" || emaildr === "") {
            notification.info({
                message: `info`,
                description: "E-mail N+2 ou email Directeur de rattachement vide",
                placement,
            });
            return 0;
        } else if (loggedInUser === 'boucher.edouard@npakadin.mg' && emaildg === '') {
            notification.info({
                message: `info`,
                description: "E-mail Direction générale vide",
                placement,
            });
            return 0;
        }
        try {

            const enrg = await axios.post(`${url}ajouteval/${id}`, {
                nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission,
                objectifs, resultat, selectedValue1, selectedValue2, selectedVal1, selectedVal2, selectedVal3, selectedVal4, selectedVal5, selectedVal6, selectedVal7, selectedVal8, selectedVal9, selectedVal10, selectedVal11, selectedVal12, selectedVal13, selectedVal14, selectedVal15,
                cmt1, cmt2, cmt3, cmt4, cmt5, r1, r2, r3, r4, r5, cdc1, cdc2, cdc3, cdc4, cdc5, nivactus, nouvnivs, concl, ancienneteniv, com, pg, classification, idr,
                f1, f2, f3, f4, f5, c1, c2, c3, c4, c5, am1, am2, am3, am4, am5, c21, c22, c23, c24, c25,
                t1, t2, t3, t4, compac1, compac2, compac3, compac4, apav1, apav2, apav3, apav4, apap1, apap2, apap3, apap4, comm1, comm2, comm3, comm4,
                ccd1, ccd2, ccd3, ccd4, catcomp1, catcomp2, catcomp3, catcomp4, motif1, motif2, motif3, motif4, pa1, pa2, pa3, pa4, dp1, dp2, dp3, dp4,
                ct1, ct2, ct3, mt1, mt2, mt3, ml1, ml2, ml3, cpr1, cpr2, cpr3, cg1, cg2, cg3, comcollab, objectifs1, resultat1, somme, todayis, alp1, alp2, emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh, loggedInUser, ids
            });

            const response = await axios.post(`${url}validerEvaluations/${id}`, { loggedInUser });

            if (response.data.message) {

                notification.success({
                    message: `Succes`,
                    description: "Evaluation bien validée.",
                    placement,
                });
                next()
            }
        } catch (error) {
            console.error('Erreur lors de la validation de l\'évaluation :', error);
            notification.error({
                message: `Erreur`,
                description: "Vous n'êtes pas autorisé à valider cette évaluation.2",
                placement,
            });
        }
    };




    const confirm = (e) => {
        message.success('Suppression avec succes');
        deleteannuaire(e)
        recupeannuaire()
    };
    const cancel = (e) => {
        message.error('');
    };




    //etape 1
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [mat, setMat] = useState("")
    const [daty, setDaty] = useState("");
    const [dir, setDir] = useState("");
    const [nomeval, setNomeval] = useState("");
    const [posteeval, setPoste] = useState("");
    const [fonc, setFonc] = useState("");
    const [email, setEmail] = useState('');


    const isEmailn2Enabled = emailn1 === loggedInUser;
    const isEmaildrEnabled = emailn1 === loggedInUser;



    const placement = 'topRight'; // Or whatever placement you want for your notification
    const todayis = moment();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };







    const changedirection = (value) => {
        setDir(value);
        console.log(value); // Affiche la nouvelle valeur de dir
    };


    const dateentre = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            setDaty(formattedDate);
        } else {
            console.log("La date est null");
        }
    };

    const etape1 = (placement) => {

        if (nom == '') {
            api.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Nom.',
                placement,
            });
            return;
        } else if (prenom == '') {
            api.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Prénom.',
                placement,
            });
            return;
        } else if (emailn2 === '' || emaildr === '') {

            notification.error({
                message: `Erreur`,
                description: "e-mail N+2 ou e-mail dircteur de rattachement vide.",
                placement,
            });
            return;


        } else if (mat == '') {
            api.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Matricule.',
                placement,
            });
            return;
        } else if (daty == '') {
            api.info({
                message: `Notification`,
                description:
                    " Veuillez remplir le champ Date d'entrée.",
                placement,
            });
            return;

        } else if (dir == '') {
            api.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ direction.',
                placement,
            });
            return;
        } else if (nomeval == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ nom d'évaluateur.",
                placement,
            });
            return;
        } else if (posteeval == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ poste.",
                placement,
            });
            return;
        } else if (fonc == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ Fonction d'évaluateur.",
                placement,
            });
            return;

        } else {
            setCurrent(current + 1);
        }
        setCurrent(current + 1)
    }


    //2eme etape 
    const [datys, setDatys] = useState("");
    const [datyss, setDatyss] = useState("");
    const [mission, setMission] = useState("");

    const dateentrer = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDatys(formattedDate);
        } else {
            console.log("La date est null");
        }
    };

    const dateentrers = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDatyss(formattedDate);
        } else {
            console.log("La date est null");
        }
    };



    const etape2 = (placement) => {
        if (datys == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ date de  début.",
                placement,
            });
            return;
        } else if (datyss == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ date de  fin.",
                placement,
            });
            return;
        }
        else if (mission == '') {
            api.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ MISSIONS.",
                placement,
            });
            return;
        }
        else {
            next();
        }

    }


    //3 eme etape
    const [objectifs, setObjectifs] = useState([
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" }
    ]);

    const [resultat, setResultat] = useState(0);



    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    useEffect(() => {
        const totalPoids = objectifs.reduce((acc, obj) => acc + parseFloat(obj.poids || 0), 0);
        const totalPondere = objectifs.reduce((acc, obj) => acc + ((parseFloat(obj.poids || 0) * parseFloat(obj.notation || 0)) / 5), 0);
        const resultatPourcentage = totalPoids > 0 ? (totalPondere / totalPoids) * 100 : 0;
        setResultat(resultatPourcentage);
    }, [objectifs]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newObjectifs = [...objectifs];
        newObjectifs[index][name] = value;
        setObjectifs(newObjectifs);
    };

    const etape3 = (placement) => {
        // Vérifier si tous les champs sont remplis dans chaque ligne
        const isValid = objectifs.every(objectif => {
            // Si au moins un des champs est rempli, alors tous les champs doivent être remplis
            if (objectif.libelle || objectif.poids || objectif.notation) {
                return objectif.libelle && objectif.poids && objectif.notation;
            }
            // Sinon, la ligne est valide (pas de valeurs dans aucun champ)
            return true;
        });

        // Vérifier si tous les champs sont vides dans toutes les lignes
        const allFieldsEmpty = objectifs.every(objectif => !objectif.libelle && !objectif.poids && !objectif.notation);

        if (!isValid) {
            api.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides dans la ligne du tableau",
                placement,
            });
            return;
        } else if (allFieldsEmpty) {
            api.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides",
                placement,
            });
            return;
        } else {
            next()
        }
    };




    //5 eme etape
    const [selectedValue1, setSelectedValue1] = useState([]);
    const [selectedValue2, setSelectedValue2] = useState([]);
    const [somme, setSomme] = useState(0);

    const onChange1 = (checkedValues) => {
        setSelectedValue1(checkedValues);
    };

    const onChange2 = (checkedValues) => {
        setSelectedValue2(checkedValues);
    };


    const etape5 = (placement) => {
        let allChecked = true; // Variable pour suivre l'état de toutes les cases cochées

        const rows = document.querySelectorAll('tbody tr');

        rows.forEach((row, index) => {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            let isChecked = false;

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    isChecked = true;
                }
            });

            if (!isChecked) {
                api.info({
                    message: "Notification",
                    description: `Veuillez cocher la ligne ${index + 1}`,
                    placement,
                });
                allChecked = false; // Définir la variable à false si une case n'est pas cochée
            }
        });

        if (allChecked) {
            next(); // Passer à l'étape suivante uniquement si toutes les cases sont cochées
        }

    };






    useEffect(() => {
        const sum = (parseFloat(selectedValue1[0]) + parseFloat(selectedValue2[0])) / 2;
        setSomme(sum);
    }, [selectedValue1, selectedValue2]);



    //6 eme etape
    const [selectedVal1, setSelectedVal1] = useState([]);
    const [selectedVal2, setSelectedVal2] = useState([]);
    const [selectedVal3, setSelectedVal3] = useState([]);
    const [selectedVal4, setSelectedVal4] = useState([]);
    const [selectedVal5, setSelectedVal5] = useState([]);
    const [selectedVal6, setSelectedVal6] = useState([]);
    const [selectedVal7, setSelectedVal7] = useState([]);
    const [selectedVal8, setSelectedVal8] = useState([]);
    const [selectedVal9, setSelectedVal9] = useState([]);
    const [selectedVal10, setSelectedVal10] = useState([]);
    const [selectedVal11, setSelectedVal11] = useState([]);
    const [selectedVal12, setSelectedVal12] = useState([]);
    const [selectedVal13, setSelectedVal13] = useState([]);
    const [selectedVal14, setSelectedVal14] = useState([]);
    const [selectedVal15, setSelectedVal15] = useState([]);
    const [alp1, setAlp1] = useState("")
    const [alp2, setAlp2] = useState("")


    const [sommes, setSommes] = useState(0);

    const onChang1 = (checkedValues) => {
        setSelectedVal1(checkedValues);
    };

    const onChang2 = (checkedValues) => {
        setSelectedVal2(checkedValues);
    };
    const onChang3 = (checkedValues) => {
        setSelectedVal3(checkedValues);
    };
    const onChang4 = (checkedValues) => {
        setSelectedVal4(checkedValues);
    };
    const onChang5 = (checkedValues) => {
        setSelectedVal5(checkedValues);
    };
    const onChang6 = (checkedValues) => {
        setSelectedVal6(checkedValues);
    };
    const onChang7 = (checkedValues) => {
        setSelectedVal7(checkedValues);
    };
    const onChang8 = (checkedValues) => {
        setSelectedVal8(checkedValues);
    };
    const onChang9 = (checkedValues) => {
        setSelectedVal9(checkedValues);
    };
    const onChang10 = (checkedValues) => {
        setSelectedVal10(checkedValues);
    };
    const onChang11 = (checkedValues) => {
        setSelectedVal11(checkedValues);
    };
    const onChang12 = (checkedValues) => {
        setSelectedVal12(checkedValues);
    };
    const onChang13 = (checkedValues) => {
        setSelectedVal13(checkedValues);
    };
    const onChang14 = (checkedValues) => {
        setSelectedVal14(checkedValues);
    };
    const onChang15 = (checkedValues) => {
        setSelectedVal15(checkedValues);
    };

    const [r1, setR1] = useState(0)
    const [r2, setR2] = useState(0)
    const [r3, setR3] = useState(0)
    const [r4, setR4] = useState(0)
    const [r5, setR5] = useState(0)
    const [cdc1, setCdc1] = useState("")
    const [cdc2, setCdc2] = useState("")
    const [cdc3, setCdc3] = useState("")
    const [cdc4, setCdc4] = useState("")
    const [cdc5, setCdc5] = useState("")
    const [pg, setPg] = useState("")
    const [classification, setClassification] = useState("")


    const etape6 = (placement) => {
        let allChecked = true; // Variable pour suivre l'état de toutes les cases cochées

        const rows = document.querySelectorAll('tbody tr');

        rows.forEach((row, index) => {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            let isChecked = false;

            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    isChecked = true;
                }
            });

            if (!isChecked) {
                allChecked = false; // Définir la variable à false si une case n'est pas cochée
            }
        });

        if (!allChecked) {
            api.info({
                message: "Notification",
                description: "Veuillez cocher au moins une case dans chaque ligne",
                placement,
            });
            return;
        } else {
            // Convertir les valeurs en nombres si elles ne le sont pas déjà
            const value1 = parseFloat(selectedValue1) || 0;
            const value2 = parseFloat(selectedValue2) || 0;
            const value4 = parseFloat(selectedVal4) || 0;
            const value14 = parseFloat(selectedVal14) || 0;
            const value15 = parseFloat(selectedVal15)
            const value5 = parseFloat(selectedVal5) || 0;

            // Calcul du résultat intermédiaire
            const intermediateResult = (resultat * 5) / 100;


            const R1 = (value1 + value2 + intermediateResult + value4 + value14 + value15 + value5) / 7;

            const value6 = parseFloat(selectedVal9) || 0;
            const value7 = parseFloat(selectedVal1) || 0;

            const value8 = parseFloat(selectedVal1) || 0;

            const value9 = parseFloat(selectedVal3) || 0;
            const value10 = parseFloat(selectedVal6) || 0;
            const value11 = parseFloat(selectedVal2) || 0;
            const value12 = parseFloat(selectedVal7) || 0;

            const value13 = parseFloat(selectedVal8) || 0;
            const v14 = parseFloat(selectedVal11) || 0;
            const v15 = parseFloat(selectedVal13) || 0;

            const v16 = parseFloat(selectedVal10) || 0;
            const v17 = parseFloat(selectedVal12) || 0;
            const R3 = (value8 + value9 + value10 + value11 + value12) / 5;
            const R4 = (value13 + v14 + v15) / 3;
            const R5 = (v16 + v17) / 2;
            const PG = parseFloat((((((somme + sommes) / 2) + ((resultat * 5) / 100)) / 2) * 100) / 5).toFixed(2) || 0;

            setR1(R1);
            setR2(value6)
            setR3(R3)
            setR4(R4)
            setR5(R5)
            setPg(PG)

            if (R1 <= 1.9) {
                setCdc1(`En cours d'apprentissage `);
            } else if (R1 > 1.9 && R1 <= 3) {
                setCdc1("Maîtrise les savoir-être et savoir-faire opérationnels, capacité à suivre les procédures, ayant des capacités techniques avérées");
            } else if (R1 > 3 && R1 <= 4.5) {
                setCdc1("Niveau confirmé avec une longue pratique pouvant aller au-delà de ses connaissances");
            } else if (R1 > 4.5) {
                setCdc1("Outre l'expérience au poste, expertise reconnue");
            }

            if (value6 <= 1.9) {
                setCdc2("Besoin de directives et de consignes au quotidien");
            } else if (value6 > 1.9 && value6 <= 3) {
                setCdc2("Besoin d'un référent en cas de difficulté");
            } else if (value6 > 3 && value6 <= 4.5) {
                setCdc2("Besoin d'un référent dans la prise de décision");
            } else if (value6 > 4.5) {
                setCdc2("Prise de décision à son niveau avec de bons argumentaires");
            }



            if (R3 <= 1.9) {
                setCdc3("Faible");
            } else if (R3 > 1.9 && R3 <= 3) {
                setCdc3("Moyenne");
            } else if (R3 > 3 && R3 <= 4.5) {
                setCdc3("Forte");
            } else if (R3 > 4.5) {
                setCdc3("Leader, modèle et référent dans sa direction");
            }



            if (R4 <= 1.9) {
                setCdc4("Faible");
            } else if (R4 > 1.9 && R4 <= 3) {
                setCdc4("Moyenne");
            } else if (R4 > 3 && R4 <= 4.5) {
                setCdc4("Savoir anticiper à court terme et réaction selon la situation à l'instant T");
            } else if (R4 > 4.5) {
                setCdc4("Ayant une vision à court et à long terme des actions entreprises pour résoudre les problèmes");
            }

            if (R5 <= 1.9) {
                setCdc5("Non applicable");
            } else if (R5 > 1.9 && R5 <= 3) {
                setCdc5("Faible");
            } else if (R5 > 3 && R5 <= 4.5) {
                setCdc5("Forte, capacité à former");
            } else if (R5 > 4.5) {
                setCdc5("Efficace dans son coaching et permet la montée en compétences des coachés");
            }


            if (PG < 40) {
                setClassification("A")
            } else if (PG >= 40 && PG < 65) {
                setClassification("B")
            } else if (PG >= 65 && PG < 100) {
                setClassification("C")
            }
            else if (PG >= 100) {
                setClassification("D")
            }

            next();
        }

    };


    useEffect(() => {
        const sum = (
            parseFloat(selectedVal1?.[0] || 0) +
            parseFloat(selectedVal2?.[0] || 0) +
            parseFloat(selectedVal3?.[0] || 0) +
            parseFloat(selectedVal4?.[0] || 0) +
            parseFloat(selectedVal5?.[0] || 0) +
            parseFloat(selectedVal6?.[0] || 0) +
            parseFloat(selectedVal7?.[0] || 0) +
            parseFloat(selectedVal8?.[0] || 0) +
            parseFloat(selectedVal9?.[0] || 0) +
            parseFloat(selectedVal10?.[0] || 0) +
            parseFloat(selectedVal11?.[0] || 0) +
            parseFloat(selectedVal12?.[0] || 0) +
            parseFloat(selectedVal13?.[0] || 0) +
            parseFloat(selectedVal14?.[0] || 0) +
            parseFloat(selectedVal15?.[0] || 0)
        ) / 15;
        setSommes(sum);
    }, [
        selectedVal1, selectedVal2, selectedVal3, selectedVal4,
        selectedVal5, selectedVal6, selectedVal7, selectedVal8,
        selectedVal9, selectedVal10, selectedVal11, selectedVal12,
        selectedVal13, selectedVal14, selectedVal15
    ]);
    
    //7eme etape
    const [nivactus, setNivactus] = useState(null)
    const [nouvnivs, setNouvnivs] = useState(null)
    const [concl, setConcl] = useState(null)
    const [ancienneteniv, setAncienneteniv] = useState(null)
    const [com, setCom] = useState(null)

    const [cmt1, setCmt1] = useState(null)
    const [cmt2, setCmt2] = useState(null)
    const [cmt3, setCmt3] = useState(null)
    const [cmt4, setCmt4] = useState(null)
    const [cmt5, setCmt5] = useState(null)

    const nivactu = async (value) => {
        setNivactus(value)
    }

    const nouvniv = async (value) => {
        setNouvnivs(value)
    }

    const changeconcl = async (value) => {
        setConcl(value)
    }


    const etape7 = () => {
        if (nivactus == null) {
            alert("nivactus");
            return;
        } else if (nouvnivs == null) {
            alert("nouvnivs");
            return;
        }
        else if (concl == null) {
            alert("concl");
            return;
        }
        else {
            next()
        }
    }



    //etape8
    const [idr, setIdr] = useState(null)
    const etape8 = () => {
        next()
    }

    //etape9
    const [f1, setF1] = useState(null)
    const [f2, setF2] = useState(null)
    const [f3, setF3] = useState(null)
    const [f4, setF4] = useState(null)
    const [f5, setF5] = useState(null)

    const [c1, setC1] = useState(null)
    const [c2, setC2] = useState(null)
    const [c3, setC3] = useState(null)
    const [c4, setC4] = useState(null)
    const [c5, setC5] = useState(null)

    const [am1, setAm1] = useState(null)
    const [am2, setAm2] = useState(null)
    const [am3, setAm3] = useState(null)
    const [am4, setAm4] = useState(null)
    const [am5, setAm5] = useState(null)

    const [c21, setC21] = useState(null)
    const [c22, setC22] = useState(null)
    const [c23, setC23] = useState(null)
    const [c24, setC24] = useState(null)
    const [c25, setC25] = useState(null)





    //etape10
    const [t1, setT1] = useState(null)
    const [t2, setT2] = useState(null)
    const [t3, setT3] = useState(null)
    const [t4, setT4] = useState(null)

    const [compac1, setCompac1] = useState(null)
    const [compac2, setCompac2] = useState(null)
    const [compac3, setCompac3] = useState(null)
    const [compac4, setCompac4] = useState(null)


    const [apav1, setApav1] = useState(null)
    const [apav2, setApav2] = useState(null)
    const [apav3, setApav3] = useState(null)
    const [apav4, setApav4] = useState(null)


    const [apap1, setApap1] = useState(null)
    const [apap2, setApap2] = useState(null)
    const [apap3, setApap3] = useState(null)
    const [apap4, setApap4] = useState(null)

    const [comm1, setComm1] = useState(null)
    const [comm2, setComm2] = useState(null)
    const [comm3, setComm3] = useState(null)
    const [comm4, setComm4] = useState(null)


    //etape11
    const [ccd1, setCcd1] = useState(null)
    const [ccd2, setCcd2] = useState(null)
    const [ccd3, setCcd3] = useState(null)
    const [ccd4, setCcd4] = useState(null)


    const [catcomp1, setCatcomp1] = useState(null)
    const [catcomp2, setCatcomp2] = useState(null)
    const [catcomp3, setCatcomp3] = useState(null)
    const [catcomp4, setCatcomp4] = useState(null)

    const [motif1, setMotif1] = useState(null)
    const [motif2, setMotif2] = useState(null)
    const [motif3, setMotif3] = useState(null)
    const [motif4, setMotif4] = useState(null)

    const [pa1, setPa1] = useState(null)
    const [pa2, setPa2] = useState(null)
    const [pa3, setPa3] = useState(null)
    const [pa4, setPa4] = useState(null)


    const [dp1, setDp1] = useState(null)
    const [dp2, setDp2] = useState(null)
    const [dp3, setDp3] = useState(null)
    const [dp4, setDp4] = useState(null)

    const date1 = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDp1(formattedDate);
        } else {
            console.log("La date est null");
        }
    };

    const date2 = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDp2(formattedDate);
        } else {
            console.log("La date est null");
        }
    };

    const date3 = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDp3(formattedDate);
        } else {
            console.log("La date est null");
        }
    };

    const date4 = (date, dateString) => {
        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            console.log(formattedDate);
            setDp4(formattedDate);
        } else {
            console.log("La date est null");
        }
    };


    //etape12
    const [ct1, setCt1] = useState(null)
    const [ct2, setCt2] = useState(null)
    const [ct3, setCt3] = useState(null)


    const [mt1, setMt1] = useState(null)
    const [mt2, setMt2] = useState(null)
    const [mt3, setMt3] = useState(null)


    const [ml1, setMl1] = useState(null)
    const [ml2, setMl2] = useState(null)
    const [ml3, setMl3] = useState(null)

    const [cpr1, setCpr1] = useState(null)
    const [cpr2, setCpr2] = useState(null)
    const [cpr3, setCpr3] = useState(null)

    const [cg1, setCg1] = useState(null)
    const [cg2, setCg2] = useState(null)
    const [cg3, setCg3] = useState(null)


    const [comcollab, setComcollab] = useState(null)


    //etape13
    const [objectifs1, setObjectifs1] = useState([
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" },
        { libelle: "", poids: "", notation: "", commentaire: "" }
    ]);

    const [resultat1, setResultat1] = useState(0);

    const date = new Date(daty);
    const date10 = new Date(datys);
    const date20 = new Date(datyss);

    // Formater la date dans un format lisible
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedDate10 = `${date10.getDate()}/${date10.getMonth() + 1}/${date10.getFullYear()}`;
    const formattedDate20 = `${date20.getDate()}/${date20.getMonth() + 1}/${date20.getFullYear()}`;


    useEffect(() => {
        const totalPoids1 = objectifs1.reduce((acc, obj) => acc + parseFloat(obj.poids || 0), 0);
        const totalPondere1 = objectifs1.reduce((acc, obj) => acc + ((parseFloat(obj.poids || 0) * parseFloat(obj.notation || 0)) / 5), 0);
        const resultatPourcentage1 = totalPoids1 > 0 ? (totalPondere1 / totalPoids1) * 100 : 0;
        setResultat1(resultatPourcentage1);
    }, [objectifs1]);

    const handleInputChange1 = (index, event) => {
        const { name, value } = event.target;
        const newObjectifs1 = [...objectifs1];
        newObjectifs1[index][name] = value;
        setObjectifs1(newObjectifs1);
    };

    const etape13 = (placement) => {
        // Vérifier si tous les champs sont remplis dans chaque ligne
        const isValid = objectifs1.every(objectif => {
            // Si au moins un des champs est rempli, alors tous les champs doivent être remplis
            if (objectif.libelle || objectif.poids || objectif.notation) {
                return objectif.libelle && objectif.poids && objectif.notation;
            }
            // Sinon, la ligne est valide (pas de valeurs dans aucun champ)
            return true;
        });

        // Vérifier si tous les champs sont vides dans toutes les lignes
        const allFieldsEmpty = objectifs1.every(objectif => !objectif.libelle && !objectif.poids && !objectif.notation);

        if (!isValid) {
            api.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides dans la ligne du tableau",
                placement,
            });
            return;
        } else if (allFieldsEmpty) {
            api.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides",
                placement,
            });
            return;
        } else {
            next()
        }
        next()
    };




    const FetchAlldate = async () => {

        try {
            const response = await axios.post(`${url}fetchAlldate`, { ids });
            setDates(response.data.evaluations);
            console.log(response.data.evaluations);
        } catch (error) {
            console.log(error);
        }
    }

    const FetchHistoData = async (selectedId) => {
        const parts = selectedId.split('_');
        const extractedId = parts[parts.length - 1];

        try {
            // Utilisation de extractedId au lieu de selectedId original
            const response = await axios.post(`${url}get-histo-eval-data`, { selectedId: extractedId, ids });
            const data = response.data;

            console.log(data[0].v12); 
            setEtateval(data[0].evaluatorType)


            if (data && data.length > 0) {
                console.log(data[0].nom);

                setEmailn1(data[0].emailn1)
                setEmailn2(data[0].emailn2)
                setEmaildr(data[0].emaildr)
                setEmailsg(data[0].emailsg)
                setEmaildg(data[0].emaildg)
                setEmaildrh(data[0].emaildrh)

                setNom(data[0].nom);
                setPrenom(data[0].prenom);
                setMat(data[0].mat);
                setDaty(data[0].dateentree);
                setDir(data[0].direction);
                setNomeval(data[0].nomeval);
                setFonc(data[0].fonc);
                setDatys(data[0].datedu);
                setDatyss(data[0].dateau);
                setMission(data[0].mission);
                setResultat(data[0].res1);
                setR1(data[0].r1);
                setR2(data[0].r2);
                setR3(data[0].r3);
                setR4(data[0].r4);
                setCdc1(data[0].critere1);
                setCdc2(data[0].critere2);
                setCdc3(data[0].critere3);
                setCdc4(data[0].critere4);
                setPoste(data[0].posteeval);
                setCmt1(data[0].com1);
                setCmt2(data[0].com2);
                setCmt3(data[0].com3);
                setCmt4(data[0].com4);
                setCmt5(data[0].com5);
                setNivactus(data[0].nivactus);
                setConcl(data[0].conclusion);
                setNouvnivs(data[0].nouvnivs);
                setCom(data[0].comment);
                setAncienneteniv(data[0].ancienneteniv);
                setIdr(data[0].idr);
                setF1(data[0].f1);
                setF2(data[0].f2);
                setF3(data[0].f3);
                setF4(data[0].f4);
                setF5(data[0].f5);

                setC1(data[0].c1);
                setC2(data[0].c2);
                setC3(data[0].c3);
                setC4(data[0].c4);
                setC5(data[0].c5);

                setAm1(data[0].am1);
                setAm2(data[0].am2);
                setAm3(data[0].am3);
                setAm4(data[0].am4);
                setAm5(data[0].am5);


                setC21(data[0].c21);
                setC22(data[0].c22);
                setC23(data[0].c23);
                setC24(data[0].c24);
                setC25(data[0].c25);


                setT1(data[0].t1);
                setT2(data[0].t2);
                setT3(data[0].t3);
                setT4(data[0].t4);

                setCompac1(data[0].compac1);
                setCompac2(data[0].compac2);
                setCompac3(data[0].compac3);
                setCompac4(data[0].compac4);

                setApav1(data[0].apav1);
                setApav2(data[0].apav2);
                setApav3(data[0].apav3);
                setApav4(data[0].apav4);

                setApap1(data[0].apap1);
                setApap2(data[0].apap2);
                setApap3(data[0].apap3);
                setApap4(data[0].apap4);

                setComm1(data[0].comm1);
                setComm2(data[0].comm2);
                setComm3(data[0].comm3);
                setComm4(data[0].comm4);


                setPg(data[0].perfglob)
                setClassification(data[0].classification)



                setCcd1(data[0].ccd1);
                setCcd2(data[0].ccd2);
                setCcd3(data[0].ccd3);
                setCcd4(data[0].ccd4);


                setCatcomp1(data[0].catcomp1);
                setCatcomp2(data[0].catcomp2);
                setCatcomp3(data[0].catcomp3);
                setCatcomp4(data[0].catcomp4);

                setMotif1(data[0].motif1);
                setMotif2(data[0].motif2);
                setMotif3(data[0].motif3);
                setMotif4(data[0].motif4);

                setPa1(data[0].pa1);
                setPa2(data[0].pa2);
                setPa3(data[0].pa3);
                setPa4(data[0].pa4);


                setDp1(data[0].dp1);
                setDp2(data[0].dp2);
                setDp3(data[0].dp3);
                setDp4(data[0].dp4);

                setCt1(data[0].ct1);
                setCt2(data[0].ct2);
                setCt3(data[0].ct3);

                setMt1(data[0].mt1);
                setMt2(data[0].mt2);
                setMt3(data[0].mt3);


                setMl1(data[0].ml1);
                setMl2(data[0].ml2);
                setMl3(data[0].ml3);


                setCpr1(data[0].cpr1);
                setCpr2(data[0].cpr2);
                setCpr3(data[0].cpr3);

                setCg1(data[0].cg1);
                setCg2(data[0].cg2);
                setCg3(data[0].cg3);



                setComcollab(data[0].comcollab);

                setSelectedValue1(data[0].val1);
                setSelectedValue2(data[0].val2);

                setSelectedVal1(data[0].v1 || 0);
                setSelectedVal2(data[0].v2 || 0);
                setSelectedVal3(data[0].v3 || 0);
                setSelectedVal4(data[0].v4 || 0);
                setSelectedVal5(data[0].v5 || 0);
                setSelectedVal6(data[0].v6 || 0);
                setSelectedVal7(data[0].v7 || 0);
                setSelectedVal8(data[0].v8 || 0);
                setSelectedVal9(data[0].v9 || 0);
                setSelectedVal10(data[0].v10 || 0);
                setSelectedVal11(data[0].v11 || 0);
                setSelectedVal12(data[0].v12 || 0);
                setSelectedVal13(data[0].v13 || 0);
                setSelectedVal14(data[0].v14 || 0);
                setSelectedVal15(data[0].v15 || 0);
                

                setAlp1(data[0].alp1);
                setAlp2(data[0].alp2);


                const l1 = data[0].libelle1
                const p1 = parseInt(data[0].poids1);
                const n1 = parseInt(data[0].notation1)
                const cmts1 = data[0].commentaire1



                const l2 = data[0].libelle2
                const p2 = parseFloat(data[0].poids2);
                const n2 = parseFloat(data[0].notation2)
                const cmts2 = data[0].commentaire2

                const l3 = data[0].libelle3
                const p3 = parseFloat(data[0].poids3);
                const n3 = parseFloat(data[0].notation3)
                const cmts3 = data[0].commentaire3


                const l4 = data[0].libelle4
                const p4 = parseFloat(data[0].poids4);
                const n4 = parseFloat(data[0].notation4)
                const cmts4 = data[0].commentaire4






                const l11 = data[0].libelleend1
                const p11 = parseInt(data[0].poidsend1);
                const n11 = parseInt(data[0].notationend1)
                const cmts11 = data[0].commentaireend1



                const l21 = data[0].libelleend2
                const p21 = parseFloat(data[0].poidsend2);
                const n21 = parseFloat(data[0].notationend2)
                const cmts21 = data[0].commentaireend2

                const l31 = data[0].libelleend3
                const p31 = parseFloat(data[0].poidsend3);
                const n31 = parseFloat(data[0].notationend3)
                const cmts31 = data[0].commentaireend3


                const l41 = data[0].libelleend4
                const p41 = parseFloat(data[0].poidsend4);
                const n41 = parseFloat(data[0].notationend4)
                const cmts41 = data[0].commentaireend4






                const dataFromDB = {
                    libelle1: l1,
                    poids1: p1,
                    notation1: n1,
                    commentaire1: cmts1,

                    libelle2: l2,
                    poids2: p2,
                    notation2: n2,
                    commentaire2: cmts2,

                    libelle3: l3,
                    poids3: p3,
                    notation3: n3,
                    commentaire3: cmts3,

                    libelle4: l4,
                    poids4: p4,
                    notation4: n4,
                    commentaire4: cmts4,
                };


                const dataFromDBs = {
                    libelle1: l11,
                    poids1: p11,
                    notation1: n11,
                    commentaire1: cmts11,

                    libelle2: l21,
                    poids2: p21,
                    notation2: n21,
                    commentaire2: cmts21,

                    libelle3: l31,
                    poids3: p31,
                    notation3: n31,
                    commentaire3: cmts31,

                    libelle4: l41,
                    poids4: p41,
                    notation4: n41,
                    commentaire4: cmts41,
                };


                const transformedObjectifs1 = transformData(dataFromDBs);
                setObjectifs1(transformedObjectifs1);


                const transformedObjectifs = transformData(dataFromDB);
                setObjectifs(transformedObjectifs);

                console.error('Les données reçues sont vides ou invalides');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données d\'historique:', error);
        }
    };

    const handleSelectChange = (value) => {
        setSelectedEvaluation(value);
        FetchHistoData(value);
    };


    useEffect(() => {
        FetchAlldate()
    }, [])

    return (

        <div style={{ position: 'relative', width: '100%', height: '100%', }}>

            <video src={photo} autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, }} />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '100px', zIndex: +1, height: '90%' }}>
                <div style={{ width: '90%', height: '90%', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)', padding: '20px', zIndex: +1 }}>
                    <img src={logonpa} width={180} height={100} alt="logo npa" />
                    <h1>Historique d'évaluation RH</h1>
                    <Select
                        placeholder="Choisissez votre évaluation"
                        options={dates}
                        style={{ width: '30%' }}
                        onChange={handleSelectChange}
                    /> <br /><br />



                    <div>
                        {etaeval === 'Evaluation cadre'
                            ? <div>
                                <Title level={2}>Evaluation de  {prenom} {nom}</Title>

                                <PDFViewer style={{ width: '90%', height: '100vh' }}>
                                    <Document>
                                        <Page size="A4" style={{ padding: 20 }}>

                                            <View style={{ marginBottom: 5, alignItems: 'center' }}>
                                                <Image src={logonpa} style={{ width: 120, height: 70 }} />
                                            </View>

                                            <View style={{ marginBottom: 8 }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center', backgroundColor: '#40A9FF' }}>
                                                    Fiche d'évaluation professionnelle - cadre
                                                </Text>
                                            </View>

                                            <View>
                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 0.5 }}>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom: {nom}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'entrée: {formattedDate}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Evaluateurs: {emailn1}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Prénom(s): {prenom}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Poste: {posteeval}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Fonction: {fonc}</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Matricule: {mat}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Direction: {dir}</Text>
                                                    <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'évaluation:</Text>
                                                </View>
                                            </View>

                                            <View style={{ marginTop: 10, marginBottom: -5, backgroundColor: '#40A9FF' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Bilan de l'année écoulée</Text>
                                            </View>

                                            <View style={{ marginBottom: -8, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                                <Text style={{ fontSize: 9, color: '#333' }}>Du: {formattedDate10}</Text>
                                                <Text style={{ fontSize: 9, color: '#333' }}>Au: {formattedDate20}</Text>
                                            </View>

                                            <View style={{ padding: 2 }}>
                                                <Text style={{ fontSize: 13, color: '#333' }}>Mission:</Text>
                                                <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                    {mission}
                                                </Text>
                                            </View>


                                            <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Objectifs individuels</Text>
                                            </View>

                                            <View>




                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>


                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                        <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                        <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                        <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                    </View>

                                                    {objectifs.map((objectif, index) => {
                                                        // Check if the row is not empty
                                                        if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                            return (
                                                                <View
                                                                    key={index}
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        padding: 5,
                                                                        borderBottomWidth: 1,
                                                                        borderColor: '#ccc',
                                                                        backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                    }}
                                                                >
                                                                    <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                    <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                    <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                    <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                </View>
                                                            );
                                                        }
                                                        return null; // Return null if the row is empty
                                                    })}
                                                </View>






                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                </View>




                                                <View style={{ borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 0, color: 'white', textAlign: 'center' }}>Aptitudes Professionnelles</Text>
                                                    </View>

                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères</Text>
                                                            <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Description</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                            <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                            <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                Exécution des tâches décrites dans sa fiche de poste et exigées par son N+1 Respect des délais.
                                                            </Text>
                                                            <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue1}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                            <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                Aptitude à effectuer les contrôles nécessaires afin de réduire les erreurs, les oublis, les défauts. Rigueur dans la tenue du poste Anticipation des problèmes et les obstacles Respect des délais.
                                                            </Text>
                                                            <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue2}</Text>
                                                        </View>
                                                    </View>
                                                </View>



                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {somme.toFixed(2)} %</Text>
                                                </View>





                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Comportement</Text>
                                                </View>


                                                <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                    <Text style={{ flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Critères</Text>
                                                    <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                </View>


                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Organisation</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à agencer les moyens pour un fonctionnement efficace</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal1}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Planification des tâches de son équipe</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à donner l'impulsion sur l'importance de chaque dossier</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal2}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Méthode</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à procéder de manière structurée dans la réalisation des tâches</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal3}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Gestion de projet</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à mener à bien ses projets (respect deadline, respect des coûts, respect de la qualité )</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal4}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Management opérationnel</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Animation de l'équipe,capacité à sanctionner et reconnaître les efforts de son équipe, capacité à motiver, capacité à évaluer </Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal5}</Text>
                                                    </View>
                                                </View>




                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Indicateurs de contrôle</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité de mettre en place des KPI pour le suivi de ses activités</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal6}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Contrôle des activités de son équipe</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité de suivi et de contôle des activités de son équipe</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal7}</Text>
                                                    </View>
                                                </View>




                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Ecoute et communication</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à l'écoute active</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal8}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Innovation et créativité</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Force de proposition, capacité de proposer de nouvelles choses</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal9}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Partage de connaissance</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à coacher et/ou à former et/ou à accompagner</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal10}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Plan d'action</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à mettre en œuvre des plans d'action pour améliorer son unité</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal11}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Exemplarité</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à montrer l'exemple, capacité à mener son équipe à adhérer à une chose, respect des règles</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal12}</Text>
                                                    </View>
                                                </View>



                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Gestion du changement</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à gérer et à accompagner son équipe dans le changement</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal13}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp1}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal14}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                    <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                    </View>
                                                    <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp2}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal15}</Text>
                                                    </View>
                                                </View>




                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {sommes.toFixed(2)} %</Text>
                                                </View>





                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Synthese des évaluations</Text>
                                                </View>

                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères évalués</Text>
                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Résultat</Text>
                                                        <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critère de classement</Text>
                                                        <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                    </View>

                                                    {[{ critere: 'Maîtrise techniques du poste', description: 'Performance (objectifs), Quantité du travail fourni, Qualité du travail fourni, Gestion de projet, Aptitude liée au poste, Management opérationnel', resultat: r1.toFixed(2), classement: cdc1, commentaire: cmt1 },
                                                    { critere: "Degré d'autonomie", description: 'Innovation et créativité', resultat: parseFloat(r2).toFixed(2), classement: cdc2, commentaire: cmt2 },
                                                    { critere: 'Capacité de coordination', description: 'Organisation, Méthode, Indicateurs de contrôle, Planification des tâches de son équipe, Contrôle des activités de son équipe', resultat: parseFloat(r3).toFixed(2), classement: cdc3, commentaire: cmt3 },
                                                    { critere: "Capacité d'anticipation et résolution des problèmes", description: 'Ecoute et communication, Plan d\'action, Gestion du changement', resultat: parseFloat(r4).toFixed(2), classement: cdc4, commentaire: cmt4 }].map((item, index) => (
                                                        <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <Text style={{ flex: 1, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.critere}</Text>
                                                            <Text style={{ flex: 1.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.description}</Text>
                                                            <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.resultat}</Text>
                                                            <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.classement}</Text>
                                                            <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{item.commentaire}</Text>
                                                        </View>
                                                    ))}
                                                </View>








                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Niveau actuel</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Ancienneté au niveau</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Conclusion</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Nouveau niveau</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                        <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nivactus}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{ancienneteniv}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{concl}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nouvnivs}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{com}</Text>
                                                        </View>
                                                    </View>
                                                </View>




                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Performance globale</Text>
                                                </View>

                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Performance globale</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Classification</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                        <View style={{ flex: 3, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{pg}</Text>
                                                        </View>
                                                        <View style={{ flex: 2, padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{classification}</Text>
                                                        </View>
                                                    </View>
                                                </View>



                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Interpretation des résultats</Text>
                                                </View>

                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', pageBreakInside: 'avoid' }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{idr}</Text>
                                                        </View>
                                                    </View>
                                                </View>





                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Développement des compétances</Text>
                                                </View>

                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Evaluation Forces et Faiblesses</Text>
                                                </View>




                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Forces</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc', textAlign: 'center' }}>Commentaires</Text>
                                                        <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Axes d'amélioration</Text>
                                                        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                    </View>

                                                    {[{ force: f1, commentaire: c1, amelioration: am1, commentaire2: c21 },
                                                    { force: f2, commentaire: c2, amelioration: am2, commentaire2: c22 },
                                                    { force: f3, commentaire: c3, amelioration: am3, commentaire2: c23 },
                                                    { force: f4, commentaire: c4, amelioration: am4, commentaire2: c24 },
                                                    { force: f5, commentaire: c5, amelioration: am5, commentaire2: c25 }].map((item, index) => {
                                                        // Check if the row is not empty
                                                        if (item.force || item.commentaire || item.amelioration || item.commentaire2) {
                                                            return (
                                                                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                    <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.force}</Text>
                                                                    </View>
                                                                    <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire}</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.amelioration}</Text>
                                                                    </View>
                                                                    <View style={{ flex: 2, padding: 5 }}>
                                                                        <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire2}</Text>
                                                                    </View>
                                                                </View>
                                                            );
                                                        }
                                                        return null; // Return null if the row is empty
                                                    })}
                                                </View>






                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Formations suivies au cours de l'année</Text>
                                                </View>



                                                <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Thème</Text>
                                                        <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Compétences acquises</Text>
                                                        <View style={{ flex: 3, flexDirection: 'column', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>Appréciation de la hiérarchie</Text>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Avant la formation</Text>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Après la formation</Text>
                                                            </View>
                                                        </View>
                                                        <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires sur les écarts</Text>
                                                    </View>

                                                    {[{ t: t1, compac: compac1, apav: apav1, apap: apap1, comm: comm1 },
                                                    { t: t2, compac: compac2, apav: apav2, apap: apap2, comm: comm2 },
                                                    { t: t3, compac: compac3, apav: apav3, apap: apap3, comm: comm3 },
                                                    { t: t4, compac: compac4, apav: apav4, apap: apap4, comm: comm4 }]
                                                        .filter(item => (item.t?.trim() !== '') || (item.compac?.trim() !== '') || (item.apav?.trim() !== '') || (item.apap?.trim() !== '') || (item.comm?.trim() !== ''))
                                                        .map((item, index) => (
                                                            <View key={index} style={{ flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.t}</Text>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.compac}</Text>
                                                                <View style={{ flex: 3, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>
                                                                    <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.apav}</Text>
                                                                    <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.apap}</Text>
                                                                </View>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.comm}</Text>
                                                            </View>
                                                        ))}
                                                </View>






                                                <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                        Projet professionnel
                                                    </Text>
                                                </View>
                                                <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ flex: 1.4, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}></Text>
                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                            Court terme
                                                        </Text>
                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                            Moyen terme
                                                        </Text>
                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                            Long terme
                                                        </Text>
                                                        <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: 'white' }}>
                                                            Contribution personnelle dans la réalisation du projet
                                                        </Text>
                                                        <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>
                                                            Contribution du groupe/société (votre attente)
                                                        </Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                        <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            Evolution de carrière
                                                        </Text>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct1}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt1}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml1}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }} >{cpr1}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1 }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg1}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                        <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            Mobilité géographique
                                                        </Text>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct2}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt2}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml2}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr2}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1 }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg2}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                        <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            Autres (à préciser)
                                                        </Text>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct3}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt3}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml3}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr3}</Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, padding: 1 }}>
                                                            <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg3}</Text>
                                                        </View>
                                                    </View>
                                                </View>






                                                <View style={{ padding: 2 }}>
                                                    <Text style={{ fontSize: 13, color: '#333', textAlign: 'center' }}>Commentaire du collaborateur</Text>
                                                    <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                        {comcollab}
                                                    </Text>
                                                </View>




                                                <View style={{ marginTop: 15, marginBottom: 5, backgroundColor: 'white' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                        Objectifs de la prochaine période
                                                    </Text>


                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                            <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                        </View>

                                                        {objectifs1.map((objectif, index) => {
                                                            // Check if the row is not empty
                                                            if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                                return (
                                                                    <View
                                                                        key={index}
                                                                        style={{
                                                                            flexDirection: 'row',
                                                                            padding: 5,
                                                                            borderBottomWidth: 1,
                                                                            borderColor: '#ccc',
                                                                            backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                        }}
                                                                    >
                                                                        <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                        <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                        <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                        <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                    </View>
                                                                );
                                                            }
                                                            return null; // Return null if the row is empty
                                                        })}













                                                    </View>

                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                    </View>
                                                </View>




                                                <View style={{ borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c' }}>
                                                        <Text style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                            fontSize: 10,
                                                            color: 'white',
                                                            textAlign: 'center',
                                                            padding: 10,
                                                            borderRightWidth: 1,
                                                            borderRightColor: '#ccc'
                                                        }}>
                                                            Collaborateur
                                                        </Text>
                                                        <Text style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                            fontSize: 10,
                                                            color: 'white',
                                                            textAlign: 'center',
                                                            padding: 10,
                                                            borderRightWidth: 1,
                                                            borderRightColor: '#ccc'
                                                        }}>
                                                            Supérieur hiérarchique (N+1 et N+2)
                                                        </Text>
                                                        <Text style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                            fontSize: 10,
                                                            color: 'white',
                                                            textAlign: 'center',
                                                            padding: 10,
                                                            borderRightWidth: 1,
                                                            borderRightColor: '#ccc'
                                                        }}>
                                                            Avis Direction générale
                                                        </Text>
                                                        <Text style={{
                                                            flex: 1,
                                                            fontWeight: 'bold',
                                                            fontSize: 10,
                                                            color: 'white',
                                                            textAlign: 'center',
                                                            padding: 10
                                                        }}>
                                                            Avis RH
                                                        </Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Date:</Text>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Signature:</Text>
                                                            </View>
                                                            <View style={{ height: 50 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                            </View>
                                                            <View style={{ height: 20 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                            </View>
                                                            <View style={{ height: 20 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 10 }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                            </View>
                                                            <View style={{ height: 20 }}></View>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc' }}>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                textAlign: 'center',
                                                                marginBottom: 10, textDecoration: 'underline',
                                                            }}>
                                                                Commentaires:
                                                            </Text>
                                                            <View style={{ height: 60 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                textAlign: 'center',
                                                                marginBottom: 10, textDecoration: 'underline',
                                                            }}>
                                                                Commentaires:
                                                            </Text>
                                                            <View style={{ height: 60 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                textAlign: 'center',
                                                                marginBottom: 10, textDecoration: 'underline',
                                                            }}>
                                                                Commentaires:
                                                            </Text>
                                                            <View style={{ height: 60 }}></View>
                                                        </View>
                                                        <View style={{ flex: 1, padding: 10 }}>
                                                            <Text style={{
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                textAlign: 'center',
                                                                marginBottom: 10, textDecoration: 'underline',
                                                            }}>
                                                                Commentaires:
                                                            </Text>
                                                            <View style={{ height: 60 }}></View>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View>


                                        </Page>
                                    </Document>
                                </PDFViewer>


                            </div>
                            : etaeval === 'Evaluation non cadre'
                                ? <div>
                                    <Title level={2}>Evaluation de {prenom} {nom}</Title>
                                    <PDFViewer style={{ width: '90%', height: '100vh' }}>
                                        <Document>
                                            <Page size="A4" style={{ padding: 20 }}>

                                                <View style={{ marginBottom: 5, alignItems: 'center' }}>
                                                    <Image src={logonpa} style={{ width: 120, height: 70 }} />
                                                </View>

                                                <View style={{ marginBottom: 8 }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center', backgroundColor: '#40A9FF' }}>
                                                        Fiche d'évaluation professionnelle - non cadre
                                                    </Text>
                                                </View>

                                                <View>
                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 0.5 }}>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom: {nom}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'entrée: {formattedDate}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom de l'évaluateur: {nomeval}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Prénom(s): {prenom}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Poste: {posteeval}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Fonction: {fonc}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Matricule: {mat}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Direction: {dir}</Text>
                                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'évaluation:</Text>
                                                    </View>
                                                </View>

                                                <View style={{ marginTop: 10, marginBottom: -5, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Bilan de l'année écoulée</Text>
                                                </View>

                                                <View style={{ marginBottom: -8, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                                    <Text style={{ fontSize: 9, color: '#333' }}>Du: {formattedDate10}</Text>
                                                    <Text style={{ fontSize: 9, color: '#333' }}>Au: {formattedDate20}</Text>
                                                </View>

                                                <View style={{ padding: 2 }}>
                                                    <Text style={{ fontSize: 13, color: '#333' }}>Mission:</Text>
                                                    <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                        {mission}
                                                    </Text>
                                                </View>


                                                <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Objectifs individuels</Text>
                                                </View>

                                                <View>




                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>


                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                            <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                        </View>

                                                        {objectifs.map((objectif, index) => {
                                                            // Check if the row is not empty
                                                            if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                                return (
                                                                    <View
                                                                        key={index}
                                                                        style={{
                                                                            flexDirection: 'row',
                                                                            padding: 5,
                                                                            borderBottomWidth: 1,
                                                                            borderColor: '#ccc',
                                                                            backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                        }}
                                                                    >
                                                                        <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                        <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                        <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                        <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                    </View>
                                                                );
                                                            }
                                                            return null; // Return null if the row is empty
                                                        })}
                                                    </View>






                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                    </View>




                                                    <View style={{ borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 0, color: 'white', textAlign: 'center' }}>Aptitudes Professionnelles</Text>
                                                        </View>

                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères</Text>
                                                                <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Description</Text>
                                                                <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                                <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                                <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    Exécution des tâches décrites dans sa fiche de poste et exigées par son N+1 Respect des délais.
                                                                </Text>
                                                                <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue1}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                                <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                                <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    Aptitude à effectuer les contrôles nécessaires afin de réduire les erreurs, les oublis, les défauts. Rigueur dans la tenue du poste Anticipation des problèmes et les obstacles Respect des délais.
                                                                </Text>
                                                                <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue2}</Text>
                                                            </View>
                                                        </View>
                                                    </View>



                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {somme.toFixed(2)} %</Text>
                                                    </View>





                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Comportement</Text>
                                                    </View>


                                                    <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                        <Text style={{ flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Critères</Text>
                                                        <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                    </View>


                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Organisation</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à agencer les moyens pour un fonctionnement efficace</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal1}</Text>
                                                        </View>
                                                    </View>



                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Méthode</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à procéder de manière structurée dans la réalisation des tâches</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal2}</Text>
                                                        </View>
                                                    </View>


                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Assiduité</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Ponctualité et régularité dans la présence</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal3}</Text>
                                                        </View>
                                                    </View>



                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Régularité dans le travail</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à travailler avec constance tant en quantité qu'en qualité</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal4}</Text>
                                                        </View>
                                                    </View>




                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Respect des règles</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à suivre et appliquer les règles, les procédures et les normes</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal5}</Text>
                                                        </View>
                                                    </View>



                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Rigueur</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à travailler avec attention et application afin d'éviter les erreurs et oublis</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal6}</Text>
                                                        </View>
                                                    </View>




                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Curiosité d'esprit</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Ouverture d'esprit, volonté d'apprendre de nouvelles choses
                                                                Intérêt  à de nouvelles méthodes pour pouvoir éprouver ce qui existe déjà</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal7}</Text>
                                                        </View>
                                                    </View>



                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Autonomie</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Responsable, capacité d'accomplir ses tâches avec autonomie
                                                                Capacité à suivre les directives et les appliques</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal8}</Text>
                                                        </View>
                                                    </View>



                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Partage de connaissance</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à coacher et/ou à former et/ou à accompagner</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal9}</Text>
                                                        </View>
                                                    </View>




                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp1}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal10}</Text>
                                                        </View>
                                                    </View>


                                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                        <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                        </View>
                                                        <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp2}</Text>
                                                        </View>
                                                        <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal11}</Text>
                                                        </View>
                                                    </View>




                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {sommes.toFixed(2)} %</Text>
                                                    </View>





                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Synthese des évaluations</Text>
                                                    </View>

                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères évalués</Text>
                                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Résultat</Text>
                                                            <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critère de classement</Text>
                                                            <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                        </View>

                                                        {[{ critere: 'Maîtrise techniques du poste', description: 'Performance (objectifs), Quantité du travail fourni, Qualité du travail fourni, Gestion de projet, Aptitude liée au poste, Management opérationnel', resultat: r1.toFixed(2), classement: cdc1, commentaire: cmt1 },
                                                        { critere: "Degré d'autonomie", description: 'Innovation et créativité', resultat: r2, classement: cdc2, commentaire: cmt2 },
                                                        { critere: 'Capacité de coordination', description: 'Organisation, Méthode, Indicateurs de contrôle, Planification des tâches de son équipe, Contrôle des activités de son équipe', resultat: r3, classement: cdc3, commentaire: cmt3 },
                                                        { critere: "Capacité d'anticipation et résolution des problèmes", description: 'Ecoute et communication, Plan d\'action, Gestion du changement', resultat: r4, classement: cdc4, commentaire: cmt4 }].map((item, index) => (
                                                            <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <Text style={{ flex: 1, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.critere}</Text>
                                                                <Text style={{ flex: 1.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.description}</Text>
                                                                <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.resultat}</Text>
                                                                <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.classement}</Text>
                                                                <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{item.commentaire}</Text>
                                                            </View>
                                                        ))}
                                                    </View>









                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Niveau actuel</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Ancienneté au niveau</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Conclusion</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Nouveau niveau</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nivactus}</Text>
                                                            </View>
                                                            <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{ancienneteniv}</Text>
                                                            </View>
                                                            <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{concl}</Text>
                                                            </View>
                                                            <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nouvnivs}</Text>
                                                            </View>
                                                            <View style={{ flex: 2, padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{com}</Text>
                                                            </View>
                                                        </View>
                                                    </View>




                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Performance globale</Text>
                                                    </View>

                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Performance globale</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Classification</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <View style={{ flex: 3, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{pg}</Text>
                                                            </View>
                                                            <View style={{ flex: 2, padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{classification}</Text>
                                                            </View>
                                                        </View>
                                                    </View>



                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Interpretation des résultats</Text>
                                                    </View>

                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', pageBreakInside: 'avoid' }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{idr}</Text>
                                                            </View>
                                                        </View>
                                                    </View>





                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Développement des compétances</Text>
                                                    </View>

                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Evaluation Forces et Faiblesses</Text>
                                                    </View>




                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Forces</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc', textAlign: 'center' }}>Commentaires</Text>
                                                            <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Axes d'amélioration</Text>
                                                            <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                        </View>

                                                        {[{ force: f1, commentaire: c1, amelioration: am1, commentaire2: c21 },
                                                        { force: f2, commentaire: c2, amelioration: am2, commentaire2: c22 },
                                                        { force: f3, commentaire: c3, amelioration: am3, commentaire2: c23 },
                                                        { force: f4, commentaire: c4, amelioration: am4, commentaire2: c24 },
                                                        { force: f5, commentaire: c5, amelioration: am5, commentaire2: c25 }].map((item, index) => {
                                                            // Check if the row is not empty
                                                            if (item.force || item.commentaire || item.amelioration || item.commentaire2) {
                                                                return (
                                                                    <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                        <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.force}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.amelioration}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 2, padding: 5 }}>
                                                                            <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire2}</Text>
                                                                        </View>
                                                                    </View>
                                                                );
                                                            }
                                                            return null; // Return null if the row is empty
                                                        })}
                                                    </View>






                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Formations suivies au cours de l'année</Text>
                                                    </View>



                                                    <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Thème</Text>
                                                            <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Compétences acquises</Text>
                                                            <View style={{ flex: 3, flexDirection: 'column', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>Appréciation de la hiérarchie</Text>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Avant la formation</Text>
                                                                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Après la formation</Text>
                                                                </View>
                                                            </View>
                                                            <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires sur les écarts</Text>
                                                        </View>

                                                        {[{ t: t1, compac: compac1, apav: apav1, apap: apap1, comm: comm1 },
                                                        { t: t2, compac: compac2, apav: apav2, apap: apap2, comm: comm2 },
                                                        { t: t3, compac: compac3, apav: apav3, apap: apap3, comm: comm3 },
                                                        { t: t4, compac: compac4, apav: apav4, apap: apap4, comm: comm4 }]
                                                            .filter(item => (item.t?.trim() !== '') || (item.compac?.trim() !== '') || (item.apav?.trim() !== '') || (item.apap?.trim() !== '') || (item.comm?.trim() !== ''))
                                                            .map((item, index) => (
                                                                <View key={index} style={{ flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.t}</Text>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.compac}</Text>
                                                                    <View style={{ flex: 3, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>
                                                                        <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.apav}</Text>
                                                                        <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.apap}</Text>
                                                                    </View>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.comm}</Text>
                                                                </View>
                                                            ))}
                                                    </View>






                                                    <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                            Projet professionnel
                                                        </Text>
                                                    </View>
                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ flex: 1.4, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}></Text>
                                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                Court terme
                                                            </Text>
                                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                Moyen terme
                                                            </Text>
                                                            <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                Long terme
                                                            </Text>
                                                            <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: 'white' }}>
                                                                Contribution personnelle dans la réalisation du projet
                                                            </Text>
                                                            <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>
                                                                Contribution du groupe/société (votre attente)
                                                            </Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                Evolution de carrière
                                                            </Text>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct1}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt1}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml1}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }} >{cpr1}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1 }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg1}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                Mobilité géographique
                                                            </Text>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct2}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt2}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml2}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr2}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1 }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg2}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                            <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                Autres (à préciser)
                                                            </Text>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct3}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt3}</Text>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml3}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr3}</Text>
                                                            </View>
                                                            <View style={{ flex: 1.5, padding: 1 }}>
                                                                <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg3}</Text>
                                                            </View>
                                                        </View>
                                                    </View>






                                                    <View style={{ padding: 2 }}>
                                                        <Text style={{ fontSize: 13, color: '#333', textAlign: 'center' }}>Commentaire du collaborateur</Text>
                                                        <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                            {comcollab}
                                                        </Text>
                                                    </View>




                                                    <View style={{ marginTop: 15, marginBottom: 5, backgroundColor: 'white' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                            Objectifs de la prochaine période
                                                        </Text>


                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                                <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                                <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                                <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                            </View>

                                                            {objectifs1.map((objectif, index) => {
                                                                // Check if the row is not empty
                                                                if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                                    return (
                                                                        <View
                                                                            key={index}
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                padding: 5,
                                                                                borderBottomWidth: 1,
                                                                                borderColor: '#ccc',
                                                                                backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                            }}
                                                                        >
                                                                            <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                            <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                            <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                            <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                        </View>
                                                                    );
                                                                }
                                                                return null; // Return null if the row is empty
                                                            })}













                                                        </View>

                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                        </View>
                                                    </View>




                                                    <View style={{ borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c' }}>
                                                            <Text style={{
                                                                flex: 1,
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                padding: 10,
                                                                borderRightWidth: 1,
                                                                borderRightColor: '#ccc'
                                                            }}>
                                                                Collaborateur
                                                            </Text>
                                                            <Text style={{
                                                                flex: 1,
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                padding: 10,
                                                                borderRightWidth: 1,
                                                                borderRightColor: '#ccc'
                                                            }}>
                                                                Supérieur hiérarchique (N+1 et N+2)
                                                            </Text>
                                                            <Text style={{
                                                                flex: 1,
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                padding: 10,
                                                                borderRightWidth: 1,
                                                                borderRightColor: '#ccc'
                                                            }}>
                                                                Avis Direction générale
                                                            </Text>
                                                            <Text style={{
                                                                flex: 1,
                                                                fontWeight: 'bold',
                                                                fontSize: 10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                padding: 10
                                                            }}>
                                                                Avis RH
                                                            </Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Date:</Text>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Signature:</Text>
                                                                </View>
                                                                <View style={{ height: 50 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                </View>
                                                                <View style={{ height: 20 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                </View>
                                                                <View style={{ height: 20 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 10 }}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                </View>
                                                                <View style={{ height: 20 }}></View>
                                                            </View>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc' }}>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <Text style={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    textAlign: 'center',
                                                                    marginBottom: 10, textDecoration: 'underline',
                                                                }}>
                                                                    Commentaires:
                                                                </Text>
                                                                <View style={{ height: 60 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <Text style={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    textAlign: 'center',
                                                                    marginBottom: 10, textDecoration: 'underline',
                                                                }}>
                                                                    Commentaires:
                                                                </Text>
                                                                <View style={{ height: 60 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                <Text style={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    textAlign: 'center',
                                                                    marginBottom: 10, textDecoration: 'underline',
                                                                }}>
                                                                    Commentaires:
                                                                </Text>
                                                                <View style={{ height: 60 }}></View>
                                                            </View>
                                                            <View style={{ flex: 1, padding: 10 }}>
                                                                <Text style={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    textAlign: 'center',
                                                                    marginBottom: 10, textDecoration: 'underline',
                                                                }}>
                                                                    Commentaires:
                                                                </Text>
                                                                <View style={{ height: 60 }}></View>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>


                                            </Page>
                                        </Document>
                                    </PDFViewer>
                                </div>
                                : etaeval === ''
                                    ? <div>Veuiller selectionner historique d' evaluation</div>
                                    : <div>
                                        <Title level={2}>Evaluation de {prenom} {nom} </Title>
                                        <PDFViewer style={{ width: '90%', height: '100vh' }}>
                                            <Document>
                                                <Page size="A4" style={{ padding: 20 }}>

                                                    <View style={{ marginBottom: 5, alignItems: 'center' }}>
                                                        <Image src={logonpa} style={{ width: 120, height: 70 }} />
                                                    </View>

                                                    <View style={{ marginBottom: 8 }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center', backgroundColor: '#40A9FF' }}>
                                                            Fiche d'évaluation professionnelle - cadre non manager
                                                        </Text>
                                                    </View>

                                                    <View>
                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 0.5 }}>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom: {nom}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'entrée: {formattedDate}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom de l'évaluateur: {nomeval}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Prénom(s): {prenom}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Poste: {posteeval}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Fonction: {fonc}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Matricule: {mat}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Direction: {dir}</Text>
                                                            <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Date d'évaluation:</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ marginTop: 10, marginBottom: -5, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Bilan de l'année écoulée</Text>
                                                    </View>

                                                    <View style={{ marginBottom: -8, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                                                        <Text style={{ fontSize: 9, color: '#333' }}>Du: {formattedDate10}</Text>
                                                        <Text style={{ fontSize: 9, color: '#333' }}>Au: {formattedDate20}</Text>
                                                    </View>

                                                    <View style={{ padding: 2 }}>
                                                        <Text style={{ fontSize: 13, color: '#333' }}>Mission:</Text>
                                                        <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                            {mission}
                                                        </Text>
                                                    </View>


                                                    <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Objectifs individuels</Text>
                                                    </View>

                                                    <View>




                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>


                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                                <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                                <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                                <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                            </View>

                                                            {objectifs.map((objectif, index) => {
                                                                // Check if the row is not empty
                                                                if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                                    return (
                                                                        <View
                                                                            key={index}
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                padding: 5,
                                                                                borderBottomWidth: 1,
                                                                                borderColor: '#ccc',
                                                                                backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                            }}
                                                                        >
                                                                            <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                            <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                            <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                            <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                        </View>
                                                                    );
                                                                }
                                                                return null; // Return null if the row is empty
                                                            })}
                                                        </View>






                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                        </View>




                                                        <View style={{ borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                            <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 0, color: 'white', textAlign: 'center' }}>Aptitudes Professionnelles</Text>
                                                            </View>

                                                            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                                <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                    <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères</Text>
                                                                    <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Description</Text>
                                                                    <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                                </View>

                                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                                    <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                                    <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                        Exécution des tâches décrites dans sa fiche de poste et exigées par son N+1 Respect des délais.
                                                                    </Text>
                                                                    <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue1}</Text>
                                                                </View>

                                                                <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                                    <Text style={{ flex: 0.7, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>Quantité du travail</Text>
                                                                    <Text style={{ flex: 2.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                        Aptitude à effectuer les contrôles nécessaires afin de réduire les erreurs, les oublis, les défauts. Rigueur dans la tenue du poste Anticipation des problèmes et les obstacles Respect des délais.
                                                                    </Text>
                                                                    <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{selectedValue2}</Text>
                                                                </View>
                                                            </View>
                                                        </View>



                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {somme.toFixed(2)} %</Text>
                                                        </View>





                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Comportement</Text>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                            <Text style={{ flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Critères</Text>
                                                            <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white' }}>Notes</Text>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Organisation</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à agencer les moyens pour un fonctionnement efficace</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal1}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Méthode</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude à procéder de manière structurée dans la réalisation des tâches</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal2}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Gestion de projet</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à mener à bien ses projets (respect deadline, respect des coûts, respect de la qualité )</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal3}</Text>
                                                            </View>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Indicateurs de contrôle</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité de mettre en place des KPI pour le suivi de ses activités</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal4}</Text>
                                                            </View>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Ecoute et communication</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à l'écoute active</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal5}</Text>
                                                            </View>
                                                        </View>



                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Innovation et créativité</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Force de proposition, capacité de proposer de nouvelles choses</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal6}</Text>
                                                            </View>
                                                        </View>




                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Partage de connaissance</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à coacher et/ou à former et/ou à accompagner</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal7}</Text>
                                                            </View>
                                                        </View>



                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Plan d'action</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à mettre en œuvre des plans d'action pour améliorer son unité</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal8}</Text>
                                                            </View>
                                                        </View>




                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Exemplarité</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à montrer l'exemple, capacité à faire adhérer à une chose, respect des règles</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal9}</Text>
                                                            </View>
                                                        </View>



                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Gestion du changement</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Capacité à gérer et conduire un changement</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal10}</Text>
                                                            </View>
                                                        </View>





                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp1}</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal14}</Text>
                                                            </View>
                                                        </View>


                                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                            <View style={{ flex: 0.7, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>Aptitude liée au poste</Text>
                                                            </View>
                                                            <View style={{ flex: 2.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'justify', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{alp2}</Text>
                                                            </View>
                                                            <View style={{ flex: 0.5, borderWidth: 0.5, borderColor: '#999', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{selectedVal15}</Text>
                                                            </View>
                                                        </View>




                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#333', textAlign: 'center' }}>Résultat: {sommes.toFixed(2)} %</Text>
                                                        </View>





                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Synthese des évaluations</Text>
                                                        </View>

                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critères évalués</Text>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Résultat</Text>
                                                                <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Critère de classement</Text>
                                                                <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                            </View>

                                                            {[{ critere: 'Maîtrise techniques du poste', description: 'Performance (objectifs), Quantité du travail fourni, Qualité du travail fourni, Gestion de projet, Aptitude liée au poste, Management opérationnel', resultat: r1.toFixed(2), classement: cdc1, commentaire: cmt1 },
                                                            { critere: "Degré d'autonomie", description: 'Innovation et créativité', resultat: r2, classement: cdc2, commentaire: cmt2 },
                                                            { critere: 'Capacité de coordination', description: 'Organisation, Méthode, Indicateurs de contrôle, Planification des tâches de son équipe, Contrôle des activités de son équipe',resultat: parseFloat(parseFloat(r3).toFixed(2)), classement: cdc3, commentaire: cmt3 },
                                                            { critere: "Capacité d'anticipation et résolution des problèmes", description: 'Ecoute et communication, Plan d\'action, Gestion du changement', resultat: r4, classement: cdc4, commentaire: cmt4 }].map((item, index) => (
                                                                <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                    <Text style={{ flex: 1, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.critere}</Text>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.description}</Text>
                                                                    <Text style={{ flex: 0.5, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.resultat}</Text>
                                                                    <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{item.classement}</Text>
                                                                    <Text style={{ flex: 2, fontSize: 8, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5 }}>{item.commentaire}</Text>
                                                                </View>
                                                            ))}
                                                        </View>









                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Niveau actuel</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Ancienneté au niveau</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Conclusion</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Nouveau niveau</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nivactus}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{ancienneteniv}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{concl}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{nouvnivs}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{com}</Text>
                                                                </View>
                                                            </View>
                                                        </View>




                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Performance globale</Text>
                                                        </View>

                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Performance globale</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Classification</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <View style={{ flex: 3, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{pg}</Text>
                                                                </View>
                                                                <View style={{ flex: 2, padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{classification}</Text>
                                                                </View>
                                                            </View>
                                                        </View>



                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 1, color: 'white', textAlign: 'center' }}>Interpretation des résultats</Text>
                                                        </View>

                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', pageBreakInside: 'avoid' }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3 }}>
                                                                <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                    <Text style={{ textAlign: 'center', fontSize: 8, color: '#333' }}>{idr}</Text>
                                                                </View>
                                                            </View>
                                                        </View>





                                                        <View style={{ marginTop: 10, marginBottom: 0, backgroundColor: '#40A9FF' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'white', textAlign: 'center' }}>Développement des compétances</Text>
                                                        </View>

                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Evaluation Forces et Faiblesses</Text>
                                                        </View>




                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Forces</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc', textAlign: 'center' }}>Commentaires</Text>
                                                                <Text style={{ textAlign: 'center', flex: 3, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightColor: '#ccc' }}>Axes d'amélioration</Text>
                                                                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                            </View>

                                                            {[{ force: f1, commentaire: c1, amelioration: am1, commentaire2: c21 },
                                                            { force: f2, commentaire: c2, amelioration: am2, commentaire2: c22 },
                                                            { force: f3, commentaire: c3, amelioration: am3, commentaire2: c23 },
                                                            { force: f4, commentaire: c4, amelioration: am4, commentaire2: c24 },
                                                            { force: f5, commentaire: c5, amelioration: am5, commentaire2: c25 }].map((item, index) => {
                                                                // Check if the row is not empty
                                                                if (item.force || item.commentaire || item.amelioration || item.commentaire2) {
                                                                    return (
                                                                        <View key={index} style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                            <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.force}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 2, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1.5, borderRightWidth: 1, borderRightColor: '#ccc', padding: 5 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.amelioration}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 2, padding: 5 }}>
                                                                                <Text style={{ textAlign: 'center', fontSize: 8, color: '#333', fontWeight: 'bold' }}>{item.commentaire2}</Text>
                                                                            </View>
                                                                        </View>
                                                                    );
                                                                }
                                                                return null; // Return null if the row is empty
                                                            })}
                                                        </View>






                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>Formations suivies au cours de l'année</Text>
                                                        </View>



                                                        <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Thème</Text>
                                                                <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Compétences acquises</Text>
                                                                <View style={{ flex: 3, flexDirection: 'column', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>Appréciation de la hiérarchie</Text>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc', textAlign: 'center' }}>Avant la formation</Text>
                                                                        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Après la formation</Text>
                                                                    </View>
                                                                </View>
                                                                <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires sur les écarts</Text>
                                                            </View>

                                                            {[{ t: t1, compac: compac1, apav: apav1, apap: apap1, comm: comm1 },
                                                            { t: t2, compac: compac2, apav: apav2, apap: apap2, comm: comm2 },
                                                            { t: t3, compac: compac3, apav: apav3, apap: apap3, comm: comm3 },
                                                            { t: t4, compac: compac4, apav: apav4, apap: apap4, comm: comm4 }]
                                                                .filter(item => (item.t?.trim() !== '') || (item.compac?.trim() !== '') || (item.apav?.trim() !== '') || (item.apap?.trim() !== '') || (item.comm?.trim() !== ''))
                                                                .map((item, index) => (
                                                                    <View key={index} style={{ flexDirection: 'row', padding: 5, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                                                        <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.t}</Text>
                                                                        <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.compac}</Text>
                                                                        <View style={{ flex: 3, flexDirection: 'row', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>
                                                                            <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc', color: '#333' }}>{item.apav}</Text>
                                                                            <Text style={{ flex: 1, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.apap}</Text>
                                                                        </View>
                                                                        <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{item.comm}</Text>
                                                                    </View>
                                                                ))}
                                                        </View>






                                                        <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                                Projet professionnel
                                                            </Text>
                                                        </View>
                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden' }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 5 }}>
                                                                <Text style={{ flex: 1.4, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}></Text>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                    Court terme
                                                                </Text>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                    Moyen terme
                                                                </Text>
                                                                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: '#1abd9c' }}>
                                                                    Long terme
                                                                </Text>
                                                                <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center', borderRightWidth: 1, borderRightColor: 'white' }}>
                                                                    Contribution personnelle dans la réalisation du projet
                                                                </Text>
                                                                <Text style={{ flex: 1.5, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>
                                                                    Contribution du groupe/société (votre attente)
                                                                </Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    Evolution de carrière
                                                                </Text>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct1}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt1}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml1}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }} >{cpr1}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1 }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg1}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    Mobilité géographique
                                                                </Text>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct2}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt2}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml2}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr2}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1 }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg2}</Text>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 3, borderBottomWidth: 1, borderColor: '#ccc', pageBreakInside: 'avoid' }}>
                                                                <Text style={{ flex: 1.5, fontSize: 10, color: '#333', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    Autres (à préciser)
                                                                </Text>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ct3}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{mt3}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{ml3}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1, borderRightWidth: 1, borderRightColor: '#ccc' }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cpr3}</Text>
                                                                </View>
                                                                <View style={{ flex: 1.5, padding: 1 }}>
                                                                    <Text style={{ flex: 1.5, fontSize: 8, textAlign: 'center', color: '#333' }}>{cg3}</Text>
                                                                </View>
                                                            </View>
                                                        </View>






                                                        <View style={{ padding: 2 }}>
                                                            <Text style={{ fontSize: 13, color: '#333', textAlign: 'center' }}>Commentaire du collaborateur</Text>
                                                            <Text style={{ fontSize: 8, color: '#333', marginTop: 5, padding: 2 }}>
                                                                {comcollab}
                                                            </Text>
                                                        </View>




                                                        <View style={{ marginTop: 15, marginBottom: 5, backgroundColor: 'white' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 1, color: 'black', textAlign: 'center' }}>
                                                                Objectifs de la prochaine période
                                                            </Text>


                                                            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
                                                                <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c', padding: 10 }}>
                                                                    <Text style={{ flex: 2.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Libellé - Objectif</Text>
                                                                    <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Poids %</Text>
                                                                    <Text style={{ flex: 0.5, fontWeight: 'bold', fontSize: 10, color: 'white', borderRightWidth: 1, borderRightColor: '#ccc' }}>Notation /5</Text>
                                                                    <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 10, color: 'white', textAlign: 'center' }}>Commentaires</Text>
                                                                </View>

                                                                {objectifs1.map((objectif, index) => {
                                                                    // Check if the row is not empty
                                                                    if (objectif.libelle || objectif.poids || objectif.notation || objectif.commentaire) {
                                                                        return (
                                                                            <View
                                                                                key={index}
                                                                                style={{
                                                                                    flexDirection: 'row',
                                                                                    padding: 5,
                                                                                    borderBottomWidth: 1,
                                                                                    borderColor: '#ccc',
                                                                                    backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#fff'
                                                                                }}
                                                                            >
                                                                                <Text style={{ flex: 2.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.libelle}</Text>
                                                                                <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.poids}</Text>
                                                                                <Text style={{ flex: 0.5, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'center', padding: 5, borderRightWidth: 1, borderRightColor: '#ccc' }}>{objectif.notation}</Text>
                                                                                <Text style={{ flex: 2, fontSize: 9, color: '#333', fontWeight: 'bold', textAlign: 'justify', padding: 5 }}>{objectif.commentaire}</Text>
                                                                            </View>
                                                                        );
                                                                    }
                                                                    return null; // Return null if the row is empty
                                                                })}













                                                            </View>

                                                            <View style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white' }}>
                                                                <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#333', textAlign: 'center' }}>Résultat: {resultat.toFixed(2)} %</Text>
                                                            </View>
                                                        </View>




                                                        <View style={{ borderWidth: 1, borderColor: '#ccc', margin: 10 }}>
                                                            <View style={{ flexDirection: 'row', backgroundColor: '#1abd9c' }}>
                                                                <Text style={{
                                                                    flex: 1,
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    padding: 10,
                                                                    borderRightWidth: 1,
                                                                    borderRightColor: '#ccc'
                                                                }}>
                                                                    Collaborateur
                                                                </Text>
                                                                <Text style={{
                                                                    flex: 1,
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    padding: 10,
                                                                    borderRightWidth: 1,
                                                                    borderRightColor: '#ccc'
                                                                }}>
                                                                    Supérieur hiérarchique (N+1 et N+2)
                                                                </Text>
                                                                <Text style={{
                                                                    flex: 1,
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    padding: 10,
                                                                    borderRightWidth: 1,
                                                                    borderRightColor: '#ccc'
                                                                }}>
                                                                    Avis Direction générale
                                                                </Text>
                                                                <Text style={{
                                                                    flex: 1,
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10,
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    padding: 10
                                                                }}>
                                                                    Avis RH
                                                                </Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc' }}>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Date:</Text>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline' }}>Signature:</Text>
                                                                    </View>
                                                                    <View style={{ height: 50 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                    </View>
                                                                    <View style={{ height: 20 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                    </View>
                                                                    <View style={{ height: 20 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 10 }}>
                                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Date:</Text>
                                                                        <Text style={{ fontWeight: 'bold', fontSize: 10, textDecoration: 'underline', }}>Signature:</Text>
                                                                    </View>
                                                                    <View style={{ height: 20 }}></View>
                                                                </View>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc' }}>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 10,
                                                                        textAlign: 'center',
                                                                        marginBottom: 10, textDecoration: 'underline',
                                                                    }}>
                                                                        Commentaires:
                                                                    </Text>
                                                                    <View style={{ height: 60 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 10,
                                                                        textAlign: 'center',
                                                                        marginBottom: 10, textDecoration: 'underline',
                                                                    }}>
                                                                        Commentaires:
                                                                    </Text>
                                                                    <View style={{ height: 60 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#ccc', padding: 10 }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 10,
                                                                        textAlign: 'center',
                                                                        marginBottom: 10, textDecoration: 'underline',
                                                                    }}>
                                                                        Commentaires:
                                                                    </Text>
                                                                    <View style={{ height: 60 }}></View>
                                                                </View>
                                                                <View style={{ flex: 1, padding: 10 }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        fontSize: 10,
                                                                        textAlign: 'center',
                                                                        marginBottom: 10, textDecoration: 'underline',
                                                                    }}>
                                                                        Commentaires:
                                                                    </Text>
                                                                    <View style={{ height: 60 }}></View>
                                                                </View>
                                                            </View>
                                                        </View>

                                                    </View>


                                                </Page>
                                            </Document>
                                        </PDFViewer>




                                    </div>}
                    </div>










                    {/* stop */}

                </div>

                <br /><br /><br /><br /><br />

            </div>

        </div>

    );
};

export default ChoosehistoRH;




