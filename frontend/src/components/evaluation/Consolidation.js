

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button, Input, Space, Table, AutoComplete, DatePicker, Typography, message, Tooltip, Popover, Avatar, Popconfirm, Modal, Checkbox, Row, Col, Select } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
const { Option } = AutoComplete;
const { Title } = Typography;
const { RangePicker } = DatePicker;
import ChoosehistoRH from './histoeval/Choosehistorh';
import { useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';




const Consolidation = () => {
    const url = 'http://172.16.0.92:8000/';
    const loggedInUser = sessionStorage.getItem('loginUser');

    const authorizedUsers = [
        "rakotobe.marco@npakadin.mg",
        "razafimbelo.mariska@npakadin.mg",
        "andriamahonintsoa.rado@npakadin.mg",
        "direndre.sonal@npakadin.mg",
        "andriamandimbisoa.fy@npakadin.mg",
    ];

    const [id, setId] = useState("");
    const [idevas, setIdevas] = useState("");
    const [emailn1, setEmailn1] = useState("");
    const [emailn2, setEmailn2] = useState("");
    const [emaildr, setEmaildr] = useState("");
    const [emailsg, setEmailsg] = useState("boucher.edouard@npakadin.mg");
    const [emaildg, setEmaildg] = useState("");
    const [emaildrh, setEmaildrh] = useState("direndre.sonal@npakadin.mg");



    // Fonction pour retirer les accents des chaînes de caractères
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };



    const [emails, setEmails] = useState([]);
    const [options1, setOptions1] = useState([])
    const [options2, setOptions2] = useState([])
    const [optionsdr, setOptionsdr] = useState([])
    const [optionssg, setOptionssg] = useState([])
    const [optionsdg, setOptionsdg] = useState([])
    const [optionsdrh, setOptionsdrh] = useState([])


    const navigate = useNavigate();

    const handleRowClick = (record) => {
        navigate(`/choosehistorh/${record.id_pers}`);
    };


    const handleSearch1 = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions1(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelect1 = (value) => {
        setEmailn1(value);
    };

    const handleChange1 = (value) => {
        setEmailn1(value);
        handleSearch1(value); // Optionnel : met à jour les options lors de la modification
    };




    const handleSearch2 = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptions2(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelect2 = (value) => {
        setEmailn2(value);
    };

    const handleChange2 = (value) => {
        setEmailn2(value);
        handleSearch2(value); // Optionnel : met à jour les options lors de la modification
    };



    const handleSearchdr = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptionsdr(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectdr = (value) => {
        setEmaildr(value);
    };

    const handleChangedr = (value) => {
        setEmaildr(value);
        handleSearchdr(value); // Optionnel : met à jour les options lors de la modification
    };



    const handleSearchsg = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptionssg(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectsg = (value) => {
        setEmailsg(value);
    };

    const handleChangesg = (value) => {
        setEmailsg(value);
        handleSearchsg(value); // Optionnel : met à jour les options lors de la modification
    };




    const handleSearchdg = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptionsdg(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectdg = (value) => {
        setEmaildg(value);
    };

    const handleChangedg = (value) => {
        setEmaildg(value);
        handleSearchdg(value); // Optionnel : met à jour les options lors de la modification
    };




    const handleSearchdrh = (searchText) => {
        const filteredEmails = emails.filter(email =>
            email.toLowerCase().includes(searchText.toLowerCase())
        );
        setOptionsdrh(filteredEmails.map(email => ({ value: email })));
    };

    const handleSelectdrh = (value) => {
        setEmaildrh(value);
    };

    const handleChangedrh = (value) => {
        setEmaildrh(value);
        handleSearchdrh(value); // Optionnel : met à jour les options lors de la modification
    };




    const FetchHistoData = async (ids, selectedId) => {

        try {

            const response = await axios.post(`${url}get-histo-eval-data`, { selectedId, ids });
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
            console.error('Erreur lors de la récupération des données d\'historique:', error);
        }
    };



    const [et1, setEt1] = useState(false);
    const [et2, setEt2] = useState(false);
    const [et3, setEt3] = useState(false);
    const [et4, setEt4] = useState(false);
    const [et5, setEt5] = useState(false);
    const [et6, setEt6] = useState(false);


    const [evaldata, setEvaldata] = useState([]);
    const [selectedType, setSelectedType] = useState(null);




    const handleFilterChange = (value) => {
        setSelectedType(value);  // Mettez à jour l'état avec la valeur sélectionnée
    };






    const [evaldatahisto, setEvaldatahisto] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchValue1, setSearchValue1] = useState('');
    const [searchValuehisto, setSearchValuehisto] = useState('');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [isModalOpens, setIsModalOpens] = useState(false);
    const searchInput = useRef(null);


    const deleteeval = async (id, idevaluator) => {
        try {
            const deleteeval = await axios.post(`${url}deleteeval`, { id, idevaluator })
            if (deleteeval.status === 200) {
                message.success('Suppression avec succes');
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                message.error('Erreur de suppression');
            }

        } catch (error) {
            console.log(error);

        }
    };


    const cancel = (e) => {
        message.error('');
    };

    const showModals = (id, ideva, n1, n2, dr, sg, dg, drh) => {

        setId(id)
        setIdevas(ideva)
        setEmailn1(n1)
        setEmailn2(n2)
        setEmaildr(dr)
        setEmailsg(sg)
        setEmaildg(dg)
        setEmaildrh(drh)
        setIsModalOpens(true);
    };

    const handleCancels = () => {
        setIsModalOpens(false);
    };

    const updaterh = async () => {

        if ((et2 && !et1) || (et3 && !et2) || (et4 && !et3) || (et5 && !et4) || (et6 && !et5)) {
            message.error('Les statuts doivent être mis à jour séquentiellement.');
            return; // Stop the execution if conditions are not met
        }

        if ((et1 && !emailn1) || (et2 && !emailn2) || (et3 && !emaildr) || (et4 && !emailsg) || (et5 && !emaildg) || (et6 && !emaildrh)) {
            message.error('Le champ e-mail ne doit pas être vide s’il est valide.');
            return; // Stop the execution if conditions are not met
        }

        try {
            const response = await axios.post(`${url}updaterh`, {
                id, idevas, et1, et2, et3, et4, et5, et6, emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh
            });




            if (response.status === 200) {
                message.success('Modification avec succès');
                setId("")
                setIdevas("")
                setEt1(false)
                setEt2(false)
                setEt3(false)
                setEt4(false)
                setEt5(false)
                setEt6(false)
                setEmailn1(""); setEmailn2(""); setEmailsg(""); setEmaildg(""); setEmaildrh(""); setEmaildr("")

                setTimeout(() => {
                    setIsModalOpens(false)
                    window.location.reload()
                }, 1500);

            } else {
                message.error('Erreur de mise à jour');
            }

        } catch (error) {
            console.error("An error occurred while updating status:", error);
        }
    };


    const modalFooters = (
        <div style={{ textAlign: 'center' }}>
            <Popconfirm
                title="Êtes-vous sûr de vouloir valider les modifications ?"
                onConfirm={updaterh}
                okText="Oui"
                cancelText="Non"
            >
                <Button type="primary">Valider</Button>
            </Popconfirm>
        </div>
    );



    const getEmails = async () => {

        try {
            const response = await axios.get(`${url}getEmails`);
            if (response.data.success) {

                const emailList = response.data.emails.map(emailObj => emailObj.mail); // Extraire les adresses e-mail
                setEmails(emailList);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Erreur lors de la récupération des e-mails.');
        } finally {
            //  setLoading(false);
        }
    };


    useEffect(() => {
        getEmails()
        fetchevalData();
        fetchevalDataHisto();
    }, []);

    const fetchevalData = async () => {
        try {
            const response = await axios.get(`${url}fetchevaldatas`);
            console.log(response.data[0].statusHR);


            setEvaldata(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
            message.error('Erreur lors de la récupération des données.');
        }
    };


    const fetchevalDataHisto = async () => {
        try {
            const response = await axios.get(`${url}fetchevaldatashisto`);
            console.log(response.data[0].statusHR);
            setEvaldatahisto(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données', error);
            message.error('Erreur lors de la récupération des données.');
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };



    const handleSearchChange1 = (value) => {
        setSearchValue1(value);
    };



    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchValue('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Rechercher ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Rechercher
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Réinitialiser
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrer
                    </Button>
                    <Button type="link" size="small" onClick={close}>
                        Fermer
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Statut",
            key: 'statut',
            width: 200,
            render: (text, record) => {
                let statusText = '';
                let statusColor = '';

                if (record.statusN1 === false) {
                    statusText = 'Attente de validation N+1';
                    statusColor = 'red';
                } else if (record.statusN1 === true && record.statusN2 === false) {
                    statusText = 'Attente de validation N+2';
                    statusColor = 'orange';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === false) {
                    statusText = 'Attente de validation Directeur de rattachement';
                    statusColor = 'orange';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === false) {
                    statusText = 'Attente de validation SG';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === false) {
                    statusText = 'Attente de validation DG';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === true && record.statusHR === false) {
                    statusText = 'Attente de validation DRH';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === true && record.statusHR === true) {
                    statusText = 'Validé';
                    statusColor = 'green';
                }


                return (
                    <div>
                        {/* <Avatar style={{ color: statusColor }}>
                            {statusText}
                        </Avatar> */}
                        <Link style={{ color: statusColor }}>{statusText}</Link>
                    </div>
                );
            },
        },
        {
            title: "Type d'évaluation",
            dataIndex: 'evaluatorType',
            key: 'evaluatorType',
            width: 100,
            ...getColumnSearchProps('evaluatorType'),
        },
        {
            title: 'Mle',
            dataIndex: 'mat',
            key: 'mat',
            width: 90,
            ...getColumnSearchProps('mat'),
        },

        {
            title: "Nom",
            key: 'nom',
            dataIndex: 'nom',
            width: 200,
            ...getColumnSearchProps('nom'),
        },
        {
            title: "Prénom",
            key: 'prenom',
            dataIndex: 'prenom',
            width: 200,
            ...getColumnSearchProps('prenom'),
        },
        {
            title: "Poste",
            dataIndex: 'posteeval',
            key: 'posteeval',
            width: 150,
            ...getColumnSearchProps('posteeval'),
        },
        {
            title: "Date d'entretien",
            dataIndex: 'dateentree',
            key: 'dateentree',
            width: 150,
            render: (text) => moment(text).format('DD/MM/YYYY'),
        },




        {
            title: 'Évaluateur',
            key: 'evaluator',
            width: 200,
            render: (record) => {
                // Associez chaque email avec son label correspondant
                const evaluators = [
                    { email: record.emailn1, label: 'Évaluateur N+1' },
                    { email: record.emailn2, label: 'Évaluateur N+2' },
                    { email: record.emaildr, label: 'Directeur de rattachement' },
                    { email: record.emailsg, label: 'Secrétaire général' },
                    { email: record.emaildg, label: 'Directeur général' },
                    { email: record.emaildrh, label: 'Directrice RH' }
                ].filter(evaluator => evaluator.email); // Filtrer les emails non définis ou vides

                // Truncate emails for the table cell (join only emails, not labels)
                const truncatedText = evaluators.map(evaluator => evaluator.email).join(', ');

                // Préparer le contenu complet pour le Popover avec des liens mailto
                const fullEmails = evaluators.map(evaluator => (
                    <div key={evaluator.email}>
                        <a href={`mailto:${evaluator.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {evaluator.label}: {evaluator.email}
                        </a>
                    </div>
                ));

                return (
                    <Popover
                        content={<div style={{ maxWidth: '350px', whiteSpace: 'pre-wrap' }}>{fullEmails}</div>}
                        title="Évaluateur"
                        trigger="click"
                    >
                        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            {/* Afficher les emails tronqués */}
                            {truncatedText.length > 20 ? `${truncatedText.slice(0, 20)}...` : truncatedText}
                            <MailOutlined style={{ marginLeft: 5 }} /> {/* Icône d'enveloppe pour le clic */}
                        </span>
                    </Popover>
                );
            },
        },


        {
            title: 'Résultat obj. indiv. %',
            dataIndex: 'res1',
            key: 'res1',
            width: 120,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Éval. prof. /5',
            dataIndex: 'r1',
            key: 'r1',
            width: 120,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Aptitude prof. /5',
            dataIndex: 'somme',
            key: 'somme',
            width: 150,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Comportemental /5',
            dataIndex: 'r4',
            key: 'r4',
            width: 150,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Niveau actuel',
            dataIndex: 'nivactus',
            key: 'nivactus',
            width: 120,
        },
        {
            title: 'Performance %',
            dataIndex: 'perfglob',
            key: 'perfglob',
            width: 120,
            render: (text) => text !== undefined && text !== null ? Number(text).toFixed(2) : 'N/A',
        },
        {
            title: 'Interprétation des résultats',
            dataIndex: 'idr',
            key: 'idr',
            width: 200,
            render: (text) => (
                <Popover
                    content={<div style={{ maxWidth: '350px', whiteSpace: 'pre-wrap' }}>{text}</div>}
                    title="Interprétation des résultats"
                    trigger="click"
                >
                    <span style={{ cursor: 'pointer' }}>
                        {text && text.length > 20 ? `${text.slice(0, 20)}...` : text}
                    </span>
                </Popover>
            ),
        },
        {
            title: 'Forces',
            dataIndex: 'forces',
            key: 'forces',
            width: 200,
            render: (text, record) => {
                // Combiner les valeurs des champs f1, f2, f3, f4 et f5
                const combinedForces = [record.f1, record.f2, record.f3, record.f4, record.f5].filter(Boolean).join(', ');
                return (
                    <Popover content={<div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{combinedForces}</div>} title="Forces" trigger="click">
                        <span style={{ cursor: 'pointer' }}>
                            {combinedForces && combinedForces.length > 20 ? `${combinedForces.slice(0, 20)}...` : combinedForces}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: 'Faiblesses',
            dataIndex: 'faiblesses',
            key: 'faiblesses',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Formations suivies",
            dataIndex: 't1',
            key: 't1',
            width: 200,
            render: (text, record) => {
                // Combiner les valeurs des champs f1, f2, f3, f4 et f5
                const combinedForces = [record.t1, record.t2, record.t3, record.t4].filter(Boolean).join(', ');
                return (
                    <Popover content={<div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{combinedForces}</div>} title="Formations suivies" trigger="click">
                        <span style={{ cursor: 'pointer' }}>
                            {combinedForces && combinedForces.length > 20 ? `${combinedForces.slice(0, 20)}...` : combinedForces}
                        </span>
                    </Popover>
                );
            },
        },

        {
            title: 'Besoins en développement',
            dataIndex: 'ccd1',
            key: 'ccd1',
            width: 200,
            render: (text, record) => {
                // Combiner les valeurs des champs f1, f2, f3, f4 et f5
                const combinedForces = [record.ccd1, record.ccd2, record.ccd3, record.ccd4].filter(Boolean).join(', ');
                return (
                    <Popover content={<div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{combinedForces}</div>} title="Besoins en développement" trigger="click">
                        <span style={{ cursor: 'pointer' }}>
                            {combinedForces && combinedForces.length > 20 ? `${combinedForces.slice(0, 20)}...` : combinedForces}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: 'Projet professionnel',
            dataIndex: 'ml1', //liste CT,LT,MT
            key: 'ml1',
            width: 200,
            render: (text, record) => {
                const combinedForces = [record.ct1, record.ct2, record.ct3, record.mt1, record.mt2, record.mt3, , record.ml1, record.ml2, record.ml3].filter(Boolean).join(', ');
                return (
                    <Popover content={<div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{combinedForces}</div>} title="Projet professionnel" trigger="click">
                        <span style={{ cursor: 'pointer' }}>
                            {combinedForces && combinedForces.length > 20 ? `${combinedForces.slice(0, 20)}...` : combinedForces}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: 'Objectif pour 2024',
            dataIndex: 'libelleend1',
            key: 'libelleend1',
            width: 200,
            render: (text, record) => {
                const combinedForces = [record.libelleend1, record.libelleend2, record.libelleend3, record.libelleend4].filter(Boolean).join(', ');
                return (
                    <Popover content={<div style={{ maxWidth: '300px', whiteSpace: 'pre-wrap' }}>{combinedForces}</div>} title="Objectif pour 2024" trigger="click">
                        <span style={{ cursor: 'pointer' }}>
                            {combinedForces && combinedForces.length > 20 ? `${combinedForces.slice(0, 20)}...` : combinedForces}
                        </span>
                    </Popover>
                );
            },
        },
        {
            title: 'Observations',
            dataIndex: 'observations',
            key: 'observations',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Planning d'entretien",
            dataIndex: 'planningEntretien',
            key: 'planningEntretien',
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text && text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
                </Tooltip>
            ),
        },
        {
            title: "Actions",
            dataIndex: 'act',
            key: 'act',
            width: 200,
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => showModals(record.id_pers, record.evaluatorId, record.emailn1, record.emailn2, record.emaildr, record.emailsg, record.emaildg, record.emaildrh)} />
                    <Popconfirm
                        title="Êtes-vous sûr de vouloir supprimer cette évaluations ?"
                        description="Are you sure to delete this task?"
                        onConfirm={() => deleteeval(record.id_pers, record.evaluatorId)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        },

    ];



    const columns1 = [
        {
            title: "Statut",
            key: 'statut',
            width: 200,
            render: (text, record) => {
                let statusText = '';
                let statusColor = '';

                if (record.statusN1 === false) {
                    statusText = 'Attente de validation N+1';
                    statusColor = 'red';
                } else if (record.statusN1 === true && record.statusN2 === false) {
                    statusText = 'Attente de validation N+2';
                    statusColor = 'orange';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === false) {
                    statusText = 'Attente de validation Directeur de rattachement';
                    statusColor = 'orange';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === false) {
                    statusText = 'Attente de validation SG';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === false) {
                    statusText = 'Attente de validation DG';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === true && record.statusHR === false) {
                    statusText = 'Attente de validation DRH';
                    statusColor = 'blue';
                } else if (record.statusN1 === true && record.statusN2 === true && record.statusDirection === true && record.statusSecretary === true && record.statusGeneralDirection === true && record.statusHR === true) {
                    statusText = 'Validé';
                    statusColor = 'green';
                }


                return (
                    <div>
                        {/* <Avatar style={{ color: statusColor }}>
                            {statusText}
                        </Avatar> */}
                        <Link style={{ color: statusColor }}>{statusText}</Link>
                    </div>
                );
            },
        },
        {
            title: "Type d'évaluation",
            dataIndex: 'evaluatorType',
            key: 'evaluatorType',
            width: 100,
            ...getColumnSearchProps('evaluatorType'),
        },
        {
            title: 'Mle',
            dataIndex: 'mat',
            key: 'mat',
            width: 90,
            ...getColumnSearchProps('mat'),
        },

        {
            title: "Nom",
            key: 'nom',
            dataIndex: 'nom',
            width: 200,
            ...getColumnSearchProps('nom'),
        },
        {
            title: "Prénom",
            key: 'prenom',
            dataIndex: 'prenom',
            width: 200,
            ...getColumnSearchProps('prenom'),
        },
    ]


    // const filteredData = useMemo(() => {
    //     return evaldata.filter((item) => {
    //         const prenom = item.prenom.toLowerCase();
    //         const nom = item.nom.toLowerCase();
    //         const searchTextLower = searchValue.toLowerCase();
    //         return (
    //             prenom.includes(searchTextLower) ||
    //             nom.includes(searchTextLower)
    //         );
    //     });
    // }, [evaldata, searchValue]);

    const filteredData = useMemo(() => {
        return evaldata.filter((item) => {
            const prenom = item.prenom ? removeAccents(item.prenom.toLowerCase().trim()) : '';
            const nom = item.nom ? removeAccents(item.nom.toLowerCase().trim()) : '';
            const searchTextLower = removeAccents(searchValue.toLowerCase().trim());

            // Vérification si le type correspond ou si selectedType est vide (allowClear)
            const typeMatch = selectedType ? item.evaluatorType === selectedType : true;

            return (
                (prenom.includes(searchTextLower) || nom.includes(searchTextLower)) &&
                typeMatch // Filtrer selon le type d'évaluation sélectionné
            );
        });
    }, [evaldata, searchValue, selectedType]); // Ajout de selectedType dans les dépendances





    const filteredData1 = useMemo(() => {
        return evaldatahisto.filter((item) => {
            const prenom = item.prenom.toLowerCase();
            const nom = item.nom.toLowerCase();
            const searchTextLower = searchValue.toLowerCase();
            return (
                prenom.includes(searchTextLower) ||
                nom.includes(searchTextLower)
            );
        });
    }, [evaldatahisto, searchValuehisto]);




    if (!authorizedUsers.includes(loggedInUser)) {
        return (
            <div>
                <h1>Accès refusé</h1>
                <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
            </div>
        );
    }

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };



    return (
        <div style={{ padding: '20px', marginTop: '200px', textAlign: 'center' }}>
            <Title level={3}>Consolidation des données</Title>
            <Space style={{ marginBottom: 16 }}>
                <AutoComplete
                    options={evaldata.map((item) => ({ value: item.nom }))}
                    style={{ width: 250 }}
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Rechercher par nom"
                    filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                    }
                />
                <Select
                    style={{ width: 250 }}
                    placeholder="Type d'évaluation"
                    value={selectedType}
                    onChange={handleFilterChange}
                    allowClear
                    options={[
                        { value: 'Evaluation cadre', label: 'Evaluation cadre' },
                        { value: 'Evaluation non cadre', label: 'Evaluation non cadre' },
                        { value: 'Evaluation cadre non manager', label: 'Evaluation cadre non manager' },
                    ]}
                />


            </Space>
            {/* <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: 2000, y: 600 }}
                    rowKey="mat"
                />
            </div> */}
            <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{
                        ...pagination,
                        position: ['bottomRight']
                    }}  // Pagination toujours visible en bas à droite
                    onChange={handleTableChange}
                    scroll={{ x: 'max-content', y: 600 }}  // Ajustement dynamique pour le défilement horizontal
                    rowKey="mat"
                    bordered  // Ajout de bordures pour une meilleure lisibilité
                    size="small"  // Mode compact pour une meilleure lisibilité
                    locale={{
                        emptyText: "Aucune donnée disponible",  // Message personnalisé si aucune donnée
                    }}
                />
            </div>

            <br /><br />

            <Title level={3}>Historiques des évaluations</Title>
            <Space style={{ marginBottom: 16 }}>
                <AutoComplete
                    options={evaldatahisto.map((item) => ({ value: item.nom }))}
                    style={{ width: 200 }}
                    value={searchValue1}
                    onChange={handleSearchChange1}
                    placeholder="Rechercher par nom"
                    filterOption={(inputValue, option) =>
                        option.value.toLowerCase().includes(inputValue.toLowerCase())
                    }
                />

            </Space>


            <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={columns1}
                    dataSource={filteredData1}
                    pagination={pagination}
                    onChange={handleTableChange}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
                />
            </div>








            <Modal title={<div style={{ textAlign: 'center' }}>Modification</div>} visible={isModalOpens} footer={modalFooters} onCancel={handleCancels} width={300}>
                <Row gutter={8}>
                    <Col span={20}>

                        <AutoComplete
                            style={{ width: '100%' }}
                            options={options1}
                            onSearch={handleSearch1}
                            onSelect={handleSelect1}
                            onChange={handleChange1}
                            value={emailn1} disabled={et1}
                        >
                            <Input
                                placeholder="Email N+1"
                                allowClear
                            />
                        </AutoComplete>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt1(e.target.checked)}></Checkbox>
                    </Col>
                </Row>
                <br />

                <Row gutter={8}>
                    <Col span={20}>

                        <AutoComplete
                            style={{ width: '100%' }}
                            options={options2}
                            onSearch={handleSearch2}
                            onSelect={handleSelect2}
                            onChange={handleChange2}
                            value={emailn2} disabled={et2}
                        >
                            <Input
                                placeholder="Email N+2"
                                allowClear
                            />
                        </AutoComplete>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt2(e.target.checked)}></Checkbox>
                    </Col>
                </Row>

                <br />

                <Row gutter={8}>
                    <Col span={20}>
                        <AutoComplete
                            style={{ width: '100%' }}
                            options={optionsdr}
                            onSearch={handleSearchdr}
                            onSelect={handleSelectdr}
                            onChange={handleChangedr}
                            value={emaildr} disabled={et3}
                        >
                            <Input
                                placeholder="Email directeur de rattachement"
                                allowClear
                            />
                        </AutoComplete>


                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt3(e.target.checked)}></Checkbox>
                    </Col>
                </Row>
                <br />

                <Row gutter={8}>
                    <Col span={20}>
                        <AutoComplete
                            style={{ width: '100%' }}
                            options={optionssg}
                            onSearch={handleSearchsg}
                            onSelect={handleSelectsg}
                            onChange={handleChangesg}
                            value={emailsg} disabled={et4}
                        >
                            <Input
                                placeholder="Email Sécrétaire générale"
                                allowClear
                            />
                        </AutoComplete>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt4(e.target.checked)}></Checkbox>
                    </Col>
                </Row>
                <br />

                <Row gutter={8}>
                    <Col span={20}>

                        <AutoComplete
                            style={{ width: '100%' }}
                            options={optionsdg}
                            onSearch={handleSearchdg}
                            onSelect={handleSelectdg}
                            onChange={handleChangedg}
                            value={emaildg} disabled={et5}
                        >
                            <Input
                                placeholder="Email Direction générale"
                                allowClear
                            />
                        </AutoComplete>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt5(e.target.checked)}></Checkbox>
                    </Col>
                </Row>
                <br />

                <Row gutter={8}>
                    <Col span={20}>


                        <AutoComplete
                            style={{ width: '100%' }}
                            options={optionsdrh}
                            onSearch={handleSearchdrh}
                            onSelect={handleSelectdrh}
                            onChange={handleChangedrh}
                            value={emaildrh} disabled={et6}
                        >
                            <Input
                                placeholder="Email Directrice des ressources humaines"
                                allowClear
                            />
                        </AutoComplete>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={(e) => setEt6(e.target.checked)}></Checkbox>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default Consolidation;
