
import { Fade } from 'react-reveal';
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import InputLabel from '@mui/material/InputLabel';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Listeuser = () => {
    const statut = sessionStorage.getItem('poste');

    if (statut !== 'Super admin') {
        Redirect('/')
    }
    const url = 'http://172.16.0.92:8000/'
    const [liste, setListe] = useState([])
    const [alersuccss, setAlersuccss] = useState(false);
    const [alertm, setAlertm] = useState(false)
    const [opens, setOpens] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalsuppr, setOpenModalsuppr] = useState(false);

    const [openModals, setOpenModals] = useState(false);
    const [openModalss, setOpenModalss] = useState(false);
    const [idsa, setIdsa] = useState('');
    const [ida, setIda] = useState('');
    const [idu, setIdu] = useState('');
    const [idchange, setIdchange] = useState('');
    const [nom1, setNom1] = useState('')
    const [mail1, setMail1] = useState('')
    const [poste1, setPoste1] = useState('')
    const [idfafana, setIdfanana] = useState('')
    const [alertsupp, setAlertsupp] = useState(false)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const opensuperadmin = (id) => {
        setIdsa(id)
        setOpenModal(true)
    }


    const handleCloses = () => {
        setOpens(false);
    };

    const openadmin = (id) => {
        setIda(id)
        setOpenModals(true)
    }
    const openu = (id) => {
        setIdu(id)
        setOpenModalss(true)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getAlluserliste = async () => {
        try {
            const getAlluserliste = await axios.get(`${url}getAlluserliste`)

            setListe(getAlluserliste.data)
        } catch (error) {
            console.log(error);
        }

    }



    const autorisersuperadmin = async () => {

        try {
            const response = await axios.put(`${url}autorisersuperadmin/${idsa}`);

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    const autoriseradmin = async () => {

        try {
            const response = await axios.put(`${url}autoriseradmin/${ida}`);

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    const autoriser = async () => {

        try {
            const response = await axios.put(`${url}autoriser/${idu}`);
            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    const modaledit = async (id, nom, mail, poste) => {
        setIdchange(id)
        setNom1(nom)
        setMail1(mail)
        setPoste1(poste)
        setOpens(true)
    }

    const valider = async () => {
        const data = { nom: nom1, mail: mail1, poste: poste1 };

        try {

            const response = await axios.put(`${url}valider/${idchange}`, data);
            setAlertm(true)
            setTimeout(() => {
                setAlertm(false)
                window.location.reload()
            }, 1500);
        } catch (error) {
            console.log(error);
        }

    }
    const openmanokatra = (id) => {
        setIdfanana(id)
        setOpenModalsuppr(true)
    }

    const confirmersuppression = async () => {


        try {

            const response = await axios.delete(`${url}confirmersuppression/${idfafana}`);
            setAlertm(true)
            setTimeout(() => {
                setAlertm(false)
                window.location.reload()
            }, 1500);
        } catch (error) {
            console.log(error);
        }

    }

    const columns = [

        { id: 'nom', label: 'Nom', minWidth: 170 },
        { id: 'mail', label: 'Mail', minWidth: 170 },
        { id: 'Date', label: 'Date', minWidth: 170 },
        { id: 'Statut', label: 'Statut', minWidth: 170 },
        { id: 'action', label: 'Actions', minWidth: 170, textAlign: 'center' },

    ];


    useEffect(() => {
        getAlluserliste()
    }, [])
    return (
        <>

            <section className='backliste'>
                <div >
                    <Fade top>
                        <h1 style={{ fontSize: '80px', color: 'white' }}>Liste utilisateur </h1>
                    </Fade>

                </div>
            </section>
          
            <h1 className="heading" style={{ color: ' #329358 ', fontSize: '2.2rem', textAlign: 'center' }}>Les utilisateurs</h1>
            <div style={{ textAlign: "center" }}  >
                <TextField label="Recherche" style={{ textAlign: "center", width: '500px', marginBottom: '20px', backgroundColor: 'white' }} variant="outlined" InputProps={{
                    startAdornment: (<SearchIcon fontSize="small" />),
                }} fullWidthvalue={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            {(statut !== "Utilisateur") ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <div style={{ margin: '0 50px' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead style={{ color: '#1565C0' }}>
                                    <TableRow >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                                style={{ minWidth: column.minWidth, backgroundColor: '#1565C0', color: 'white' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {liste
                                        .filter((row) => {
                                            // Filtrer en fonction de la valeur de recherche dans les colonnes pertinentes
                                            return (
                                                row.nom.toLowerCase().includes(searchValue.toLowerCase()) ||
                                                row.mail.toLowerCase().includes(searchValue.toLowerCase())
                                            );
                                        })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                                    <TableCell align="left">{row.nom}</TableCell>
                                                    <TableCell align="left">{row.mail}</TableCell>
                                                    <TableCell align="left">{row.createdAt}</TableCell>
                                                    <TableCell align="left">{row.poste}</TableCell>
                                                    <TableCell>

                                                        {(statut === "Super admin") ? (
                                                            <TableCell align="center">
                                                                <IconButton aria-label="edit" style={{ color: ' #329358 ' }} >
                                                                    <EditIcon onClick={() => modaledit(row.id, row.nom, row.mail, row.poste)} />
                                                                </IconButton>
                                                                <IconButton style={{ color: 'red' }} aria-label="delete"  >
                                                                    <DeleteForeverIcon onClick={() => openmanokatra(row.id)} />
                                                                </IconButton>
                                                                <Button className="btn btn-danger" onClick={() => opensuperadmin(row.id)}>Super admin</Button>
                                                                <Button className="btn btn-primary" onClick={() => openadmin(row.id)}>Admin</Button>
                                                                <Button className="btn btn-success" onClick={() => openu(row.id)} >Utilisateur</Button>
                                                            </TableCell>
                                                        ) : null}


                                                    </TableCell>


                                                </TableRow>
                                            );
                                        })}
                                </TableBody>




                            </Table>
                        </TableContainer>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={liste.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            ) : null}
           


           


            <Modal open={openModal} onClose={() => setOpenModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                }}>
                    <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
                    <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous certain de vouloir attribuer le statut de super administrateur à cette personne?</span>



                    </Typography>
                    <Button style={{ color: 'red' }} onClick={autorisersuperadmin}>Oui</Button>
                    <Button onClick={() => setOpenModal(false)}>Annuler</Button>
                </div>
            </Modal>


            <Modal open={openModals} onClose={() => setOpenModals(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                }}>
                    <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
                    <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous certain de vouloir attribuer le statut de  administrateur à cette personne?</span>



                    </Typography>
                    <Button style={{ color: 'red' }} onClick={autoriseradmin}>Oui</Button>
                    <Button onClick={() => setOpenModals(false)}>Annuler</Button>
                </div>
            </Modal>

            <Modal open={openModalss} onClose={() => setOpenModals(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                }}>
                    <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
                    <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous certain de vouloir attribuer le statut de  administrateur à cette personne?</span>
                    </Typography>
                    <Button style={{ color: 'red' }} onClick={autoriser}>Oui</Button>
                    <Button onClick={() => setOpenModalss(false)}>Annuler</Button>
                </div>
            </Modal>





            <Modal open={opens} onClose={handleCloses}>
                <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
                    <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
                    {alertm ? (<Alert>Modification avec succes</Alert>) : null}
                    <TextField id="outlined-basic" label="Nom" variant="outlined" sx={{ mb: 2 }} value={nom1} onChange={(e) => setNom1(e.target.value)} /> <br />
                    <TextField id="outlined-basic" label="Mail" variant="outlined" sx={{ mb: 2 }} value={mail1} onChange={(e) => setMail1(e.target.value)} /><br />
                    <InputLabel id="demo-simple-select-label" >Statut</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        fullWidth
                        label="Statut"
                        value={poste1}
                        onChange={(e) => setPoste1(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="Super admin">Super admin</MenuItem>
                        <MenuItem value="Administrateur">Administrateur</MenuItem>
                        <MenuItem value="Utilisateur">Utilisateur</MenuItem>
                    </Select><br />



                    <Button variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }} onClick={valider}>Enregistrer</Button>
                </div>
            </Modal>

            <Modal open={openModalsuppr} onClose={() => setOpenModalsuppr(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                }}>
                    <WarningIcon style={{ color: 'red', fontSize: '2rem', marginBottom: '1px' }} />
                    <DialogTitle style={{ color: 'red', fontSize: '1.5rem', marginTop: '-20px' }}>Confirmation</DialogTitle>
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: 'black' }}>Êtes-vous certain de vouloir supprimer ?</span>
                        {alertsupp ? <Alert>Suppression réussie</Alert> : null}


                    </Typography>
                    <Button style={{ color: 'red' }} onClick={confirmersuppression}>Oui</Button>
                    <Button onClick={() => setOpenModalsuppr(false)}>Annuler</Button>
                </div>
            </Modal>


        </>
    );
};

export default Listeuser;