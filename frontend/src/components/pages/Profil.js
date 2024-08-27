import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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



const Profil = ({ match }) => {
    const { id } = useParams();
    console.log('ID de l\'utilisateur:', id);
  const url = 'http://172.16.0.92:8000/'
  const [expanded, setExpanded] = useState(false);


  const [profilData, setProfilData] = useState(null);



  useEffect(() => {
   const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.16.0.92:8000/profil/${id}`);
        setProfilData(response.data.user); // Utilisez response.data.user ou response.data selon la structure de votre réponse
      } catch (error) {
        console.error('Error fetching profil data:', error);
      }
    };

    fetchData();
  }, [id]);



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' ,backgroundColor:'#FFFFFF'}}>
      <section className='back0'>
           
       

        </section>

       
       {profilData ? (
        <>
      

      
      <Card sx={{  maxWidth: 345, textAlign: 'center' }}>



     


        <Avatar
          sx={{ width: 200, height: 200, margin: 'auto', marginTop: 3 }}
          alt="Description de l'image"
        >
          <img
            src={url + profilData.imageUrl}
            alt="Description de l'image"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Avatar>


        <CardContent>
          <Typography variant='body2' component="span">
            N° Matricule : <Typography variant="body1" component="span" style={{ display: 'inline' }}>{profilData.mat}</Typography>
          </Typography>

          




          <Typography variant="body2" color="text.secondary">
            {profilData.prenom && profilData.prenom
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')
            } {profilData.nom && profilData.nom.toUpperCase()}
            </Typography>






          <Typography variant='body2' color="text.secondary">
            Société: <Typography variant="body1" component="span" style={{ display: 'inline' }}>{profilData.soc} </Typography>
          </Typography>

          <Typography variant='body1' color="text.secondary">
            Département: <Typography variant="body1" component="span" style={{ display: 'inline' }}>{profilData.dep}</Typography>
          </Typography>

          <Typography variant='body1' color="text.secondary">
            Fonction: <Typography variant="body1" component="span" style={{ display: 'inline' }}>{profilData.poste}</Typography>
          </Typography>

          <Typography variant='body1' color="text.secondary">
            Téléphone: <Typography variant="body1" component="span" style={{ display: 'inline' }}>{profilData.tel}</Typography>
          </Typography>

          <Typography variant='body1' color="text.secondary">
            E-mail: <Typography variant="body1" component="span" style={{ display: 'inline' }}><a href={`mailto:${profilData.mail}`}> {profilData.mail}</a></Typography>
            
          </Typography>

       

        </CardContent>

        <CardActions disableSpacing style={{ justifyContent: 'center' }}>
         


          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ margin: 'auto' }}
          >
            <Tooltip title="Cliquez ici pour consulter leur description." arrow>
              <ExpandMoreIcon />
            </Tooltip>
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          </CardContent>
        </Collapse>
      </Card>
      </>
      ) : (
        <p>...</p>
      )}

    </div>
  );
};

export default Profil;
