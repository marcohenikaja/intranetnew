const Sequelize = require('sequelize');
const { sequelize } = require('../db/db');

// Définition du modèle Evaluated
const Evaluated = sequelize.define('evaluateds', {
    id_pers: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    mat: {
        type: Sequelize.STRING
    },
    dateentree: {
        type: Sequelize.DATE
    },
    datetoday: {
        type: Sequelize.DATE
    },
    direction: {
        type: Sequelize.STRING
    },

    posteeval: {
        type: Sequelize.STRING
    },
    fonc: {
        type: Sequelize.STRING
    },

    datedu: {
        type: Sequelize.DATE
    },
    dateau: {
        type: Sequelize.DATE
    },
    mission: {
        type: Sequelize.TEXT
    },
    libelle1: {
        type: Sequelize.TEXT
    },
    poids1: {
        type: Sequelize.TEXT
    },
    notation1: {
        type: Sequelize.TEXT
    },
    commentaire1: {
        type: Sequelize.TEXT
    },
    libelle2: {
        type: Sequelize.TEXT
    },
    poids2: {
        type: Sequelize.TEXT
    },
    notation2: {
        type: Sequelize.TEXT
    },
    commentaire2: {
        type: Sequelize.TEXT
    },
    libelle3: {
        type: Sequelize.TEXT
    },
    poids3: {
        type: Sequelize.TEXT
    },
    notation3: {
        type: Sequelize.TEXT
    },
    commentaire3: {
        type: Sequelize.TEXT
    },
    libelle4: {
        type: Sequelize.TEXT
    },
    poids4: {
        type: Sequelize.TEXT
    },
    notation4: {
        type: Sequelize.TEXT
    },
    commentaire4: {
        type: Sequelize.TEXT
    },
    res1: {
        type: Sequelize.FLOAT
    },
    val1: {
        type: Sequelize.STRING
    },

    val2: {
        type: Sequelize.STRING
    },
    somme: {
        type: Sequelize.STRING
    },
    v1: {
        type: Sequelize.STRING
    },
    v2: {
        type: Sequelize.STRING
    },
    v3: {
        type: Sequelize.STRING
    },
    v4: {
        type: Sequelize.STRING
    },
    v5: {
        type: Sequelize.STRING
    },
    v6: {
        type: Sequelize.STRING
    },
    v7: {
        type: Sequelize.STRING
    },
    v8: {
        type: Sequelize.STRING
    },
    v9: {
        type: Sequelize.STRING
    },
    v10: {
        type: Sequelize.STRING
    },
    v11: {
        type: Sequelize.STRING
    },
    v12: {
        type: Sequelize.STRING
    },
    v13: {
        type: Sequelize.STRING
    },
    v14: {
        type: Sequelize.STRING
    },
    v15: {
        type: Sequelize.STRING
    },
    com1: {
        type: Sequelize.TEXT
    },
    com2: {
        type: Sequelize.TEXT
    },
    com3: {
        type: Sequelize.TEXT
    },
    com4: {
        type: Sequelize.TEXT
    },
    com5: {
        type: Sequelize.TEXT
    },
    r1: {
        type: Sequelize.FLOAT
    },
    r2: {
        type: Sequelize.STRING
    },
    r3: {
        type: Sequelize.STRING
    },
    r4: {
        type: Sequelize.STRING
    },
    r5: {
        type: Sequelize.STRING
    },
    critere1: {
        type: Sequelize.TEXT
    },
    critere2: {
        type: Sequelize.TEXT
    },
    critere3: {
        type: Sequelize.TEXT
    },
    critere4: {
        type: Sequelize.TEXT
    },
    critere5: {
        type: Sequelize.TEXT
    },
    nivactus: {
        type: Sequelize.STRING
    },
    nouvnivs: {
        type: Sequelize.STRING
    },
    conclusion: {
        type: Sequelize.TEXT
    },
    ancienneteniv: {
        type: Sequelize.STRING
    },
    comment: {
        type: Sequelize.TEXT
    },
    perfglob: {
        type: Sequelize.STRING
    },
    classification: {
        type: Sequelize.STRING
    },
    idr: {
        type: Sequelize.STRING
    },
    f1: {
        type: Sequelize.STRING
    },
    f2: {
        type: Sequelize.STRING
    },
    f3: {
        type: Sequelize.STRING
    },
    f4: {
        type: Sequelize.STRING
    },
    f5: {
        type: Sequelize.STRING
    },
    c1: {
        type: Sequelize.STRING
    },
    c2: {
        type: Sequelize.STRING
    },
    c3: {
        type: Sequelize.STRING
    },
    c4: {
        type: Sequelize.STRING
    },
    c5: {
        type: Sequelize.STRING
    },
    am1: {
        type: Sequelize.TEXT
    },
    am2: {
        type: Sequelize.TEXT
    },
    am3: {
        type: Sequelize.TEXT
    },
    am4: {
        type: Sequelize.TEXT
    },
    am5: {
        type: Sequelize.TEXT
    },
    c21: {
        type: Sequelize.TEXT
    },
    c22: {
        type: Sequelize.TEXT
    },
    c23: {
        type: Sequelize.TEXT
    },
    c24: {
        type: Sequelize.TEXT
    },
    c25: {
        type: Sequelize.TEXT
    },
    t1: {
        type: Sequelize.TEXT
    },
    t2: {
        type: Sequelize.TEXT
    },
    t3: {
        type: Sequelize.TEXT
    },
    t4: {
        type: Sequelize.TEXT
    },
    compac1: {
        type: Sequelize.STRING
    },
    compac2: {
        type: Sequelize.TEXT
    },
    compac3: {
        type: Sequelize.TEXT
    },
    compac4: {
        type: Sequelize.TEXT
    },
    apav1: {
        type: Sequelize.TEXT
    },
    apav2: {
        type: Sequelize.TEXT
    },
    apav3: {
        type: Sequelize.TEXT
    },
    apav4: {
        type: Sequelize.TEXT
    },
    apap1: {
        type: Sequelize.TEXT
    },
    apap2: {
        type: Sequelize.TEXT
    },
    apap3: {
        type: Sequelize.TEXT
    },
    apap4: {
        type: Sequelize.TEXT
    },
    comm1: {
        type: Sequelize.TEXT
    },
    comm2: {
        type: Sequelize.TEXT
    },
    comm3: {
        type: Sequelize.TEXT
    },
    comm4: {
        type: Sequelize.TEXT
    },
    ccd1: {
        type: Sequelize.TEXT
    },
    ccd2: {
        type: Sequelize.TEXT
    },
    ccd3: {
        type: Sequelize.TEXT
    },
    ccd4: {
        type: Sequelize.TEXT
    },
    catcomp1: {
        type: Sequelize.TEXT
    },
    catcomp2: {
        type: Sequelize.TEXT
    },
    catcomp3: {
        type: Sequelize.TEXT
    },
    catcomp4: {
        type: Sequelize.TEXT
    },
    motif1: {
        type: Sequelize.TEXT
    },
    motif2: {
        type: Sequelize.TEXT
    },
    motif3: {
        type: Sequelize.TEXT
    },
    motif4: {
        type: Sequelize.TEXT
    },
    pa1: {
        type: Sequelize.TEXT
    },
    pa2: {
        type: Sequelize.TEXT
    },
    pa3: {
        type: Sequelize.TEXT
    },
    pa4: {
        type: Sequelize.TEXT
    },
    dp1: {
        type: Sequelize.TEXT
    },
    dp2: {
        type: Sequelize.TEXT
    },
    dp3: {
        type: Sequelize.TEXT
    },
    dp4: {
        type: Sequelize.TEXT
    },
    ct1: {
        type: Sequelize.TEXT
    },
    ct2: {
        type: Sequelize.TEXT
    },
    ct3: {
        type: Sequelize.TEXT
    },
    mt1: {
        type: Sequelize.TEXT
    },
    mt2: {
        type: Sequelize.TEXT
    },
    mt3: {
        type: Sequelize.TEXT
    },
    ml1: {
        type: Sequelize.TEXT
    },
    ml2: {
        type: Sequelize.TEXT
    },
    ml3: {
        type: Sequelize.TEXT
    },
    cpr1: {
        type: Sequelize.TEXT
    },
    cpr2: {
        type: Sequelize.TEXT
    },
    cpr3: {
        type: Sequelize.TEXT
    },
    cg1: {
        type: Sequelize.TEXT
    },
    cg2: {
        type: Sequelize.TEXT
    },
    cg3: {
        type: Sequelize.TEXT
    },
    comcollab: {
        type: Sequelize.TEXT
    },
    libelleend1: {
        type: Sequelize.TEXT
    },
    poidsend1: {
        type: Sequelize.TEXT
    },
    notationend1: {
        type: Sequelize.TEXT
    },
    commentaireend1: {
        type: Sequelize.TEXT
    },
    libelleend2: {
        type: Sequelize.TEXT
    },
    poidsend2: {
        type: Sequelize.TEXT
    },
    notationend2: {
        type: Sequelize.TEXT
    },
    commentaireend2: {
        type: Sequelize.TEXT
    },
    libelleend3: {
        type: Sequelize.TEXT
    },
    poidsend3: {
        type: Sequelize.TEXT
    },
    notationend3: {
        type: Sequelize.TEXT
    },
    commentaireend3: {
        type: Sequelize.TEXT
    },
    libelleend4: {
        type: Sequelize.TEXT
    },
    poidsend4: {
        type: Sequelize.TEXT
    },
    notationend4: {
        type: Sequelize.TEXT
    },
    commentaireend4: {
        type: Sequelize.TEXT
    },
    nomeval: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    alp1: {
        type: Sequelize.STRING,
    },
    alp2: {
        type: Sequelize.STRING,
    },
    typeeval: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

// Définition du modèle Evaluator
const Evaluator = sequelize.define('evaluators', {
    id_evaluator: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emailn1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailn2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildr: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailsg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildrh: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

// Définition du modèle Evaluation
const Evaluation = sequelize.define('evaluations', {
    evaluatorType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    statusN1: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusN2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusDirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusSecretary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusGeneralDirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusHR: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
});

// Définition des associations
Evaluated.hasMany(Evaluation, {
    foreignKey: 'evaluatedId'
});
Evaluation.belongsTo(Evaluated, {
    foreignKey: 'evaluatedId'
});

Evaluator.hasMany(Evaluation, {
    foreignKey: 'evaluatorId'
});
Evaluation.belongsTo(Evaluator, {
    foreignKey: 'evaluatorId'
});

const PersonEvaluationView = sequelize.define('PersonEvaluationView', {
    id_pers: Sequelize.STRING,
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    mat: Sequelize.STRING,
    dateentree: Sequelize.DATE,
    datetoday: Sequelize.DATE,
    direction: Sequelize.STRING,
    posteeval: Sequelize.STRING,
    fonc: Sequelize.STRING,
    datedu: Sequelize.DATE,
    dateau: Sequelize.DATE,
    mission: Sequelize.TEXT, // Changed to TEXT if it contains larger text
    libelle1: Sequelize.STRING,
    poids1: Sequelize.STRING,
    notation1: Sequelize.STRING,
    commentaire1: Sequelize.TEXT,
    libelle2: Sequelize.STRING,
    poids2: Sequelize.STRING,
    notation2: Sequelize.STRING,
    commentaire2: Sequelize.TEXT,
    libelle3: Sequelize.STRING,
    poids3: Sequelize.STRING,
    notation3: Sequelize.STRING,
    commentaire3: Sequelize.TEXT,
    libelle4: Sequelize.STRING,
    poids4: Sequelize.STRING,
    notation4: Sequelize.STRING,
    commentaire4: Sequelize.TEXT,
    res1: Sequelize.FLOAT,
    val1: Sequelize.STRING,
    val2: Sequelize.STRING,
    somme: Sequelize.STRING,
    v1: Sequelize.STRING,
    v2: Sequelize.STRING,
    v3: Sequelize.STRING,
    v4: Sequelize.STRING,
    v5: Sequelize.STRING,
    v6: Sequelize.STRING,
    v7: Sequelize.STRING,
    v8: Sequelize.STRING,
    v9: Sequelize.STRING,
    v10: Sequelize.STRING,
    v11: Sequelize.STRING,
    v12: Sequelize.STRING,
    v13: Sequelize.STRING,
    v14: Sequelize.STRING,
    v15: Sequelize.STRING,
    com1: Sequelize.TEXT,
    com2: Sequelize.TEXT,
    com3: Sequelize.TEXT,
    com4: Sequelize.TEXT,
    com5: Sequelize.TEXT,
    r1: Sequelize.FLOAT,
    r2: Sequelize.STRING,
    r3: Sequelize.STRING,
    r4: Sequelize.STRING,
    r5: Sequelize.STRING,
    critere1: Sequelize.TEXT,
    critere2: Sequelize.TEXT,
    critere3: Sequelize.TEXT,
    critere4: Sequelize.TEXT,
    critere5: Sequelize.TEXT,
    nivactus: Sequelize.STRING,
    nouvnivs: Sequelize.STRING,
    conclusion: Sequelize.TEXT,
    ancienneteniv: Sequelize.STRING,
    comment: Sequelize.TEXT,
    perfglob: Sequelize.STRING,
    classification: Sequelize.STRING,
    idr: Sequelize.STRING,
    f1: Sequelize.STRING,
    f2: Sequelize.STRING,
    f3: Sequelize.STRING,
    f4: Sequelize.STRING,
    f5: Sequelize.STRING,
    c1: Sequelize.STRING,
    c2: Sequelize.STRING,
    c3: Sequelize.STRING,
    c4: Sequelize.STRING,
    c5: Sequelize.STRING,
    am1: Sequelize.TEXT,
    am2: Sequelize.TEXT,
    am3: Sequelize.TEXT,
    am4: Sequelize.TEXT,
    am5: Sequelize.TEXT,
    c21: Sequelize.TEXT,
    c22: Sequelize.TEXT,
    c23: Sequelize.TEXT,
    c24: Sequelize.TEXT,
    c25: Sequelize.TEXT,
    t1: Sequelize.TEXT,
    t2: Sequelize.TEXT,
    t3: Sequelize.TEXT,
    t4: Sequelize.TEXT,
    compac1: Sequelize.STRING,
    compac2: Sequelize.TEXT,
    compac3: Sequelize.TEXT,
    compac4: Sequelize.TEXT,
    apav1: Sequelize.TEXT,
    apav2: Sequelize.TEXT,
    apav3: Sequelize.TEXT,
    apav4: Sequelize.TEXT,
    apap1: Sequelize.TEXT,
    apap2: Sequelize.TEXT,
    apap3: Sequelize.TEXT,
    apap4: Sequelize.TEXT,
    comm1: Sequelize.TEXT,
    comm2: Sequelize.TEXT,
    comm3: Sequelize.TEXT,
    comm4: Sequelize.TEXT,
    ccd1: Sequelize.TEXT,
    ccd2: Sequelize.TEXT,
    ccd3: Sequelize.TEXT,
    ccd4: Sequelize.TEXT,
    catcomp1: Sequelize.TEXT,
    catcomp2: Sequelize.TEXT,
    catcomp3: Sequelize.TEXT,
    catcomp4: Sequelize.TEXT,
    motif1: Sequelize.TEXT,
    motif2: Sequelize.TEXT,
    motif3: Sequelize.TEXT,
    motif4: Sequelize.TEXT,
    pa1: Sequelize.TEXT,
    pa2: Sequelize.TEXT,
    pa3: Sequelize.TEXT,
    pa4: Sequelize.TEXT,
    dp1: Sequelize.TEXT,
    dp2: Sequelize.TEXT,
    dp3: Sequelize.TEXT,
    dp4: Sequelize.TEXT,
    ct1: Sequelize.TEXT,
    ct2: Sequelize.TEXT,
    ct3: Sequelize.TEXT,
    mt1: Sequelize.TEXT,
    mt2: Sequelize.TEXT,
    mt3: Sequelize.TEXT,
    ml1: Sequelize.TEXT,
    ml2: Sequelize.TEXT,
    ml3: Sequelize.TEXT,
    cpr1: Sequelize.TEXT,
    cpr2: Sequelize.TEXT,
    cpr3: Sequelize.TEXT,
    cg1: Sequelize.TEXT,
    cg2: Sequelize.TEXT,
    cg3: Sequelize.TEXT,
    comcollab: Sequelize.TEXT,
    libelleend1: Sequelize.STRING,
    poidsend1: Sequelize.STRING,
    notationend1: Sequelize.STRING,
    commentaireend1: Sequelize.TEXT,
    libelleend2: Sequelize.STRING,
    poidsend2: Sequelize.STRING,
    notationend2: Sequelize.STRING,
    commentaireend2: Sequelize.TEXT,
    libelleend3: Sequelize.STRING,
    poidsend3: Sequelize.STRING,
    notationend3: Sequelize.STRING,
    commentaireend3: Sequelize.TEXT,
    libelleend4: Sequelize.STRING,
    poidsend4: Sequelize.STRING,
    notationend4: Sequelize.STRING,
    commentaireend4: Sequelize.TEXT,
    nomeval: Sequelize.STRING,
    alp1: Sequelize.STRING,
    alp2: Sequelize.STRING,
    typeeval: Sequelize.STRING,
    emailn1: Sequelize.STRING,
    emailn2: Sequelize.STRING,
    emaildr: Sequelize.STRING,
    emailsg: Sequelize.STRING,
    emaildg: Sequelize.STRING,
    emaildrh: Sequelize.STRING,
    evaluatorCreatedAt: Sequelize.DATE,
    evaluatorUpdatedAt: Sequelize.DATE,
    evaluatorType: Sequelize.STRING,
    statusN1: Sequelize.BOOLEAN,
    statusN2: Sequelize.BOOLEAN,
    statusDirection: Sequelize.BOOLEAN,
    statusSecretary: Sequelize.BOOLEAN,
    statusGeneralDirection: Sequelize.BOOLEAN,
    statusHR: Sequelize.BOOLEAN,
    evaluationCreatedAt: Sequelize.DATE,
    evaluationUpdatedAt: Sequelize.DATE
}, {
    tableName: 'PersonEvaluationView',
    timestamps: false, // La vue n'a pas de colonnes de timestamp
    sequelize,
});



const HistoEval = sequelize.define('HistoEval', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pers: {
        type: Sequelize.STRING,
    },
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    mat: {
        type: Sequelize.STRING
    },
    dateentree: {
        type: Sequelize.DATE
    },
    datetoday: {
        type: Sequelize.DATE
    },
    direction: {
        type: Sequelize.STRING
    },
    posteeval: {
        type: Sequelize.STRING
    },
    fonc: {
        type: Sequelize.STRING
    },
    datedu: {
        type: Sequelize.DATE
    },
    dateau: {
        type: Sequelize.DATE
    },
    mission: {
        type: Sequelize.TEXT
    },
    libelle1: {
        type: Sequelize.TEXT
    },
    poids1: {
        type: Sequelize.TEXT
    },
    notation1: {
        type: Sequelize.TEXT
    },
    commentaire1: {
        type: Sequelize.TEXT
    },
    libelle2: {
        type: Sequelize.TEXT
    },
    poids2: {
        type: Sequelize.TEXT
    },
    notation2: {
        type: Sequelize.TEXT
    },
    commentaire2: {
        type: Sequelize.TEXT
    },
    libelle3: {
        type: Sequelize.TEXT
    },
    poids3: {
        type: Sequelize.TEXT
    },
    notation3: {
        type: Sequelize.TEXT
    },
    commentaire3: {
        type: Sequelize.TEXT
    },
    libelle4: {
        type: Sequelize.TEXT
    },
    poids4: {
        type: Sequelize.TEXT
    },
    notation4: {
        type: Sequelize.TEXT
    },
    commentaire4: {
        type: Sequelize.TEXT
    },
    res1: {
        type: Sequelize.FLOAT
    },
    val1: {
        type: Sequelize.STRING
    },
    val2: {
        type: Sequelize.STRING
    },
    somme: {
        type: Sequelize.STRING
    },
    v1: {
        type: Sequelize.STRING
    },
    v2: {
        type: Sequelize.STRING
    },
    v3: {
        type: Sequelize.STRING
    },
    v4: {
        type: Sequelize.STRING
    },
    v5: {
        type: Sequelize.STRING
    },
    v6: {
        type: Sequelize.STRING
    },
    v7: {
        type: Sequelize.STRING
    },
    v8: {
        type: Sequelize.STRING
    },
    v9: {
        type: Sequelize.STRING
    },
    v10: {
        type: Sequelize.STRING
    },
    v11: {
        type: Sequelize.STRING
    },
    v12: {
        type: Sequelize.STRING
    },
    v13: {
        type: Sequelize.STRING
    },
    v14: {
        type: Sequelize.STRING
    },
    v15: {
        type: Sequelize.STRING
    },
    com1: {
        type: Sequelize.TEXT
    },
    com2: {
        type: Sequelize.TEXT
    },
    com3: {
        type: Sequelize.TEXT
    },
    com4: {
        type: Sequelize.TEXT
    },
    com5: {
        type: Sequelize.TEXT
    },
    r1: {
        type: Sequelize.FLOAT
    },
    r2: {
        type: Sequelize.STRING
    },
    r3: {
        type: Sequelize.STRING
    },
    r4: {
        type: Sequelize.STRING
    },
    r5: {
        type: Sequelize.STRING
    },
    critere1: {
        type: Sequelize.TEXT
    },
    critere2: {
        type: Sequelize.TEXT
    },
    critere3: {
        type: Sequelize.TEXT
    },
    critere4: {
        type: Sequelize.TEXT
    },
    critere5: {
        type: Sequelize.TEXT
    },
    nivactus: {
        type: Sequelize.STRING
    },
    nouvnivs: {
        type: Sequelize.STRING
    },
    conclusion: {
        type: Sequelize.TEXT
    },
    ancienneteniv: {
        type: Sequelize.STRING
    },
    comment: {
        type: Sequelize.TEXT
    },
    perfglob: {
        type: Sequelize.STRING
    },
    classification: {
        type: Sequelize.STRING
    },
    idr: {
        type: Sequelize.STRING
    },
    f1: {
        type: Sequelize.STRING
    },
    f2: {
        type: Sequelize.STRING
    },
    f3: {
        type: Sequelize.STRING
    },
    f4: {
        type: Sequelize.STRING
    },
    f5: {
        type: Sequelize.STRING
    },
    c1: {
        type: Sequelize.STRING
    },
    c2: {
        type: Sequelize.STRING
    },
    c3: {
        type: Sequelize.STRING
    },
    c4: {
        type: Sequelize.STRING
    },
    c5: {
        type: Sequelize.STRING
    },
    am1: {
        type: Sequelize.TEXT
    },
    am2: {
        type: Sequelize.TEXT
    },
    am3: {
        type: Sequelize.TEXT
    },
    am4: {
        type: Sequelize.TEXT
    },
    am5: {
        type: Sequelize.TEXT
    },
    c21: {
        type: Sequelize.TEXT
    },
    c22: {
        type: Sequelize.TEXT
    },
    c23: {
        type: Sequelize.TEXT
    },
    c24: {
        type: Sequelize.TEXT
    },
    c25: {
        type: Sequelize.TEXT
    },
    t1: {
        type: Sequelize.TEXT
    },
    t2: {
        type: Sequelize.TEXT
    },
    t3: {
        type: Sequelize.TEXT
    },
    t4: {
        type: Sequelize.TEXT
    },
    compac1: {
        type: Sequelize.STRING
    },
    compac2: {
        type: Sequelize.TEXT
    },
    compac3: {
        type: Sequelize.TEXT
    },
    compac4: {
        type: Sequelize.TEXT
    },
    apav1: {
        type: Sequelize.TEXT
    },
    apav2: {
        type: Sequelize.TEXT
    },
    apav3: {
        type: Sequelize.TEXT
    },
    apav4: {
        type: Sequelize.TEXT
    },
    apap1: {
        type: Sequelize.TEXT
    },
    apap2: {
        type: Sequelize.TEXT
    },
    apap3: {
        type: Sequelize.TEXT
    },
    apap4: {
        type: Sequelize.TEXT
    },
    comm1: {
        type: Sequelize.TEXT
    },
    comm2: {
        type: Sequelize.TEXT
    },
    comm3: {
        type: Sequelize.TEXT
    },
    comm4: {
        type: Sequelize.TEXT
    },
    ccd1: {
        type: Sequelize.TEXT
    },
    ccd2: {
        type: Sequelize.TEXT
    },
    ccd3: {
        type: Sequelize.TEXT
    },
    ccd4: {
        type: Sequelize.TEXT
    },
    catcomp1: {
        type: Sequelize.TEXT
    },
    catcomp2: {
        type: Sequelize.TEXT
    },
    catcomp3: {
        type: Sequelize.TEXT
    },
    catcomp4: {
        type: Sequelize.TEXT
    },
    motif1: {
        type: Sequelize.TEXT
    },
    motif2: {
        type: Sequelize.TEXT
    },
    motif3: {
        type: Sequelize.TEXT
    },
    motif4: {
        type: Sequelize.TEXT
    },
    pa1: {
        type: Sequelize.TEXT
    },
    pa2: {
        type: Sequelize.TEXT
    },
    pa3: {
        type: Sequelize.TEXT
    },
    pa4: {
        type: Sequelize.TEXT
    },
    dp1: {
        type: Sequelize.TEXT
    },
    dp2: {
        type: Sequelize.TEXT
    },
    dp3: {
        type: Sequelize.TEXT
    },
    dp4: {
        type: Sequelize.TEXT
    },
    ct1: {
        type: Sequelize.TEXT
    },
    ct2: {
        type: Sequelize.TEXT
    },
    ct3: {
        type: Sequelize.TEXT
    },
    mt1: {
        type: Sequelize.TEXT
    },
    mt2: {
        type: Sequelize.TEXT
    },
    mt3: {
        type: Sequelize.TEXT
    },
    ml1: {
        type: Sequelize.TEXT
    },
    ml2: {
        type: Sequelize.TEXT
    },
    ml3: {
        type: Sequelize.TEXT
    },
    cpr1: {
        type: Sequelize.TEXT
    },
    cpr2: {
        type: Sequelize.TEXT
    },
    cpr3: {
        type: Sequelize.TEXT
    },
    cg1: {
        type: Sequelize.TEXT
    },
    cg2: {
        type: Sequelize.TEXT
    },
    cg3: {
        type: Sequelize.TEXT
    },
    comcollab: {
        type: Sequelize.TEXT
    },
    libelleend1: {
        type: Sequelize.TEXT
    },
    poidsend1: {
        type: Sequelize.TEXT
    },
    notationend1: {
        type: Sequelize.TEXT
    },
    commentaireend1: {
        type: Sequelize.TEXT
    },
    libelleend2: {
        type: Sequelize.TEXT
    },
    poidsend2: {
        type: Sequelize.TEXT
    },
    notationend2: {
        type: Sequelize.TEXT
    },
    commentaireend2: {
        type: Sequelize.TEXT
    },
    libelleend3: {
        type: Sequelize.TEXT
    },
    poidsend3: {
        type: Sequelize.TEXT
    },
    notationend3: {
        type: Sequelize.TEXT
    },
    commentaireend3: {
        type: Sequelize.TEXT
    },
    libelleend4: {
        type: Sequelize.TEXT
    },
    poidsend4: {
        type: Sequelize.TEXT
    },
    notationend4: {
        type: Sequelize.TEXT
    },
    commentaireend4: {
        type: Sequelize.TEXT
    },
    nomeval: {
        type: Sequelize.STRING
    },
    alp1: {
        type: Sequelize.STRING
    },
    alp2: {
        type: Sequelize.STRING
    },
    typeeval: {
        type: Sequelize.STRING
    },
    id_evaluator: {
        type: Sequelize.INTEGER,
    },
    emailn1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailn2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildr: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailsg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildg: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emaildrh: {
        type: Sequelize.STRING,
        allowNull: false
    },
    evaluatorType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    statusN1: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusN2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusDirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusSecretary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusGeneralDirection: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    statusHR: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
 
}, {
    tableName: 'histo_eval',
    timestamps: false // Ajoutez cette option si vous n'utilisez pas les champs de timestamps
});



module.exports = { HistoEval, PersonEvaluationView, Evaluated, Evaluator, Evaluation };
