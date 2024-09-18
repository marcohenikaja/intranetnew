const { Evaluator, Evaluated, Evaluation, PersonEvaluationView, HistoEval } = require('../models/evaluationModele');
const { Op } = require('sequelize');
const cron = require('node-cron');
const { Sequelize } = require('sequelize')
const { sequelize } = require('../db/db');

const ajouteval = async (req, res) => {
    const id_pers = req.params.ids;
    const typeEval = "Evaluation cadre"

    console.log(id_pers);
    const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);
    const {
        nom, prenom, mat, daty, dir, posteeval, fonc, datys, datyss, mission, objectifs = [],
        resultat, selectedValue1 = [], selectedValue2 = [], selectedVal1 = [], selectedVal2 = [], selectedVal3 = [],
        selectedVal4 = [], selectedVal5 = [], selectedVal6 = [], selectedVal7 = [], selectedVal8 = [], selectedVal9 = [],
        selectedVal10 = [], selectedVal11 = [], selectedVal12 = [], selectedVal13 = [], selectedVal14 = [], selectedVal15 = [],
        r1 = '', r2 = '', r3 = '', r4 = '', r5 = '',
        cdc1 = '', cdc2 = '', cdc3 = '', cdc4 = '', cdc5 = '',
        cmt1 = '', cmt2 = '', cmt3 = '', cmt4 = '', cmt5 = '',
        nivactus = '', nouvnivs = '', concl = '', ancienneteniv = '', com = '',
        pg = '', classification = '', idr = '', f1 = '', f2 = '', f3 = '', f4 = '',
        c1 = '', c2 = '', c3 = '', c4 = '', am1 = '', am2 = '', am3 = '', am4 = '',
        c21 = '', c22 = '', c23 = '', c24 = '', t1 = '', t2 = '', t3 = '', t4 = '',
        compac1 = '', compac2 = '', compac3 = '', compac4 = '', apav1 = '', apav2 = '', apav3 = '', apav4 = '',
        apap1 = '', apap2 = '', apap3 = '', apap4 = '', comm1 = '', comm2 = '', comm3 = '', comm4 = '',
        ccd1 = '', ccd2 = '', ccd3 = '', ccd4 = '', catcomp1 = '', catcomp2 = '', catcomp3 = '', catcomp4 = '',
        motif1 = '', motif2 = '', motif3 = '', motif4 = '',
        pa1 = '', pa2 = '', pa3 = '', pa4 = '', dp1 = '', dp2 = '', dp3 = '', dp4 = '',
        ct1 = '', ct2 = '', ct3 = '', mt1 = '', mt2 = '', mt3 = '', ml1 = '', ml2 = '', ml3 = '',
        cpr1 = '', cpr2 = '', cpr3 = '', cg1 = '', cg2 = '', cg3 = '', comcollab = '', somme,
        objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn1 = '', emailn2 = '', emaildr = '', emailsg = '', emaildg = '', emaildrh = '', ids
    } = req.body;
    console.log(ids);


    if (!id_pers) {
        return res.status(400).json({ error: 'Les paramètres id_pers, nomeval et typeeval sont requis.' });
    }

    try {
        // Vérifier si l'évaluation existe
        const existingEvaluation = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: typeEval
            }
        });

        const existingEvalued = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: {
                    [Op.ne]: typeEval // Op.ne signifie "différent de" pour Sequelize
                }
            }
        });


        if (existingEvalued) {
            return res.send({ success: false, message: 'Vous ne pouvez pas faire une autre evaluation ' });
        }


        if (existingEvaluation) {

            const evaluationData = existingEvaluation.dataValues;
            if (evaluationData.statusN1 === true && (ids === id_pers || ids == id_pers)) {
                return res.send({ success: false, message: 'Evaluation déjà validée ' });

            }
        }

        let evaluatorId;

        if (existingEvaluation) {
            console.log('ato ppp', typeEval);
            // Mise à jour de l'évalué
            await Evaluated.update({
                nom: cleanData(nom),
                prenom: cleanData(prenom),
                mat: cleanData(mat),
                dateentree: cleanData(daty),
                alp1: cleanData(alp1),
                alp2: cleanData(alp2),
                f5: cleanData(f5),
                c5: cleanData(c5),
                am5: cleanData(am5),
                c25: cleanData(c25),
                direction: cleanData(dir),
                posteeval: cleanData(posteeval),
                fonc: cleanData(fonc),
                datedu: cleanData(datys),
                dateau: cleanData(datyss),
                mission: cleanData(mission),
                libelle1: cleanData(objectifs[0]?.libelle),
                poids1: cleanData(objectifs[0]?.poids),
                notation1: cleanData(objectifs[0]?.notation),
                commentaire1: cleanData(objectifs[0]?.commentaire),
                libelle2: cleanData(objectifs[1]?.libelle),
                poids2: cleanData(objectifs[1]?.poids),
                notation2: cleanData(objectifs[1]?.notation),
                commentaire2: cleanData(objectifs[1]?.commentaire),
                libelle3: cleanData(objectifs[2]?.libelle),
                poids3: cleanData(objectifs[2]?.poids),
                notation3: cleanData(objectifs[2]?.notation),
                commentaire3: cleanData(objectifs[2]?.commentaire),
                libelle4: cleanData(objectifs[3]?.libelle),
                poids4: cleanData(objectifs[3]?.poids),
                notation4: cleanData(objectifs[3]?.notation),
                commentaire4: cleanData(objectifs[3]?.commentaire),
                res1: cleanData(resultat),
                val1: cleanData(selectedValue1[0]),
                val2: cleanData(selectedValue2[0]),
                somme: cleanData(somme),
                v1: cleanData(selectedVal1[0]),
                v2: cleanData(selectedVal2[0]),
                v3: cleanData(selectedVal3[0]),
                v4: cleanData(selectedVal4[0]),
                v5: cleanData(selectedVal5[0]),
                v6: cleanData(selectedVal6[0]),
                v7: cleanData(selectedVal7[0]),
                v8: cleanData(selectedVal8[0]),
                v9: cleanData(selectedVal9[0]),
                v10: cleanData(selectedVal10[0]),
                v11: cleanData(selectedVal11[0]),
                v12: cleanData(selectedVal12[0]),
                v13: cleanData(selectedVal13[0]),
                v14: cleanData(selectedVal14[0]),
                v15: cleanData(selectedVal15[0]),
                com1: cleanData(cmt1),
                com2: cleanData(cmt2),
                com3: cleanData(cmt3),
                com4: cleanData(cmt4),
                com5: cleanData(cmt5),
                r1: cleanData(r1),
                r2: cleanData(r2),
                r3: cleanData(r3),
                r4: cleanData(r4),
                r5: cleanData(r5),
                critere1: cleanData(cdc1),
                critere2: cleanData(cdc2),
                critere3: cleanData(cdc3),
                critere4: cleanData(cdc4),
                critere5: cleanData(cdc5),
                nivactus: cleanData(nivactus),
                nouvnivs: cleanData(nouvnivs),
                conclusion: cleanData(concl),
                ancienneteniv: cleanData(ancienneteniv),
                comment: cleanData(com),
                perfglob: cleanData(pg),
                classification: cleanData(classification),
                idr: cleanData(idr),
                f1: cleanData(f1),
                f2: cleanData(f2),
                f3: cleanData(f3),
                f4: cleanData(f4),
                c1: cleanData(c1),
                c2: cleanData(c2),
                c3: cleanData(c3),
                c4: cleanData(c4),
                am1: cleanData(am1),
                am2: cleanData(am2),
                am3: cleanData(am3),
                am4: cleanData(am4),
                c21: cleanData(c21),
                c22: cleanData(c22),
                c23: cleanData(c23),
                c24: cleanData(c24),
                t1: cleanData(t1),
                t2: cleanData(t2),
                t3: cleanData(t3),
                t4: cleanData(t4),
                compac1: cleanData(compac1),
                compac2: cleanData(compac2),
                compac3: cleanData(compac3),
                compac4: cleanData(compac4),
                apav1: cleanData(apav1),
                apav2: cleanData(apav2),
                apav3: cleanData(apav3),
                apav4: cleanData(apav4),
                apap1: cleanData(apap1),
                apap2: cleanData(apap2),
                apap3: cleanData(apap3),
                apap4: cleanData(apap4),
                comm1: cleanData(comm1),
                comm2: cleanData(comm2),
                comm3: cleanData(comm3),
                comm4: cleanData(comm4),
                ccd1: cleanData(ccd1),
                ccd2: cleanData(ccd2),
                ccd3: cleanData(ccd3),
                ccd4: cleanData(ccd4),
                catcomp1: cleanData(catcomp1),
                catcomp2: cleanData(catcomp2),
                catcomp3: cleanData(catcomp3),
                catcomp4: cleanData(catcomp4),
                motif1: cleanData(motif1),
                motif2: cleanData(motif2),
                motif3: cleanData(motif3),
                motif4: cleanData(motif4),
                pa1: cleanData(pa1),
                pa2: cleanData(pa2),
                pa3: cleanData(pa3),
                pa4: cleanData(pa4),
                dp1: cleanData(dp1),
                dp2: cleanData(dp2),
                dp3: cleanData(dp3),
                dp4: cleanData(dp4),
                ct1: cleanData(ct1),
                ct2: cleanData(ct2),
                ct3: cleanData(ct3),
                mt1: cleanData(mt1),
                mt2: cleanData(mt2),
                mt3: cleanData(mt3),
                ml1: cleanData(ml1),
                ml2: cleanData(ml2),
                ml3: cleanData(ml3),
                cpr1: cleanData(cpr1),
                cpr2: cleanData(cpr2),
                cpr3: cleanData(cpr3),
                cg1: cleanData(cg1),
                cg2: cleanData(cg2),
                cg3: cleanData(cg3),
                comcollab: cleanData(comcollab),
                libelleend1: cleanData(objectifs1[0]?.libelle),
                poidsend1: cleanData(objectifs1[0]?.poids),
                notationend1: cleanData(objectifs1[0]?.notation),
                commentaireend1: cleanData(objectifs1[0]?.commentaire),
                libelleend2: cleanData(objectifs1[1]?.libelle),
                poidsend2: cleanData(objectifs1[1]?.poids),
                notationend2: cleanData(objectifs1[1]?.notation),
                commentaireend2: cleanData(objectifs1[1]?.commentaire),
                libelleend3: cleanData(objectifs1[2]?.libelle),
                poidsend3: cleanData(objectifs1[2]?.poids),
                notationend3: cleanData(objectifs1[2]?.notation),
                commentaireend3: cleanData(objectifs1[2]?.commentaire),
                libelleend4: cleanData(objectifs1[3]?.libelle),
                poidsend4: cleanData(objectifs1[3]?.poids),
                notationend4: cleanData(objectifs1[3]?.notation),
                commentaireend4: cleanData(objectifs1[3]?.commentaire),
            }, { where: { id_pers } });


            // Vérifier si l'évaluateur existe
            const evaluator = await Evaluator.findOne({
                where: { id_evaluator: existingEvaluation.evaluatorId } // Utilisez `id_evaluator`
            });

            if (evaluator) {
                // Mise à jour de l'évaluateur
                await Evaluator.update({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                }, { where: { id_evaluator: evaluator.id_evaluator } });
                evaluatorId = evaluator.id_evaluator;
            } else {
                // Créez un nouvel évaluateur si nécessaire
                const newEvaluator = await Evaluator.create({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                });
                evaluatorId = newEvaluator.id_evaluator;

                // Mise à jour de l'évaluation avec le nouvel ID évaluateur
                await Evaluation.update({
                    evaluatorId: evaluatorId
                }, { where: { evaluatedId: id_pers } });
            }

            // Mise à jour de l'évaluation
            await Evaluation.update({
                evaluatorType: 'Evaluation cadre'
            }, { where: { evaluatedId: id_pers } });

        } else {

            // Insertion d'un nouvel évalué
            const [newEvaluated] = await Evaluated.findOrCreate({
                where: { id_pers },
                defaults: {
                    nom: cleanData(nom),
                    prenom: cleanData(prenom),
                    mat: cleanData(mat),
                    dateentree: cleanData(daty),
                    alp1: cleanData(alp1),
                    alp2: cleanData(alp2),
                    f5: cleanData(f5),
                    c5: cleanData(c5),
                    am5: cleanData(am5),
                    c25: cleanData(c25),
                    direction: cleanData(dir),
                    posteeval: cleanData(posteeval),
                    fonc: cleanData(fonc),
                    datedu: cleanData(datys),
                    dateau: cleanData(datyss),
                    mission: cleanData(mission),
                    libelle1: cleanData(objectifs[0]?.libelle),
                    poids1: cleanData(objectifs[0]?.poids),
                    notation1: cleanData(objectifs[0]?.notation),
                    commentaire1: cleanData(objectifs[0]?.commentaire),
                    libelle2: cleanData(objectifs[1]?.libelle),
                    poids2: cleanData(objectifs[1]?.poids),
                    notation2: cleanData(objectifs[1]?.notation),
                    commentaire2: cleanData(objectifs[1]?.commentaire),
                    libelle3: cleanData(objectifs[2]?.libelle),
                    poids3: cleanData(objectifs[2]?.poids),
                    notation3: cleanData(objectifs[2]?.notation),
                    commentaire3: cleanData(objectifs[2]?.commentaire),
                    libelle4: cleanData(objectifs[3]?.libelle),
                    poids4: cleanData(objectifs[3]?.poids),
                    notation4: cleanData(objectifs[3]?.notation),
                    commentaire4: cleanData(objectifs[3]?.commentaire),
                    res1: cleanData(resultat),
                    val1: cleanData(selectedValue1[0]),
                    val2: cleanData(selectedValue2[0]),
                    somme: cleanData(somme),
                    v1: cleanData(selectedVal1[0]),
                    v2: cleanData(selectedVal2[0]),
                    v3: cleanData(selectedVal3[0]),
                    v4: cleanData(selectedVal4[0]),
                    v5: cleanData(selectedVal5[0]),
                    v6: cleanData(selectedVal6[0]),
                    v7: cleanData(selectedVal7[0]),
                    v8: cleanData(selectedVal8[0]),
                    v9: cleanData(selectedVal9[0]),
                    v10: cleanData(selectedVal10[0]),
                    v11: cleanData(selectedVal11[0]),
                    v12: cleanData(selectedVal12[0]),
                    v13: cleanData(selectedVal13[0]),
                    v14: cleanData(selectedVal14[0]),
                    v15: cleanData(selectedVal15[0]),
                    com1: cleanData(cmt1),
                    com2: cleanData(cmt2),
                    com3: cleanData(cmt3),
                    com4: cleanData(cmt4),
                    com5: cleanData(cmt5),
                    r1: cleanData(r1),
                    r2: cleanData(r2),
                    r3: cleanData(r3),
                    r4: cleanData(r4),
                    r5: cleanData(r5),
                    critere1: cleanData(cdc1),
                    critere2: cleanData(cdc2),
                    critere3: cleanData(cdc3),
                    critere4: cleanData(cdc4),
                    critere5: cleanData(cdc5),
                    nivactus: cleanData(nivactus),
                    nouvnivs: cleanData(nouvnivs),
                    conclusion: cleanData(concl),
                    ancienneteniv: cleanData(ancienneteniv),
                    comment: cleanData(com),
                    perfglob: cleanData(pg),
                    classification: cleanData(classification),
                    idr: cleanData(idr),
                    f1: cleanData(f1),
                    f2: cleanData(f2),
                    f3: cleanData(f3),
                    f4: cleanData(f4),
                    c1: cleanData(c1),
                    c2: cleanData(c2),
                    c3: cleanData(c3),
                    c4: cleanData(c4),
                    am1: cleanData(am1),
                    am2: cleanData(am2),
                    am3: cleanData(am3),
                    am4: cleanData(am4),
                    c21: cleanData(c21),
                    c22: cleanData(c22),
                    c23: cleanData(c23),
                    c24: cleanData(c24),
                    t1: cleanData(t1),
                    t2: cleanData(t2),
                    t3: cleanData(t3),
                    t4: cleanData(t4),
                    compac1: cleanData(compac1),
                    compac2: cleanData(compac2),
                    compac3: cleanData(compac3),
                    compac4: cleanData(compac4),
                    apav1: cleanData(apav1),
                    apav2: cleanData(apav2),
                    apav3: cleanData(apav3),
                    apav4: cleanData(apav4),
                    apap1: cleanData(apap1),
                    apap2: cleanData(apap2),
                    apap3: cleanData(apap3),
                    apap4: cleanData(apap4),
                    comm1: cleanData(comm1),
                    comm2: cleanData(comm2),
                    comm3: cleanData(comm3),
                    comm4: cleanData(comm4),
                    ccd1: cleanData(ccd1),
                    ccd2: cleanData(ccd2),
                    ccd3: cleanData(ccd3),
                    ccd4: cleanData(ccd4),
                    catcomp1: cleanData(catcomp1),
                    catcomp2: cleanData(catcomp2),
                    catcomp3: cleanData(catcomp3),
                    catcomp4: cleanData(catcomp4),
                    motif1: cleanData(motif1),
                    motif2: cleanData(motif2),
                    motif3: cleanData(motif3),
                    motif4: cleanData(motif4),
                    pa1: cleanData(pa1),
                    pa2: cleanData(pa2),
                    pa3: cleanData(pa3),
                    pa4: cleanData(pa4),
                    dp1: cleanData(dp1),
                    dp2: cleanData(dp2),
                    dp3: cleanData(dp3),
                    dp4: cleanData(dp4),
                    ct1: cleanData(ct1),
                    ct2: cleanData(ct2),
                    ct3: cleanData(ct3),
                    mt1: cleanData(mt1),
                    mt2: cleanData(mt2),
                    mt3: cleanData(mt3),
                    ml1: cleanData(ml1),
                    ml2: cleanData(ml2),
                    ml3: cleanData(ml3),
                    cpr1: cleanData(cpr1),
                    cpr2: cleanData(cpr2),
                    cpr3: cleanData(cpr3),
                    cg1: cleanData(cg1),
                    cg2: cleanData(cg2),
                    cg3: cleanData(cg3),
                    comcollab: cleanData(comcollab),
                    libelleend1: cleanData(objectifs1[0]?.libelle),
                    poidsend1: cleanData(objectifs1[0]?.poids),
                    notationend1: cleanData(objectifs1[0]?.notation),
                    commentaireend1: cleanData(objectifs1[0]?.commentaire),
                    libelleend2: cleanData(objectifs1[1]?.libelle),
                    poidsend2: cleanData(objectifs1[1]?.poids),
                    notationend2: cleanData(objectifs1[1]?.notation),
                    commentaireend2: cleanData(objectifs1[1]?.commentaire),
                    libelleend3: cleanData(objectifs1[2]?.libelle),
                    poidsend3: cleanData(objectifs1[2]?.poids),
                    notationend3: cleanData(objectifs1[2]?.notation),
                    commentaireend3: cleanData(objectifs1[2]?.commentaire),
                    libelleend4: cleanData(objectifs1[3]?.libelle),
                    poidsend4: cleanData(objectifs1[3]?.poids),
                    notationend4: cleanData(objectifs1[3]?.notation),
                    commentaireend4: cleanData(objectifs1[3]?.commentaire),
                }
            });

            // Créez un nouvel évaluateur
            const newEvaluator = await Evaluator.create({
                emailn1,
                emailn2,
                emaildr,
                emailsg,
                emaildg,
                emaildrh
            });

            // Créez une nouvelle évaluation
            await Evaluation.create({
                evaluatorType: 'Evaluation cadre',
                evaluatedId: newEvaluated.id_pers,
                evaluatorId: newEvaluator.id_evaluator,
                createdAt: new Date(),
            });
        }

        // Réponse de succès
        if (!existingEvaluation) {
            createdAt = new Date();
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } else {
            createdAt = existingEvaluation.createdAt;
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }

        res.send({ success: true, message: `Évaluation bien enregistrée.`, date: `${formattedDate}` });

    } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    }
};






