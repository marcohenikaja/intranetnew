
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button, Input, Space, Table, AutoComplete, DatePicker, Typography, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Pbxlogger = () => {
    const url = 'http://172.16.0.92:8000/';
    const loggedInUser = sessionStorage.getItem('loginUser');
    const authorizedUsers = [
        "rakotobe.marco@npakadin.mg",
        "ravelomanatsoa.faniry@npakadin.mg",
        "rafanomezantsoa.espoir@npakadin.mg",
        "maholiarisoa.jeamis@npakadin.mg"
    ];

    const [pbxlog, setPbxlog] = useState([]);
    const [allfix, setAllfix] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const searchInput = useRef(null);

    useEffect(() => {
        fetchPbxData();
        fetchFix();
    }, []);

    const fetchPbxData = async () => {
        try {
            const response = await axios.get(`${url}fetchpbxdata`);
            setPbxlog(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'annuaire', error);
            message.error('Erreur lors de la récupération des données PBX.');
        }
    };

    const fetchFix = async () => {
        try {
            const response = await axios.get(`${url}fetchfix`);
            setAllfix(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'annuaire', error);
            message.error('Erreur lors de la récupération des données fixes.');
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchValue('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Rechercher ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Rechercher
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Réinitialiser
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrer
                    </Button>
                    <Button type="link" size="small" onClick={close}>
                        Fermer
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    const formatCost = (cost) => {
        return cost.toLocaleString('fr-FR', { style: 'currency', currency: 'MGA', minimumFractionDigits: 2 });
    };

    const columns = [
        {
            title: 'Poste',
            dataIndex: 'EXT',
            key: 'EXT',
            width: '10%',
            ...getColumnSearchProps('EXT'),
        },
        {
            title: "Nom poste",
            key: 'nomPoste',
            render: (text, record) => {
                const fixeValue = record.EXT;
                const match = allfix.find(item => item.tel === fixeValue);
                return match ? match.nom : 'Inconnu';
            },
        },
        {
            title: "Date d'appel",
            dataIndex: 'CALL_TIME',
            key: 'CALL_TIME',
            width: '15%',
            ...getColumnSearchProps('CALL_TIME'),
            render: (text) => (
                moment(text).format('DD/MM/YYYY HH:mm:ss')
            ),
        },
        {
            title: 'Durée',
            dataIndex: 'DURATION_S',
            key: 'DURATION_S',
            width: '15%',
            ...getColumnSearchProps('DURATION_S'),
            render: (text) => formatDuration(parseInt(text, 10)),
        },
        {
            title: 'Numéro appelé',
            dataIndex: 'DIALED_PHONE',
            key: 'DIALED_PHONE',
            width: '15%',
            ...getColumnSearchProps('DIALED_PHONE'),
            render: (text) => (
                text.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ')
            ),
        },
        {
            title: 'Coût',
            dataIndex: 'coût',
            key: 'coût',
            width: '15%',
            render: (text, record) => {
                const durationInSeconds = parseInt(record.DURATION_S, 10);
                const cost = durationInSeconds * 2.5;
                return formatCost(cost); // Formater avec séparateurs de milliers et deux décimales
            },
        },
    ];

    const filteredData = useMemo(() => {
        return pbxlog
            .filter((item) => {
                const fixeValue = item.EXT;
                const match = allfix.find((fix) => fix.tel === fixeValue);
                const prenom = match ? match.nom.toLowerCase() : '';
                const searchValueLower = searchValue.toLowerCase();

                return fixeValue.includes(searchValueLower) || prenom.includes(searchValueLower);
            })
            .sort((a, b) => {
                // Tri par date en ordre décroissant
                return new Date(b.CALL_TIME) - new Date(a.CALL_TIME);
            });
    }, [pbxlog, allfix, searchValue]);

    const totalCost = useMemo(() => {
        return filteredData.reduce((total, record) => {
            const durationInSeconds = parseInt(record.DURATION_S, 10);
            const cost = durationInSeconds * 2.5;
            return total + cost;
        }, 0);
    }, [filteredData]);

    const totalDuration = useMemo(() => {
        return filteredData.reduce((total, record) => {
            return total + parseInt(record.DURATION_S, 10);
        }, 0);
    }, [filteredData]);

    const totalDurationFormatted = formatDuration(totalDuration);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(pbxlog);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Annuaire');
        XLSX.writeFile(workbook, 'annuaire.xlsx');
    };

    const handleDateRangeChange = (dates) => {
        if (!dates || dates.length !== 2) {
            fetchPbxData();
            return;
        }

        const [startDate, endDate] = dates;
        const start = moment(startDate).startOf('day');
        const end = moment(endDate).endOf('day');

        const filtered = pbxlog.filter(item => {
            const callDate = moment(item.CALL_TIME);
            return callDate.isBetween(start, end, undefined, '[]');
        });
        setPbxlog(filtered);
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    return (
        <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
            <br /><br /><br /><br /><br /><br /><br />

            {authorizedUsers.includes(loggedInUser) && (
                <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                    <div className="titleHolder">
                        <p></p>
                        <h2>PBX LOG</h2> <br />
                        <AutoComplete
                            style={{ width: 250 }}
                            value={searchValue}
                            onChange={handleSearchChange}
                            placeholder="Rechercher par poste ou prénom"
                        />
                        <br /><br />
                        <RangePicker onChange={handleDateRangeChange} />
                        <br /><br />
                    </div>
                    {/* ajouter une graphe en antd ici correspond a consomation des utilisateur  */}
                    <Table
                        style={{ width: '100%', textAlign: 'justify', justifyContent: 'justify' }}
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: filteredData.length,
                            pageSizeOptions: ['10', '20', '50', '100'],
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} sur ${total} éléments`,
                        }}
                        onChange={handleTableChange}
                    />
                    <div style={{ marginTop: 16 }}>
                        <Title level={4}>Total des résultats filtrés</Title>
                        <p>
                            <strong>Coût total:</strong> {formatCost(totalCost)}
                        </p>
                        <p>
                            <strong>Durée totale des appels:</strong> {totalDurationFormatted}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pbxlogger;





