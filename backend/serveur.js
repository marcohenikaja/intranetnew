const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: [
        'http://dsi-03:3000',
        'http://172.16.0.92:3000',
        'http://localhost:3000',
        'http://localhost:8000',
        'http://intranet.npakadin.mg:3000',
        'http://intranet:3000',
        'http://172.16.0.67'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With','Cache-Control'],
};


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));

// Ajoutez cette configuration pour spécifier les en-têtes CORS
app.options('*', cors(corsOptions));

// Vos routes et logique d'API ici



const routes = require('./routes/userRoute');
const db = require('./db/db');

db.sequelize.sync().then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(err);
});

app.use('/', routes);



  

app.listen(8000, '0.0.0.0', () => {
    console.log('Serveur started port 8000');
});
