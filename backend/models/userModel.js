const Sequelize = require('sequelize');
const { sequelize, sequelize1 } = require('../db/db');





const Contact = sequelize.define('contacts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mat: {
        type: Sequelize.STRING
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    idUser: {
        type: Sequelize.INTEGER
    },
    service: {
        type: Sequelize.STRING
    },

    createdAt: {
        type: Sequelize.DATE
    }, updatedAt: {
        type: Sequelize.DATE
    },

});

const Personne = sequelize.define('personnes', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    numero: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});


const Perso = sequelize.define('persos', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//ajouteer service generaux
const Serviceg = sequelize.define('ServiceGs', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },

    description: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//hsse
const Hsse = sequelize.define('hsses', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },

    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});
//Mark
const Mark = sequelize.define('Marks', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//si
const Si = sequelize.define('sis', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});
//supply
const Supply = sequelize.define('supply', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//supply
const Rh = sequelize.define('rhs', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//Af
const Af = sequelize.define('afs', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

//assistante de direction
const Ad = sequelize.define('ads', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});


//controle interne et audit
const Cia = sequelize.define('cias', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
    ,
    imageUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

const Message = sequelize.define('messages', {
    id_send: {
        type: Sequelize.INTEGER
    },
    id_rec: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});



const Phonebook = sequelize.define('phonebooks', {
    nom: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false // Option pour désactiver les horodatages automatiques
});




const Dirsoc = sequelize.define('dirsocs', {
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING
    },
    descri: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

const Histo_art = sequelize.define('histo_arts', {
    nom_suppr: {
        type: Sequelize.STRING
    },
    id_pers_modif: {
        type: Sequelize.INTEGER
    },
    id_actus: {
        type: Sequelize.INTEGER
    },
    nom: {
        type: Sequelize.STRING
    },
    titre: {
        type: Sequelize.STRING
    },

    description: {
        type: Sequelize.STRING
    },
    actus: {
        type: Sequelize.STRING
    },
    titre_nouv: {
        type: Sequelize.STRING
    },
    description_nouv: {
        type: Sequelize.STRING
    },
    actus_nouv: {
        type: Sequelize.STRING
    },
    date_pub: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});


const Annuaire = sequelize.define('Annuaires', {

    mat: {
        type: Sequelize.STRING
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    poste: {
        type: Sequelize.STRING
    },
    soc: {
        type: Sequelize.STRING
    },
    dep: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    Fixe: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.STRING
    },
    ordre: {
        type: Sequelize.INTEGER
    },
    annif: {
        type: Sequelize.DATE
    },
    imageUrl: {
        type: Sequelize.STRING
    },


});


const UserInsrcription = sequelize.define('inscriptions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: Sequelize.STRING,
        collate: 'utf8_bin'
    },
    mot_de_passe: {
        type: Sequelize.STRING,
        collate: 'utf8_bin'
    },
    mail: {
        type: Sequelize.STRING,
        collate: 'utf8_bin'
    },
    poste: {
        type: Sequelize.STRING,
        collate: 'utf8_bin'
    },
    isActivated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // Le compte n'est pas activé par défaut
    },
    activationToken: {
        type: Sequelize.STRING // Stockez ici le token d'activation unique
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
});






const Media = sequelize.define('media', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pers: {
        type: Sequelize.INTEGER,
        references: {
            model: 'inscriptions', // Remplacez par le nom de votre autre table
            key: 'id'
        }
    },
    nom_pers: {
        type: Sequelize.STRING
    },
    titre: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    service: {
        type: Sequelize.STRING
    },

    urlthm: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },
});






const Commentaire = sequelize.define('commentaire', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_media: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'media',
            key: 'id'
        }
    },
    id_pers: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'inscriptions',
            key: 'id'
        }
    },
    contenu: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});
// // Définissez une relation entre Commentaire et Media
Commentaire.belongsTo(Media, { foreignKey: 'id_media' });

// // Définissez une relation entre Commentaire et UserInscription
Commentaire.belongsTo(UserInsrcription, { foreignKey: 'id_pers' });

// // Vous pouvez également définir une relation inverse dans les modèles Media et UserInscription
Media.hasMany(Commentaire, { foreignKey: 'id_media' });
UserInsrcription.hasMany(Commentaire, { foreignKey: 'id_pers' });











const PbxData = sequelize1.define('pbxdata', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    CALL_TIME: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
    },
    CALL_TIME_UTC: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
    },
    DURATION: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    DURATION_S: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    DIRECTION: {
        type: Sequelize.STRING(4),
        allowNull: true,
    },
    CALL_TYPE: {
        type: Sequelize.STRING(8),
        allowNull: true,
    },
    FLAG1: {
        type: Sequelize.STRING(32),
        allowNull: true,
    },
    FLAG2: {
        type: Sequelize.STRING(32),
        allowNull: true,
    },
    FLAG3: {
        type: Sequelize.STRING(32),
        allowNull: true,
    },
    FLAG4: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    FLAG5: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    FLAG6: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    FLAG7: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    CALLER_PHONE: {
        type: Sequelize.STRING(40),
        allowNull: true,
    },
    DIALED_PHONE: {
        type: Sequelize.STRING(40),
        allowNull: true,
    },
    DNIS: {
        type: Sequelize.STRING(40),
        allowNull: true,
    },
    TRUNK: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    CO: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    ACC: {
        type: Sequelize.STRING(16),
        allowNull: true,
    },
    AUTH: {
        type: Sequelize.STRING(30),
        allowNull: true,
    },
    EXT: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    RING: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    COST: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    AREA_CODE: {
        type: Sequelize.STRING(15),
        allowNull: true,
    },
    AREA_NAME: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
    COUNTRY_CODE: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    COUNTRY_NAME: {
        type: Sequelize.STRING(3),
        allowNull: true,
    },
    NUMBER_TYPE: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    NUMBER_E164: {
        type: Sequelize.STRING(40),
        allowNull: true,
    },
    DISTANCE: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    PBX_IDENTIFIER: {
        type: Sequelize.STRING(128),
        allowNull: true,
    },
    LAST_EDIT: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    INSERT_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
    },
}, {
    // Définition des options du modèle
    tableName: 'pbxdata',
    timestamps: false, // Désactivation des timestamps pour ne pas utiliser les colonnes createdAt et updatedAt
});

PbxData.sync()
    .then(() => {
        //  console.log('La table pbxdata a été créée avec succès dans la base de données pbxlogger.');
    })
    .catch((error) => {
        //  console.error('Erreur lors de la création de la table pbxdata dans la base de données pbxlogger :', error);
    });


sequelize.authenticate()
    .then(() => {
        console.log('Connection to intranet has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database intranet:', err);
    });

// Utilisation de sequelize1 pour la base de données 'pbxlogger'


// sequelize1.authenticate()
//     .then(() => {
//         console.log('Connection to pbxlogger has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database pbxlogger:', err);
//     });




module.exports = { Phonebook, PbxData, Commentaire, Annuaire, Cia, Histo_art, Dirsoc, Message, Ad, Af, Rh, Supply, Si, Mark, Hsse, Serviceg, UserInsrcription, Media, Contact, Personne, Perso };
