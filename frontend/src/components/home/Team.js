import React, { useState ,useEffect} from 'react';
import videos from '../../assets/video/groupe.mp4'
import { Col, Row, Statistic,Typography } from 'antd';
import CountUp from 'react-countup';
import axios from 'axios';
import { Fade } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import './about.css'
const formatter = (value) => <CountUp end={value} separator="," />;
const { Title } = Typography;
const Team = () => {




    const url = 'http://172.16.0.92:8000/'
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [poste, setPoste] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [alertmety, setAlertmety] = useState(false)
  const [photonot, setPhotonot] = useState(false)

  const [nbrakadin, setNbrakadin] = useState(0);
  const [nbrguilmann, setNbrguilmann] = useState(0);
  const [nbrstta, setNbrstta] = useState(0);
  const [nbrstd, setNbrstd] = useState(0);
  const [nbrnpakadinservice, setNbnpakadinservice] = useState(0);
  const [nbrspider, setNbrspider] = useState(0);


  const [mode, setMode] = useState('left');
  const onChange = (e) => {
    setMode(e.target.value);
  };



  const recupakadin = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupakadin`).then((result) => {
        console.log(result.data.count);
        setNbrakadin(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }

  const recupguilmann = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupguilmann`).then((result) => {
        console.log(result.data.count);
        setNbrguilmann(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }


  const recupstta = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupstta`).then((result) => {
        console.log(result.data.count);
        setNbrstta(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }

  const recupstd = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupstd`).then((result) => {
        console.log(result.data.count);
        setNbrstd(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }



  const recupspider = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupspider`).then((result) => {
        console.log(result.data.count);
        setNbrspider(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }


  const recupnpakadin = async (req, res) => {
    try {
      const recupakadin = await axios.get(`${url}recupnpakadin`).then((result) => {
        console.log(result.data.count);
        setNbnpakadinservice(result.data.count);
      }).catch((error) => {
        console.log(error);
      })

    } catch (error) {
      console.log(error);
    }
  }

  const data = [
    { id: 0, value: parseInt(nbrakadin), label: 'AKADIN', color: '#004E6D' },
    { id: 1, value: parseInt(nbrguilmann), label: 'GUILMANN', color: '#E31B22' },
    { id: 2, value: parseInt(nbrstta), label: 'STTA', color: '#093A62' },
    { id: 3, value: parseInt(nbrnpakadinservice), label: 'NP AKADIN Services', color: '#019A19' },
    { id: 4, value: 5, label: 'STD', color: '#000372' },
    { id: 5, value: parseInt(nbrspider), label: 'SPIDER', color: '#FBF59E' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const ajouterdir = async () => {

    const formData = new FormData();
    formData.append("image", image);
    try {
      const responseUpload = await axios.post(`${url}uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(responseUpload.data.imageUrl);

      const imageUrlToSend = responseUpload.data.imageUrl || imageUrl;

      const ajouterdir = await axios.post(`${url}ajouterdir`, { nom, prenom, poste, imageUrl: imageUrlToSend, });

      if (ajouterdir.data['success'] === true) {
        // 
        setPoste("")
        setNom("")
        setPrenom("")
        setImage("")
        setImageUrl(null)
        setAlertmety(true)
        setTimeout(() => {
          setAlertmety(false)
          setOpen(false)
          window.location.reload()
        }, 2000);
      } else {
        alert("false");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setPhotonot(true)
      setTimeout(() => {
        setPhotonot(false)
      }, 2500);
    }


  };





  



  useEffect(() => {
    recupakadin();
    recupguilmann();
    recupstta();
    recupspider();
    recupnpakadin();
    recupstd()
  }, []);
    return (
        <div>
            <div className="titleHolder">
                <div class="worksBlock">
                    <div class="video-container">
                        <video autoPlay muted loop id="backgroundVideo" style={{ width: '100%', height: 'auto' }}>
                            <source src={videos} type="video/mp4" />
                            Votre navigateur ne prend pas en charge la balise vidéo.
                        </video>
                        <div class="text-overlay">
                            <br /><br /><br /><br /><br /><br />
                            
                            <Fade in={true} timeout={3000}>
                            <Title style={{ color: 'white', fontSize: '50px' }}>Notre groupe</Title>

                          </Fade>
                        </div>
                    </div>
                    <div class="content">

                    </div>
                </div>
            </div>


            <div id="about" className="block aboutBlock">
                <div className="container-fluid">
                    <div className="titleHolder">

                        <h2>Nos entités</h2>
                    </div>
                    
                    <br/>
                    <Row gutter={16} align="middle" justify="center">
                      <Col span={3}>
                          <Statistic title="SPIDER" value={nbrspider} formatter={formatter} />
                      </Col> 
                      <Col span={3}>
                          <Statistic title="GUILMANN" value={nbrguilmann} precision={2} formatter={formatter} />
                      </Col>
                      <Col span={4}>
                          <Statistic title="NP AKADIN Services" value={nbrnpakadinservice} precision={2} formatter={formatter} />
                      </Col>
                      <Col span={3}>
                          <Statistic title="STTA" value={nbrstta} precision={2} formatter={formatter} />
                      </Col>
                      <Col span={3}> 
                          <Statistic title="STD" value={nbrstd} precision={2} formatter={formatter} />
                      </Col>
                      <Col span={1}>
                          <Statistic title="AKADIN" value={nbrakadin} precision={2} formatter={formatter} />
                      </Col>
                  </Row>
                    <BarChart
                      xAxis={[
                        {
                          id: 'barCategories',
                          data: ['SPIDER', 'GUILMANN', 'NP AKADIN Services','STTA','STD','AKADIN'],
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: [nbrspider, nbrguilmann, nbrnpakadinservice,378,5,19],
                         
                        },
                      ]}
                   
                      height={300}
                    />
                    
                <br/> 
                    <div className="contentHolder">

                        <p style={{textAlign:'justify'}}>
                        Le Groupe NP AKADIN est une entité dynamique et visionnaire qui se distingue par son engagement envers l’excellence, l’innovation et la collaboration. Fondé à Madagascar, ce groupe est composé de six entreprises qui partagent une vision commune de développement durable et responsable.
 
Les entreprises membres du groupe, telles que AKADIN ,SPIDER, STTA, STD - Pièces Détachées, NP AKADIN Services et GUILMANN, œuvrent dans divers secteurs, allant du transport des hydrocarbures à l’industrie du bâtiment et de l’engineering immobilier. Chacune de ces entités contribue à la vision globale du groupe par son expertise spécifique et son engagement envers un avenir meilleur.
                        </p>
                    </div>

                    <div className="titleHolder">

                        <h2>Organigramme du groupe</h2>
                    </div>
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)', width: '100%' }}
                        height={950}
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FULCVVkvAk0eaj2kkRROvZg%2FUntitled%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DqluLk0eCSchGuGDy-1"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Team;