const ajoutevalnoncadre = async (req, res) => {
    const id_pers = req.params.ids;
    const typeEval = 'Evaluation non cadre'
    const mail = req.body.loggedInUser;
    console.log(id_pers);
    const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);
    console.log(req.body.emailn1);
    const {
        nom, prenom, mat, daty, dir, posteeval, fonc, datys, datyss, mission, objectifs = [],
        resultat, selectedValue1 = [], selectedValue2 = [], selectedVal1 = [], selectedVal2 = [], selectedVal3 = [],
        selectedVal4 = [], selectedVal5 = [], selectedVal6 = [], selectedVal7 = [], selectedVal8 = [], selectedVal9 = [],
        selectedVal10 = [], selectedVal11 = [], selectedVal12 = [], selectedVal13 = [], selectedVal14 = [], selectedVal15 = [],
        r1 = '', r2 = '', r3 = '', r4 = '', r5 = '',
        cdc1 = '', cdc2 = '', cdc3 = '', cdc4 = '', cdc5 = '',
        cmt1 = '', cmt2 = '', cmt3 = '', cmt4 = '', cmt5 = '',
        nivactus = '', nouvnivs = '', concl = '', ancienneteniv = '', com = '',
        pg = '', classification = '', idr = '', f1 = '', f2 = '', f3 = '', f4 = '',
        c1 = '', c2 = '', c3 = '', c4 = '', am1 = '', am2 = '', am3 = '', am4 = '',
        c21 = '', c22 = '', c23 = '', c24 = '', t1 = '', t2 = '', t3 = '', t4 = '',
        compac1 = '', compac2 = '', compac3 = '', compac4 = '', apav1 = '', apav2 = '', apav3 = '', apav4 = '',
        apap1 = '', apap2 = '', apap3 = '', apap4 = '', comm1 = '', comm2 = '', comm3 = '', comm4 = '',
        ccd1 = '', ccd2 = '', ccd3 = '', ccd4 = '', catcomp1 = '', catcomp2 = '', catcomp3 = '', catcomp4 = '',
        motif1 = '', motif2 = '', motif3 = '', motif4 = '',
        pa1 = '', pa2 = '', pa3 = '', pa4 = '', dp1 = '', dp2 = '', dp3 = '', dp4 = '',
        ct1 = '', ct2 = '', ct3 = '', mt1 = '', mt2 = '', mt3 = '', ml1 = '', ml2 = '', ml3 = '',
        cpr1 = '', cpr2 = '', cpr3 = '', cg1 = '', cg2 = '', cg3 = '', comcollab = '', somme,
        objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn1 = '', emailn2 = '', emaildr = '', emailsg = '', emaildg = '', emaildrh = '', ids
    } = req.body;

    if (!id_pers) {
        return res.status(400).json({ error: 'Les paramètres id_pers, nomeval et typeeval sont requis.' });
    }



    try {
        // Vérifier si l'évaluation existe
        const existingEvaluation = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: typeEval
            }
        });


        const existingEvalued = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: {
                    [Op.ne]: typeEval // Op.ne signifie "différent de" pour Sequelize
                }
            }
        });





        if (existingEvalued) {
            return res.send({ success: false, message: 'Vous ne pouvez pas faire une autre evaluation ' });
        }


        if (existingEvaluation) {

            const evaluationData = existingEvaluation.dataValues;
            if (evaluationData.statusN1 === true && (ids === id_pers || ids == id_pers)) {
                return res.send({ success: false, message: 'Evaluation déjà validée ' });

            }
        }

        let evaluatorId;

        if (existingEvaluation) {
            // Mise à jour de l'évalué
            await Evaluated.update({
                nom: cleanData(nom),
                prenom: cleanData(prenom),
                mat: cleanData(mat),
                dateentree: cleanData(daty),
                alp1: cleanData(alp1),
                alp2: cleanData(alp2),
                f5: cleanData(f5),
                c5: cleanData(c5),
                am5: cleanData(am5),
                c25: cleanData(c25),
                direction: cleanData(dir),
                posteeval: cleanData(posteeval),
                fonc: cleanData(fonc),
                datedu: cleanData(datys),
                dateau: cleanData(datyss),
                mission: cleanData(mission),
                libelle1: cleanData(objectifs[0]?.libelle),
                poids1: cleanData(objectifs[0]?.poids),
                notation1: cleanData(objectifs[0]?.notation),
                commentaire1: cleanData(objectifs[0]?.commentaire),
                libelle2: cleanData(objectifs[1]?.libelle),
                poids2: cleanData(objectifs[1]?.poids),
                notation2: cleanData(objectifs[1]?.notation),
                commentaire2: cleanData(objectifs[1]?.commentaire),
                libelle3: cleanData(objectifs[2]?.libelle),
                poids3: cleanData(objectifs[2]?.poids),
                notation3: cleanData(objectifs[2]?.notation),
                commentaire3: cleanData(objectifs[2]?.commentaire),
                libelle4: cleanData(objectifs[3]?.libelle),
                poids4: cleanData(objectifs[3]?.poids),
                notation4: cleanData(objectifs[3]?.notation),
                commentaire4: cleanData(objectifs[3]?.commentaire),
                res1: cleanData(resultat),
                val1: cleanData(selectedValue1[0]),
                val2: cleanData(selectedValue2[0]),
                somme: cleanData(somme),
                v1: cleanData(selectedVal1[0]),
                v2: cleanData(selectedVal2[0]),
                v3: cleanData(selectedVal3[0]),
                v4: cleanData(selectedVal4[0]),
                v5: cleanData(selectedVal5[0]),
                v6: cleanData(selectedVal6[0]),
                v7: cleanData(selectedVal7[0]),
                v8: cleanData(selectedVal8[0]),
                v9: cleanData(selectedVal9[0]),
                v10: cleanData(selectedVal10[0]),
                v11: cleanData(selectedVal11[0]),
                v12: cleanData(selectedVal12[0]),
                v13: cleanData(selectedVal13[0]),
                v14: cleanData(selectedVal14[0]),
                v15: cleanData(selectedVal15[0]),
                com1: cleanData(cmt1),
                com2: cleanData(cmt2),
                com3: cleanData(cmt3),
                com4: cleanData(cmt4),
                com5: cleanData(cmt5),
                r1: cleanData(r1),
                r2: cleanData(r2),
                r3: cleanData(r3),
                r4: cleanData(r4),
                r5: cleanData(r5),
                critere1: cleanData(cdc1),
                critere2: cleanData(cdc2),
                critere3: cleanData(cdc3),
                critere4: cleanData(cdc4),
                critere5: cleanData(cdc5),
                nivactus: cleanData(nivactus),
                nouvnivs: cleanData(nouvnivs),
                conclusion: cleanData(concl),
                ancienneteniv: cleanData(ancienneteniv),
                comment: cleanData(com),
                perfglob: cleanData(pg),
                classification: cleanData(classification),
                idr: cleanData(idr),
                f1: cleanData(f1),
                f2: cleanData(f2),
                f3: cleanData(f3),
                f4: cleanData(f4),
                c1: cleanData(c1),
                c2: cleanData(c2),
                c3: cleanData(c3),
                c4: cleanData(c4),
                am1: cleanData(am1),
                am2: cleanData(am2),
                am3: cleanData(am3),
                am4: cleanData(am4),
                c21: cleanData(c21),
                c22: cleanData(c22),
                c23: cleanData(c23),
                c24: cleanData(c24),
                t1: cleanData(t1),
                t2: cleanData(t2),
                t3: cleanData(t3),
                t4: cleanData(t4),
                compac1: cleanData(compac1),
                compac2: cleanData(compac2),
                compac3: cleanData(compac3),
                compac4: cleanData(compac4),
                apav1: cleanData(apav1),
                apav2: cleanData(apav2),
                apav3: cleanData(apav3),
                apav4: cleanData(apav4),
                apap1: cleanData(apap1),
                apap2: cleanData(apap2),
                apap3: cleanData(apap3),
                apap4: cleanData(apap4),
                comm1: cleanData(comm1),
                comm2: cleanData(comm2),
                comm3: cleanData(comm3),
                comm4: cleanData(comm4),
                ccd1: cleanData(ccd1),
                ccd2: cleanData(ccd2),
                ccd3: cleanData(ccd3),
                ccd4: cleanData(ccd4),
                catcomp1: cleanData(catcomp1),
                catcomp2: cleanData(catcomp2),
                catcomp3: cleanData(catcomp3),
                catcomp4: cleanData(catcomp4),
                motif1: cleanData(motif1),
                motif2: cleanData(motif2),
                motif3: cleanData(motif3),
                motif4: cleanData(motif4),
                pa1: cleanData(pa1),
                pa2: cleanData(pa2),
                pa3: cleanData(pa3),
                pa4: cleanData(pa4),
                dp1: cleanData(dp1),
                dp2: cleanData(dp2),
                dp3: cleanData(dp3),
                dp4: cleanData(dp4),
                ct1: cleanData(ct1),
                ct2: cleanData(ct2),
                ct3: cleanData(ct3),
                mt1: cleanData(mt1),
                mt2: cleanData(mt2),
                mt3: cleanData(mt3),
                ml1: cleanData(ml1),
                ml2: cleanData(ml2),
                ml3: cleanData(ml3),
                cpr1: cleanData(cpr1),
                cpr2: cleanData(cpr2),
                cpr3: cleanData(cpr3),
                cg1: cleanData(cg1),
                cg2: cleanData(cg2),
                cg3: cleanData(cg3),
                comcollab: cleanData(comcollab),
                libelleend1: cleanData(objectifs1[0]?.libelle),
                poidsend1: cleanData(objectifs1[0]?.poids),
                notationend1: cleanData(objectifs1[0]?.notation),
                commentaireend1: cleanData(objectifs1[0]?.commentaire),
                libelleend2: cleanData(objectifs1[1]?.libelle),
                poidsend2: cleanData(objectifs1[1]?.poids),
                notationend2: cleanData(objectifs1[1]?.notation),
                commentaireend2: cleanData(objectifs1[1]?.commentaire),
                libelleend3: cleanData(objectifs1[2]?.libelle),
                poidsend3: cleanData(objectifs1[2]?.poids),
                notationend3: cleanData(objectifs1[2]?.notation),
                commentaireend3: cleanData(objectifs1[2]?.commentaire),
                libelleend4: cleanData(objectifs1[3]?.libelle),
                poidsend4: cleanData(objectifs1[3]?.poids),
                notationend4: cleanData(objectifs1[3]?.notation),
                commentaireend4: cleanData(objectifs1[3]?.commentaire),
            }, { where: { id_pers } });


            // Vérifier si l'évaluateur existe
            const evaluator = await Evaluator.findOne({
                where: { id_evaluator: existingEvaluation.evaluatorId } // Utilisez `id_evaluator`
            });

            if (evaluator) {

                await Evaluator.update({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                }, { where: { id_evaluator: evaluator.id_evaluator } });
                evaluatorId = evaluator.id_evaluator;
            } else {
                console.log("2");
                // Créez un nouvel évaluateur si nécessaire
                const newEvaluator = await Evaluator.create({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                });
                evaluatorId = newEvaluator.id_evaluator;

                // Mise à jour de l'évaluation avec le nouvel ID évaluateur
                await Evaluation.update({
                    evaluatorId: evaluatorId
                }, { where: { evaluatedId: id_pers } });
            }

            // Mise à jour de l'évaluation
            await Evaluation.update({
                evaluatorType: 'Evaluation non cadre'
            }, { where: { evaluatedId: id_pers } });

        } else {
            // Insertion d'un nouvel évalué
            const [newEvaluated] = await Evaluated.findOrCreate({
                where: { id_pers },
                defaults: {
                    nom: cleanData(nom),
                    prenom: cleanData(prenom),
                    mat: cleanData(mat),
                    dateentree: cleanData(daty),
                    alp1: cleanData(alp1),
                    alp2: cleanData(alp2),
                    f5: cleanData(f5),
                    c5: cleanData(c5),
                    am5: cleanData(am5),
                    c25: cleanData(c25),
                    direction: cleanData(dir),
                    posteeval: cleanData(posteeval),
                    fonc: cleanData(fonc),
                    datedu: cleanData(datys),
                    dateau: cleanData(datyss),
                    mission: cleanData(mission),
                    libelle1: cleanData(objectifs[0]?.libelle),
                    poids1: cleanData(objectifs[0]?.poids),
                    notation1: cleanData(objectifs[0]?.notation),
                    commentaire1: cleanData(objectifs[0]?.commentaire),
                    libelle2: cleanData(objectifs[1]?.libelle),
                    poids2: cleanData(objectifs[1]?.poids),
                    notation2: cleanData(objectifs[1]?.notation),
                    commentaire2: cleanData(objectifs[1]?.commentaire),
                    libelle3: cleanData(objectifs[2]?.libelle),
                    poids3: cleanData(objectifs[2]?.poids),
                    notation3: cleanData(objectifs[2]?.notation),
                    commentaire3: cleanData(objectifs[2]?.commentaire),
                    libelle4: cleanData(objectifs[3]?.libelle),
                    poids4: cleanData(objectifs[3]?.poids),
                    notation4: cleanData(objectifs[3]?.notation),
                    commentaire4: cleanData(objectifs[3]?.commentaire),
                    res1: cleanData(resultat),
                    val1: cleanData(selectedValue1[0]),
                    val2: cleanData(selectedValue2[0]),
                    somme: cleanData(somme),
                    v1: cleanData(selectedVal1[0]),
                    v2: cleanData(selectedVal2[0]),
                    v3: cleanData(selectedVal3[0]),
                    v4: cleanData(selectedVal4[0]),
                    v5: cleanData(selectedVal5[0]),
                    v6: cleanData(selectedVal6[0]),
                    v7: cleanData(selectedVal7[0]),
                    v8: cleanData(selectedVal8[0]),
                    v9: cleanData(selectedVal9[0]),
                    v10: cleanData(selectedVal10[0]),
                    v11: cleanData(selectedVal11[0]),
                    v12: cleanData(selectedVal12[0]),
                    v13: cleanData(selectedVal13[0]),
                    v14: cleanData(selectedVal14[0]),
                    v15: cleanData(selectedVal15[0]),
                    com1: cleanData(cmt1),
                    com2: cleanData(cmt2),
                    com3: cleanData(cmt3),
                    com4: cleanData(cmt4),
                    com5: cleanData(cmt5),
                    r1: cleanData(r1),
                    r2: cleanData(r2),
                    r3: cleanData(r3),
                    r4: cleanData(r4),
                    r5: cleanData(r5),
                    critere1: cleanData(cdc1),
                    critere2: cleanData(cdc2),
                    critere3: cleanData(cdc3),
                    critere4: cleanData(cdc4),
                    critere5: cleanData(cdc5),
                    nivactus: cleanData(nivactus),
                    nouvnivs: cleanData(nouvnivs),
                    conclusion: cleanData(concl),
                    ancienneteniv: cleanData(ancienneteniv),
                    comment: cleanData(com),
                    perfglob: cleanData(pg),
                    classification: cleanData(classification),
                    idr: cleanData(idr),
                    f1: cleanData(f1),
                    f2: cleanData(f2),
                    f3: cleanData(f3),
                    f4: cleanData(f4),
                    c1: cleanData(c1),
                    c2: cleanData(c2),
                    c3: cleanData(c3),
                    c4: cleanData(c4),
                    am1: cleanData(am1),
                    am2: cleanData(am2),
                    am3: cleanData(am3),
                    am4: cleanData(am4),
                    c21: cleanData(c21),
                    c22: cleanData(c22),
                    c23: cleanData(c23),
                    c24: cleanData(c24),
                    t1: cleanData(t1),
                    t2: cleanData(t2),
                    t3: cleanData(t3),
                    t4: cleanData(t4),
                    compac1: cleanData(compac1),
                    compac2: cleanData(compac2),
                    compac3: cleanData(compac3),
                    compac4: cleanData(compac4),
                    apav1: cleanData(apav1),
                    apav2: cleanData(apav2),
                    apav3: cleanData(apav3),
                    apav4: cleanData(apav4),
                    apap1: cleanData(apap1),
                    apap2: cleanData(apap2),
                    apap3: cleanData(apap3),
                    apap4: cleanData(apap4),
                    comm1: cleanData(comm1),
                    comm2: cleanData(comm2),
                    comm3: cleanData(comm3),
                    comm4: cleanData(comm4),
                    ccd1: cleanData(ccd1),
                    ccd2: cleanData(ccd2),
                    ccd3: cleanData(ccd3),
                    ccd4: cleanData(ccd4),
                    catcomp1: cleanData(catcomp1),
                    catcomp2: cleanData(catcomp2),
                    catcomp3: cleanData(catcomp3),
                    catcomp4: cleanData(catcomp4),
                    motif1: cleanData(motif1),
                    motif2: cleanData(motif2),
                    motif3: cleanData(motif3),
                    motif4: cleanData(motif4),
                    pa1: cleanData(pa1),
                    pa2: cleanData(pa2),
                    pa3: cleanData(pa3),
                    pa4: cleanData(pa4),
                    dp1: cleanData(dp1),
                    dp2: cleanData(dp2),
                    dp3: cleanData(dp3),
                    dp4: cleanData(dp4),
                    ct1: cleanData(ct1),
                    ct2: cleanData(ct2),
                    ct3: cleanData(ct3),
                    mt1: cleanData(mt1),
                    mt2: cleanData(mt2),
                    mt3: cleanData(mt3),
                    ml1: cleanData(ml1),
                    ml2: cleanData(ml2),
                    ml3: cleanData(ml3),
                    cpr1: cleanData(cpr1),
                    cpr2: cleanData(cpr2),
                    cpr3: cleanData(cpr3),
                    cg1: cleanData(cg1),
                    cg2: cleanData(cg2),
                    cg3: cleanData(cg3),
                    comcollab: cleanData(comcollab),
                    libelleend1: cleanData(objectifs1[0]?.libelle),
                    poidsend1: cleanData(objectifs1[0]?.poids),
                    notationend1: cleanData(objectifs1[0]?.notation),
                    commentaireend1: cleanData(objectifs1[0]?.commentaire),
                    libelleend2: cleanData(objectifs1[1]?.libelle),
                    poidsend2: cleanData(objectifs1[1]?.poids),
                    notationend2: cleanData(objectifs1[1]?.notation),
                    commentaireend2: cleanData(objectifs1[1]?.commentaire),
                    libelleend3: cleanData(objectifs1[2]?.libelle),
                    poidsend3: cleanData(objectifs1[2]?.poids),
                    notationend3: cleanData(objectifs1[2]?.notation),
                    commentaireend3: cleanData(objectifs1[2]?.commentaire),
                    libelleend4: cleanData(objectifs1[3]?.libelle),
                    poidsend4: cleanData(objectifs1[3]?.poids),
                    notationend4: cleanData(objectifs1[3]?.notation),
                    commentaireend4: cleanData(objectifs1[3]?.commentaire),
                }
            });

            // Créez un nouvel évaluateur
            const newEvaluator = await Evaluator.create({
                emailn1,
                emailn2,
                emaildr,
                emailsg,
                emaildg,
                emaildrh
            });

            // Créez une nouvelle évaluation
            await Evaluation.create({
                evaluatorType: typeEval,
                evaluatedId: newEvaluated.id_pers,
                evaluatorId: newEvaluator.id_evaluator,
                createdAt: new Date(),
            });
        }

        // Réponse de succès
        if (!existingEvaluation) {
            createdAt = new Date();
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } else {
            createdAt = existingEvaluation.createdAt;
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }

        res.send({ success: true, message: `Évaluation bien enregistrée.`, date: `${formattedDate}` });

    } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    }
};



