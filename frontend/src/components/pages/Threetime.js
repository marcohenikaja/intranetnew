import React, { useState } from 'react';
import { Radio, Timeline, Badge, Card, Avatar, Space } from 'antd';
import edouard from '../../assets/imgdir/BOUCHER.EDOUARD.PIC.jpg'
import mika from '../../assets/imgdir/RAKOTOARIMANGA.MICHAEL.PIC.jpg'
import faniry from '../../assets/imgdir/RAVELOMANANTSOA.TSIORY.FANIRY.PIC.jpg'
import mbola from '../../assets/imgdir/RAVONISON.RIVO.MBOLATIANA.PIC.jpg'
import domoina from '../../assets/imgdir/RAZAFINDRALAMBO.DOMOINA.NOMENJANAHARY.PIC.jpg'

const Threetime = () => {
    const [mode, setMode] = useState('left');

    const onChange = (e) => {
        setMode(e.target.value);
    };

    return (
        <>
            <Radio.Group
                onChange={onChange}
                value={mode}
                style={{
                    marginBottom: 20,
                }}
            >
                <Radio value="left">Gauche</Radio>
                <Radio value="right">Droite</Radio>
                <Radio value="alternate">Alternate</Radio>
            </Radio.Group>

            <Timeline mode={mode}>


                <Timeline.Item label={<Badge.Ribbon text="Secrétaire Général" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>

                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundColor: '#EDEDEB',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={edouard}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0001" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Edouard BOUCHER</Card>
                                <Card size="small">boucher.edouard@npakadin.mg</Card>
                                <Card size="small">034 07 221 09</Card>
                            </Badge.Ribbon>
                        </Space>
                    </Card>


                </Timeline.Item>






                <Timeline.Item label={<Badge.Ribbon text="Pôle Administratif et Financier" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>

                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#EAECEB',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={mika}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0006" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Michael RAKOTOARIMANGA</Card>
                                <Card size="small">rakotoarimanga.michael@npakadin.mg</Card>
                                <Card size="small">034 05 057 61</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    - Gestion des facturations et des recouvrements <br />
                                    - Gestion de la trésorerie <br />
                                    - Audit et Contrôle <br />
                                    - Consolidation des comptes <br />
                                    - Gestion budgétaire <br />
                                    - Gestion administrative et Financière
                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>






                <Timeline.Item label={<Badge.Ribbon text="Pôle Supply Chain" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>
                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E9EAE7',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={domoina}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0009" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Domoina RAZAFINDRALAMBO</Card>
                                <Card size="small">razafindralambo.domoina@npakadin.mg</Card>
                                <Card size="small">034 64 868 89</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    - Achat import / export <br />
                                    - Reception marchandises <br />
                                    - Gestion des besoins <br />
                                    - Gestion de Stock <br />
                                    - Gestion des entrepots <br />
                                    - Transport et livraison
                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>





                <Timeline.Item label={<Badge.Ribbon text="Pôle Système d'Information" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>
                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#E2E4E4',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={faniry}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0002" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Faniry RAVELOMANATSOA</Card>
                                <Card size="small">ravelomanantsoa.faniry@npakadin.mg</Card>
                                <Card size="small">034 05 058 78</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    -Gestion des ressources informatiques <br />
                                    - Support technique <br />
                                    - Maintenance informatique  <br />
                                    - Intégration et gestion des logiciels : Sage , Erp <br />

                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>




                <Timeline.Item label={<Badge.Ribbon text="Pôle Marketing et communication" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>
                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#EEEEEB',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={mbola}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0057" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Rivo Mbolatiana RAVONISON</Card>
                                <Card size="small">ravelomanantsoa.faniry@npakadin.mg</Card>
                                <Card size="small">034 05 058 78</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    -Stratégie marketing et communication <br />
                                    - Mise en place charte visuelle groupe:logo,signature,papier ,en-tête... <br />
                                    - Conception de tous les supports de communication interne et externe:badge,plaque de signalisation  site,brochure,... <br />
                                    - Implementation du site web du groupe,et des 04 sociétes(suppléant ERP)  <br />

                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>





                <Timeline.Item label={<Badge.Ribbon text="Pôle HSSE" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>
                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#F2F6F7',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={mbola}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0057" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Priscillia RASOANIRINA</Card>
                                <Card size="small">rasoanirina.priscillia@npakadin.mg</Card>
                                <Card size="small">034 41 754 74</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    -Stratégie marketing et communication <br />
                                    - Mise en place charte visuelle groupe:logo,signature,papier ,en-tête... <br />
                                    - Conception de tous les supports de communication interne et externe:badge,plaque de signalisation  site,brochure,... <br />
                                    - Implementation du site web du groupe,et des 04 sociétes(suppléant ERP)  <br />

                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>





                <Timeline.Item label={<Badge.Ribbon text="Pôle Services Généraux" color='blue' style={{ alignItems: 'center', height: '50px' }}>  </Badge.Ribbon>}>
                    <Card style={{ textAlign: 'center', width: 350, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: '#F2F6F7',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,  // Ajuster l'espacement en bas de l'Avatar
                                }}
                                alt="Description de l'image"
                            >
                                <img
                                    src={mbola}
                                    alt="Description de l'image"
                                    style={{
                                        width: 170,
                                        height: 170,
                                        objectFit: 'scale-down', // Utilisez 'cover' pour remplir tout en conservant les proportions
                                        borderRadius: '50%',
                                    }}
                                />
                            </Avatar>
                        </div>

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
                            <Badge.Ribbon text="NPA0057" color="green" style={{ width: 230 }}> <br />
                                <Card size="small">Henintsoa RASOLOFOSON</Card>
                                <Card size="small">rasolofoson.henintsoa@npakadin.mg</Card>
                                <Card size="small">03 82 736 74</Card>
                                <Card size="small" style={{ textAlign: 'justify' }}>
                                    - Gestion des  besoins en fournitures bureaux , entretiens <br />
                                    -  Gestion du parc automobile ,de la flotte modiles <br />
                                    - Gestion des contrats:assurances et tracking...<br />
                                    - Gestion entrtien des locaux <br />

                                </Card>

                            </Badge.Ribbon>
                        </Space>
                    </Card>
                </Timeline.Item>


            </Timeline>
        </>
    );
};

export default Threetime;
