import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Space, Table, Input, Modal, Badge, Image, Tooltip, Select, Typography, Row, Col } from 'antd';
import { message, Popconfirm } from 'antd';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { Avatar } from 'antd';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { writeFile } from 'xlsx';
import { Card } from 'antd';
import { DatePicker } from 'antd';
const { Meta } = Card;
const { Title } = Typography;
const { TextArea } = Input;




const options = [
    {
        value: 'Burns Bay Road',
    },
    {
        value: 'Downing Street',
    },
    {
        value: 'Wall Street',
    },
];


const Annuaire = () => {
    const url = 'http://172.16.0.92:8000/';
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const statut = sessionStorage.getItem('poste');
    const [phoneBookEntries, setPhoneBookEntries] = useState([]);
    const colors = ['#000064', '#009718', '#333333', '#FF1A26', '#003B61'];
    const [filteredEntries, setFilteredEntries] = useState([]);

    const validEntries = filteredEntries.filter(
        (entry) => entry.cn && entry.cn !== 'Non défini' && entry.homePhone && entry.homePhone !== 'Non défini'
    );
    const capitalizeWords = (str) => {
        return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    };

    const tester = async () => {
        try {
            const response = await axios.post(`${url}tester`);
            const data = response.data;

            if (data.success) {
                setPhoneBookEntries(data.phoneBookEntries);
                setFilteredEntries(data.phoneBookEntries); // Initialement, tous les résultats sont affichés
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };



    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';


    const openMessage = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Chargement...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Modification réussie!',
                duration: 2,
            });
        }, 1000);
    };



    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };




    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const searchInput = useRef(null);

    const [annuaireliste, setAnnuaireliste] = useState([]);
    const [searchValue1, setSearchValue1] = useState('');


    const onSearchChange = (value) => {
        setSearchValue1(value);
        const filtered = phoneBookEntries.filter((entry) =>
            entry.cn.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEntries(filtered);
    };

    //affihage
    const [mats, setMats] = useState('')
    const [noms, setNoms] = useState('')
    const [prenoms, setPrenoms] = useState('')
    const [socs, setSocs] = useState('')
    const [mails, setMails] = useState('')
    const [postes, setPostes] = useState('')
    const [tels, setTels] = useState('')

    const [imgs, setImgs] = useState('')
    const [deps, setDeps] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpens, setIsModalOpens] = useState(false);
    const [isModalOpenajout, setIsModalOpenajout] = useState(false);



    //ajout 
    const [matajout, setMatajout] = useState('')
    const [nomajout, setNomajout] = useState('')
    const [prenomajout, setPrenomajout] = useState('')
    const [socajout, setSocajout] = useState('')
    const [depajout, setDepajout] = useState('')
    const [mailajout, setMailajout] = useState('')
    const [posteajout, setPosteajout] = useState([])
    const [telajout, setTelajout] = useState('')
    const [birth, setBirth] = useState(null);
    const [imgajout, setImgajout] = useState('')
    const [fix, setFix] = useState('')

    const handleDateChange = (date, dateString) => {
        setBirth(dateString);
    };



    const handleDateChangemodif = (date) => {
        setBirthmodif(date ? date.clone().utcOffset(0, true).format('YYYY-MM-DD') : null);
    };



    //champ modifier
    const [matmodif, setMatmodif] = useState('')
    const [nommodif, setNommodif] = useState('')
    const [prenommodif, setPrenommodif] = useState('')
    const [socmodif, setSocmodif] = useState('')
    const [depmodif, setDepmodif] = useState([])
    const [postemodif, setPostemodif] = useState([])
    const [mailmodif, setMailmodif] = useState('')
    const [phonemodif, setPhonemodif] = useState('')
    const [ordremodif, setOrdremodif] = useState('')
    const [fixup, setFixup] = useState('')
    const [birthmodif, setBirthmodif] = useState(null);
    const [depSelected, setDepSelected] = useState('');
    const [depSelectedmodif, setDepSelectedmodif] = useState('');
    const [depSelectedajout, setDepSelectedajout] = useState('');

    const [imageup, setImageup] = useState(null);
    const [imagead, setImagead] = useState(null);
    const [selectpostemodif, setSelectpostemodif] = useState('')
    const [selectposteajout, setSelectposteajout] = useState('')

    const [idmodif, setIdmodif] = useState('')




    const handleChangePostemodif = (selectedPostemodif) => {
        setSelectpostemodif(selectedPostemodif);
    };

    const handleChangePosteajout = (selectedPosteajout) => {
        setSelectposteajout(selectedPosteajout);
    };



    const handleChangeEmailmodif = (event) => {
        setMailmodif(event.target.value);
    };

    const handleChangeTelephonemodif = (event) => {
        setPhonemodif(event.target.value);
    };

    const handleChangefixemodif = (event) => {
        setFixup(event.target.value);
    };




    const deleteannuaire = async (e) => {
        setIsModalOpen(false);
        try {
            const med = await axios.delete(`${url}deleteannuaire/${e}`).then((result) => {
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 500);

            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeDepartementajout = (selectedDepajout) => {
        setDepSelectedajout(selectedDepajout);
        fetchPostesByDepajout(selectedDepajout);
    };






    const handleChangeSocietemodif = async (selectedSocmodif) => {
        try {
            // Mise à jour de socmodif
            setSocmodif(selectedSocmodif);

            // Récupération des départements pour la société sélectionnée
            // const response = await axios.get(`${url}selectDep/${selectedSocmodif}`);
            // setDepmodif(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des départements :", error.message);
        }
    };

    const handleChangeSocieteajout = async (selectedSocajout) => {
        try {
            // Mise à jour de socmodif
            setSocajout(selectedSocajout);

            // Récupération des départements pour la société sélectionnée
            const response = await axios.get(`${url}selectDep/${selectedSocajout}`);
            setDepajout(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des départements :", error.message);
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


    const fetchPostesByDepajout = async (selectedDepajout) => {
        try {
            // Effectuez votre requête pour obtenir les postes en fonction du département
            const response = await axios.get(`${url}selectPoste/${selectedDepajout}`);
            console.log(response.data);
            setPosteajout(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des postes :", error.message);
        }
    };


    const handleChangeDepartementmodif = (e, selectedDepmodif) => {
        setDepSelectedmodif(selectedDepmodif);
        fetchPostesByDepmodif(selectedDepmodif);
    };

    const fetchPostesByDepmodif = async (selectedDepajout) => {
        try {
            // Effectuez votre requête pour obtenir les postes en fonction du département
            const response = await axios.get(`${url}selectPoste/${selectedDepajout}`);
            setPosteajout(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des postes :", error.message);
        }
    };

    //changemodif
    const handleChangematmodif = (event) => {
        setMatmodif(event.target.value);
    };
    const handleChangeNommodif = (event) => {
        setNommodif(event.target.value);
    };

    const handleChangePrenommodif = (event) => {
        setPrenommodif(event.target.value);
    };





    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancels = () => {
        setIsModalOpens(false);
    };

    const handleCancelajout = () => {
        setIsModalOpenajout(false);
    };

    const handleFileChangeup = (e) => {
        setImageup(e.target.files[0]);
    };


    const handleFileChangead = (e) => {
        setImagead(e.target.files[0]);
    };

    const actionColumnProps = {
        onRow: (record, rowIndex) => ({
            onClick: (event) => event.stopPropagation(),
        }),
    };


    const handleRowClick = (record, event) => {
        // Vérifier si l'événement vient d'une action (comme un bouton)
        if (event.target.closest('.ant-space') !== null) {
            event.stopPropagation(); // Arrêter la propagation de l'événement si c'est un clic sur un bouton de l'action
            return;
        }

        // Sinon, mettre à jour les états comme d'habitude
        setMats(record.mat);
        setNoms(record.nom);
        setPrenoms(record.prenom);
        setDeps(record.dep);
        setSocs(record.soc);
        setMails(record.mail);
        setPostes(record.poste);
        setTels(record.tel);
        setImgs(record.imageUrl);
        setFix(record.Fixe)
        setIsModalOpen(true);
    };

    const showModals = (id, mat, nom, prenom, soc, poste, dep, mail, tel, ordre, fixe, b) => {

        setMatmodif(mat)
        setNommodif(nom)
        setPrenommodif(prenom)
        setSocmodif(soc)
        setDepmodif(dep)
        setMailmodif(mail)
        setPhonemodif(tel)
        setFixup(fixe)
        setPostemodif(poste)
        setIdmodif(id)
        setOrdremodif(ordre)
        setBirthmodif(b)
        setIsModalOpens(true);
    };

    const modalFooter = (
        <div style={{ textAlign: 'center' }}>

        </div>
    );




    const exportToExcel = () => {
        const data = annuaireliste; // Récupérez vos données d'annuaire
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Annuaire');

        writeFile(workbook, 'annuaire.xlsx');
    };






    //Ajouter 
    const ajouterannuaire = async () => {


        try {
            const formData = new FormData();
            formData.append("image", imagead);
            if (imagead !== null) {

                const responseUpload = await axios.post(`${url}UploadImageannuaire`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                const imageUrlToSend = responseUpload.data.imageUrl || "";

                const addannuaire = await axios.post(`${url}addannuaire`, { ids, matajout, nomajout, prenomajout, socajout, depSelectedajout, selectposteajout, mailajout, fix, telajout, birth, imageUrlToSend });
                openMessage()
                recupeannuaire()
                setIsModalOpens(false);
                setMatajout('')
                setNomajout('')
                setPrenomajout('')
                setSocajout('')
                setDepSelectedajout('')
                setSelectposteajout('')
                setMailajout('')
                setTelajout('')
                handleCancelajout()
            } else {
                console.log("sans photo");

                const addannuaire = await axios.post(`${url}addannuaire`, { ids, matajout, nomajout, prenomajout, socajout, depSelectedajout, selectposteajout, mailajout, telajout, birth });
                openMessage()
                recupeannuaire()
                setIsModalOpens(false);
                setMatajout('')
                setNomajout('')
                setPrenomajout('')
                setSocajout('')
                setDepSelectedajout('')
                setSelectposteajout('')
                setMailajout('')
                setTelajout('')
                handleCancelajout()
            }



        } catch (error) {
            console.log(error);
        }

    };
    //modifier 
    const updateannuaire = async () => {

        try {
            const formData = new FormData();
            formData.append("image", imageup);
            if (imageup !== null) {

                const responseUpload = await axios.post(`${url}UploadImageannuaire`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                const imageUrlToSend = responseUpload.data.imageUrl || "";

                const updateannuaire = await axios.put(`${url}updateannuaire/${idmodif}`, { ids, matmodif, nommodif, prenommodif, socmodif, depmodif, postemodif, mailmodif, fixup, phonemodif, ordremodif, birthmodif, imageUrlToSend });
                openMessage()
                recupeannuaire()
                setIsModalOpens(false);
                setMatmodif('')
                setNommodif('')
                setPrenommodif('')
                setSocmodif('')
                setPostemodif('')
                setDepmodif('')
                setDepSelectedmodif('')
                setSelectpostemodif('')
                setFixup('')
                setMailmodif('')
                setPhonemodif('')
                setBirthmodif('')
                // Rafraîchir la page après une seconde
                setTimeout(() => {
                    window.location.reload();
                }, 1000);


            } else {
                console.log("sans photo");

                const updateannuaire = await axios.put(`${url}updateannuaire/${idmodif}`, { id: ids, matmodif, nommodif, prenommodif, socmodif, depmodif, postemodif, mailmodif, ordremodif, fixup, birthmodif, phonemodif });
                openMessage()
                recupeannuaire()
                setIsModalOpens(false);
                setMatmodif('')
                setNommodif('')
                setPrenommodif('')
                setSocmodif('')
                setPostemodif('')
                setDepmodif('')
                setDepSelectedmodif('')
                setSelectpostemodif('')
                setMailmodif('')
                setPhonemodif('')
                setBirthmodif('')
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }



        } catch (error) {
            console.log(error);
        }

    };

    const modalFooters = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={updateannuaire}>Modifier</Button>
        </div>
    );

    const modalFooterajout = (
        <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={ajouterannuaire} >Ajouter</Button>
        </div>
    );

    const recupeannuaire = async () => {
        try {
            const response = await axios.get(`${url}recupeannuaire`);
            setAnnuaireliste(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'annuaire', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
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
                    placeholder={`Search ${dataIndex}`}
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
                        Reset
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
                        Filtre
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            title: 'Matricule',
            dataIndex: 'mat',
            key: 'mat',
            width: '10%',
            ...getColumnSearchProps('mat'),
        },
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            width: '15%',
            ...getColumnSearchProps('nom'),
        },
        {
            title: 'Prénom(s)',
            dataIndex: 'prenom',
            key: 'prenom',
            width: '15%',
            ...getColumnSearchProps('prenom'),
            render: (text) => (
                text.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ')
            ),
        },

        {
            title: 'Sociétés',
            dataIndex: 'soc',
            key: 'soc',
            width: '15%',
            ...getColumnSearchProps('soc'),
        },
        {
            title: 'Département',
            dataIndex: 'dep',
            key: 'dep',
            width: '15%',
            ...getColumnSearchProps('dep'),
            render: (text) => (
                text.split(' ').map(word =>
                    word.toUpperCase()
                ).join(' ')
            ),
        },

        {
            title: 'Fonction',
            dataIndex: 'poste',
            key: 'poste',
            width: '15%',
            ...getColumnSearchProps('poste'),
        },
        {
            title: 'E-mail',
            dataIndex: 'mail',
            key: 'mail',
            width: '15%',
            ...getColumnSearchProps('mail'),
        },
        {
            title: 'Fixe',
            dataIndex: 'Fixe',
            key: 'Fixe',
            width: '15%',
            ...getColumnSearchProps('Fixe'),
            render: (text) => (
                <Tooltip title={text}>
                    <div style={{ maxWidth: '100px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Téléphone',
            dataIndex: 'tel',
            key: 'tel',
            width: '15%',
            ...getColumnSearchProps('tel'),
            render: (text) => (
                <Tooltip title={text}>
                    <div style={{ maxWidth: '100px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {text}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                (loggedInUser || loggedInPwd) && (
                    (statut === 'Super admin' || statut === 'Administrateur')
                ) && (
                    <Space size="middle">
                        <EditOutlined onClick={() => showModals(record.id, record.mat, record.nom, record.prenom, record.soc, record.poste, record.dep, record.mail, record.tel, record.ordre, record.Fixe, record.annif)} />
                        <Popconfirm
                            title="Êtes-vous sûr de vouloir supprimer cette personne ?"
                            description="Are you sure to delete this task?"
                            onConfirm={() => confirm(record.id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined />
                        </Popconfirm>
                    </Space>
                )

            ),
        },



    ];

    const filterData = annuaireliste.filter((item) =>
        Object.values(item).some(
            (value) =>
                value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
    );


    //tooltipe
    const [tooltipData, setTooltipData] = useState(null);

    const handleMouseEnter = async (homePhone, e) => {
        try {
            e.currentTarget.style.transform = 'scale(1.05)'; // Agrandit la carte au survol
            const response = await axios.get(`${url}selectPhone/${homePhone}`);
            setTooltipData(response.data); // Met à jour l'état avec les données reçues pour le tooltip
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'scale(1)'; // Réinitialise la taille de la carte après le survol
        setTooltipData(null); // Réinitialise les données du tooltip
    };

    useEffect(() => {
        recupeannuaire();
        tester();
    }, []);

    return (
        <div>
            <br /><br /><br /><br /><br />  <br /><br />
            <div >
                <div className="titleHolder">
                    <h1 style={{ textAlign: 'center' }}>Annuaire téléphonique</h1>

                    {/* Composant de recherche */}
                    <AutoComplete
                        value={searchValue1}
                        onChange={onSearchChange}
                        style={{ width: 300, marginBottom: '20px' }}
                        options={filteredEntries.map(entry => ({ value: entry.cn }))}
                    >
                        <Input.Search
                            size="large"
                            placeholder="Rechercher..."
                            enterButton
                        />
                    </AutoComplete>
                    <div style={{ padding: '16px', overflowY: 'auto', maxHeight: '450px', width: '95%', margin: '0 auto' }}>
                        <div style={{ width: '100%' }}>
                            {filteredEntries.length > 0 ? (
                                Array(Math.ceil(filteredEntries.length / 16)).fill().map((_, pageIndex) => (
                                    <div key={pageIndex} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                        <Row gutter={[16, 16]} justify="start" align="top" style={{ width: '100%' }}>
                                            {filteredEntries
                                                .slice(pageIndex * 16, (pageIndex + 1) * 16)
                                                .filter(entry => entry.cn !== 'Non défini' || entry.homePhone !== 'Non défini') // Filtre les entrées indésirables
                                                .map((entry, index) => (
                                                    <Col key={entry.id || index} xs={24} sm={12} md={12} lg={6}>
                                                        <Tooltip
                                                            title={tooltipData ? (
                                                                <div>
                                                                    {tooltipData.map((data, i) => (
                                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                                            <Avatar
                                                                                src={`${url}${data.imageUrl}`}
                                                                                size={48}
                                                                                icon={<UserOutlined />}
                                                                                style={{ marginRight: '12px', border: '1px solid #d9d9d9' }}
                                                                            />
                                                                            <div style={{ lineHeight: '1.2' }}>
                                                                                <p style={{ margin: 0 }}> {capitalizeWords(`${data.prenom}`)}</p>
                                                                                <p style={{ margin: 0 }}>Fixe: {data.Fixe}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : 'Chargement...'}
                                                            placement="top"
                                                            mouseEnterDelay={0.5}
                                                            overlayInnerStyle={{
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                borderRadius: '8px',
                                                                padding: '10px',
                                                            }}
                                                        >
                                                            <Card
                                                                hoverable
                                                                onMouseEnter={(e) => handleMouseEnter(entry.homePhone, e)}
                                                                onMouseLeave={handleMouseLeave}
                                                                style={{
                                                                    minHeight: '100px',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                                    transition: 'transform 0.3s ease-in-out',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <Meta
                                                                    avatar={
                                                                        <Avatar
                                                                            src={entry.avatarUrl || null}
                                                                            icon={<PhoneOutlined />}
                                                                            size={64}
                                                                        />
                                                                    }
                                                                    title={entry.cn}
                                                                    description={`Téléphone: ${entry.homePhone}`}
                                                                />
                                                            </Card>
                                                        </Tooltip>
                                                    </Col>
                                                ))}
                                        </Row>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun résultat trouvé</p>
                            )}
                        </div>
                    </div>












                    <br /><br />



                    <h2>Annuaire</h2>

                    {contextHolder}

                    <AutoComplete
                        popupMatchSelectWidth={252}
                        style={{ width: 300 }}
                        size="large"
                    >
                        <Input.Search
                            size="large"
                            placeholder="Rechercher..."
                            enterButton
                            onChange={handleSearchChange}
                            value={searchValue}
                        />
                    </AutoComplete>
                </div>




                <div style={{ textAlign: 'center' }}>
                    {statut === 'Super admin' || statut === 'Admin' ? (
                        <Button type="primary" onClick={() => setIsModalOpenajout(true)}>Ajout</Button>
                    ) : (
                        <Tooltip title="Veuillez vous connecter avant de publier">
                            <Button type="primary" style={{ display: 'none' }}>
                                Publier ressources
                            </Button>
                        </Tooltip>
                    )}
                    <Button onClick={exportToExcel}>Exporter en excel</Button>
                </div>

                <br />  <br />
            </div>


            <div style={{ textAlign: 'center', padding: '16px', overflowX: 'auto', maxHeight: '500px', width: '95%', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={filterData}
                        style={{ cursor: 'pointer' }}
                        {...actionColumnProps}
                        onRow={(record, rowIndex) => ({
                            onClick: (event) => handleRowClick(record, event),
                        })}
                    />
                </div>
            </div>

            <br /><br /> <br />

            <Modal
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ maxWidth: 345, textAlign: 'center', borderRadius: '30px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 1.9)' }}
                footer={modalFooter}
            >


                <Avatar
                    style={{
                        width: 200,
                        height: 200,
                        margin: 'auto',
                        marginTop: 2,
                        backgroundColor: '#F2F6F7',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 20)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    alt="Description de l'image"
                >
                    <img
                        src={url + imgs}
                        alt="Description de l'image"
                        style={{
                            width: 170,
                            height: 170,
                            objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                            borderRadius: '50%',
                        }}
                    />
                </Avatar>

                <br /><br />
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Badge.Ribbon text={mats} style={{ width: '100%', textAlign: 'center' }} color="green">
                        <br />

                        <Card size="small">{prenoms && noms && `${prenoms} ${noms.toUpperCase()}`}</Card>

                        <Card size="small">Société: {socs}</Card>

                        <Card size="small">Département: {deps}</Card>

                        <Card size="small">Fonction: {postes}</Card>
                        <Card size="small">Fixe: {fix}</Card>
                        <Card size="small">Téléphone: {tels}</Card>

                        <Card size="small">
                            E-mail:<a href={`mailto:${mails}`}> {mails}</a>
                        </Card>

                    </Badge.Ribbon>
                </Space>
            </Modal>







            <Modal title={<div style={{ textAlign: 'center' }}>Modification</div>} visible={isModalOpens} footer={modalFooters} onCancel={handleCancels} width={300}>
                <Input placeholder="Matricule" allowClear value={matmodif} onChange={handleChangematmodif} />
                <br />
                <br />
                <Input placeholder="Nom" allowClear value={nommodif} onChange={handleChangeNommodif} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" allowClear value={prenommodif} onChange={handleChangePrenommodif} />

                <br /> <br />
                <DatePicker
                    onChange={handleDateChangemodif}
                    style={{ width: '100%' }}
                    placeholder='Date de naissance'
                    format="YYYY-MM-DD"
                    value={birthmodif ? moment(birthmodif, 'YYYY-MM-DD').utcOffset(0, true) : null}
                />
                <br /> <br />
                <Select
                    style={{ width: 250 }}
                    placeholder="Sociétés"
                    onChange={handleChangeSocietemodif}
                    value={socmodif}
                >
                    <Option value="NP AKADIN Services">NP AKADIN Services</Option>
                    <Option value="AKADIN">AKADIN</Option>
                    <Option value="STD">STD</Option>
                    <Option value="GUILMANN">GUILMANN</Option>
                    <Option value="STTA">STTA</Option>
                    <Option value="SPIDER">SPIDER</Option>
                </Select>

                <br /> <br />
                <Input placeholder="Département" allowClear value={depmodif} onChange={(e) => setDepmodif(e.target.value)} />

                <br /> <br />
                <Input placeholder="Postes" allowClear value={postemodif} onChange={(e) => setPostemodif(e.target.value)} />
                <br /> <br />



                <Input placeholder="E-mail" allowClear value={mailmodif} onChange={handleChangeEmailmodif} />
                <br />
                <br />
                <Input placeholder="Fixe" allowClear value={fixup} onChange={handleChangefixemodif} />

                <br /> <br />
                <Input placeholder="Téléphone" allowClear value={phonemodif} onChange={handleChangeTelephonemodif} />
                <br /> <br />
                <Select
                    style={{ width: 100 }}
                    placeholder="Ordre"
                    value={ordremodif}
                    onChange={(value) => setOrdremodif(value)} // Utilisez directement la valeur sélectionnée
                >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>

                <br /> <br />
                <Input type="file" onChange={handleFileChangeup} inputProps={{ accept: '.jpg, .png' }} id="fileToUpload" />
            </Modal>









            {/* ajouter  */}

            <Modal title={<div style={{ textAlign: 'center' }}>Ajout </div>} visible={isModalOpenajout} footer={modalFooterajout} onCancel={handleCancelajout} width={300}>
                <Input placeholder="Matricule" allowClear value={matajout} onChange={(e) => setMatajout(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Nom" allowClear value={nomajout} onChange={(e) => setNomajout(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Prénom(s)" allowClear value={prenomajout} onChange={(e) => setPrenomajout(e.target.value)} />

                <br /> <br />
                <DatePicker
                    onChange={handleDateChange}
                    style={{ width: '100%' }}
                    placeholder='Date de naissance'
                    format="YYYY-MM-DD" // Assurez-vous que le format est conforme à ce que vous attendez
                />
                <br /> <br />
                <Select
                    style={{ width: 250 }}
                    placeholder="Sociétés"
                    onChange={handleChangeSocieteajout}
                    value={socajout}
                >
                    <Option value="NP AKADIN Services">NP AKADIN Services</Option>
                    <Option value="AKADIN">AKADIN</Option>
                    <Option value="STD">STD</Option>
                    <Option value="GUILMANN">GUILMANN</Option>
                    <Option value="STTA">STTA</Option>
                    <Option value="SPIDER">SPIDER</Option>
                </Select>

                <br /> <br />

                <Select
                    style={{ width: 250 }}
                    placeholder="Département"
                    value={depSelectedajout || (depajout ? depajout : '')}
                    onChange={handleChangeDepartementajout}
                >
                    {Array.isArray(depajout) ? (
                        depajout.map((departement, index) => (
                            <Option key={index} value={departement.dep}> {departement.dep}</Option>
                        ))
                    ) : (
                        <Option > null</Option>
                    )}
                </Select>
                <br /> <br />

                <Select
                    style={{ width: 250 }}
                    placeholder="Postes"
                    value={selectposteajout}
                    onChange={handleChangePosteajout}
                >
                    {/* Utilisez la méthode map pour afficher chaque poste comme une option */}
                    {posteajout.map((posteItem, index) => (
                        <Option key={index} value={posteItem.poste}>{posteItem.poste}</Option>
                    ))}
                </Select>

                <br /> <br />



                <Input placeholder="E-mail" allowClear value={mailajout} onChange={(e) => setMailajout(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Fixe" allowClear value={fix} onChange={(e) => setFix(e.target.value)} />
                <br />
                <br />
                <Input placeholder="Téléphone" allowClear value={telajout} onChange={(e) => setTelajout(e.target.value)} />

                <br /> <br />


                <Input type="file" onChange={handleFileChangead} inputProps={{ accept: '.jpg, .png' }} id="fileToUpload" />
            </Modal>


        </div >
    );
};

export default Annuaire;