const enregistrementevalcadrenonmanager = async (req, res) => {
    const id_pers = req.params.ids;
    const typeEval = 'Evaluation cadre non manager'
    console.log(id_pers);
    const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);
    console.log(req.body.emailn1);
    const mail = req.body.loggedInUser;
    const {
        nom, prenom, mat, daty, dir, posteeval, fonc, datys, datyss, mission, objectifs = [],
        resultat, selectedValue1 = [], selectedValue2 = [], selectedVal1 = [], selectedVal2 = [], selectedVal3 = [],
        selectedVal4 = [], selectedVal5 = [], selectedVal6 = [], selectedVal7 = [], selectedVal8 = [], selectedVal9 = [],
        selectedVal10 = [], selectedVal11 = [], selectedVal12 = [], selectedVal13 = [], selectedVal14 = [], selectedVal15 = [],
        r1 = '', r2 = '', r3 = '', r4 = '', r5 = '',
        cdc1 = '', cdc2 = '', cdc3 = '', cdc4 = '', cdc5 = '',
        cmt1 = '', cmt2 = '', cmt3 = '', cmt4 = '', cmt5 = '',
        nivactus = '', nouvnivs = '', concl = '', ancienneteniv = '', com = '',
        pg = '', classification = '', idr = '', f1 = '', f2 = '', f3 = '', f4 = '',
        c1 = '', c2 = '', c3 = '', c4 = '', am1 = '', am2 = '', am3 = '', am4 = '',
        c21 = '', c22 = '', c23 = '', c24 = '', t1 = '', t2 = '', t3 = '', t4 = '',
        compac1 = '', compac2 = '', compac3 = '', compac4 = '', apav1 = '', apav2 = '', apav3 = '', apav4 = '',
        apap1 = '', apap2 = '', apap3 = '', apap4 = '', comm1 = '', comm2 = '', comm3 = '', comm4 = '',
        ccd1 = '', ccd2 = '', ccd3 = '', ccd4 = '', catcomp1 = '', catcomp2 = '', catcomp3 = '', catcomp4 = '',
        motif1 = '', motif2 = '', motif3 = '', motif4 = '',
        pa1 = '', pa2 = '', pa3 = '', pa4 = '', dp1 = '', dp2 = '', dp3 = '', dp4 = '',
        ct1 = '', ct2 = '', ct3 = '', mt1 = '', mt2 = '', mt3 = '', ml1 = '', ml2 = '', ml3 = '',
        cpr1 = '', cpr2 = '', cpr3 = '', cg1 = '', cg2 = '', cg3 = '', comcollab = '', somme,
        objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn1 = '', emailn2 = '', emaildr = '', emailsg = '', emaildg = '', emaildrh = '', ids
    } = req.body;
    if (!id_pers) {
        return res.status(400).json({ error: 'Les paramètres id_pers, nomeval et typeeval sont requis.' });
    }



    try {
        // Vérifier si l'évaluation existe
        const existingEvaluation = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: typeEval
            }
        });


        const existingEvalued = await Evaluation.findOne({
            where: {
                evaluatedId: id_pers,
                evaluatorType: {
                    [Op.ne]: typeEval // Op.ne signifie "différent de" pour Sequelize
                }
            }
        });


        if (existingEvalued) {
            return res.send({ success: false, message: 'Vous ne pouvez pas faire une autre evaluation ' });
        }


        if (existingEvaluation) {

            const evaluationData = existingEvaluation.dataValues;
            if (evaluationData.statusN1 === true && (ids === id_pers || ids == id_pers)) {
                return res.send({ success: false, message: 'Evaluation déjà validée ' });

            }
        }

        let evaluatorId;

        if (existingEvaluation) {
            // Mise à jour de l'évalué
            await Evaluated.update({
                nom: cleanData(nom),
                prenom: cleanData(prenom),
                mat: cleanData(mat),
                dateentree: cleanData(daty),
                alp1: cleanData(alp1),
                alp2: cleanData(alp2),
                f5: cleanData(f5),
                c5: cleanData(c5),
                am5: cleanData(am5),
                c25: cleanData(c25),
                direction: cleanData(dir),
                posteeval: cleanData(posteeval),
                fonc: cleanData(fonc),
                datedu: cleanData(datys),
                dateau: cleanData(datyss),
                mission: cleanData(mission),
                libelle1: cleanData(objectifs[0]?.libelle),
                poids1: cleanData(objectifs[0]?.poids),
                notation1: cleanData(objectifs[0]?.notation),
                commentaire1: cleanData(objectifs[0]?.commentaire),
                libelle2: cleanData(objectifs[1]?.libelle),
                poids2: cleanData(objectifs[1]?.poids),
                notation2: cleanData(objectifs[1]?.notation),
                commentaire2: cleanData(objectifs[1]?.commentaire),
                libelle3: cleanData(objectifs[2]?.libelle),
                poids3: cleanData(objectifs[2]?.poids),
                notation3: cleanData(objectifs[2]?.notation),
                commentaire3: cleanData(objectifs[2]?.commentaire),
                libelle4: cleanData(objectifs[3]?.libelle),
                poids4: cleanData(objectifs[3]?.poids),
                notation4: cleanData(objectifs[3]?.notation),
                commentaire4: cleanData(objectifs[3]?.commentaire),
                res1: cleanData(resultat),
                val1: cleanData(selectedValue1[0]),
                val2: cleanData(selectedValue2[0]),
                somme: cleanData(somme),
                v1: cleanData(selectedVal1[0]),
                v2: cleanData(selectedVal2[0]),
                v3: cleanData(selectedVal3[0]),
                v4: cleanData(selectedVal4[0]),
                v5: cleanData(selectedVal5[0]),
                v6: cleanData(selectedVal6[0]),
                v7: cleanData(selectedVal7[0]),
                v8: cleanData(selectedVal8[0]),
                v9: cleanData(selectedVal9[0]),
                v10: cleanData(selectedVal10[0]),
                v11: cleanData(selectedVal11[0]),
                v12: cleanData(selectedVal12[0]),
                v13: cleanData(selectedVal13[0]),
                v14: cleanData(selectedVal14[0]),
                v15: cleanData(selectedVal15[0]),
                com1: cleanData(cmt1),
                com2: cleanData(cmt2),
                com3: cleanData(cmt3),
                com4: cleanData(cmt4),
                com5: cleanData(cmt5),
                r1: cleanData(r1),
                r2: cleanData(r2),
                r3: cleanData(r3),
                r4: cleanData(r4),
                r5: cleanData(r5),
                critere1: cleanData(cdc1),
                critere2: cleanData(cdc2),
                critere3: cleanData(cdc3),
                critere4: cleanData(cdc4),
                critere5: cleanData(cdc5),
                nivactus: cleanData(nivactus),
                nouvnivs: cleanData(nouvnivs),
                conclusion: cleanData(concl),
                ancienneteniv: cleanData(ancienneteniv),
                comment: cleanData(com),
                perfglob: cleanData(pg),
                classification: cleanData(classification),
                idr: cleanData(idr),
                f1: cleanData(f1),
                f2: cleanData(f2),
                f3: cleanData(f3),
                f4: cleanData(f4),
                c1: cleanData(c1),
                c2: cleanData(c2),
                c3: cleanData(c3),
                c4: cleanData(c4),
                am1: cleanData(am1),
                am2: cleanData(am2),
                am3: cleanData(am3),
                am4: cleanData(am4),
                c21: cleanData(c21),
                c22: cleanData(c22),
                c23: cleanData(c23),
                c24: cleanData(c24),
                t1: cleanData(t1),
                t2: cleanData(t2),
                t3: cleanData(t3),
                t4: cleanData(t4),
                compac1: cleanData(compac1),
                compac2: cleanData(compac2),
                compac3: cleanData(compac3),
                compac4: cleanData(compac4),
                apav1: cleanData(apav1),
                apav2: cleanData(apav2),
                apav3: cleanData(apav3),
                apav4: cleanData(apav4),
                apap1: cleanData(apap1),
                apap2: cleanData(apap2),
                apap3: cleanData(apap3),
                apap4: cleanData(apap4),
                comm1: cleanData(comm1),
                comm2: cleanData(comm2),
                comm3: cleanData(comm3),
                comm4: cleanData(comm4),
                ccd1: cleanData(ccd1),
                ccd2: cleanData(ccd2),
                ccd3: cleanData(ccd3),
                ccd4: cleanData(ccd4),
                catcomp1: cleanData(catcomp1),
                catcomp2: cleanData(catcomp2),
                catcomp3: cleanData(catcomp3),
                catcomp4: cleanData(catcomp4),
                motif1: cleanData(motif1),
                motif2: cleanData(motif2),
                motif3: cleanData(motif3),
                motif4: cleanData(motif4),
                pa1: cleanData(pa1),
                pa2: cleanData(pa2),
                pa3: cleanData(pa3),
                pa4: cleanData(pa4),
                dp1: cleanData(dp1),
                dp2: cleanData(dp2),
                dp3: cleanData(dp3),
                dp4: cleanData(dp4),
                ct1: cleanData(ct1),
                ct2: cleanData(ct2),
                ct3: cleanData(ct3),
                mt1: cleanData(mt1),
                mt2: cleanData(mt2),
                mt3: cleanData(mt3),
                ml1: cleanData(ml1),
                ml2: cleanData(ml2),
                ml3: cleanData(ml3),
                cpr1: cleanData(cpr1),
                cpr2: cleanData(cpr2),
                cpr3: cleanData(cpr3),
                cg1: cleanData(cg1),
                cg2: cleanData(cg2),
                cg3: cleanData(cg3),
                comcollab: cleanData(comcollab),
                libelleend1: cleanData(objectifs1[0]?.libelle),
                poidsend1: cleanData(objectifs1[0]?.poids),
                notationend1: cleanData(objectifs1[0]?.notation),
                commentaireend1: cleanData(objectifs1[0]?.commentaire),
                libelleend2: cleanData(objectifs1[1]?.libelle),
                poidsend2: cleanData(objectifs1[1]?.poids),
                notationend2: cleanData(objectifs1[1]?.notation),
                commentaireend2: cleanData(objectifs1[1]?.commentaire),
                libelleend3: cleanData(objectifs1[2]?.libelle),
                poidsend3: cleanData(objectifs1[2]?.poids),
                notationend3: cleanData(objectifs1[2]?.notation),
                commentaireend3: cleanData(objectifs1[2]?.commentaire),
                libelleend4: cleanData(objectifs1[3]?.libelle),
                poidsend4: cleanData(objectifs1[3]?.poids),
                notationend4: cleanData(objectifs1[3]?.notation),
                commentaireend4: cleanData(objectifs1[3]?.commentaire),
            }, { where: { id_pers } });


            // Vérifier si l'évaluateur existe
            const evaluator = await Evaluator.findOne({
                where: { id_evaluator: existingEvaluation.evaluatorId } // Utilisez `id_evaluator`
            });

            if (evaluator) {

                await Evaluator.update({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                }, { where: { id_evaluator: evaluator.id_evaluator } });
                evaluatorId = evaluator.id_evaluator;
            } else {
                console.log("2");
                // Créez un nouvel évaluateur si nécessaire
                const newEvaluator = await Evaluator.create({
                    emailn1,
                    emailn2,
                    emaildr,
                    emailsg,
                    emaildg,
                    emaildrh
                });
                evaluatorId = newEvaluator.id_evaluator;

                // Mise à jour de l'évaluation avec le nouvel ID évaluateur
                await Evaluation.update({
                    evaluatorId: evaluatorId
                }, { where: { evaluatedId: id_pers } });
            }

            // Mise à jour de l'évaluation
            await Evaluation.update({
                evaluatorType: 'Evaluation cadre non manager'
            }, { where: { evaluatedId: id_pers } });

        } else {
            // Insertion d'un nouvel évalué
            const [newEvaluated] = await Evaluated.findOrCreate({
                where: { id_pers },
                defaults: {
                    nom: cleanData(nom),
                    prenom: cleanData(prenom),
                    mat: cleanData(mat),
                    dateentree: cleanData(daty),
                    alp1: cleanData(alp1),
                    alp2: cleanData(alp2),
                    f5: cleanData(f5),
                    c5: cleanData(c5),
                    am5: cleanData(am5),
                    c25: cleanData(c25),
                    direction: cleanData(dir),
                    posteeval: cleanData(posteeval),
                    fonc: cleanData(fonc),
                    datedu: cleanData(datys),
                    dateau: cleanData(datyss),
                    mission: cleanData(mission),
                    libelle1: cleanData(objectifs[0]?.libelle),
                    poids1: cleanData(objectifs[0]?.poids),
                    notation1: cleanData(objectifs[0]?.notation),
                    commentaire1: cleanData(objectifs[0]?.commentaire),
                    libelle2: cleanData(objectifs[1]?.libelle),
                    poids2: cleanData(objectifs[1]?.poids),
                    notation2: cleanData(objectifs[1]?.notation),
                    commentaire2: cleanData(objectifs[1]?.commentaire),
                    libelle3: cleanData(objectifs[2]?.libelle),
                    poids3: cleanData(objectifs[2]?.poids),
                    notation3: cleanData(objectifs[2]?.notation),
                    commentaire3: cleanData(objectifs[2]?.commentaire),
                    libelle4: cleanData(objectifs[3]?.libelle),
                    poids4: cleanData(objectifs[3]?.poids),
                    notation4: cleanData(objectifs[3]?.notation),
                    commentaire4: cleanData(objectifs[3]?.commentaire),
                    res1: cleanData(resultat),
                    val1: cleanData(selectedValue1[0]),
                    val2: cleanData(selectedValue2[0]),
                    somme: cleanData(somme),
                    v1: cleanData(selectedVal1[0]),
                    v2: cleanData(selectedVal2[0]),
                    v3: cleanData(selectedVal3[0]),
                    v4: cleanData(selectedVal4[0]),
                    v5: cleanData(selectedVal5[0]),
                    v6: cleanData(selectedVal6[0]),
                    v7: cleanData(selectedVal7[0]),
                    v8: cleanData(selectedVal8[0]),
                    v9: cleanData(selectedVal9[0]),
                    v10: cleanData(selectedVal10[0]),
                    v11: cleanData(selectedVal11[0]),
                    v12: cleanData(selectedVal12[0]),
                    v13: cleanData(selectedVal13[0]),
                    v14: cleanData(selectedVal14[0]),
                    v15: cleanData(selectedVal15[0]),
                    com1: cleanData(cmt1),
                    com2: cleanData(cmt2),
                    com3: cleanData(cmt3),
                    com4: cleanData(cmt4),
                    com5: cleanData(cmt5),
                    r1: cleanData(r1),
                    r2: cleanData(r2),
                    r3: cleanData(r3),
                    r4: cleanData(r4),
                    r5: cleanData(r5),
                    critere1: cleanData(cdc1),
                    critere2: cleanData(cdc2),
                    critere3: cleanData(cdc3),
                    critere4: cleanData(cdc4),
                    critere5: cleanData(cdc5),
                    nivactus: cleanData(nivactus),
                    nouvnivs: cleanData(nouvnivs),
                    conclusion: cleanData(concl),
                    ancienneteniv: cleanData(ancienneteniv),
                    comment: cleanData(com),
                    perfglob: cleanData(pg),
                    classification: cleanData(classification),
                    idr: cleanData(idr),
                    f1: cleanData(f1),
                    f2: cleanData(f2),
                    f3: cleanData(f3),
                    f4: cleanData(f4),
                    c1: cleanData(c1),
                    c2: cleanData(c2),
                    c3: cleanData(c3),
                    c4: cleanData(c4),
                    am1: cleanData(am1),
                    am2: cleanData(am2),
                    am3: cleanData(am3),
                    am4: cleanData(am4),
                    c21: cleanData(c21),
                    c22: cleanData(c22),
                    c23: cleanData(c23),
                    c24: cleanData(c24),
                    t1: cleanData(t1),
                    t2: cleanData(t2),
                    t3: cleanData(t3),
                    t4: cleanData(t4),
                    compac1: cleanData(compac1),
                    compac2: cleanData(compac2),
                    compac3: cleanData(compac3),
                    compac4: cleanData(compac4),
                    apav1: cleanData(apav1),
                    apav2: cleanData(apav2),
                    apav3: cleanData(apav3),
                    apav4: cleanData(apav4),
                    apap1: cleanData(apap1),
                    apap2: cleanData(apap2),
                    apap3: cleanData(apap3),
                    apap4: cleanData(apap4),
                    comm1: cleanData(comm1),
                    comm2: cleanData(comm2),
                    comm3: cleanData(comm3),
                    comm4: cleanData(comm4),
                    ccd1: cleanData(ccd1),
                    ccd2: cleanData(ccd2),
                    ccd3: cleanData(ccd3),
                    ccd4: cleanData(ccd4),
                    catcomp1: cleanData(catcomp1),
                    catcomp2: cleanData(catcomp2),
                    catcomp3: cleanData(catcomp3),
                    catcomp4: cleanData(catcomp4),
                    motif1: cleanData(motif1),
                    motif2: cleanData(motif2),
                    motif3: cleanData(motif3),
                    motif4: cleanData(motif4),
                    pa1: cleanData(pa1),
                    pa2: cleanData(pa2),
                    pa3: cleanData(pa3),
                    pa4: cleanData(pa4),
                    dp1: cleanData(dp1),
                    dp2: cleanData(dp2),
                    dp3: cleanData(dp3),
                    dp4: cleanData(dp4),
                    ct1: cleanData(ct1),
                    ct2: cleanData(ct2),
                    ct3: cleanData(ct3),
                    mt1: cleanData(mt1),
                    mt2: cleanData(mt2),
                    mt3: cleanData(mt3),
                    ml1: cleanData(ml1),
                    ml2: cleanData(ml2),
                    ml3: cleanData(ml3),
                    cpr1: cleanData(cpr1),
                    cpr2: cleanData(cpr2),
                    cpr3: cleanData(cpr3),
                    cg1: cleanData(cg1),
                    cg2: cleanData(cg2),
                    cg3: cleanData(cg3),
                    comcollab: cleanData(comcollab),
                    libelleend1: cleanData(objectifs1[0]?.libelle),
                    poidsend1: cleanData(objectifs1[0]?.poids),
                    notationend1: cleanData(objectifs1[0]?.notation),
                    commentaireend1: cleanData(objectifs1[0]?.commentaire),
                    libelleend2: cleanData(objectifs1[1]?.libelle),
                    poidsend2: cleanData(objectifs1[1]?.poids),
                    notationend2: cleanData(objectifs1[1]?.notation),
                    commentaireend2: cleanData(objectifs1[1]?.commentaire),
                    libelleend3: cleanData(objectifs1[2]?.libelle),
                    poidsend3: cleanData(objectifs1[2]?.poids),
                    notationend3: cleanData(objectifs1[2]?.notation),
                    commentaireend3: cleanData(objectifs1[2]?.commentaire),
                    libelleend4: cleanData(objectifs1[3]?.libelle),
                    poidsend4: cleanData(objectifs1[3]?.poids),
                    notationend4: cleanData(objectifs1[3]?.notation),
                    commentaireend4: cleanData(objectifs1[3]?.commentaire),
                }
            });

            // Créez un nouvel évaluateur
            const newEvaluator = await Evaluator.create({
                emailn1,
                emailn2,
                emaildr,
                emailsg,
                emaildg,
                emaildrh
            });

            // Créez une nouvelle évaluation
            await Evaluation.create({
                evaluatorType: typeEval,
                evaluatedId: newEvaluated.id_pers,
                evaluatorId: newEvaluator.id_evaluator,
                createdAt: new Date(),
            });
        }

        // Réponse de succès
        if (!existingEvaluation) {
            createdAt = new Date();
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } else {
            createdAt = existingEvaluation.createdAt;
            formattedDate = createdAt.toLocaleDateString('fr-FR', {
                weekday: 'long', // Jour de la semaine
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }

        res.send({ success: true, message: `Évaluation bien enregistrée.`, date: `${formattedDate}` });

    } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    }
};




