const Sequelize = require('sequelize');

const sequelize = new Sequelize('intranet', 'root', 'P4$$w0rd', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+03:00',
    logging: false
});


const sequelize1 = new Sequelize('pbxlogger', 'root', 'NPAroot#', {
    host: '172.16.0.67',
    dialect: 'mysql',
    timezone: '+03:00',
    logging: false
});

// teste modif back

module.exports = { sequelize, sequelize1 };


