import React from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, InputNumber, Typography, Row, Col } from 'antd';
import photo from '../../assets/images/eva.mp4';

const { Option } = Select;
const { Title } = Typography;

const Conge = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        // Logic to handle form submission (e.g., send data to an API)
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            <video
                src={photo}
                autoPlay
                loop
                muted
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    filter: 'brightness(0.6)', // Optional: darken the video for better text readability
                }}
            />
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: '20px',

                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{
                        maxWidth: 800,
                        width: '100%',
                        padding: '40px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        marginTop: '250px'
                    }}
                >
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '40px' }}>
                        DEMANDE DE CONGÉ
                    </Title>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type de congé"
                                initialValue="payé"
                            >
                                <Select>
                                    <Option value="payé">Payé</Option>
                                    <Option value="sans_solde">Sans solde</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="matricule"
                                label="Matricule"
                                rules={[{ required: true, message: 'Veuillez entrer votre matricule.' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nomPrenom"
                                label="Nom & Prénom(s)"
                                rules={[{ required: true, message: 'Veuillez entrer votre nom et prénom.' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="fonction"
                                label="Fonction"
                                rules={[{ required: true, message: 'Veuillez entrer votre fonction.' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="departement"
                                label="Département"
                                rules={[{ required: true, message: 'Veuillez entrer votre département.' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="lieuTravail"
                                label="Lieu de travail"
                                rules={[{ required: true, message: 'Veuillez entrer le lieu de travail.' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="soldeAvant"
                                label="Solde Congé Avant la demande"
                                rules={[{ required: true, message: 'Veuillez entrer le solde avant la demande.' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="nombreJoursDemandes"
                                label="Nombre de jours demandés"
                                rules={[{ required: true, message: 'Veuillez entrer le nombre de jours demandés.' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="soldeApres"
                                label="Solde Congé Après"
                                rules={[{ required: true, message: 'Veuillez entrer le solde après la demande.' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="dateDepart"
                                label="Date de départ"
                                rules={[{ required: true, message: 'Veuillez choisir la date de départ.' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="heureDepart"
                                label="Heure de départ"
                                rules={[{ required: true, message: 'Veuillez choisir l\'heure de départ.' }]}
                            >
                                <TimePicker format="HH:mm" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="dateRetour"
                                label="Date de retour"
                                rules={[{ required: true, message: 'Veuillez choisir la date de retour.' }]}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="heureRetour"
                                label="Heure de retour"
                                rules={[{ required: true, message: 'Veuillez choisir l\'heure de retour.' }]}
                            >
                                <TimePicker format="HH:mm" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Button type="primary" htmlType="submit" size="large">
                            Soumettre
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Conge;
