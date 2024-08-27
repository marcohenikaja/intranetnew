import React from 'react';
import { useState, useEffect, useRef } from "react"
import icons from '../../assets/logopng/ICONS.png'
import xlsx from '../../assets/logopng/xlsx.png'
import iconw from '../../assets/logopng/wordico.png'
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios from "axios"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import { InputLabel, MenuItem, Select } from "@mui/material"
import Rh from '../pole/Rh'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import imgassdir from '../../assets/pole/Pole-6 RH.png'
import { Typography } from 'antd';
const { Title } = Typography;

const Ressrh = () => {

    const url = 'http://172.16.0.92:8000/'

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const statut = sessionStorage.getItem('poste');
    const [getfichier, setFichier] = useState([])
    const [idtemp, setIdtemp] = useState("");
    const [idtemps, setIdtemps] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [titrenew, setTitrenew] = useState("");
    const ids = sessionStorage.getItem('ids');
    const loggedInUser = sessionStorage.getItem('loginUser');
    const loggedInPwd = sessionStorage.getItem('pwdUser');
    const postes = sessionStorage.getItem('poste');
    const [opens, setOpens] = useState(false);
    const [alersuccss, setAlersuccss] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [alertmamafa, setAlertmamafa] = useState(false)
    const [deps, setDeps] = useState("");
    const tester = useRef();
    const [selectedPole, setSelectedPole] = useState("");


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                tester.current.classList.add('annimer');
                tester.current.addEventListener('animationend', () => {
                    tester.current.classList.remove('annimer');
                });
            }
        });

        if (tester.current) {
            observer.observe(tester.current);
        }

        return () => {
            if (tester.current) {
                observer.unobserve(tester.current);
            }
        };
    }, []);


    const testeo = (id) => {
        console.log(typeof id);
    }



    const columns = [
        { id: 'Titre', label: 'Titre', minWidth: 100 },

        { id: 'Pôles', label: 'Pôles', minWidth: 100 },
        { id: 'Type', label: 'Type', minWidth: 170 },
        { id: 'Action', label: 'Action', minWidth: 170 },

    ];


    const makafichierdaf = async () => {
        try {
            const fichier = await axios.get(`${url}makafichierrh`).then((result) => {
                setFichier(result.data);
            })
        } catch (error) {
            console.log(error);
        }

    }

    const openModalconf = async (id) => {
        setIdtemp(id)
        setOpenModal(true)

    }

    const handleOpens = (id, t) => {
        setTitrenew(t)
        setIdtemps(id)
        setOpens(true);
    };
    const deleteMedia = async (idtemp) => {

        try {
            const med = await axios.delete(`${url}deleteMedia/${idtemp}`).then((result) => {
                makafichierdaf()
                setAlertmamafa(true)
                setTimeout(() => {
                    setAlertmamafa(false)
                    setOpenModal(false)
                }, 1500);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleCloses = () => {
        setOpens(false);
    };

    const modifmedia = async () => {

        const data = { titrenew, deps }
        try {
            const med = await axios.put(`${url}modifmedia/${idtemps}`, data).then((result) => {
                setTitrenew("")
                setAlersuccss(true)
                makafichierdaf()
                setTimeout(() => {
                    setAlersuccss(false)
                    setOpens(false);
                }, 1500);
            })
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const element = document.getElementById('animated-element');
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Si l'élément animé est visible à l'écran, activez l'animation
            if (elementPosition < windowHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
    };


    useEffect(() => {
    }, [getfichier]);

    useEffect(() => {
        makafichierdaf()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const toggleImageSize = () => {
        setIsImageEnlarged(!isImageEnlarged);
    };
    return (
        <div>
            <div className="titleHolder">
                <br /> <br /> <br />   <br />
                <div class="worksBlock">
                    <div class="video-container">
                        <img style={{ width: '100%' }} src={imgassdir} />
                        <div class="text-overlay">
                            <Title style={{ color: 'white', fontSize: '50px' }}>Ressources Humaines</Title>
                        </div>
                    </div>
                </div>
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>  Le pôle Ressources Humaines - architectes de l'épanouissement professionnel collectif</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'justify', margin: '0 auto', padding: '0 100px' }}>
                    Œuvrant pour chaque entité du groupe, le pôle ressources humaines est l'architecte de l'épanouissement professionnel collectif. En tant que gardiens du capital humain, ce pôle place l'humain au cœur de notre succès, travaillant à créer un environnement où chaque collaborateur peut s'épanouir et contribuer à notre réussite commune.
                    <p><b> Gestion intégrée des talents :</b>  Le pôle ressources humaines orchestre une gestion intégrée des talents, identifiant et développant les compétences nécessaires pour répondre aux besoins de chaque entité du groupe.</p>
                    <p><b>Développement professionnel :</b>L'évolution constante est encouragée. Notre équipe RH propose des programmes de développement professionnel, offrant aux collaborateurs les outils nécessaires pour exceller dans leurs rôles.</p>
                    <p><b>Gestion des performances :</b>  La performance individuelle contribue à notre succès collectif. Le Pôle RH établit des mécanismes pour suivre et évaluer les performances, favorisant une culture de l'excellence.</p>
                    <p><b> Gestion des relations sociales : </b>  Les relations harmonieuses sont fondamentales. Ce pôle veille à la gestion constructive des relations sociales, favorisant un environnement de travail sain et collaboratif.</p>
                    <p><b>  Recrutement stratégique :</b>  Les talents sont le moteur de notre croissance. Le Pôle RH met en œuvre des stratégies de recrutement efficaces pour attirer les meilleurs profils et renforcer nos équipes.</p>
                    <p><b> Bien-être au travail :</b>   L'épanouissement professionnel va de pair avec le bien-être. Notre équipe RH travaille à créer un environnement où chaque collaborateur se sent soutenu et valorisé.</p>
                    <p><b> Formations et développements continus :</b>  L'apprentissage est un parcours continu. Le Pôle RH propose des programmes de formation adaptés, favorisant une culture d'apprentissage permanent.</p>


                    Notre pôle ressources humaines contribue à bâtir une culture d'épanouissement professionnel. Gardiens du capital humain, ce pôle façonne un environnement où chaque talent est reconnu, développé et épanoui.

                </p>
                <br /> <br />
            </div>

            <div className="titleHolder">
                <h2 style={{ color: '#00912B' }}>    Nos documents partagés</h2>
            </div>
            <div className="contentHolder">

                <p style={{ textAlign: 'center', margin: '0 auto', padding: '0 50px' }}>
                    Votre accès à une bibliothèque complète de soutien professionnel. Découvrez toutes les ressources numériques mises à votre disposition pour maximiser votre efficacité au travail. Cette section offre un accès instantané à une variété de documents et d'outils essentiels, soigneusement organisés pour faciliter vos recherches et améliorer votre expérience au sein de notre entreprise.
                </p>
                <br /> <br />
            </div>

            <br /> <br />
            <div style={{ textAlign: "center", marginTop: "20px" }}  >
                <TextField label="Recherche" style={{ textAlign: "center", width: '500px', marginBottom: '20px', backgroundColor: 'white' }} variant="outlined" InputProps={{
                    startAdornment: (<SearchIcon fontSize="small" />),
                }} fullWidthvalue={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> <br />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ width: '85%', overflow: 'auto', textAlign: 'center', alignItems: 'center' }} ref={tester}>
                    <TableContainer sx={{ maxHeight: '600px' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead style={{ color: '#1565C0' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align="left"
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: '#1565C0',
                                                color: 'white',
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {getfichier
                                    .filter((row) => {
                                        return (
                                            ((row.titre && row.titre.toLowerCase().includes(searchValue.toLowerCase())) ||
                                                (row.prenom && row.description.toLowerCase().includes(searchValue.toLowerCase()))) &&
                                            (selectedPole === '' || row.service === selectedPole) // Filtrage par le pôle
                                        );
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        let fileExtension = row.imageUrl.split('.').pop();
                                        let imageToShow;

                                        if (fileExtension === 'pdf') {
                                            imageToShow = icons;
                                        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                                            imageToShow = iconw;
                                        } else if (fileExtension === 'xlsx' || fileExtension === 'xlx') {
                                            imageToShow = xlsx;
                                        } else {
                                            imageToShow = 'default.png';
                                        }

                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                <TableCell align="left">{row.titre}</TableCell>
                                                <TableCell align="left"> {row.service} </TableCell>
                                                <TableCell align="left">
                                                    <a href={url + row.imageUrl} target="_blank" rel="noopener noreferrer">
                                                        <img src={imageToShow} alt='' />
                                                    </a>
                                                </TableCell>

                                                <TableCell>
                                                    {(loggedInUser || loggedInPwd) && (
                                                        (statut === 'Super admin' || statut === 'Administrateur') ||
                                                        (statut === 'Utilisateur' && row.id_pers.toString() === ids)
                                                    ) && (
                                                            <div style={{ textAlign: 'center' }}>
                                                                <TableCell align="center">
                                                                    <IconButton aria-label="edit" style={{ color: ' #329358 ' }} onClick={() => handleOpens(row.id, row.titre)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                    <IconButton style={{ color: 'red' }} aria-label="delete" onClick={() => openModalconf(row.id)}>
                                                                        <DeleteForeverIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </div>
                                                        )}
                                                </TableCell>



                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={getfichier.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <br /><br />

            <Rh />

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                }}>
                    <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
                    <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
                    {alertmamafa ? (<Alert>Fichier supprimé avec succes</Alert>) : null}
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous sûr de vouloir supprimer ce fichier? </span>
                    </Typography>
                    <Button onClick={() => deleteMedia(idtemp)} style={{ color: 'red' }}>Oui</Button>
                    <Button onClick={() => setOpenModal(false)}>Annuler</Button>
                </div>
            </Modal>

            <Modal open={opens} onClose={handleCloses}>
                <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '300px' }}>
                    <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
                    {alersuccss ? <Alert severity="success">
                        Modification avec success
                    </Alert> : null}
                    <TextField style={{ marginTop: '20px' }} label="Titre" value={titrenew} onChange={(e) => setTitrenew(e.target.value)} /> <br />
                    <InputLabel>Pôles</InputLabel>
                    <Select style={{ marginTop: '20px', width: "100%" }} onChange={(e) => setDeps(e.target.value)} >
                        <MenuItem value="Services généraux">Services généraux</MenuItem>
                        <MenuItem value="HSSE">HSSE</MenuItem>
                        <MenuItem value="Marketing et Communication">Marketing et Communication</MenuItem>
                        <MenuItem value="Système d'information">Système d'information</MenuItem>
                        <MenuItem value="Supply Chain" >Supply Chain</MenuItem>
                        <MenuItem value="Ressources Humaines" >Ressources Humaines</MenuItem>
                        <MenuItem value="Administratif et Financier" >Administratif et Financier</MenuItem>
                        <MenuItem value="Assistance de direction">Assistance de direction</MenuItem>
                    </Select>
                    <br />
                    <Button variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={modifmedia}>Enregistrer</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Ressrh;