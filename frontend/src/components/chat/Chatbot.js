import React, { useState } from 'react';
import { Typography, Button, Input, List, Spin } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!inputValue) return;

        setLoading(true);

        try {
            const response = await axios.get('http://172.16.0.92:8000/search', {
                params: { q: inputValue },
            });

            setResults(response.data.items || []);
        } catch (error) {
            console.error('Erreur lors de la récupération des résultats de recherche:', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '50px', textAlign: 'center', maxWidth: '80%', margin: 'auto' }}>
            <Title level={4} style={{ marginTop: '150px' }}>Recherche </Title>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSearch}
                    placeholder="Entrez votre recherche"
                    style={{ width: 'calc(100% - 45px)', marginRight: '10px', width: '30%' }}
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} />
            </div>

            {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}

            <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <List
                    dataSource={results}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <List.Item.Meta
                                title={<a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                                description={item.snippet}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>

        // tete
    );
};

export default Chatbot;
