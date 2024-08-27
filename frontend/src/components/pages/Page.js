import React, { useEffect, useState } from 'react';
import { Tree, Typography, Card, Row, Col, Menu, Dropdown, message, Input } from 'antd';
import { FolderOutlined, FileOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { Search } = Input;
const url = 'http://localhost:8000';

function FolderStructure() {
    const [searchTerm, setSearchTerm] = useState('');
    const [folderData, setFolderData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${url}/getdir`);
                console.log('Données reçues du serveur:', response.data);
                const transformedData = transformData(response.data);
                setFolderData(transformedData);
            } catch (error) {
                console.error('Erreur lors du chargement des fichiers:', error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    const transformData = (data) => {
        return data.map(item => ({
            title: item.name,
            key: item.name, // Utilisez un chemin unique ici si possible
            icon: item.isDirectory ? <FolderOutlined /> : <FileOutlined />,
            isLeaf: !item.isDirectory,
            children: item.isDirectory ? [] : null,
        }));
    };

    const handleMenuClick = (key, action) => {
        switch (action) {
            case 'addFile':
                message.success(`Ajouter un fichier sous l'élément ${key}`);
                break;
            case 'addFolder':
                message.success(`Ajouter un dossier sous l'élément ${key}`);
                break;
            case 'delete':
                message.error(`Supprimer l'élément ${key}`);
                break;
            case 'download':
                message.info(`Téléchargement de l'élément ${key}`);
                break;
            default:
                break;
        }
    };

    const renderMenu = (key) => (
        <Menu>
            <Menu.Item key="addFile" onClick={() => handleMenuClick(key, 'addFile')}>
                <PlusOutlined /> Ajouter un fichier
            </Menu.Item>
            <Menu.Item key="addFolder" onClick={() => handleMenuClick(key, 'addFolder')}>
                <PlusOutlined /> Ajouter un dossier
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => handleMenuClick(key, 'delete')}>
                <DeleteOutlined /> Supprimer
            </Menu.Item>
            <Menu.Item key="download" onClick={() => handleMenuClick(key, 'download')}>
                <DownloadOutlined /> Télécharger
            </Menu.Item>
        </Menu>
    );

    const filterTree = (data, term) => {
        if (!term) return data;

        return data
            .map((item) => {
                if (item.title.toLowerCase().includes(term.toLowerCase())) {
                    return item;
                }
                if (item.children) {
                    const filteredChildren = filterTree(item.children, term);
                    if (filteredChildren.length > 0) {
                        return { ...item, children: filteredChildren };
                    }
                }
                return null;
            })
            .filter(Boolean);
    };

    const renderTreeNodes = (data) =>
        data.map((item) => {
            if (item.children) {
                return (
                    <Tree.TreeNode
                        title={
                            <Dropdown overlay={renderMenu(item.key)} trigger={['contextMenu']}>
                                <span>{item.icon} {item.title}</span>
                            </Dropdown>
                        }
                        key={item.key}
                    >
                        {renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                );
            }
            return (
                <Tree.TreeNode
                    title={
                        <Dropdown overlay={renderMenu(item.key)} trigger={['contextMenu']}>
                            <span>{item.icon} {item.title}</span>
                        </Dropdown>
                    }
                    key={item.key}
                    isLeaf={item.isLeaf}
                />
            );
        });

    const renderCard = (title, data) => (
        <Col span={24} style={{ marginBottom: '20px' }}>
            <Card>
                <Title level={3} style={{ marginBottom: 20 }}>
                    {title}
                </Title>
                <Tree
                    showIcon
                    defaultExpandAll
                    style={{ backgroundColor: '#f0f2f5', padding: '10px', borderRadius: '8px' }}
                >
                    {renderTreeNodes(filterTree(data, searchTerm))}
                </Tree>
            </Card>
        </Col>
    );

    return (
        <div style={{ padding: '20px', marginTop: '200px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24} style={{ marginBottom: '20px' }}>
                    <Search
                        placeholder="Rechercher un dossier ou un fichier"
                        enterButton={<SearchOutlined />}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        allowClear
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {renderCard('NP Akadin - Dossiers Collaborateurs', folderData)}
            </Row>
        </div>
    );
}

export default FolderStructure;
