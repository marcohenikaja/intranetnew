
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import Pagination from '@mui/material/Pagination';
import { useEffect } from "react"
import { Box, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Image } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'
import { Fade } from 'react-reveal'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Modal } from '@mui/material';
import { Backdrop } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Grid } from '@mui/material';
const itemsPerPage = 8;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Actuscollab = () => {
  const url = 'http://172.16.0.92:8000/'
  const statut = sessionStorage.getItem('poste');
  const [journal, setJournal] = useState([])
  const [getcomment, setGetcomment] = useState([])
  const loggedInUser = sessionStorage.getItem('loginUser');
  const loggedInPwd = sessionStorage.getItem('pwdUser');
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [alertup, setAlertup] = useState(false)
  const [sokafana, setSokafana] = useState(false)
  const [alertsup, setAlertsup] = useState(false)
  const [idsuppr, setIdsuppr] = useState("")
  const [idup, setIdup] = useState("")
  const [titreupd, setTitreupd] = useState("")
  const [descupd, setDescupd] = useState("")
  const [ouvrir, setOuvrir] = useState(false)
  const [act, setAct] = useState(false)
  const [pole, setPole] = useState('');
  const ids = sessionStorage.getItem('ids');

  const [comments, setComments] = useState({});
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [loremCollapse, setLoremCollapse] = useState({});

  const [alertcomment, setAlertcomment] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const [expandedState, setExpandedState] = useState({});



  const [likeCount, setLikeCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState({});

  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ ...anchorEl, [index]: null });
  };



  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };



  const handleExpandClick = async (cardId) => {
    setExpandedCardId((prevExpandedCardId) => (prevExpandedCardId === cardId ? null : cardId));
    try {
      const getallcomment = await axios.get(`${url}getallcomment/${cardId}`).then((result) => {
        console.log(result.data);
        setGetcomment(result.data);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handleChatIconClick = async (cardId) => {
    setLoremCollapse((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));

    try {
      const getallcomment = await axios.get(`${url}getallcomment/${cardId}`).then((result) => {
        console.log(result.data);
        setGetcomment(result.data);
      })
    } catch (error) {
      console.log(error);
    }
  };



  const [page, setPage] = useState(1); // État pour le numéro de page actuel

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = journal.slice(indexOfFirstItem, indexOfLastItem);


  const sendComment = async (cardId) => {
    const comment = comments[cardId];
    const data = { cardId, comment, ids };
    if (comment === "" || comment === undefined) {
      setAlertcomment(true);
      setTimeout(() => {
        setAlertcomment(false);
      }, 1500);
      return;
    } else {
      try {
        const response = await axios.post(`${url}sendComment`, data);
        if (response.data.success === true) {
          const getallcomment = await axios.get(`${url}getallcomment/${cardId}`).then((result) => {
            console.log(result.data);
            setGetcomment(result.data);
          });
          setComments({});
        } else {
          alert("erreur");
        }
      } catch (error) {
        alert(error)
      }
    }

  };




  const changercommentaire = (e, cardId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [cardId]: e.target.value,
    }));
  };




  const makamedia = async () => {
    try {
      const medias = await axios.get(`${url}makamediacollab`).then((result) => {
        console.log(result.data);
        setJournal(result.data);

      })
    } catch (error) {
      console.log(error);
    }

  }






  const updatearticle = (id, titre, desc) => {
    setOuvrir(true)
    setTitreupd(titre)
    setDescupd(desc)
    setIdup(id)
  }

  const suppart = (id) => {
    setSokafana(true)
    setIdsuppr(id)
  }


  const manovaarticle = async () => {
    const data = { titre: titreupd, description: descupd, pole: pole, nom: loggedInUser, idup };
    if (pole == "") {
      setAct(true);
      setTimeout(() => {
        setAct(false);
      }, 2000);
      return;
    } else {
      try {
        const up = await axios.put(`${url}manovaarticle/${idup}`, data)
        setAlertup(true)

        setTimeout(() => {
          setAlertup(false)
          setOuvrir(false)
          setPole('')
          window.location.reload()
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

  }
  const supprarticle = async () => {

    try {
      const suppridselected = await axios.delete(`${url}supprarticle/${idsuppr}`)

      setAlertsup(true)
      setTimeout(() => {
        setSokafana(false)
        setAlertsup(false)
        window.location.reload()
      }, 100);
    } catch (error) {
      console.log(error);
    }

  }







  useEffect(() => {
    makamedia()
  }, [])


  return (

    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ margin: '0 -8px' }}>
        {currentItems.map((val) => {
          const cardId = val.id;
          const isCardExpanded = expandedCardId === cardId;
          const date = new Date(val.createdAt);
          const fileExtension = val.imageUrl.split('.').pop().toLowerCase();

          if (fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mov') {
            return (
              <Grid item key={val.id} xs={12} sm={6} md={4} lg={3} sx={{ padding: '0 8px' }}>

                <Card sx={{ maxWidth: 450, height: isCardExpanded ? 'auto' : 500, boxShadow: '0 4px 8px rgba(0.8, 0, 0, 0.8)' }}>
                  <CardHeader key={val.id}
                    avatar={
                      <Avatar sx={{ bgcolor: '#009918' }} aria-label="recipe">
                        {val.nom_pers &&
                          val.nom_pers.split('.')[1] &&
                          val.nom_pers.split('.')[1].charAt(0).toUpperCase()}
                      </Avatar>

                    }
                    action={

                      <>
                        <IconButton aria-label="settings">
                          <MoreVertIcon onClick={(e) => handleClick(e, val.id)} />

                        </IconButton>

                        <StyledMenu
                          id={`demo-customized-menu-${val.id}`}
                          MenuListProps={{
                            'aria-labelledby': `demo-customized-button-${val.id}`,
                          }}
                          anchorEl={anchorEl[val.id]}
                          open={Boolean(anchorEl[val.id])}
                          onClose={() => handleClose(val.id)}
                        >


                          {(loggedInUser || loggedInPwd) && (
                            (statut === 'Super admin' || statut === 'Administrateur') ||
                            (statut === 'Utilisateur' && val.id_pers.toString() === ids)
                          ) && (
                              <>
                                <MenuItem key="edit" onClick={() => updatearticle(val.id, val.titre, val.description)} disableRipple>
                                  <EditIcon />
                                  Modifier
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => suppart(val.id)} disableRipple>
                                  <DeleteOutlinedIcon />
                                  Supprimer
                                </MenuItem>,
                              </>
                            )}

                        </StyledMenu>
                      </>
                    }
                    title={
                      <Typography variant="h6" component="div" sx={{ color: 'black', textTransform: 'none' }}>

                        {val.nom_pers && val.nom_pers.split('.')[1] && val.nom_pers.split('.')[1].split('@')[0].charAt(0).toUpperCase() + val.nom_pers.split('.')[1].split('@')[0].slice(1)}
                      </Typography>


                    }
                    subheader={
                      <Typography variant="subtitle2" component="div" sx={{ color: 'black', textTransform: 'none' }}>
                        {date.toLocaleString('fr-FR')}
                      </Typography>
                    }
                  />

                  <Tooltip title={val.titre}>
                    <Typography variant="body2" color="text.secondary">
                      <b style={{ marginLeft: '28px' }}> {val.titre.length > 30 ? val.titre.slice(0, 30) + '...' : val.titre}</b>
                    </Typography>

                  </Tooltip>
                  {fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png' ? (
                    <CardContent style={{ height: '350px', overflow: 'hidden', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Image
                        width={350}
                        height={350}
                        src={url + val.imageUrl}
                        alt="Description de l'image"
                        style={{ objectFit: 'cover', cursor: 'pointer' }}
                      />
                    </CardContent>
                  ) : (
                    <CardContent style={{ height: '350px', overflow: 'hidden', position: 'relative' }}>

                      <img
                        alt={val.titre} src={`${url}${val.urlthm}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => {
                          window.open(`${url}${val.imageUrl}`, '_blank');
                        }} />


                      <PlayCircleIcon
                        onClick={() => { window.open(`${url}${val.imageUrl}`, '_blank'); }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '3em', // Ajustez la taille ici
                          color: '#009918', // Changez la couleur si nécessaire
                          cursor: 'pointer',
                        }}
                      />
                    </CardContent>


                  )}
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                      {/* <FavoriteIcon />
                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                          {likeCount}
                        </Typography> */}
                    </IconButton>
                    <IconButton
                      aria-label="share"
                      onClick={() => handleChatIconClick(cardId)}
                      aria-expanded={expandedState[cardId]}
                    >
                      <ChatIcon />
                    </IconButton>

                    <ExpandMore
                      expand={isCardExpanded}
                      onClick={() => handleExpandClick(cardId)}
                      aria-expanded={isCardExpanded}
                      aria-label="show more"
                    >
                      <Tooltip title='Description'>
                        <ExpandMoreIcon />
                      </Tooltip>
                    </ExpandMore>


                  </CardActions>

                  <Collapse in={isCardExpanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      {alertcomment ? <Alert severity="error">Le commentaire ne doit pas être vide.</Alert> : null}
                      <Typography variant="body2" color="text.secondary">
                        {val.description}
                      </Typography>
                      <CardContent >
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Commenter"
                          multiline
                          fullWidth
                          maxRows={4}
                          variant="outlined"
                          value={comments[val.id] || ''}
                          onChange={(e) => changercommentaire(e, val.id)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" key={val.id}>
                                <IconButton color="primary" aria-label="send" key={val.id} onClick={() => sendComment(val.id)}>
                                  <SendIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </CardContent>
                    </CardContent>
                  </Collapse>



                  <Collapse in={loremCollapse[cardId]} timeout="auto" unmountOnExit sx={{ maxHeight: 200, overflowY: 'auto' }}>
                    {getcomment.map((comment) => {
                      const isOverflow = comment.contenu.split('\n').length > 2;

                      const cardContentStyle = {
                        overflow: 'hidden', // Assurez-vous que cette propriété est appliquée à l'élément parent
                      };

                      const contentStyle = {
                        maxHeight: isOverflow ? '2em' : 'none',
                        textOverflow: isOverflow ? 'ellipsis' : 'clip',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      };

                      return (
                        // <CardContent key={comment.id} className={comment.contenu.split('\n').length > 2 ? 'overflow-card-content' : ''} style={cardContentStyle}>
                        //   <div style={{ display: 'flex', alignItems: 'center' }}>
                        //     <Avatar sx={{ bgcolor: '#009918' }} aria-label="recipe">
                        //       {comment.inscription.mail &&
                        //         comment.inscription.mail.split('.')[1] &&
                        //         comment.inscription.mail.split('.')[1].charAt(0).toUpperCase()}
                        //     </Avatar>
                        //     <Typography variant="h7" component="div" sx={{ color: 'black', textTransform: 'none', marginLeft: 2 }}>
                        //       {comment.inscription.mail &&
                        //         comment.inscription.mail.split('.')[1] &&
                        //         comment.inscription.mail.split('.')[1].split('@')[0].charAt(0).toUpperCase() + comment.inscription.mail.split('.')[1].split('@')[0].slice(1)}
                        //     </Typography>
                        //   </div>
                        //   <div style={contentStyle}>
                        //     {comment.contenu}
                        //   </div>
                        // </CardContent>
                        <CardContent key={comment.id} className={comment.contenu.split('\n').length > 2 ? 'overflow-card-content' : ''} style={cardContentStyle}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#009918' }} aria-label="recipe">
                              {comment.inscription.mail &&
                                comment.inscription.mail.split('.')[1] &&
                                comment.inscription.mail.split('.')[1].charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="h7" component="div" sx={{ color: 'black', textTransform: 'none', marginLeft: 2 }}>
                              {comment.inscription.mail &&
                                comment.inscription.mail.split('.')[1] &&
                                comment.inscription.mail.split('.')[1].split('@')[0].charAt(0).toUpperCase() + comment.inscription.mail.split('.')[1].split('@')[0].slice(1)}
                            </Typography>
                          </div>
                          <div style={contentStyle}>
                            {comment.contenu}
                          </div>
                        </CardContent>

                      );
                    })}
                    <br />

                  </Collapse>

                </Card>

              </Grid>
            );
          } else {
            return (

              <Card sx={{ maxWidth: 450, height: isCardExpanded ? 'auto' : 500, margin: '0 0 20px 0', boxShadow: '0 4px 8px rgba(0.8, 0, 0, 0.8)' }}>
                <CardHeader key={val.id}
                  avatar={
                    <Avatar sx={{ bgcolor: '#009918' }} aria-label="recipe">
                      {val.nom_pers &&
                        val.nom_pers.split('.')[1] &&
                        val.nom_pers.split('.')[1].charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <>
                      <IconButton aria-label="settings">
                        <MoreVertIcon onClick={(e) => handleClick(e, val.id)} />
                      </IconButton>
                      <StyledMenu
                        id={`demo-customized-menu-${val.id}`}
                        MenuListProps={{
                          'aria-labelledby': `demo-customized-button-${val.id}`,
                        }}
                        anchorEl={anchorEl[val.id]}
                        open={Boolean(anchorEl[val.id])}
                        onClose={() => handleClose(val.id)}
                      >
                        {(loggedInUser || loggedInPwd) && (
                          (statut === 'Super admin' || statut === 'Administrateur') ||
                          (statut === 'Utilisateur' && val.id_pers.toString() === ids)
                        ) && (
                            <>
                              <MenuItem key="edit" onClick={() => updatearticle(val.id, val.titre, val.description)} disableRipple>
                                <EditIcon />
                                Modifier
                              </MenuItem>,
                              <MenuItem key="delete" onClick={() => suppart(val.id)} disableRipple>
                                <DeleteOutlinedIcon />
                                Supprimer
                              </MenuItem>,
                            </>
                          )}
                      </StyledMenu>
                    </>
                  }
                  title={
                    <Typography variant="h6" component="div" sx={{ color: 'black', textTransform: 'none' }}>

                      {val.nom_pers && val.nom_pers.split('.')[1] && val.nom_pers.split('.')[1].split('@')[0].charAt(0).toUpperCase() + val.nom_pers.split('.')[1].split('@')[0].slice(1)}
                    </Typography>


                  }
                  subheader={
                    <Typography variant="subtitle2" component="div" sx={{ color: 'black', textTransform: 'none' }}>
                      {date.toLocaleString('fr-FR')}
                    </Typography>
                  }
                />

                <Tooltip title={val.titre}>
                  <Typography variant="body2" color="text.secondary">
                    <b>{val.titre.length > 30 ? val.titre.slice(0, 30) + '...' : val.titre}</b>
                  </Typography>
                  <CardContent style={{ height: '350px', overflowY: 'auto' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'none' }}>
                      {val.description}
                    </Typography>

                  </CardContent>
                </Tooltip>

                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                    {/* <FavoriteIcon />
                      <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        {likeCount}
                      </Typography> */}
                  </IconButton>


                  <IconButton
                    aria-label="share"
                    onClick={() => handleChatIconClick(cardId)}
                    aria-expanded={expandedState[cardId]}
                  >
                    <ChatIcon />
                  </IconButton>


                  <ExpandMore
                    expand={isCardExpanded}
                    onClick={() => handleExpandClick(cardId)}
                    aria-expanded={isCardExpanded}
                    aria-label="show more"
                  >
                    <Tooltip title='Description'>
                      <ExpandMoreIcon />
                    </Tooltip>
                  </ExpandMore>


                </CardActions>

                <Collapse in={isCardExpanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {val.description}
                    </Typography>
                    <CardContent >
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Commenter"
                        multiline
                        fullWidth
                        maxRows={4}
                        variant="outlined"
                        value={comments[val.id] || ''}
                        onChange={(e) => changercommentaire(e, val.id)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end" key={val.id}>
                              <IconButton color="primary" aria-label="send" key={val.id} onClick={() => sendComment(val.id)}>
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardContent>
                  </CardContent>
                </Collapse>



                <Collapse in={loremCollapse[cardId]} timeout="auto" unmountOnExit sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  {getcomment.map((comment) => {
                    const isOverflow = comment.contenu.split('\n').length > 2;

                    const cardContentStyle = {
                      overflow: 'hidden', // Assurez-vous que cette propriété est appliquée à l'élément parent
                    };

                    const contentStyle = {
                      maxHeight: isOverflow ? '2em' : 'none',
                      textOverflow: isOverflow ? 'ellipsis' : 'clip',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    };

                    return (
                      <CardContent key={comment.id} className={comment.contenu.split('\n').length > 2 ? 'overflow-card-content' : ''} style={cardContentStyle}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#009918' }} aria-label="recipe">
                            {comment.inscription.mail &&
                              comment.inscription.mail.split('.')[1] &&
                              comment.inscription.mail.split('.')[1].charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="h7" component="div" sx={{ color: 'black', textTransform: 'none', marginLeft: 2 }}>
                            {comment.inscription.mail &&
                              comment.inscription.mail.split('.')[1] &&
                              comment.inscription.mail.split('.')[1].split('@')[0].charAt(0).toUpperCase() + comment.inscription.mail.split('.')[1].split('@')[0].slice(1)}
                          </Typography>
                        </div>
                        <div style={contentStyle}>
                          {comment.contenu}
                        </div>
                      </CardContent>
                    );
                  })}
                  <br />

                </Collapse>
              </Card>

            );
          }
        })}
      </Grid>


      {/* Pagination */}
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(journal.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </div>















      <Modal open={ouvrir} onClose={() => setOuvrir(false)}>
        <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', minWidth: '150px' }}>
          <Typography variant="h5" style={{ color: 'black' }}>Modification </Typography>
          <br />
          {alertup ? <Alert severity="success">
            Modification avec success
          </Alert> : null}
          {act ? <Alert severity="error">
            Actus ne doit pas être vide.
          </Alert> : null}
          <TextField id="outlined-basic" value={titreupd} onChange={(e) => setTitreupd(e.target.value)} label="Titre" variant="outlined" sx={{ mb: 1 }} /> <br />

          <br />
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={descupd} onChange={(e) => setDescupd(e.target.value)}
              />
            </div>
          </Box>
          <br />


          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Actus</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={(e) => setPole(e.target.value)} value={pole}
            >
              <MenuItem value="Bons plans">Bons plans</MenuItem>
              <MenuItem value="Actus collaborateurs">Actus collaborateurs</MenuItem>
              <MenuItem value="Actus entreprises">Actus entreprises</MenuItem>
            </Select>
          </FormControl>


          <Button onClick={manovaarticle} variant="contained" color="success" style={{ marginTop: '20px', backgroundColor: ' #329358 ' }}>Enregistrer</Button>
        </div>
      </Modal>


      <Dialog open={sokafana} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        {alertsup ? <Alert>Personne supprimer avec succes</Alert> : null}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir effectuer cette action ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSokafana(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={supprarticle} color="primary" autoFocus  >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>






      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0)' }, // Fond semi-transparent avec une opacité faible
          onClick: handleCloseModal,  // Ferme le modal lorsqu'on clique sur le fond
        }}
      >

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img
            src={selectedImage}
            alt="Selected Image"
            style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', opacity: 1 }}
          />

        </div>

      </Modal>

    </>

  )
}

export default Actuscollab

