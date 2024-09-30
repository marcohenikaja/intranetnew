import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, PDFViewer, Image } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import moment from 'moment';
import { Button, message, Steps, Checkbox, notification, Space, Tooltip } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import 'jspdf-autotable';
import { DatePicker, Select, Row, Col } from 'antd';
import photo from '../../assets/images/eva.mp4'
import logonpa from './LOGO NPA.png'
import { AutoComplete } from 'antd';
import { useParams } from 'react-router-dom';
const { Option } = AutoComplete;
import axios from 'axios';
import { Popconfirm } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;
const { Step } = Steps;
import { CheckCircleOutlined, CloseCircleOutlined, HourglassOutlined, InfoCircleOutlined } from '@ant-design/icons';

import Cadre from './type/Cadre';
const { RangePicker } = DatePicker;

const CheckboxGroup = Checkbox.Group;

const url = 'http://localhost:8000/'
const Evaluation = () => {
    const [current, setCurrent] = useState(0);
    const [api, contextHolder] = notification.useNotification();
     const ids = sessionStorage.getItem('ids');
  

    const [allmail, setAllmail] = useState([])
    const loggedInUser = sessionStorage.getItem('loginUser');

    const [dateday, setDateday] = useState("")

    const [searchValue, setSearchValue] = useState('');

    const { id, type } = useParams();
    const [options1, setOptions1] = useState([])

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


    const [isTableVisible, setIsTableVisible] = useState(false);

    // Fonction pour basculer l'état de visibilité
    const toggleTableVisibility = () => {
        setIsTableVisible(!isTableVisible); // Inverse l'état actuel
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
        const type = 'Evaluation cadre'
        try {
            const response = await axios.get(`${url}getAlldataevaluations/${ids}/${type}`);

            const data = response.data;



            if (data && data.length > 0) {
                console.log(data[0]);

                setEmailn1(data[0].emailn1)
                setEmailn2(data[0].emailn2)
                setEmaildr(data[0].emaildr)
                setEmailsg(data[0].emailsg)
                setEmaildg(data[0].emaildg)
                setEmaildrh(data[0].emaildrh)

                setDateday((data[0].datetoday))


                setNom(data[0].nom);
                setPrenom(data[0].prenom);
                if (data[0].mat) {
                    setMat(data[0].mat);
                    splitMatricule(data[0].mat); // Séparer le matricule
                }
                setDaty(data[0].dateentree);
                setDir(data[0].direction);
                setNomeval(data[0].nomeval);
                setFonc(data[0].fonc);
                setDatys(data[0].datedu);
                setDatyss(data[0].dateau);
                setMission(data[0].mission);
                setResultat(data[0].res1);
                setR1(data[0].r1);
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
                const n1 = parseFloat(data[0].notation1)
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

    useEffect(() => {
        getStatus()
         getEmails()
        getAlldataevaluation()
    }, [])

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


<<<<<<< HEAD
    const [prefix, setPrefix] = useState('NPA'); // Par défaut 'NPA'
    const [digits, setDigits] = useState('');

    const handlePrefixChange = (value) => {
        setPrefix(value);
        setMat(`${value}${digits}`);
    };


    const handleDigitsChange = (e) => {
        const value = e.target.value;


        if (/^\d{0,4}$/.test(value)) {
            setDigits(value);
            setMat(`${prefix}${value}`);
        }
    };

    const splitMatricule = (matricule) => {
        if (matricule && matricule.length === 7) {
            const prefixPart = matricule.slice(0, 3); // 3 premiers caractères
            const digitsPart = matricule.slice(3);    // 4 derniers caractères
            setPrefix(prefixPart); // Mettre à jour le préfixe
            setDigits(digitsPart); // Mettre à jour les chiffres
        }
    };


=======
>>>>>>> 5afa900a2c42a54009cfadab5fb5ff28ef8b1841
    const etapesuiv = () => {
        notification.error({
            message: 'Erreur',
            description: 'Tous les changements n\'ont pas été pris en compte car cette évaluation est déjà validée.',
            placement: 'top',
        });
        next();
    }


    const [emailn1, setEmailn1] = useState("");
    const [emailn2, setEmailn2] = useState("");
    const [emaildr, setEmaildr] = useState("");
    const [emailsg, setEmailsg] = useState("boucher.edouard@npakadin.mg");
    const [emaildg, setEmaildg] = useState("");
    const [emaildrh, setEmaildrh] = useState("direndre.sonal@npakadin.mg");


    const todayis = moment();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };






    const handleSearch = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions1(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelect = (value) => {
        setEmailn1(value);
    };

    const handleChange = (value) => {
        setEmailn1(value);
        handleSearch(value); // Optionnel : met à jour les options lors de la modification
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
            notification.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Nom.',
                placement,
            });
            return;
<<<<<<< HEAD
            } else if (emailn1 === '') {
                notification.info({
                    message: `Notification`,
                    description:
                        'Veuillez remplir le champ évaluateur N+1.',
                    placement,
                });
                return;
=======
        } else if (emailn1 === '') {
            notification.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ évaluateur N+1.',
                placement,
            });
            return;
>>>>>>> 5afa900a2c42a54009cfadab5fb5ff28ef8b1841
        } else if (emailn1 === loggedInUser) {
            notification.info({
                message: `Notification`,
                description:
                    'Vous ne pouvez pas évaluer vous-même.',
                placement,
            });
            return;
        } else if (prenom == '') {
            notification.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Prénom.',
                placement,
            });
            return;

        } else if (mat == '') {
            notification.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ Matricule.',
                placement,
            });
            return;
        } else if (daty == '') {
            notification.info({
                message: `Notification`,
                description:
                    " Veuillez remplir le champ Date d'entrée.",
                placement,
            });
            return;

        } else if (dir == '') {
            notification.info({
                message: `Notification`,
                description:
                    'Veuillez remplir le champ direction.',
                placement,
            });
            return;

        } else if (posteeval == '') {
            notification.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ poste.",
                placement,
            });
            return;
            }

            else if (emailn1 === '') {
                notification.info({
                    message: `Notification`,
                    description: "Vérifiez l'adresse mail de votre évaluateur.",
                    placement,
                });
                return;
        }

        else if (emailn1 && !emails.includes(emailn1.toLowerCase())) {
            notification.info({
                message: 'Notification',
                description: "Vérifiez l'adresse mail de votre évaluateur.",
                placement,
            });
            return;
        }
        else if (loggedInUser === emailn1 || loggedInUser == emailn1) {
            notification.info({
                message: `Notification`,
                description: "Vous ne pouvez pas vous évaluer vous-même.",
                placement,
            });
            return;
        }
        else if (mat.length < 7) {
            notification.info({
                message: `Notification`,
                description: "Vérifiez votre matricule.",
                placement, 
            });
            return;
        } else {
            setCurrent(current + 1);
        }
        enregistrement1()
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


    // daty izy
    const handleDatesChange = (dates) => {
        if (dates) {
            const [start, end] = dates;
            setDatys(start ? start.format('YYYY-MM-DD') : '');
            setDatyss(end ? end.format('YYYY-MM-DD') : '');
            notification.success({
                message: `Dates sélectionnées`,
                description: `Date de début: ${start ? start.format('DD/MM/YYYY') : 'Non définie'}, Date de fin: ${end ? end.format('DD/MM/YYYY') : 'Non définie'}`,
                placement: 'top',
            });
        } else {
            setDatys('');
            setDatyss('');
        }
    };
    const startDate = datys ? moment(datys) : null;
    const endDate = datyss ? moment(datyss) : null;




    const etape2 = (placement) => {
        if (datys == '') {
            notification.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ date de  début.",
                placement,
            });
            return;
        } else if (datyss == '') {
            notification.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ date de  fin.",
                placement,
            });
            return;
        }
        else if (mission == '') {
            notification.info({
                message: `Notification`,
                description:
                    "Veuillez remplir le champ MISSIONS.",
                placement,
            });
            return;
        }
        else {
            enregistrement1()
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





    const handleInputChange = (index, valueOrEvent, fieldName) => {
        const newObjectifs = [...objectifs];

        // Vérifier si la valeur est un événement pour TextArea ou une sélection dans Select
        if (typeof valueOrEvent === 'object' && valueOrEvent.target) {
            newObjectifs[index][fieldName] = valueOrEvent.target.value;
        } else {
            // Sinon, c'est une valeur provenant d'un Select
            newObjectifs[index][fieldName] = valueOrEvent;
        }

        // Si on modifie le "poids", vérifier que la somme des poids ne dépasse pas 100
        if (fieldName === 'poids') {
            const sommePoids = newObjectifs.reduce((acc, obj) => acc + (parseFloat(obj.poids) || 0), 0);

            // Vérifier si la somme des poids dépasse 100
            if (sommePoids > 100) {
                notification.error({
                    message: 'Erreur',
                    description: 'La somme des poids ne peut pas dépasser 100.',
                    placement: 'top',
                });
                return; // Empêche la mise à jour si la somme dépasse 100
            }
        }

        // Met à jour les objectifs avec la nouvelle valeur si tout est correct
        setObjectifs(newObjectifs);
    };




    const etape3 = (placement) => {

        const isValid = objectifs.every(objectif => {

            if (objectif.libelle || objectif.poids || objectif.notation) {
                return objectif.libelle && objectif.poids && objectif.notation;
            }

            return true;
        });


        const allFieldsEmpty = objectifs.every(objectif => !objectif.libelle && !objectif.poids && !objectif.notation);


        const sommePoids = objectifs.reduce((acc, obj) => acc + (parseFloat(obj.poids) || 0), 0);

        if (!isValid) {
            notification.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides dans la ligne du tableau",
                placement,
            });
            return;
        } else if (allFieldsEmpty) {
            notification.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides",
                placement,
            });
            return;
        } else if (sommePoids !== 100) {  // Vérification que la somme des poids est exactement égale à 100
            notification.error({
                message: "Erreur",
                description: "La somme des poids doit être exactement égale à 100%.",
                placement,
            });
            return;
        } else {
            enregistrement1()
            next();  // Passe à l'étape suivante si tout est valide
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

                notification.info({
                    message: `Notification`,
                    description: `Veuillez cocher la ligne ${index + 1}`,
                    placement,
                });
                allChecked = false; // Définir la variable à false si une case n'est pas cochée
            }
        });

        if (allChecked) {
            enregistrement1()
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

        if (alp1 === "" || alp2 === "") {
            notification.info({
                message: "Notification",
                description: "Veuillez le champ 'Aptitude liée au poste' ",
                placement,

            });
            return;
        }

        let allChecked = true;


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
            notification.info({
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

            const numbers = [R1, value6, R3, R4, R5];
            const nouv = Math.min(...numbers);
            if (nouv >= 0 && nouv <= 1.9) {
                setNouvnivs("junior");
            } else if (nouv >= 2 && nouv <= 3) {
                setNouvnivs("confirmé");
            } else if (nouv >= 3.1 && nouv <= 4.5) {
                setNouvnivs("senior");
            } else if (nouv >= 4.6 && nouv <= 5) {
                setNouvnivs("expert");
            } else {
                setNouvnivs("invalide"); // Pour traiter les valeurs hors des plages définies
            }


            enregistrement1()
            next();
        }

    };


    useEffect(() => {
        const sum = (
            parseFloat(selectedVal1[0]) +
            parseFloat(selectedVal2[0]) +
            parseFloat(selectedVal3[0]) +
            parseFloat(selectedVal4[0]) +
            parseFloat(selectedVal5[0]) +
            parseFloat(selectedVal6[0]) +
            parseFloat(selectedVal7[0]) +
            parseFloat(selectedVal8[0]) +
            parseFloat(selectedVal9[0]) +
            parseFloat(selectedVal10[0]) +
            parseFloat(selectedVal11[0]) +
            parseFloat(selectedVal12[0]) +
            parseFloat(selectedVal13[0]) +
            parseFloat(selectedVal14[0]) +
            parseFloat(selectedVal15[0])
        ) / 15;
        setSommes(sum);
    }, [selectedVal1, selectedVal2, selectedVal3, selectedVal4, selectedVal5, selectedVal6, selectedVal7, selectedVal8, selectedVal9, selectedVal10, selectedVal11, selectedVal12, selectedVal13, selectedVal14, selectedVal15]);

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


    const etape7 = (placement) => {
        if (nivactus == null) {
            notification.info({
                message: "Notification",
                description: "Veuillez choisir votre niveau actuel.",
                placement: 'top',
                style: { textAlign: 'justify' }, // Ajout de style pour centrer le texte
            });
            return;
        } else if (nouvnivs == null) {
            notification.info({
                message: "Notification",
                description: "Veuillez choisir votre nouveau niveau .",
                placement: 'top',
                style: { textAlign: 'justify' },
            });
            return;
        }

        else if (concl == null) {

            notification.info({
                message: "Notification",
                description: "Veuillez choisir votre conclusion.",
                placement: 'top',
                style: { textAlign: 'justify' },
            });
            return;

        } else {
            enregistrement1()
            next()
        }
    }



    //etape8
    const [idr, setIdr] = useState(null)
    const etape8 = () => {
        enregistrement1()
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


    const etape9 = () => {
        enregistrement1()
        next()
    }


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

    const etape10 = () => {
        enregistrement1()
        next()
    }


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


    const etape11 = () => {
        // Tableau des champs à valider
        const fields = [
            { ccd: ccd1, motif: motif1, index: 1 },
            { ccd: ccd2, motif: motif2, index: 2 },
            { ccd: ccd3, motif: motif3, index: 3 },
            { ccd: ccd4, motif: motif4, index: 4 }
        ];

        // Vérification des paires ccd et motif
        for (const { ccd, motif, index } of fields) {
            if (ccd && !motif) {
                notification.info({
                    message: "Notification",
                    description: `Champ motif obligatoire ${index}`,
                    placement: 'top',
                    style: { textAlign: 'justify' },
                });
                return;
            }
        }

        // Vérification si tous les champs ccd sont vides
        const allCcdsEmpty = fields.every(({ ccd }) => !ccd);


        enregistrement1()
        next();
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

    const handleInputChange1 = (index, valueOrEvent, fieldName) => {
        const newObjectifs1 = [...objectifs1];

        // Vérifier si la valeur est un événement pour TextArea ou une sélection dans Select
        if (typeof valueOrEvent === 'object' && valueOrEvent.target) {
            newObjectifs1[index][fieldName] = valueOrEvent.target.value;
        } else {
            // Sinon, c'est une valeur provenant d'un Select
            newObjectifs1[index][fieldName] = valueOrEvent;
        }

        // Si on modifie le "poids", vérifier que la somme des poids ne dépasse pas 100
        if (fieldName === 'poids') {
            const sommePoids = newObjectifs1.reduce((acc, obj) => acc + (parseFloat(obj.poids) || 0), 0);

            // Vérifier si la somme des poids dépasse 100
            if (sommePoids > 100) {
                notification.error({
                    message: 'Erreur',
                    description: 'La somme des poids ne peut pas dépasser 100.',
                    placement: 'top',
                });
                return; // Empêche la mise à jour si la somme dépasse 100
            }
        }


        setObjectifs1(newObjectifs1);
    };

    const etape12 = () => {

        if (
            (ct1 || mt1 || ml1) && !cpr1 ||
            (ct2 || mt2 || ml2) && !cpr2 ||
            (ct3 || mt3 || ml3) && !cpr3
        ) {
            notification.info({
                message: 'Info',
                description: "Veuillez remplir le champ 'Contribution personnelle",
                placement: 'top',
            });
        } else {
            enregistrement1()
            next();
        }
    };








    const etape13 = (placement) => {

        const isValid = objectifs1.every(objectif => {

            if (objectif.libelle || objectif.poids || objectif.notation) {
                return objectif.libelle && objectif.poids && objectif.notation;
            }

            return true;
        });


        const allFieldsEmpty = objectifs1.every(objectif => !objectif.libelle && !objectif.poids && !objectif.notation);


        const sommePoids = objectifs1.reduce((acc, obj) => acc + (parseFloat(obj.poids) || 0), 0);

        if (!isValid) {
            notification.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides dans la ligne du tableau",
                placement,
            });
            return;
        } else if (allFieldsEmpty) {
            notification.info({
                message: "Notification",
                description:
                    "Veuillez remplir les champs vides",
                placement,
            });
            return;
        } else if (sommePoids !== 100) {  // Vérification que la somme des poids est exactement égale à 100
            notification.error({
                message: "Erreur",
                description: "La somme des poids doit être exactement égale à 100%.",
                placement,
            });
            return;
        } else {
            enregistrement1()
            next();
        }
    };


    const [dateo, setDateo] = useState("")

    const enregistrement = async () => {
        try {
            const enrg = await axios.post(`${url}ajouteval/${ids}`, {
                nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission,
                objectifs, resultat, selectedValue1, selectedValue2, selectedVal1, selectedVal2, selectedVal3, selectedVal4, selectedVal5, selectedVal6, selectedVal7, selectedVal8, selectedVal9, selectedVal10, selectedVal11, selectedVal12, selectedVal13, selectedVal14, selectedVal15,
                cmt1, cmt2, cmt3, cmt4, cmt5, r1, r2, r3, r4, r5, cdc1, cdc2, cdc3, cdc4, cdc5, nivactus, nouvnivs, concl, ancienneteniv, com, pg, classification, idr,
                f1, f2, f3, f4, f5, c1, c2, c3, c4, c5, am1, am2, am3, am4, am5, c21, c22, c23, c24, c25,
                t1, t2, t3, t4, compac1, compac2, compac3, compac4, apav1, apav2, apav3, apav4, apap1, apap2, apap3, apap4, comm1, comm2, comm3, comm4,
                ccd1, ccd2, ccd3, ccd4, catcomp1, catcomp2, catcomp3, catcomp4, motif1, motif2, motif3, motif4, pa1, pa2, pa3, pa4, dp1, dp2, dp3, dp4,
                ct1, ct2, ct3, mt1, mt2, mt3, ml1, ml2, ml3, cpr1, cpr2, cpr3, cg1, cg2, cg3, comcollab, objectifs1, resultat1, somme, todayis, alp1, alp2, emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh, ids, loggedInUser
            });

            if (enrg.data.success === false) {
                const placement = 'top';
                notification.error({
                    message: `Notification`,
                    description: enrg.data.message,
                    placement,
                });
                return;
            } else if (enrg.data.success === true) {
                const placement = 'top';
                notification.success({
                    message: `Notification`,
                    description: enrg.data.message,
                    placement,
                });

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
                        description: error.response.data.message || "Evaluation déjà vaidée par votre N+1",
                        placement,
                    });
                } else {
                    // Gérer les autres statuts d'erreur si nécessaire
                    notification.error({
                        message: `Notification`,
                        description: `Erreur: ${error.message}`,
                        placement: 'top',
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

    const enregistrement1 = async () => {
        try {
            const enrg = await axios.post(`${url}ajouteval/${ids}`, {
                nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission,
                objectifs, resultat, selectedValue1, selectedValue2, selectedVal1, selectedVal2, selectedVal3, selectedVal4, selectedVal5, selectedVal6, selectedVal7, selectedVal8, selectedVal9, selectedVal10, selectedVal11, selectedVal12, selectedVal13, selectedVal14, selectedVal15,
                cmt1, cmt2, cmt3, cmt4, cmt5, r1, r2, r3, r4, r5, cdc1, cdc2, cdc3, cdc4, cdc5, nivactus, nouvnivs, concl, ancienneteniv, com, pg, classification, idr,
                f1, f2, f3, f4, f5, c1, c2, c3, c4, c5, am1, am2, am3, am4, am5, c21, c22, c23, c24, c25,
                t1, t2, t3, t4, compac1, compac2, compac3, compac4, apav1, apav2, apav3, apav4, apap1, apap2, apap3, apap4, comm1, comm2, comm3, comm4,
                ccd1, ccd2, ccd3, ccd4, catcomp1, catcomp2, catcomp3, catcomp4, motif1, motif2, motif3, motif4, pa1, pa2, pa3, pa4, dp1, dp2, dp3, dp4,
                ct1, ct2, ct3, mt1, mt2, mt3, ml1, ml2, ml3, cpr1, cpr2, cpr3, cg1, cg2, cg3, comcollab, objectifs1, resultat1, somme, todayis, alp1, alp2, emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh, ids, loggedInUser
            });

            if (enrg.data.success === false) {
                const placement = 'top';
                notification.error({
                    message: `Notification`,
                    description: enrg.data.message,
                    placement,
                });
                return;
            } else if (enrg.data.success === true) {

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
                        description: error.response.data.message || "Evaluation déjà vaidée par votre N+1",
                        placement,
                    });
                } else {
                    // Gérer les autres statuts d'erreur si nécessaire
                    notification.error({
                        message: `Notification`,
                        description: `Erreur: ${error.message}`,
                        placement: 'top',
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


    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getEmails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${url}getEmails`);
            if (response.data.success) {
                console.log(response.data.emails);
                const emailList = response.data.emails.map(emailObj => emailObj.mail); // Extraire les adresses e-mail
                setEmails(emailList);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Erreur lors de la récupération des e-mails.');
        } finally {
            setLoading(false);
        }
    };


    const [status, setStatus] = useState([])
    const [statusres, setStatusres] = useState("")

    const getStatus = async () => {

        if (!ids) {
            console.error('ID is not defined');
            return;
        }

        try {

            const response = await axios.post(`${url}getStatus`, { ids });


            if (response.data && response.data.evaluations && response.data.evaluations.length > 0) {
                const evaluation = response.data.evaluations[0];
                console.log(evaluation.statusN1);
                setStatusres(evaluation.statusN1);
                setStatus(evaluation);
            } else {
                console.warn('No evaluations found in response data');
            }
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };



    const steps = [
        {
            title: 'Info perso',
            content: (
                <div>
                    <Title level={2}>Information personnelle - cadre</Title>



                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                        {status.statusN1 !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusN1 ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par N+1</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation N+1</span>
                                    </>
                                )}
                            </Space>
                        )}

                        {/* Validation N+2 */}
                        {status.statusN2 !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusN2 ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par N+2</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation N+2</span>
                                    </>
                                )}
                            </Space>
                        )}

                        {/* Validation Directeur */}
                        {status.statusDirection !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusDirection ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par Directeur de rattachement</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation Directeur de rattachement</span>
                                    </>
                                )}
                            </Space>
                        )}

                        {/* Validation Secrétaire */}
                        {status.statusSecretary !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusSecretary ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par Secrétaire générale</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation Secrétaire générale</span>
                                    </>
                                )}
                            </Space>
                        )}

                        {/* Validation Direction Générale */}
                        {status.statusGeneralDirection !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusGeneralDirection ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par Direction Générale</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation Direction Générale</span>
                                    </>
                                )}
                            </Space>
                        )}

                        {/* Validation RH */}
                        {status.statusHR !== undefined && (
                            <Space style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
                                {status.statusHR ? (
                                    <>
                                        <CheckCircleOutlined style={{ color: 'green' }} />
                                        <span style={{ marginLeft: 8 }}>Validé par RH</span>
                                    </>
                                ) : (
                                    <>
                                        <HourglassOutlined style={{ color: 'orange' }} />
                                        <span style={{ marginLeft: 8 }}>En attente de validation RH</span>
                                    </>
                                )}
                            </Space>
                        )}
                    </div>


                    <table style={{ margin: 'auto', textAlign: 'center', width: '95%' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px', width: '20%' }}>
                                    <Input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
                                </th>
                                <th style={{ padding: '10px', width: '20%' }}>
                                    <DatePicker value={daty ? moment(daty) : null} onChange={dateentre} placeholder="Date d'entrée" style={{ width: '100%' }} />
                                </th>
                                {/* <th style={{ padding: '10px', width: '20%' }}>
                                    <Input value={nomeval} onChange={(e) => setNomeval(e.target.value)} placeholder="Nom d'évaluateur" />
                                </th> */}
                                <td style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <AutoComplete
                                        style={{ width: '100%' }}
                                        options={options1}
                                        onSearch={handleSearch}
                                        onSelect={handleSelect}
                                        onChange={handleChange}
                                        value={emailn1}
                                    >
                                        <Input
                                            placeholder="Email N+1"
                                            allowClear
                                        />
                                    </AutoComplete>
                                </td>

                                <th style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <Input
                                        placeholder="E-mail Sécrétaire Général"
                                        value={emailsg}
                                        onChange={(e) => setEmailsg(e.target.value)}
                                        disabled
                                    />
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', width: '20%' }}>
                                    <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" />
                                </td>
                                <td style={{ padding: '10px', width: '20%' }}>
                                    <Input value={posteeval} onChange={(e) => setPoste(e.target.value)} placeholder="Poste" />
                                </td>
                                {/* <td style={{ padding: '10px', width: '20%' }}>
                                    <Input value={fonc} onChange={(e) => setFonc(e.target.value)} placeholder="Fonction d'évaluateur" />
                                </td> */}
                                <th style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="e-mail d'évaluateur N+2"
                                        value={emailn2}
                                        onChange={(e) => setEmailn2(e.target.value)}
                                        // options={emails.map(email => ({ value: email }))}
                                        loading={loading}
                                        allowClear
                                        disabled
                                    />
                                </th>
                                <th style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <Input
                                        placeholder="E-mail Direction générale"
                                        value={emaildg}
                                        onChange={(e) => setEmaildg(e.target.value)}
                                        disabled
                                    />
                                </th>
                            </tr>

                            <tr>
                                <td style={{ padding: '10px', width: '20%' }}>
                                    {/* <Input value={mat} onChange={(e) => setMat(e.target.value)} placeholder="Matricule" /> */}

                                    <Input.Group compact style={{ display: 'flex' }}>
                                        <Select
                                            value={prefix}
                                            onChange={handlePrefixChange}
                                            style={{ width: '30%' }} // Ajustez la largeur du Select
                                        >
                                            <Option value="NPA">NPA</Option>
                                            <Option value="GLM">GLM</Option>
                                            <Option value="SPD">SPD</Option>
                                            <Option value="STT">STT</Option>
                                            <Option value="STD">STD</Option>
                                        </Select>
                                        <Input
                                            value={digits}
                                            onChange={handleDigitsChange}
                                            placeholder="Matricule(4 chiffres)"
                                            maxLength={4}
                                            style={{ width: '70%' }} // Ajustez la largeur de l'Input
                                        />
                                    </Input.Group>




                                </td>
                                <td style={{ padding: '10px', width: '20%' }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Direction" // Placeholder visible lorsque value est null ou undefined
                                        value={dir === '' ? undefined : dir} // Utilisez undefined pour placeholder
                                        onChange={changedirection}
                                        options={[
                                            { value: 'Services généraux', label: 'Services généraux' },
                                            { value: 'HSSE', label: 'HSSE' },
                                            { value: 'Marketing et Communication', label: 'Marketing et Communication' },
                                            { value: "Système d'information", label: "Système d'information" },
                                            { value: 'Supply chain', label: 'Supply chain' },
                                            { value: 'Ressources humaines', label: 'Ressources humaines' },
                                            { value: 'Administratif et Financier', label: 'Administratif et Financier' },
                                            { value: 'Contrôle interne et audit', label: 'Contrôle interne et audit' },
                                            { value: 'Assistance de direction', label: 'Assistance de direction' },
                                        ]}
                                    />

                                </td>

                                {/* <td style={{ padding: '10px', width: '20%' }}>
                                    <DatePicker placeholder="Date de l'évaluation" defaultValue={todayis} style={{ width: '100%' }} />
                                </td> */}

                                <th style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Directeur de rattachement"
                                        onChange={(e) => setEmaildr(e.target.value)}
                                        value={emaildr}

                                        // dataSource={emails.filter(email => email.includes(searchValueDr))}
                                        // loading={loading}
                                        allowClear
                                        disabled
                                    // disabled={loggedInUser !== email || loggedInUser === emailn2}
                                    />
                                </th>

                                <th style={{ padding: '10px', width: '20%', textAlign: 'center', alignItems: 'center' }}>
                                    <Input
                                        onChange={(e) => setEmaildrh(e.target.value)}
                                        value={emaildrh}
                                        placeholder="E-mail Directrice des Ressources Humaines"

                                        disabled
                                    />
                                </th>
                            </tr>

                        </tbody>


                    </table>



                    {
                        statusres ? (
                            <Button type="primary" onClick={etapesuiv}>
                                Suivant
                            </Button>
                        ) : (
                            <Button type="primary" onClick={() => etape1('top')}>
                                Suivant
                            </Button>
                        )
                    }





                </div>
            ),
        },
        {
            title: 'Deuxième étape',
            content: (
                <div>
                    <Title level={2}>Bilan de l'année écoulée</Title>
                    <table style={{ margin: 'auto', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '10px' }}> Période d'évaluation:</th>
                                <RangePicker
                                    value={[startDate, endDate]}
                                    onChange={handleDatesChange}
                                    placeholder={['Date de début', 'Date de fin']}
                                    format="DD/MM/YYYY"
                                />

                            </tr>
                        </thead>
                    </table>
                    <TextArea placeholder={`MISSIONS: Rappeler les missions principales confiées au collaborateur en précisant, le cas échéant, les activités spécifiques.\nM1: Mission 1 ... .\nM2: Mission 2 ... .\nM3: Mission 3 ... .\netc`}
                        value={mission} onChange={(e) => setMission(e.target.value)} autoSize={{ width: '100%' }}
                    />
                    <br /> <br />

                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>




                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={() => etape2('top')}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>



                </div>
            ),
        },
        {
            title: 'Troisième étape',
            content: (
                <div>
                    <h2>OBJECTIFS INDIVIDUELS</h2>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Title level={5} style={{ margin: 0, marginRight: '5px', lineHeight: '1.5' }}>Infos</Title>
                        <InfoCircleOutlined onClick={toggleTableVisibility} style={{ cursor: 'pointer', fontSize: '20px' }} />
                    </div>

                    {isTableVisible && (
                        <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '50%', height: '20%' }}>
                            <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Notation</th>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>1: Non acquis</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>N'assimile pas et aucune démarche entreprise pour acquérir la compétence</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>2: En initiation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Début de compréhension; nécessite une amélioration significative</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>3: En cours d'adaptation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>En application quotidienne avec une marge de progression; nécessite du contrôle</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>4: Maîtrise</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Résultats conformes aux objectifs assignés, performance éprouvée sur la compétence évaluée</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>5: Exceptionnel</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Rendement qui à tous égards a nettement dépassé les exigences et les attentes du poste. Niveau de référence</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <br />
                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Libéllé-Objectif</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Poids en %</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Notation sur 5</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Total pondéré</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objectifs.map((objectif, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                        <TextArea
                                            name="libelle"
                                            value={objectif.libelle}
                                            onChange={(event) => handleInputChange(index, event, 'libelle')}  // Passes 'libelle'
                                            placeholder="Libellé-Objectif"
                                            autoSize
                                        />
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        <Select
                                            value={objectif.poids}
                                            onChange={(value) => handleInputChange(index, value, 'poids')}  // Passes 'poids'
                                            allowClear
                                            placeholder="-- Sélectionnez le poids --"
                                        >
                                            {[...Array(19)].map((_, i) => {
                                                const value = (i + 2) * 5; // 10, 15, 20, ... 100
                                                return <Option key={value} value={value}>{value}</Option>;
                                            })}
                                        </Select>
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        <Select
                                            value={objectif.notation}
                                            onChange={(value) => handleInputChange(index, value, 'notation')}  // Passes 'notation'
                                            allowClear
                                            placeholder="-- Aucune sélection --"
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={1.5}>1.5</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={2.5}>2.5</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={3.5}>3.5</Option>
                                            <Option value={4}>4</Option>
                                            <Option value={4.5}>4.5</Option>
                                            <Option value={5}>5</Option>
                                        </Select>
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        {((parseFloat(objectif.poids) * parseFloat(objectif.notation || 0)) / 5).toFixed(2) || 0}
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '40%' }}>
                                        <TextArea
                                            name="commentaire"
                                            value={objectif.commentaire}
                                            onChange={(event) => handleInputChange(index, event, 'commentaire')}  // Passes 'commentaire'
                                            placeholder="Commentaires"
                                            style={{ width: '100%' }}
                                            autoSize
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Résultat en %: {resultat.toFixed(2)}%</p>

                    <br /> <br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>


                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={() => etape3('top')}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },
        {
            title: 'Quatrième étape',
            content: (
                <div>
                    <Title level={2}>EVALUATION PROFESSIONNELLE</Title>
                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '80%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Notation</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>1: Non acquis</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>N'assimile pas et aucune démarche entreprise pour acquérir la compétence</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>2: En initiation</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Début de compréhension; nécessite une amélioration significative</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>3: En cours d'adaptation</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>En application quotidienne avec une marge de progression; nécessite du contrôle</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>4: Maîtrise</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Résultats conformes aux objectifs assignés, performance éprouvée sur la compétence évaluée</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>5: Exceptionnel</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Rendement qui à tous égards a nettement dépassé les exigences et les attentes du poste. Niveau de référence</td>
                            </tr>
                        </tbody>
                    </table>
                    <br /> <br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>

                        <Button type="primary" onClick={next}>
                            Suivant
                        </Button>
                    </div>
                </div>
            )
        },
        {
            title: 'Cinquième étape',
            content: (
                <div>
                    <Title level={2}>APTITUDES PROFESSIONNELLES</Title>
                    <Title level={5}>* Veuillez cocher la case correspondant à votre appréciation. Une seule réponse valable</Title>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Title level={5} style={{ margin: 0, marginRight: '5px', lineHeight: '1.5' }}>Infos</Title>
                        <InfoCircleOutlined onClick={toggleTableVisibility} style={{ cursor: 'pointer', fontSize: '20px' }} />
                    </div>





                    {isTableVisible && (
                        <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '50%', height: '20%' }}>
                            <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Notation</th>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>1: Non acquis</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>N'assimile pas et aucune démarche entreprise pour acquérir la compétence</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>2: En initiation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Début de compréhension; nécessite une amélioration significative</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>3: En cours d'adaptation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>En application quotidienne avec une marge de progression; nécessite du contrôle</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>4: Maîtrise</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Résultats conformes aux objectifs assignés, performance éprouvée sur la compétence évaluée</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>5: Exceptionnel</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Rendement qui à tous égards a nettement dépassé les exigences et les attentes du poste. Niveau de référence</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <br />

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '80%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Critères</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>1</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>2</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>3</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>4</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>5</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Quantité du travail</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Exécution des tâches décrites dans sa fiche de poste et exigées par son N+1 Respect des délais.</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue1} onChange={onChange1}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue1} onChange={onChange1}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue1} onChange={onChange1}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue1} onChange={onChange1}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue1} onChange={onChange1}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Quantité du travail</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Aptitude à effectuer les contrôles nécessaires afin de réduire les erreurs, les oublis, les défauts. Rigueur dans la tenue du poste Anticipation des problèmes et les obstacles</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue2} onChange={onChange2}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue2} onChange={onChange2}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue2} onChange={onChange2}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue2} onChange={onChange2}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedValue2} onChange={onChange2}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                        </tbody>
                    </table>
                    Resultats: {somme.toFixed(2)}
                    <br /> <br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={() => etape5('top')}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },
        {
            title: 'Sixième étape',
            content: (
                <div>
                    <Title level={2}>COMPORTEMENT</Title>

                    <Title level={5}>* Veuillez cocher la case correspondant à votre appréciation. Une seule réponse valable</Title>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Title level={5} style={{ margin: 0, marginRight: '5px', lineHeight: '1.5' }}>Infos</Title>
                        <InfoCircleOutlined onClick={toggleTableVisibility} style={{ cursor: 'pointer', fontSize: '20px' }} />
                    </div>


                    {isTableVisible && (
                        <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '50%', height: '20%' }}>
                            <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Notation</th>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>1: Non acquis</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>N'assimile pas et aucune démarche entreprise pour acquérir la compétence</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>2: En initiation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Début de compréhension; nécessite une amélioration significative</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>3: En cours d'adaptation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>En application quotidienne avec une marge de progression; nécessite du contrôle</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>4: Maîtrise</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Résultats conformes aux objectifs assignés, performance éprouvée sur la compétence évaluée</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>5: Exceptionnel</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Rendement qui à tous égards a nettement dépassé les exigences et les attentes du poste. Niveau de référence</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <br />

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '80%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Critères</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>

                                <th style={{ padding: '10px', border: '1px solid white' }}>1</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>2</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>3</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>4</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>5</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Organisation</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Aptitude à agencer les moyens pour un fonctionnement efficace</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal1} onChange={onChang1}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal1} onChange={onChang1}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal1} onChange={onChang1}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal1} onChange={onChang1}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal1} onChange={onChang1}><Checkbox value="5"></Checkbox></Checkbox.Group></td>

                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Planification des tâches de son équipe</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à donner l'impulsion sur l'importance de chaque dossier</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal2} onChange={onChang2}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal2} onChange={onChang2}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal2} onChange={onChang2}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal2} onChange={onChang2}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal2} onChange={onChang2}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Méthode</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Aptitude à procéder de manière structurée dans la réalisation des tâches</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal3} onChange={onChang3}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal3} onChange={onChang3}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal3} onChange={onChang3}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal3} onChange={onChang3}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal3} onChange={onChang3}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Gestion de projet</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à mener à bien ses projets (respect deadline, respect des coûts, respect de la qualité )</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal4} onChange={onChang4}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal4} onChange={onChang4}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal4} onChange={onChang4}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal4} onChange={onChang4}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal4} onChange={onChang4}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Management opérationnel</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Animation de l'équipe,capacité à sanctionner et reconnaître les efforts de son équipe, capacité à motiver, capacité à évaluer </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal5} onChange={onChang5}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal5} onChange={onChang5}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal5} onChange={onChang5}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal5} onChange={onChang5}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal5} onChange={onChang5}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Indicateurs de contrôle</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité de mettre en place des KPI pour le suivi de ses activités</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal6} onChange={onChang6}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal6} onChange={onChang6}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal6} onChange={onChang6}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal6} onChange={onChang6}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal6} onChange={onChang6}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Contrôle des activités de son équipe</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité de suivi et de contôle des activités de son équipe</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal7} onChange={onChang7}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal7} onChange={onChang7}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal7} onChange={onChang7}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal7} onChange={onChang7}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal7} onChange={onChang7}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Ecoute et communication</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à l'écoute active</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal8} onChange={onChang8}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal8} onChange={onChang8}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal8} onChange={onChang8}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal8} onChange={onChang8}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal8} onChange={onChang8}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Innovation et créativité</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Force de proposition, capacité de proposer de nouvelles choses</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal9} onChange={onChang9}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal9} onChange={onChang9}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal9} onChange={onChang9}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal9} onChange={onChang9}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal9} onChange={onChang9}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Partage de connaissance</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à coacher et/ou à former et/ou à accompagner</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal10} onChange={onChang10}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal10} onChange={onChang10}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal10} onChange={onChang10}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal10} onChange={onChang10}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal10} onChange={onChang10}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Plan d'action</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à mettre en œuvre des plans d'action pour améliorer son unité</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal11} onChange={onChang11}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal11} onChange={onChang11}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal11} onChange={onChang11}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal11} onChange={onChang11}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal11} onChange={onChang11}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Exemplarité</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à montrer l'exemple, capacité à mener son équipe à adhérer à une chose, respect des règles</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal12} onChange={onChang12}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal12} onChange={onChang12}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal12} onChange={onChang12}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal12} onChange={onChang12}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal12} onChange={onChang12}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr><tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Gestion du changement</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Capacité à gérer et à accompagner son équipe dans le changement</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal13} onChange={onChang13}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal13} onChange={onChang13}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal13} onChange={onChang13}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal13} onChange={onChang13}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal13} onChange={onChang13}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Aptitude liée au poste</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}> <Tooltip title="Les aptitudes liées au poste sont les compétences spécifiques nécessaires à l'accomplissement des tâches au quotidien.">
                                    <TextArea
                                        placeholder="Aptitude liée au poste"
                                        autoSize
                                        value={alp1}
                                        onChange={(e) => setAlp1(e.target.value)}
                                    />
                                </Tooltip>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal14} onChange={onChang14}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal14} onChange={onChang14}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal14} onChange={onChang14}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal14} onChange={onChang14}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal14} onChange={onChang14}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>

                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Aptitude liée au poste</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Tooltip title="Les aptitudes liées au poste sont les compétences spécifiques nécessaires à l'accomplissement des tâches au quotidien.">
                                    <TextArea
                                        placeholder="Aptitude liée au poste"
                                        autoSize
                                        value={alp2}
                                        onChange={(e) => setAlp2(e.target.value)}
                                    />
                                </Tooltip>
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal15} onChange={onChang15}><Checkbox value="1"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal15} onChange={onChang15}><Checkbox value="2"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal15} onChange={onChang15}><Checkbox value="3"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal15} onChange={onChang15}><Checkbox value="4"></Checkbox></Checkbox.Group></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><Checkbox.Group value={selectedVal15} onChange={onChang15}><Checkbox value="5"></Checkbox></Checkbox.Group></td>
                            </tr>

                        </tbody>
                    </table>
                    <br />
                    Resultat:{sommes.toFixed(2)}
                    <br /> <br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={() => etape6('top')}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },
        {
            title: '7 étape',
            content: (
                <div>
                    <Title level={2}>SYNTHESE DES EVALUATIONS</Title>
                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}> Critères évalués</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}> Critères évalués</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Résultat</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Critère de classement</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>Maîtrise  techniques du poste</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>Performance (objectifs),Quantité du travail fourni, Qualité du travail fourni, Gestion de projet, Aptitude liée au poste, Management opérationnel</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '3%' }}> {r1.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>{cdc1}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={cmt1} onChange={(e) => setCmt1(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>Degré d'autonomie</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>Innovation et créativité</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '3%' }}> {r2.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>{cdc2}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={cmt2} onChange={(e) => setCmt2(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>Capacité de coordination</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>Organisation, Méthode,  Indicateurs de contrôle, Planification des tâches de son équipe, Contrôle des activités de son équipe</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '3%' }}>{r3.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>{cdc3}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={cmt3} onChange={(e) => setCmt3(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>Capacité d'anticipation et résolution des problèmes</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>Ecoute et communication, Plan d'action, Gestion du changement</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '3%' }}>{r4.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>{cdc4}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={cmt4} onChange={(e) => setCmt4(e.target.value)} autoSize /></td>
                            </tr>



                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>Capacité de transmission de connaissance</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>Partage de connaissance, Exemplarité</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '3%' }}>{r5.toFixed(2)}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>{cdc5}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={cmt5} onChange={(e) => setCmt5(e.target.value)} autoSize /></td>
                            </tr>


                        </tbody>
                        <br />
                    </table>




                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Niveau actuel</th>
                                <th style={{ padding: '10px', border: '1px solid white', width: '10%' }}> Ancienneté au niveau</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Conclusion</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Nouveau niveau</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}>
                                    <Select
                                        style={{ width: '70%' }}
                                        placeholder="Niveau actuel"
                                        value={nivactus}
                                        onChange={nivactu}
                                        options={[
                                            { value: 'junior', label: 'junior' },
                                            { value: 'confirmé', label: 'confirmé' },
                                            { value: 'senior', label: 'senior' },
                                            { value: "expert", label: "expert" },
                                        ]}
                                    />

                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}><Input placeholder='Ancienneté au niveau' value={ancienneteniv} onChange={(e) => setAncienneteniv(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '20%' }}> <Select

                                    style={{
                                        width: '100%',
                                    }}

                                    value={concl}
                                    onChange={changeconcl}
                                    options={[
                                        {
                                            value: 'Admis à un niveau supérieur',
                                            label: 'Admis à un niveau supérieur',
                                        },
                                        {
                                            value: 'Reste au même niveau',
                                            label: 'Reste au même niveau',
                                        },

                                    ]}
                                /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select

                                        style={{
                                            width: 120,
                                        }}
                                        value={nouvnivs}
                                        onChange={nouvniv}
                                        options={[
                                            {
                                                value: 'junior',
                                                label: 'junior',
                                            },
                                            {
                                                value: 'confirmé',
                                                label: 'confirmé',
                                            },
                                            {
                                                value: 'senior',
                                                label: 'senior',
                                            },
                                            {
                                                value: 'expert',
                                                label: 'expert',
                                            },
                                        ]}
                                        disabled
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}><TextArea placeholder="Commentaires" value={com} onChange={(e) => setCom(e.target.value)} autoSize /></td>
                            </tr>
                        </tbody>
                    </table>
                    <br /> <br />

                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape7}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>

                </div>
            )
        },
        {
            content: (
                <div>
                    <Title level={2}>PERFORMANCE GLOBALE</Title>
                    <Title level={5}>A:LOW PERFORMER</Title>
                    <Title level={5}>B:AVERAGE PERFORMER</Title>
                    <Title level={5}>C:HIGH PERFORMER</Title>
                    <Title level={5}>D:BEST PERFORMER</Title>



                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '80%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Performance globale</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Classification</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>{pg}</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>{classification}</td>
                            </tr>

                        </tbody>
                    </table>
                    <Title level={2}>INTERPRETATION DES RESULTATS </Title>
                    <TextArea placeholder="INTERPRETATION DES RESULTATS" value={idr} onChange={(e) => setIdr(e.target.value)}
                        autoSize={{ width: '100%' }}
                    />
                    <div style={{ marginBottom: '10px' }}>
                        <br /> <br />
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>

                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape8} >
                                    Suivant
                                </Button>
                            )
                        }

                    </div>

                </div>
            )
        },
        {
            title: 'Sixième étape',
            content: (
                <div>
                    <Title level={2}>DEVELOPPEMENT DES COMPETENCES</Title>
                    <Title level={5}>EVALUATION FORCES ET FAIBLESSES</Title>

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Forces</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>AXES D'AMELIORATION</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>COMMENTAIRES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={f1} onChange={(e) => setF1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c1} onChange={(e) => setC1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea autoSize value={am1} onChange={(e) => setAm1(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c21} onChange={(e) => setC21(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={f2} onChange={(e) => setF2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c2} onChange={(e) => setC2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea autoSize value={am2} onChange={(e) => setAm2(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c22} onChange={(e) => setC22(e.target.value)} autoSize /></td>
                            </tr>

                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={f3} onChange={(e) => setF3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c3} onChange={(e) => setC3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea autoSize value={am3} onChange={(e) => setAm3(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c23} onChange={(e) => setC23(e.target.value)} autoSize /></td>
                            </tr>

                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={f4} onChange={(e) => setF4(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c4} onChange={(e) => setC4(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea autoSize value={am4} onChange={(e) => setAm4(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c24} onChange={(e) => setC24(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={f5} onChange={(e) => setF5(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c5} onChange={(e) => setC5(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea autoSize value={am5} onChange={(e) => setAm5(e.target.value)} /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={c25} onChange={(e) => setC25(e.target.value)} autoSize /></td>
                            </tr>

                        </tbody>
                    </table>
                    <br /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape9} >
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },


        {
            title: 'Sixième étape',
            content: (
                <div>
                    <Title level={2}>FORMATIONS SUIVIES AU COURS DE L'ANNEE</Title>

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Thème</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Compétences acquises</th>
                                <th style={{ padding: '10px', border: '1px solid white' }} colSpan="2">Appréciation de la hiérarchie</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires sur les écarts</th>
                            </tr>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}></th>
                                <th style={{ padding: '10px', border: '1px solid white' }}></th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Avant la formation</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Après la formation</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={t1} onChange={(e) => setT1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={compac1} onChange={(e) => setCompac1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apav1} onChange={(value) => setApav1(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>

                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apap1} onChange={(value) => setApap1(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={comm1} onChange={(e) => setComm1(e.target.value)} autoSize /></td>
                            </tr>




                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={t2} onChange={(e) => setT2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={compac2} onChange={(e) => setCompac2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apav2} onChange={(value) => setApav2(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>

                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apap2} onChange={(value) => setApap2(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={comm2} onChange={(e) => setComm2(e.target.value)} autoSize /></td>
                            </tr>





                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={t3} onChange={(e) => setT3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={compac3} onChange={(e) => setCompac3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apav3} onChange={(value) => setApav3(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>

                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apap3} onChange={(value) => setApap3(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={comm3} onChange={(e) => setComm3(e.target.value)} autoSize /></td>
                            </tr>





                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={t4} onChange={(e) => setT4(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea value={compac4} onChange={(e) => setCompac4(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apav4} onChange={(value) => setApav4(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>

                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ minWidth: 250, width: 'auto', }}
                                        value={apap4} onChange={(value) => setApap4(value)}
                                        options={[
                                            {
                                                value: 'NA',
                                                label: 'NA (Non acquis) ',
                                            },
                                            {
                                                value: 'EI',
                                                label: 'EI (En Initiation)',
                                            },
                                            {
                                                value: 'EA',
                                                label: "EA (En cours d'acquisition)",
                                            },
                                            {
                                                value: 'MA',
                                                label: 'MA (Maîtrise)',
                                            },
                                            {
                                                value: 'EX',
                                                label: 'EX (Expert)',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}><TextArea placeholder="Commentaires" value={comm4} onChange={(e) => setComm4(e.target.value)} autoSize /></td>
                            </tr>

                        </tbody>
                    </table>
                    <br /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape10} >
                                    Suivant
                                </Button>
                            )
                        }

                    </div>
                </div>
            )
        },




        {
            content: (
                <div>
                    <Title level={2}>BESOINS EN DEVELOPPEMENT DE COMPETENCES</Title>

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Compétences cibles à développer</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Catégorie de compétence</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>MOTIF (colonne obligatoire)</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Plan d'actions(Si autres à préciser)</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Date prévisionnelle</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                    <TextArea value={ccd1} onChange={(e) => setCcd1(e.target.value)} autoSize />
                                </td>


                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select style={{ width: '100%', }}
                                        value={catcomp1} onChange={(value) => setCatcomp1(value)}
                                        options={[
                                            {
                                                value: 'Soft skills/savoir-être',
                                                label: 'Soft skills/savoir-être',
                                            },
                                            {
                                                value: 'Savoir-faire(technique)',
                                                label: 'Savoir-faire(technique)',
                                            },
                                            {
                                                value: 'Savoir/connaissance',
                                                label: 'Savoir/connaissance',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>  <TextArea value={motif1} onChange={(e) => setMotif1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={pa1}
                                        onChange={(value) => setPa1(value)}
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                                                    {isAdding ? (
                                                        <>
                                                            <Input
                                                                value={newOption}
                                                                onChange={e => setNewOption(e.target.value)}
                                                                style={{ flex: 'auto', marginRight: 8 }}
                                                            />
                                                            <Button type="primary" onClick={handleAddOption}>
                                                                Ajouter
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button type="dashed" onClick={() => setIsAdding(true)}>
                                                            + Ajouter une option
                                                        </Button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        options={options}
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '25%' }}>

                                    <DatePicker
                                        value={dp1 ? moment(dp1) : null}
                                        onChange={date1}
                                        picker="month"  // Mode pour sélectionner uniquement mois et année
                                        format="YYYY-MM" // Format d'affichage: Année-Mois
                                        placeholder="Sélectionnez un mois et une année" // Placeholder personnalisé
                                    />

                                </td>

                            </tr>





                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                    <TextArea value={ccd2} onChange={(e) => setCcd2(e.target.value)} autoSize />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select style={{ width: '100%', }}
                                        value={catcomp2} onChange={(value) => setCatcomp2(value)}
                                        options={[
                                            {
                                                value: 'Soft skills/savoir-être',
                                                label: 'Soft skills/savoir-être',
                                            },
                                            {
                                                value: 'Savoir-faire(technique)',
                                                label: 'Savoir-faire(technique)',
                                            },
                                            {
                                                value: 'Savoir/connaissance',
                                                label: 'Savoir/connaissance',
                                            },
                                        ]} />
                                </td>

                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>  <TextArea value={motif2} onChange={(e) => setMotif2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={pa2}
                                        onChange={(value) => setPa2(value)}
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                                                    {isAdding ? (
                                                        <>
                                                            <Input
                                                                value={newOption}
                                                                onChange={e => setNewOption(e.target.value)}
                                                                style={{ flex: 'auto', marginRight: 8 }}
                                                            />
                                                            <Button type="primary" onClick={handleAddOption}>
                                                                Ajouter
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button type="dashed" onClick={() => setIsAdding(true)}>
                                                            + Ajouter une option
                                                        </Button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        options={options}
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>

                                    <DatePicker
                                        value={dp2 ? moment(dp2) : null}
                                        onChange={date2}
                                        picker="month"  // Mode pour sélectionner uniquement mois et année
                                        format="YYYY-MM" // Format d'affichage: Année-Mois
                                        placeholder="Sélectionnez un mois et une année" // Placeholder personnalisé
                                    />

                                </td>

                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                    <TextArea value={ccd3} onChange={(e) => setCcd3(e.target.value)} autoSize />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ width: '100%', }}
                                        value={catcomp3} onChange={(value) => setCatcomp3(value)}
                                        options={[
                                            {
                                                value: 'Soft skills/savoir-être',
                                                label: 'Soft skills/savoir-être',
                                            },
                                            {
                                                value: 'Savoir-faire(technique)',
                                                label: 'Savoir-faire(technique)',
                                            },
                                            {
                                                value: 'Savoir/connaissance',
                                                label: 'Savoir/connaissance',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>  <TextArea value={motif3} onChange={(e) => setMotif3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={pa3}
                                        onChange={(value) => setPa3(value)}
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                                                    {isAdding ? (
                                                        <>
                                                            <Input
                                                                value={newOption}
                                                                onChange={e => setNewOption(e.target.value)}
                                                                style={{ flex: 'auto', marginRight: 8 }}
                                                            />
                                                            <Button type="primary" onClick={handleAddOption}>
                                                                Ajouter
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button type="dashed" onClick={() => setIsAdding(true)}>
                                                            + Ajouter une option
                                                        </Button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        options={options}
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>

                                    <DatePicker
                                        value={dp3 ? moment(dp3) : null}
                                        onChange={date3}
                                        picker="month"  // Mode pour sélectionner uniquement mois et année
                                        format="YYYY-MM" // Format d'affichage: Année-Mois
                                        placeholder="Sélectionnez un mois et une année" // Placeholder personnalisé
                                    />

                                </td>

                            </tr>




                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                    <TextArea value={ccd4} onChange={(e) => setCcd4(e.target.value)} autoSize />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>
                                    <Select style={{ width: '100%', }}
                                        value={catcomp4} onChange={(value) => setCatcomp4(value)}
                                        options={[
                                            {
                                                value: 'Soft skills/savoir-être',
                                                label: 'Soft skills/savoir-être',
                                            },
                                            {
                                                value: 'Savoir-faire(technique)',
                                                label: 'Savoir-faire(technique)',
                                            },
                                            {
                                                value: 'Savoir/connaissance',
                                                label: 'Savoir/connaissance',
                                            },
                                        ]} />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>  <TextArea value={motif4} onChange={(e) => setMotif4(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '15%' }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={pa4}
                                        onChange={(value) => setPa4(value)}
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                                                    {isAdding ? (
                                                        <>
                                                            <Input
                                                                value={newOption}
                                                                onChange={e => setNewOption(e.target.value)}
                                                                style={{ flex: 'auto', marginRight: 8 }}
                                                            />
                                                            <Button type="primary" onClick={handleAddOption}>
                                                                Ajouter
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button type="dashed" onClick={() => setIsAdding(true)}>
                                                            + Ajouter une option
                                                        </Button>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        options={options}
                                    />
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>

                                    <DatePicker
                                        value={dp4 ? moment(dp4) : null}
                                        onChange={date4}
                                        picker="month"  // Mode pour sélectionner uniquement mois et année
                                        format="YYYY-MM" // Format d'affichage: Année-Mois
                                        placeholder="Sélectionnez un mois et une année" // Placeholder personnalisé
                                    />

                                </td>

                            </tr>



                        </tbody>
                    </table>
                    <br /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape11} >
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },

        {
            content: (
                <div>
                    <Title level={2}>PROJET PROFESSIONNEL</Title>

                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th></th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Court terme</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Moyen terme</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Long terme</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Contribution personnelle dans la réalisation du projet</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Contribution du groupe/société (votre attente)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '8%' }}>Evolution de carrière</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ct1} onChange={(e) => setCt1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={mt1} onChange={(e) => setMt1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ml1} onChange={(e) => setMl1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cpr1} onChange={(e) => setCpr1(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cg1} onChange={(e) => setCg1(e.target.value)} autoSize /></td>
                            </tr>

                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '8%' }}>Mobilité géographique</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ct2} onChange={(e) => setCt2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={mt2} onChange={(e) => setMt2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ml2} onChange={(e) => setMl2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cpr2} onChange={(e) => setCpr2(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cg2} onChange={(e) => setCg2(e.target.value)} autoSize /></td>
                            </tr>


                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '8%' }}>Autres (à préciser)</td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ct3} onChange={(e) => setCt3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={mt3} onChange={(e) => setMt3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={ml3} onChange={(e) => setMl3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cpr3} onChange={(e) => setCpr3(e.target.value)} autoSize /></td>
                                <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '18%' }}><TextArea value={cg3} onChange={(e) => setCg3(e.target.value)} autoSize /></td>
                            </tr>

                        </tbody>
                    </table>
                    <Title level={2}>Commentaire du collaborateur</Title>
                    <TextArea placeholder="Commentaire du collaborateur" autoSize={{ width: '100%' }} value={comcollab} onChange={(e) => setComcollab(e.target.value)} /> <br /><br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>



                        {
                            statusres ? (
                                <Button type="primary" onClick={next}>
                                    Suivant
                                </Button>
                            ) : (
                                <Button type="primary" onClick={etape12} >
                                    Suivant
                                </Button>
                            )
                        }

                    </div>
                </div>
            )
        },
        {
            title: 'Troisième étape',
            content: (
                <div>
                    <h2>OBJECTIFS DE LA PROCHAINE PERIODE</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Title level={5} style={{ margin: 0, marginRight: '5px', lineHeight: '1.5' }}>Infos</Title>
                        <InfoCircleOutlined onClick={toggleTableVisibility} style={{ cursor: 'pointer', fontSize: '20px' }} />
                    </div>
                    {isTableVisible && (
                        <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '50%', height: '20%' }}>
                            <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Notation</th>
                                    <th style={{ padding: '10px', border: '1px solid white' }}>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>1: Non acquis</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>N'assimile pas et aucune démarche entreprise pour acquérir la compétence</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>2: En initiation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Début de compréhension; nécessite une amélioration significative</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>3: En cours d'adaptation</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>En application quotidienne avec une marge de progression; nécessite du contrôle</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>4: Maîtrise</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Résultats conformes aux objectifs assignés, performance éprouvée sur la compétence évaluée</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>5: Exceptionnel</td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF' }}>Rendement qui à tous égards a nettement dépassé les exigences et les attentes du poste. Niveau de référence</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <table style={{ margin: 'auto', textAlign: 'center', borderCollapse: 'collapse', width: '100%' }}>
                        <thead style={{ backgroundColor: '#40A9FF', color: 'white' }}>
                            <tr>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Libéllé-Objectif</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Poids en %</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Notation sur 5 évalué</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Total pondéré</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>




                            {objectifs1.map((objectif, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '30%' }}>
                                        <TextArea
                                            name="libelle"
                                            value={objectif.libelle}
                                            onChange={(event) => handleInputChange1(index, event, 'libelle')}  // Passes 'libelle'
                                            placeholder="Libellé-Objectif"
                                            autoSize
                                        />
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        <Select
                                            value={objectif.poids}
                                            onChange={(value) => handleInputChange1(index, value, 'poids')}  // Passes 'poids'
                                            allowClear
                                            placeholder="-- Sélectionnez le poids --"
                                        >
                                            {[...Array(19)].map((_, i) => {
                                                const value = (i + 2) * 5; // 10, 15, 20, ... 100
                                                return <Option key={value} value={value}>{value}</Option>;
                                            })}
                                        </Select>
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        <Select
                                            value={objectif.notation}
                                            onChange={(value) => handleInputChange1(index, value, 'notation')}  // Passes 'notation'
                                            allowClear
                                            placeholder="-- Aucune sélection --"
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={1.5}>1.5</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={2.5}>2.5</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={3.5}>3.5</Option>
                                            <Option value={4}>4</Option>
                                            <Option value={4.5}>4.5</Option>
                                            <Option value={5}>5</Option>
                                        </Select>
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '10%' }}>
                                        {((parseFloat(objectif.poids) * parseFloat(objectif.notation || 0)) / 5).toFixed(2) || 0}
                                    </td>
                                    <td style={{ padding: '10px', border: '1px solid #40A9FF', width: '40%' }}>
                                        <TextArea
                                            name="commentaire"
                                            value={objectif.commentaire}
                                            onChange={(event) => handleInputChange1(index, event, 'commentaire')}  // Passes 'commentaire'
                                            placeholder="Commentaires"
                                            style={{ width: '100%' }}
                                            autoSize
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Résultat en %: {resultat1.toFixed(2)}%</p>
                    <br /> <br />
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>


                        {
                            statusres ? (
                                null
                            ) : (
                                <Button type="primary" onClick={() => etape13('top')}>
                                    Suivant
                                </Button>
                            )
                        }
                    </div>
                </div>
            )
        },


        {
            title: 'Troisième étape',
            content: (
                <div>
                    <Title level={2}>Validation</Title>

                    <br /><br />
                    <div style={{ marginBottom: '10px' }}>



                        <Popconfirm
                            title="Êtes-vous sûr de vouloir enregistrer cette évaluation ?"
                            description="Are you sure to delete this task?"
                            onConfirm={() => enregistrement()}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>
                                Enregistrer tous
                            </Button>

                        </Popconfirm>




                        <br />
                        <br /><br />

                        <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                            Précédent
                        </Button>


                    </div>

                </div>
            )
        },

        {
            title: 'Troisième étape',
            content: (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Title level={2}>Vous pouvez sauvegarder votre auto évaluation en pdf</Title>
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
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Nom de l'évaluateur: {emailn1}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Prénom(s): {prenom}</Text>
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Poste: {posteeval}</Text>
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}></Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 1 }}>
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Matricule: {mat}</Text>
                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>Direction: {dir}</Text>

                                        <Text style={{ flex: 1, color: '#333', fontWeight: 'bold', fontSize: 8 }}>
                                            Date d'évaluation: {new Date(dateday).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                        </Text>
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
                                        { critere: "Degré d'autonomie", description: 'Innovation et créativité', resultat: r2.toFixed(2), classement: cdc2, commentaire: cmt2 },
                                        { critere: 'Capacité de coordination', description: 'Organisation, Méthode, Indicateurs de contrôle, Planification des tâches de son équipe, Contrôle des activités de son équipe', resultat: r3.toFixed(2), classement: cdc3, commentaire: cmt3 },
                                        { critere: "Capacité d'anticipation et résolution des problèmes", description: 'Ecoute et communication, Plan d\'action, Gestion du changement', resultat: r4.toFixed(2), classement: cdc4, commentaire: cmt4 }].map((item, index) => (
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
                    <div style={{ marginBottom: '10px' }}>
                        <Popconfirm
                            title="Êtes-vous sûr de vouloir valider cette évaluation ?"
                            onConfirm={() => next()}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div style={{ marginBottom: '10px' }}>
                                <Button type="primary" onClick={prev} style={{ marginRight: '10px' }}>
                                    Précédent
                                </Button>

                            </div>
                        </Popconfirm>
                    </div>
                </div>
            )
        }






    ];



    const contentStyle = {
        textAlign: 'center',
        color: 'black', // Couleur du texte
        backgroundColor: 'white', // Couleur de fond
        // borderRadius: '10px', // Bordure arrondie
        marginTop: 16,
        padding: '20px', // Ajout de padding
        boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)' // Ombre
    };



    return (

        <div style={{ position: 'relative', width: '100%', height: '100%', }}>
            {/* {contextHolder} */}
            <video
                src={photo}                      // Source de la vidéo à partir de l'URL
                autoPlay                         // Lecture automatique de la vidéo
                loop                             // Lecture en boucle de la vidéo
                muted                            // Désactivation du son par défaut de la vidéo (optionnel)
                style={{
                    width: '100%',                 // Largeur de la vidéo à 100%
                    height: '100%',                // Hauteur de la vidéo à 100%
                    objectFit: 'cover',            // Redimensionne la vidéo pour qu'elle couvre toute la zone
                    position: 'absolute',          // Position absolue pour remplir le conteneur
                    top: 0,                        // Alignement en haut
                    left: 0,                       // Alignement à gauche

                }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '100px', zIndex: +1 }}>
                {contextHolder}
                <div style={{ width: '90%', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(1, 1, 1, 0.1)', padding: '20px', zIndex: +1 }}>
                    <img src={logonpa} width={180} height={100} alt="logo npa" />
                    <Steps current={current}>
                        <Step key='1' title="" />
                        <Step key='2' title="" />
                        <Step key='3' title="" />
                        <Step key='4' title="" />
                        <Step key='5' title="" />
                        <Step key='6' title="" />
                        <Step key='7' title="" />
                        <Step key='8' title="" />
                        <Step key='9' title="" />
                        <Step key='10' title="" />
                        <Step key='12' title="" />
                        <Step key='13' title="" />
                        <Step key='14' title="" />
                        <Step key='15' title="" />
                        <Step key='16' title="" />
                    </Steps>
                    <div>{steps[current].content}</div>

                </div>

            </div>
            <br /><br /><br /><br /><br />
        </div>

    );
};

export default Evaluation; // Assurez-vous que cette ligne est présente pour exporter le composant Evaluation
