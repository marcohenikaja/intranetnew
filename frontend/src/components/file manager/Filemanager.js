import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tree, Layout, Input } from 'antd';
import { FolderFilled as FolderIcon, FileOutlined as FileIcon } from '@ant-design/icons';
import { FileWordFilled, FileExcelFilled, FilePdfFilled, FileTextFilled, EditTwoTone } from '@ant-design/icons';

const { TreeNode } = Tree;
const { Sider, Content } = Layout;

const DirectoryTree = ({ node }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const renderTreeNodes = data =>
        data.map(item => (
            <TreeNode
                title={
                    <span
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => alert(item.fullPath)}
                    >
                        {item.name}
                        {isHovered && <EditTwoTone onClick={() => alert(item.fullPath)} />}
                    </span>

                }
                key={item.path}
                icon={item.type === 'folder' ? <FolderIcon style={{ color: '#fbe893', fontSize: '20px' }} /> : getFileIcon(item.name)}
            >
                {item.children && renderTreeNodes(item.children)}
            </TreeNode>
        ));

    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        if (extension === 'doc' || extension === 'docx') {
            return <FileWordFilled style={{ color: '#1462BA', fontSize: '20px' }} />;
        } else if (extension === 'xls' || extension === 'xlsx') {
            return <FileExcelFilled style={{ color: '#1E6E42', fontSize: '20px' }} />;
        } else if (extension === 'pdf') {
            return <FilePdfFilled style={{ color: '#DE2429', fontSize: '20px' }} />;
        } else if (extension === 'txt') {
            return <FileTextFilled style={{ color: '#fbe893', fontSize: '20px' }} />;
        } else {
            return <FileIcon style={{ color: '#fbe893', fontSize: '20px' }} />;
        }
    };

    return (
        <Tree showIcon>{renderTreeNodes([node])}</Tree>
    );
};

const FileManager = () => {
    const [directoryTree, setDirectoryTree] = useState(null);
    const [selectedFolderPath, setSelectedFolderPath] = useState(null);

    useEffect(() => {
        axios
            .get('http://172.16.0.92:8000/directorytree')
            .then(response => {
                setDirectoryTree(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de la structure des dossiers :', error);
            });
    }, []);

    return (
        <div>
            <br /><br /><br /><br />
            <br />
            {console.log("selectedFolderPath:", selectedFolderPath)}
            <Input value={selectedFolderPath} disabled={true} />
            <Layout>
                <Sider width="100%">
                    {directoryTree && <DirectoryTree node={directoryTree} />}
                    <iframe src="http://172.16.1.76/" style={{ width: '100%', height: '600px', border: 'none' }} />
                </Sider>
                <Content></Content>
            </Layout>
        </div>
    );
};

export default FileManager;