const getAlldataevaluations = async (req, res) => {
    const id = req.params.ids;
    console.log(id);
    if (!id) {
        return res.status(400).json({ error: 'ID manquant' });
    }

    try {
        const evaluations = await Evaluation.findAll({
            where: {
                evaluatedId: id,
                evaluatorType: 'Evaluation cadre'
            },
            include: [
                {
                    model: Evaluated,
                    attributes: [
                        'id_pers', 'nom', 'prenom', 'mat', 'dateentree', 'direction', 'posteeval',
                        'fonc', 'datedu', 'dateau', 'mission', 'libelle1', 'poids1', 'notation1',
                        'commentaire1', 'libelle2', 'poids2', 'notation2', 'commentaire2',
                        'libelle3', 'poids3', 'notation3', 'commentaire3', 'libelle4',
                        'poids4', 'notation4', 'commentaire4', 'res1', 'val1', 'val2',
                        'somme', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9',
                        'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'com1', 'com2', 'com3',
                        'com4', 'com5', 'r1', 'r2', 'r3', 'r4', 'r5', 'critere1', 'critere2',
                        'critere3', 'critere4', 'critere5', 'nivactus', 'nouvnivs', 'conclusion',
                        'ancienneteniv', 'comment', 'perfglob', 'classification', 'idr', 'f1',
                        'f2', 'f3', 'f4', 'f5', 'c1', 'c2', 'c3', 'c4', 'c5', 'am1', 'am2',
                        'am3', 'am4', 'am5', 'c21', 'c22', 'c23', 'c24', 'c25', 't1', 't2',
                        't3', 't4', 'compac1', 'compac2', 'compac3', 'compac4', 'apav1',
                        'apav2', 'apav3', 'apav4', 'apap1', 'apap2', 'apap3', 'apap4', 'comm1',
                        'comm2', 'comm3', 'comm4', 'ccd1', 'ccd2', 'ccd3', 'ccd4', 'catcomp1',
                        'catcomp2', 'catcomp3', 'catcomp4', 'motif1', 'motif2', 'motif3',
                        'motif4', 'pa1', 'pa2', 'pa3', 'pa4', 'dp1', 'dp2', 'dp3', 'dp4',
                        'ct1', 'ct2', 'ct3', 'mt1', 'mt2', 'mt3', 'ml1', 'ml2', 'ml3',
                        'cpr1', 'cpr2', 'cpr3', 'cg1', 'cg2', 'cg3', 'comcollab', 'libelleend1',
                        'poidsend1', 'notationend1', 'commentaireend1', 'libelleend2', 'poidsend2',
                        'notationend2', 'commentaireend2', 'libelleend3', 'poidsend3', 'notationend3',
                        'commentaireend3', 'libelleend4', 'poidsend4', 'notationend4', 'commentaireend4', 'alp1', 'alp2'
                    ],
                },
                {
                    model: Evaluator,
                    attributes: [
                        'id_evaluator', 'emailn1', 'emailn2', 'emaildr', 'emailsg', 'emaildg', 'emaildrh'
                    ],
                },
            ],
        });





        // Combiner les données
        const getAlldataevaluation = evaluations.map(evaluation => ({
            id: evaluation.id,
            evaluatorType: evaluation.evaluatorType,
            statusN1: evaluation.statusN1,
            statusN2: evaluation.statusN2,
            statusDirection: evaluation.statusDirection,
            statusSecretary: evaluation.statusSecretary,
            statusGeneralDirection: evaluation.statusGeneralDirection,
            statusHR: evaluation.statusHR,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
            evaluatedId: evaluation.evaluatedId,
            evaluatorId: evaluation.evaluatorId,
            ...evaluation.evaluated.dataValues,
            ...evaluation.evaluator.dataValues,
        }));

        if (getAlldataevaluation.length === 0) {
            return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet ID' });
        }

        res.send(getAlldataevaluation);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
};







const getAlldataevaluationnoncadres = async (req, res) => {
    const id = req.params.ids;
    if (!id) {
        return res.status(400).json({ error: 'ID manquant' });
    }

    try {
        const evaluations = await Evaluation.findAll({
            where: {
                evaluatedId: id,
                evaluatorType: 'Evaluation non cadre'
            },
            include: [
                {
                    model: Evaluated,
                    attributes: [
                        'id_pers', 'nom', 'prenom', 'mat', 'dateentree', 'direction', 'posteeval',
                        'fonc', 'datedu', 'dateau', 'mission', 'libelle1', 'poids1', 'notation1',
                        'commentaire1', 'libelle2', 'poids2', 'notation2', 'commentaire2',
                        'libelle3', 'poids3', 'notation3', 'commentaire3', 'libelle4',
                        'poids4', 'notation4', 'commentaire4', 'res1', 'val1', 'val2',
                        'somme', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9',
                        'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'com1', 'com2', 'com3',
                        'com4', 'com5', 'r1', 'r2', 'r3', 'r4', 'r5', 'critere1', 'critere2',
                        'critere3', 'critere4', 'critere5', 'nivactus', 'nouvnivs', 'conclusion',
                        'ancienneteniv', 'comment', 'perfglob', 'classification', 'idr', 'f1',
                        'f2', 'f3', 'f4', 'f5', 'c1', 'c2', 'c3', 'c4', 'c5', 'am1', 'am2',
                        'am3', 'am4', 'am5', 'c21', 'c22', 'c23', 'c24', 'c25', 't1', 't2',
                        't3', 't4', 'compac1', 'compac2', 'compac3', 'compac4', 'apav1',
                        'apav2', 'apav3', 'apav4', 'apap1', 'apap2', 'apap3', 'apap4', 'comm1',
                        'comm2', 'comm3', 'comm4', 'ccd1', 'ccd2', 'ccd3', 'ccd4', 'catcomp1',
                        'catcomp2', 'catcomp3', 'catcomp4', 'motif1', 'motif2', 'motif3',
                        'motif4', 'pa1', 'pa2', 'pa3', 'pa4', 'dp1', 'dp2', 'dp3', 'dp4',
                        'ct1', 'ct2', 'ct3', 'mt1', 'mt2', 'mt3', 'ml1', 'ml2', 'ml3',
                        'cpr1', 'cpr2', 'cpr3', 'cg1', 'cg2', 'cg3', 'comcollab', 'libelleend1',
                        'poidsend1', 'notationend1', 'commentaireend1', 'libelleend2', 'poidsend2',
                        'notationend2', 'commentaireend2', 'libelleend3', 'poidsend3', 'notationend3',
                        'commentaireend3', 'libelleend4', 'poidsend4', 'notationend4', 'commentaireend4', 'alp1', 'alp2'
                    ],
                },
                {
                    model: Evaluator,
                    attributes: [
                        'id_evaluator', 'emailn1', 'emailn2', 'emaildr', 'emailsg', 'emaildg', 'emaildrh'
                    ],
                },
            ],
        });





        // Combiner les données
        const getAlldataevaluation = evaluations.map(evaluation => ({
            id: evaluation.id,
            evaluatorType: evaluation.evaluatorType,
            statusN1: evaluation.statusN1,
            statusN2: evaluation.statusN2,
            statusDirection: evaluation.statusDirection,
            statusSecretary: evaluation.statusSecretary,
            statusGeneralDirection: evaluation.statusGeneralDirection,
            statusHR: evaluation.statusHR,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
            evaluatedId: evaluation.evaluatedId,
            evaluatorId: evaluation.evaluatorId,
            ...evaluation.evaluated.dataValues,
            ...evaluation.evaluator.dataValues,
        }));

        if (getAlldataevaluation.length === 0) {
            return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet ID' });
        }

        res.send(getAlldataevaluation);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
};



const getAlldataevaluationcadrenonmanager = async (req, res) => {
    const id = req.params.ids;
    if (!id) {
        return res.status(400).json({ error: 'ID manquant' });
    }

    try {
        const evaluations = await Evaluation.findAll({
            where: {
                evaluatedId: id,
                evaluatorType: 'Evaluation cadre non manager'
            },
            include: [
                {
                    model: Evaluated,
                    attributes: [
                        'id_pers', 'nom', 'prenom', 'mat', 'dateentree', 'direction', 'posteeval',
                        'fonc', 'datedu', 'dateau', 'mission', 'libelle1', 'poids1', 'notation1',
                        'commentaire1', 'libelle2', 'poids2', 'notation2', 'commentaire2',
                        'libelle3', 'poids3', 'notation3', 'commentaire3', 'libelle4',
                        'poids4', 'notation4', 'commentaire4', 'res1', 'val1', 'val2',
                        'somme', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9',
                        'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'com1', 'com2', 'com3',
                        'com4', 'com5', 'r1', 'r2', 'r3', 'r4', 'r5', 'critere1', 'critere2',
                        'critere3', 'critere4', 'critere5', 'nivactus', 'nouvnivs', 'conclusion',
                        'ancienneteniv', 'comment', 'perfglob', 'classification', 'idr', 'f1',
                        'f2', 'f3', 'f4', 'f5', 'c1', 'c2', 'c3', 'c4', 'c5', 'am1', 'am2',
                        'am3', 'am4', 'am5', 'c21', 'c22', 'c23', 'c24', 'c25', 't1', 't2',
                        't3', 't4', 'compac1', 'compac2', 'compac3', 'compac4', 'apav1',
                        'apav2', 'apav3', 'apav4', 'apap1', 'apap2', 'apap3', 'apap4', 'comm1',
                        'comm2', 'comm3', 'comm4', 'ccd1', 'ccd2', 'ccd3', 'ccd4', 'catcomp1',
                        'catcomp2', 'catcomp3', 'catcomp4', 'motif1', 'motif2', 'motif3',
                        'motif4', 'pa1', 'pa2', 'pa3', 'pa4', 'dp1', 'dp2', 'dp3', 'dp4',
                        'ct1', 'ct2', 'ct3', 'mt1', 'mt2', 'mt3', 'ml1', 'ml2', 'ml3',
                        'cpr1', 'cpr2', 'cpr3', 'cg1', 'cg2', 'cg3', 'comcollab', 'libelleend1',
                        'poidsend1', 'notationend1', 'commentaireend1', 'libelleend2', 'poidsend2',
                        'notationend2', 'commentaireend2', 'libelleend3', 'poidsend3', 'notationend3',
                        'commentaireend3', 'libelleend4', 'poidsend4', 'notationend4', 'commentaireend4', 'alp1', 'alp2'
                    ],
                },
                {
                    model: Evaluator,
                    attributes: [
                        'id_evaluator', 'emailn1', 'emailn2', 'emaildr', 'emailsg', 'emaildg', 'emaildrh',
                    ],
                },
            ],
        });





        // Combiner les données
        const getAlldataevaluation = evaluations.map(evaluation => ({
            id: evaluation.id,
            evaluatorType: evaluation.evaluatorType,
            statusN1: evaluation.statusN1,
            statusN2: evaluation.statusN2,
            statusDirection: evaluation.statusDirection,
            statusSecretary: evaluation.statusSecretary,
            statusGeneralDirection: evaluation.statusGeneralDirection,
            statusHR: evaluation.statusHR,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
            evaluatedId: evaluation.evaluatedId,
            evaluatorId: evaluation.evaluatorId,
            ...evaluation.evaluated.dataValues,
            ...evaluation.evaluator.dataValues,
        }));

        if (getAlldataevaluation.length === 0) {
            return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet ID' });
        }

        res.send(getAlldataevaluation);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
};





const getgataevas = async (req, res) => {
    const mails = req.params.loggedInUser;

    try {
        const evaluations = await Evaluation.findAll({
            include: [
                {
                    model: Evaluated,
                    attributes: ['id_pers', 'nom', 'prenom']
                },
                {
                    model: Evaluator,
                    attributes: ['emailn1', 'emailn2', 'emaildr', 'emailsg', 'emaildg', 'emaildrh']
                }
            ],
            attributes: [
                'id', 'evaluatorType', 'statusN1', 'statusN2', 'statusDirection', 'statusSecretary',
                'statusGeneralDirection', 'statusHR', 'createdAt', 'updatedAt', 'evaluatedId', 'evaluatorId'
            ],
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { '$Evaluator.emailn1$': mails },
                            { statusN1: false }
                        ]
                    },
                    {
                        [Op.and]: [
                            { '$Evaluator.emailn2$': mails },
                            { statusN1: true },
                            { statusN2: false }
                        ]
                    },
                    {
                        [Op.and]: [
                            { '$Evaluator.emaildr$': mails },
                            { statusN1: true },
                            { statusN2: true },
                            { statusDirection: false }
                        ]
                    },
                    {
                        [Op.and]: [
                            { '$Evaluator.emailsg$': mails },
                            { statusN1: true },
                            { statusN2: true },
                            { statusDirection: true },
                            { statusSecretary: false }
                        ]
                    },
                    {
                        [Op.and]: [
                            { '$Evaluator.emaildg$': mails },
                            { statusN1: true },
                            { statusN2: true },
                            { statusDirection: true },
                            { statusSecretary: true },
                            { statusGeneralDirection: false }
                        ]
                    },
                    {
                        [Op.and]: [
                            { '$Evaluator.emaildrh$': mails },
                            { statusN1: true },
                            { statusN2: true },
                            { statusDirection: true },
                            { statusSecretary: true },
                            { statusGeneralDirection: true },
                            { statusHR: false }
                        ]
                    }
                ]
            }
        });



        // Combinaison des données
        const getgataeva = evaluations.map(evaluation => ({
            id: evaluation.id,
            evaluatorType: evaluation.evaluatorType,
            statusN1: evaluation.statusN1,
            statusN2: evaluation.statusN2,
            statusDirection: evaluation.statusDirection,
            statusSecretary: evaluation.statusSecretary,
            statusGeneralDirection: evaluation.statusGeneralDirection,
            statusHR: evaluation.statusHR,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
            evaluatedId: evaluation.evaluatedId,
            evaluatorId: evaluation.evaluatorId,
            ...evaluation.evaluated.dataValues,
            ...evaluation.evaluator.dataValues,
        }));

        // Envoi des résultats combinés
        res.send(getgataeva);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




//validation d'evauation

const validerEvaluations = async (req, res) => {
    const { id } = req.params; // ID de l'évaluation à valider
    const mail = req.body.loggedInUser; // Email de l'utilisateur connecté
    console.log("toy", req.body.loggedInUser);
    console.log(`Validation request for evaluation ID: ${id}, Email: ${mail}`);

    try {
        // Rechercher l'évaluation par ID
        const evaluation = await Evaluation.findOne({ where: { evaluatedId: id } });

        if (!evaluation) {
            return res.status(404).json({ message: 'Évaluation non trouvée.' });
        }

        // Obtenez l'ID de l'évaluateur associé à cette évaluation
        const { evaluatorId } = evaluation;
        const evaluator = await Evaluator.findOne({ where: { id_evaluator: evaluatorId } });

        if (!evaluator) {
            return res.status(404).json({ message: 'Évaluateur non trouvé.' });
        }

        if (mail === evaluator.emailn1 && evaluation.statusN2 === true) {
            return res.status(404).json({ message: 'Évaluation deja valide n+2.' });
        }

        if (mail === evaluator.emailn2 && evaluation.statusDirection === true) {
            return res.status(404).json({ message: 'Évaluation deja valide dg.' });
        }
        if (mail === evaluator.emaildr && evaluation.statusSecretary === true) {
            return res.status(404).json({ message: 'Évaluation deja valide sg.' });
        }
        if (mail === evaluator.emailsg && evaluation.statusGeneralDirection === true) {
            return res.status(404).json({ message: 'Évaluation deja valide dg .' });
        }
        if (mail === evaluator.emaildg && evaluation.statusHR === true) {
            return res.status(404).json({ message: 'Évaluation deja valide par drh .' });
        }


        // Créez un objet de mise à jour en fonction de l'email
        let updateFields = {};

        if (mail === evaluator.emailn1) {
            console.log("Validation N+1");
            updateFields.statusN1 = true;
        }
        else if (mail === evaluator.emaildr && mail === evaluator.emailn2) {
            console.log("Validation dr et n2");

            updateFields.statusDirection = true;
            updateFields.statusN2 = true;

        }
        else if (mail === evaluator.emailn2) {
            console.log("Validation N+2");
            updateFields.statusN2 = true;

        }

        else if (mail === evaluator.emaildr) {
            console.log("Validation Directeur de Rattachement");

            updateFields.statusDirection = true;

        }


        else if (mail === evaluator.emailsg) {
            console.log("Validation SG");
            updateFields.statusSecretary = true;


        }

        else if (mail === evaluator.emaildg) {
            console.log("Validation DG");
            // Assurez-vous que les statuts précédents sont validés
            if (evaluation.statusN1 && evaluation.statusN2 && evaluation.statusDirection && evaluation.statusSecretary) {
                updateFields.statusGeneralDirection = true;
            } else {
                return res.status(400).json({ message: 'Tous les statuts précédents doivent être validés avant DG.' });
            }
        }

        else if (mail === evaluator.emaildrh) {
            console.log("Validation DRH");
            // Assurez-vous que les statuts précédents sont validés
            if (evaluation.statusN1 && evaluation.statusN2 && evaluation.statusDirection && evaluation.statusSecretary && evaluation.statusGeneralDirection) {
                updateFields.statusHR = true;
            } else {
                return res.status(400).json({ message: 'Tous les statuts précédents doivent être validés avant DRH.' });
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'L\'email ne correspond à aucun évaluateur autorisé ou aucune mise à jour nécessaire.' });
        }

        // Mettre à jour l'évaluation
        await Evaluation.update(updateFields, { where: { evaluatedId: id } });

        return res.status(200).json({ message: 'Évaluation validée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la validation de l\'évaluation :', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};



const fetchEvalDatas = async (req, res) => {
    try {
        const evaluations = await Evaluation.findAll({

            include: [
                {
                    model: Evaluated,
                    attributes: [
                        'id_pers', 'nom', 'prenom', 'mat', 'dateentree', 'direction', 'posteeval',
                        'fonc', 'datedu', 'dateau', 'mission', 'libelle1', 'poids1', 'notation1',
                        'commentaire1', 'libelle2', 'poids2', 'notation2', 'commentaire2',
                        'libelle3', 'poids3', 'notation3', 'commentaire3', 'libelle4',
                        'poids4', 'notation4', 'commentaire4', 'res1', 'val1', 'val2',
                        'somme', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9',
                        'v10', 'v11', 'v12', 'v13', 'v14', 'v15', 'com1', 'com2', 'com3',
                        'com4', 'com5', 'r1', 'r2', 'r3', 'r4', 'r5', 'critere1', 'critere2',
                        'critere3', 'critere4', 'critere5', 'nivactus', 'nouvnivs', 'conclusion',
                        'ancienneteniv', 'comment', 'perfglob', 'classification', 'idr', 'f1',
                        'f2', 'f3', 'f4', 'f5', 'c1', 'c2', 'c3', 'c4', 'c5', 'am1', 'am2',
                        'am3', 'am4', 'am5', 'c21', 'c22', 'c23', 'c24', 'c25', 't1', 't2',
                        't3', 't4', 'compac1', 'compac2', 'compac3', 'compac4', 'apav1',
                        'apav2', 'apav3', 'apav4', 'apap1', 'apap2', 'apap3', 'apap4', 'comm1',
                        'comm2', 'comm3', 'comm4', 'ccd1', 'ccd2', 'ccd3', 'ccd4', 'catcomp1',
                        'catcomp2', 'catcomp3', 'catcomp4', 'motif1', 'motif2', 'motif3',
                        'motif4', 'pa1', 'pa2', 'pa3', 'pa4', 'dp1', 'dp2', 'dp3', 'dp4',
                        'ct1', 'ct2', 'ct3', 'mt1', 'mt2', 'mt3', 'ml1', 'ml2', 'ml3',
                        'cpr1', 'cpr2', 'cpr3', 'cg1', 'cg2', 'cg3', 'comcollab', 'libelleend1',
                        'poidsend1', 'notationend1', 'commentaireend1', 'libelleend2', 'poidsend2',
                        'notationend2', 'commentaireend2', 'libelleend3', 'poidsend3', 'notationend3',
                        'commentaireend3', 'libelleend4', 'poidsend4', 'notationend4', 'commentaireend4', 'alp1', 'alp2'
                    ],
                },
                {
                    model: Evaluator,
                    attributes: [
                        'id_evaluator', 'emailn1', 'emailn2', 'emaildr', 'emailsg', 'emaildg', 'emaildrh'
                    ],
                },
            ],
        });

        // Combiner les données
        const getAlldataevaluation = evaluations.map(evaluation => ({
            id: evaluation.id,
            evaluatorType: evaluation.evaluatorType,
            statusN1: evaluation.statusN1,
            statusN2: evaluation.statusN2,
            statusDirection: evaluation.statusDirection,
            statusSecretary: evaluation.statusSecretary,
            statusGeneralDirection: evaluation.statusGeneralDirection,
            statusHR: evaluation.statusHR,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
            evaluatedId: evaluation.evaluatedId,
            evaluatorId: evaluation.evaluatorId,
            ...evaluation.evaluated.dataValues,
            ...evaluation.evaluator.dataValues,
        }));

        if (getAlldataevaluation.length === 0) {
            return res.status(404).json({ message: 'Aucune évaluation trouvée pour cet ID' });
        }

        res.send(getAlldataevaluation);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
};


const fetchEvalDatashisto = async (req, res) => {
    try {
        const fetchEvalDatashisto = await HistoEval.findAll()
        res.send(fetchEvalDatashisto);
    } catch (error) {
        console.log(error);

    }
}


const getStatus = async (req, res) => {
    const id = req.body.ids; // Obtenez l'ID depuis le corps de la requête

    try {
        // Chercher les évaluations basées sur l'ID
        const evaluations = await Evaluation.findAll({
            where: {
                evaluatedId: id,
            },
        });

        res.send({ evaluations });

    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des évaluations.' });
    }
};

const updaterh = async (req, res) => {
    try {
        console.log('Requête reçue avec le corps :', req.body);

        const { emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh } = req.body;

        const upstatus = await Evaluation.update({
            statusN1: req.body.et1,
            statusN2: req.body.et2,
            statusDirection: req.body.et3,
            statusSecretary: req.body.et4,
            statusGeneralDirection: req.body.et5,
            statusHR: req.body.et6
        }, {
            where: {
                evaluatorId: req.body.idevas
            }
        });

        const upsmail = await Evaluator.update({
            emailn1,
            emailn2,
            emaildr,
            emailsg,
            emaildg,
            emaildrh,
        }, {
            where: {
                id_evaluator: req.body.idevas
            }
        });



        res.status(200).json({ message: "Modification avec succes" });

    } catch (error) {
        console.error("Erreur lors de la mise à jour : ", error);
        res.status(500).json({ message: "An error occurred while updating the status or emails.", error: error.message });
    }
};



const deleteeval = async (req, res) => {
    try {
        const deletedEvaluated = await Evaluated.destroy({
            where: {
                id_pers: req.body.id
            },
        });

        const deletedEvaluation = await Evaluation.destroy({
            where: {
                id: req.body.idevaluator
            },
        });

        const deletedEvaluator = await Evaluator.destroy({
            where: {
                id_evaluator: req.body.idevaluator
            },
        });

        if (deletedEvaluated > 0 && deletedEvaluation > 0 && deletedEvaluator > 0) {
            res.status(200).json({ message: "Evaluation bien supprimée." });
        } else {
            res.status(404).json({ message: "Record not found or already deleted." });
        }
    } catch (error) {
        console.error("Error while deleting records: ", error);
        res.status(500).json({ message: "An error occurred while deleting the records.", error: error.message });
    }
};



const createPersonEvaluationView = async () => {
    try {
        await sequelize.query(`
            CREATE VIEW PersonEvaluationView AS
            SELECT
                e.id_pers,
                e.nom,
                e.prenom,
                e.mat,
                e.dateentree,
                e.datetoday,
                e.direction,
                e.posteeval,
                e.fonc,
                e.datedu,
                e.dateau,
                e.mission,
                e.libelle1,
                e.poids1,
                e.notation1,
                e.commentaire1,
                e.libelle2,
                e.poids2,
                e.notation2,
                e.commentaire2,
                e.libelle3,
                e.poids3,
                e.notation3,
                e.commentaire3,
                e.libelle4,
                e.poids4,
                e.notation4,
                e.commentaire4,
                e.res1,
                e.val1,
                e.val2,
                e.somme,
                e.v1,
                e.v2,
                e.v3,
                e.v4,
                e.v5,
                e.v6,
                e.v7,
                e.v8,
                e.v9,
                e.v10,
                e.v11,
                e.v12,
                e.v13,
                e.v14,
                e.v15,
                e.com1,
                e.com2,
                e.com3,
                e.com4,
                e.com5,
                e.r1,
                e.r2,
                e.r3,
                e.r4,
                e.r5,
                e.critere1,
                e.critere2,
                e.critere3,
                e.critere4,
                e.critere5,
                e.nivactus,
                e.nouvnivs,
                e.conclusion,
                e.ancienneteniv,
                e.comment,
                e.perfglob,
                e.classification,
                e.idr,
                e.f1,
                e.f2,
                e.f3,
                e.f4,
                e.f5,
                e.c1,
                e.c2,
                e.c3,
                e.c4,
                e.c5,
                e.am1,
                e.am2,
                e.am3,
                e.am4,
                e.am5,
                e.c21,
                e.c22,
                e.c23,
                e.c24,
                e.c25,
                e.t1,
                e.t2,
                e.t3,
                e.t4,
                e.compac1,
                e.compac2,
                e.compac3,
                e.compac4,
                e.apav1,
                e.apav2,
                e.apav3,
                e.apav4,
                e.apap1,
                e.apap2,
                e.apap3,
                e.apap4,
                e.comm1,
                e.comm2,
                e.comm3,
                e.comm4,
                e.ccd1,
                e.ccd2,
                e.ccd3,
                e.ccd4,
                e.catcomp1,
                e.catcomp2,
                e.catcomp3,
                e.catcomp4,
                e.motif1,
                e.motif2,
                e.motif3,
                e.motif4,
                e.pa1,
                e.pa2,
                e.pa3,
                e.pa4,
                e.dp1,
                e.dp2,
                e.dp3,
                e.dp4,
                e.ct1,
                e.ct2,
                e.ct3,
                e.mt1,
                e.mt2,
                e.mt3,
                e.ml1,
                e.ml2,
                e.ml3,
                e.cpr1,
                e.cpr2,
                e.cpr3,
                e.cg1,
                e.cg2,
                e.cg3,
                e.comcollab,
                e.libelleend1,
                e.poidsend1,
                e.notationend1,
                e.commentaireend1,
                e.libelleend2,
                e.poidsend2,
                e.notationend2,
                e.commentaireend2,
                e.libelleend3,
                e.poidsend3,
                e.notationend3,
                e.commentaireend3,
                e.libelleend4,
                e.poidsend4,
                e.notationend4,
                e.commentaireend4,
                e.nomeval,
                e.alp1,
                e.alp2,
                e.typeeval,
                ev.emailn1,
                ev.emailn2,
                ev.emaildr,
                ev.emailsg,
                ev.emaildg,
                ev.emaildrh,
                ev.createdAt AS evaluatorCreatedAt,
                ev.updatedAt AS evaluatorUpdatedAt,
                ev2.evaluatorType,
                ev2.statusN1,
                ev2.statusN2,
                ev2.statusDirection,
                ev2.statusSecretary,
                ev2.statusGeneralDirection,
                ev2.statusHR,
                ev2.createdAt AS evaluationCreatedAt,
                ev2.updatedAt AS evaluationUpdatedAt
            FROM
                evaluateds e
            LEFT JOIN evaluations ev2 ON e.id_pers = ev2.evaluatedId
            LEFT JOIN evaluators ev ON ev2.evaluatorId = ev.id_evaluator;
        `);
        console.log('PersonEvaluationView created successfully.');
    } catch (error) {
        console.error('Error creating PersonEvaluationView:', error);
    }
};

// Appeler cette fonction lorsque vous avez besoin de créer la vue



const getPersonEvaluation = async (req, res) => {

    createPersonEvaluationView();


    const personId = req.body.ids;
    console.log(personId);

    try {

        const personData = await PersonEvaluationView.findAll({
            attributes: { exclude: ['id'] },
            where: { id_pers: personId },
            order: [['evaluationCreatedAt', 'DESC']],
            limit: 1
        });


        res.json(personData);
    } catch (error) {

        console.error('Error querying the PersonEvaluationView:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the data.' });
    }
};


const fetchAlldate = async (req, res) => {
    console.log(req.body.ids);

    try {
        const fetchAlldate = await HistoEval.findAll({
            where: {
                id_pers: req.body.ids,
            },
            attributes: ['datedu', 'dateau', 'evaluatorType', 'id_evaluator'], // Sélectionner les colonnes nécessaires
        });

        console.log(fetchAlldate);

        const formattedData = fetchAlldate.map(entry => ({
            value: `${entry.datedu}_${entry.dateau}_${entry.id_evaluator}`, // Concaténation pour un identifiant unique
            label: `${new Date(entry.datedu).toLocaleDateString()} - ${new Date(entry.dateau).toLocaleDateString()} (${entry.evaluatorType})`,
            id_evaluator: entry.id_evaluator // Inclusion de l'id_evaluator
        }));

        res.send({ evaluations: formattedData });  // Envoi des données sous une clé 'evaluations'

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Erreur lors de la récupération des données.' });
    }
};



async function fetchAndInsertDailyData() {
    try {
        // Récupérer toutes les données de PersonEvaluationView
        const results = await sequelize.query(
            `SELECT * FROM PersonEvaluationView`,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        );

        // Afficher les résultats pour débogage
        console.log('Résultats de la requête:', results);

        // Vérifier que nous avons des résultats avant d'insérer
        if (Array.isArray(results) && results.length > 0) {

            // Récupérer tous les enregistrements existants dans HistoEval pour les id_pers dans results
            const existingRecords = await HistoEval.findAll({
                where: {
                    id_pers: results.map(r => r.id_pers) // Filtrer par les id_pers dans results
                },
                attributes: ['id_pers', 'datedu', 'dateau'] // Sélectionner seulement les champs nécessaires
            });

            // Filtrer les résultats pour n'insérer que ceux qui n'existent pas déjà
            const recordsToInsert = results.filter(result => {
                return !existingRecords.some(existingRecord =>
                    existingRecord.id_pers === result.id_pers &&
                    new Date(existingRecord.datedu).setHours(0, 0, 0, 0) === new Date(result.datedu).setHours(0, 0, 0, 0) &&
                    new Date(existingRecord.dateau).setHours(0, 0, 0, 0) === new Date(result.dateau).setHours(0, 0, 0, 0)
                );
            });

            // Insérer les données si recordsToInsert n'est pas vide
            if (recordsToInsert.length > 0) {
                await HistoEval.bulkCreate(recordsToInsert);
                console.log('Les nouvelles données ont été insérées avec succès.');
            } else {
                console.log('Aucune nouvelle donnée à insérer.');
            }

        } else {
            console.log('Aucune donnée à insérer.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error.message);
    }
}

const fetchAlldataEval = async (req, res) => {
    console.log(req.body);

    try {
        const fetchAlldataEval = await HistoEval.findAll({
            where: {
                id_pers: req.body.ids,
                id_evaluator: req.body.selectedId
            },

        });
        res.send(fetchAlldataEval)
    } catch (error) {
        console.log(error);

    }
}



// Planifier la tâche quotidienne
cron.schedule('0 0 * * *', () => {
    console.log('Début de l\'exécution de fetchAndInsertDailyData');
    fetchAndInsertDailyData();
});


module.exports = {
    fetchEvalDatashisto, fetchAlldataEval, fetchAlldate, fetchAndInsertDailyData, getPersonEvaluation, deleteeval, updaterh, getStatus, ajouteval, ajoutevalnoncadre, getAlldataevaluations, getgataevas, validerEvaluations, fetchEvalDatas, getAlldataevaluationnoncadres, getAlldataevaluationcadrenonmanager, enregistrementevalcadrenonmanager

};
