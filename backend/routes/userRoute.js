const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userControlleur')
const ctrls = require('../controllers/evaluationoController')
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const NodeCache = require('node-cache');

// Créez un cache avec une durée de vie de 60 secondes pour chaque élément
const cache = new NodeCache({ stdTTL: 60 });







const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/medias'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});




const storage2 = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './public/images'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage3 = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, './public/imgserviceg'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imghsse'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage5 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgmark'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage6 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgsi'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});
const storage7 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgsupply'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage8 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgrh'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage9 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgaf'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});

const storage10 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgad'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});


const storage11 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgdirsoc'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});


const storage12 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgcia'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});


const storage13 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/imgannuaire'); // Remplacez par le chemin de destination de votre choix
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Conservez le nom d'origine du fichier
    },
});


const upload = multer({ storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });
const upload4 = multer({ storage: storage4 });
const upload5 = multer({ storage: storage5 });
const upload6 = multer({ storage: storage6 });
const upload7 = multer({ storage: storage7 });
const upload8 = multer({ storage: storage8 });
const upload9 = multer({ storage: storage9 });
const upload10 = multer({ storage: storage10 });
const upload11 = multer({ storage: storage11 });
const upload12 = multer({ storage: storage12 });
const upload13 = multer({ storage: storage13 });


//get
router.get('/makamedia', ctrl.makamedia)
router.get('/makafichier', ctrl.makafichier)
router.get('/getcontact', ctrl.getcontact)
router.get('/getdir', ctrl.getdir)
router.get('/getImage', ctrl.getImage)
router.get("/getVideos", ctrl.getVideos)
router.get('/recupehsse', ctrl.recupehsse);
router.get('/recupemark', ctrl.recupemark);
router.get('/recupesi', ctrl.recupesi);
router.get('/getdirsoc', ctrl.getdirsoc);
router.get('/getAlluserliste', ctrl.getAlluserliste);
router.get('/makafichierhsse', ctrl.makafichierhsse);
router.get('/Ressmktc', ctrl.Ressmktc);

router.get('/makafichierdsi', ctrl.Makafichierdsi);
router.get('/makafichiersupply', ctrl.Makafichiersupply);
router.get('/makafichierrh', ctrl.Makafichierrh);
router.get('/makafichierassistdir', ctrl.Makafichierassistdir);
router.get('/makafichierdaf', ctrl.Makafichierdaf);
router.get('/makafichiercia', ctrl.Makafichiercia);

//getOrganigramme
router.get("/afficherPersonne", ctrl.afficherPersonne)
router.get("/nomsg", ctrl.nomsg)
router.get("/nomrsg", ctrl.nomrsg)
router.get("/nomvert", ctrl.nomvert)
router.get("/nomdhsse", ctrl.nomdhsse)
router.get("/nommark", ctrl.nommark)
router.get("/nomdsi", ctrl.nomdsi)
router.get("/nomsupply", ctrl.nomsupply)
router.get("/nomsdrh", ctrl.nomsdrh)
router.get("/nomdaf", ctrl.nomdaf)
router.get("/nomdhssev", ctrl.nomdhssev)
router.get("/nommarkv", ctrl.nommarkv)
router.get("/nomdsiv", ctrl.nomdsiv)
router.get("/nomsupplyv", ctrl.nomsupplyv)
router.get("/nomdrhv", ctrl.nomdrhv)
router.get("/nomdafv", ctrl.nomdafv)
router.get("/contintinvs", ctrl.contintinvs)
router.get("/nomtour", ctrl.nomtour)
router.get("/nomdethse", ctrl.nomdethse)
router.get("/nomdethssee", ctrl.nomdethssee)

router.get("/recupecia", ctrl.recupecia)
router.get("/nomassistdir", ctrl.nomassistdir)
router.get("/namecia", ctrl.namecia)
router.get("/makamediaentrep", ctrl.makamediaentrep)
router.get("/makamediacollab", ctrl.makamediacollab)


router.get("/recupeservig", ctrl.recupeservig)
router.get("/recupesupply", ctrl.recupesupply)
router.get("/recuperh", ctrl.recuperh)
router.get("/recupeaf", ctrl.recupeaf)
router.get("/recupead", ctrl.recupead)
router.get('/fetchAll/:ids', ctrl.fetchAll)
router.get('/makamessjiaby/:id/:ids', ctrl.makamessjiaby)

//get annuaire
router.get('/recupeannuaire', ctrl.recupeannuaire)
router.get('/profil/:id', ctrl.profil)

router.get('/selectDep/:soc', ctrl.selectDep)
router.get('/selectPoste/:dep', ctrl.selectPoste)

router.get('/getallcomment/:id', ctrl.getallcomment)


router.get('/birthdays/:today', ctrl.fetchBirthdays)




//post
router.post('/insrciptionIntra', ctrl.insrciptionIntra)

router.post('/addannuaire', ctrl.addannuaire)


router.post("/uploadImage", upload.single('image'), ctrl.UploadImage);
router.post("/uploadImages", upload.single('image'), ctrl.UploadImages);
router.post("/UploadImageserviceg", upload3.single('image'), ctrl.UploadImageserviceg);
router.post("/UploadImagehsse", upload4.single('image'), ctrl.UploadImagehsse);
router.post("/UploadImagemark", upload5.single('image'), ctrl.UploadImagemark);
router.post("/UploadImagesi", upload6.single('image'), ctrl.UploadImagesi);
router.post("/UploadImagesupply", upload7.single('image'), ctrl.UploadImagesupply);
router.post("/UploadImagerh", upload8.single('image'), ctrl.UploadImagerh);
router.post("/UploadImageaf", upload9.single('image'), ctrl.UploadImageaf);
router.post("/UploadImagead", upload10.single('image'), ctrl.UploadImagead);
router.post("/UploadImagedirsoc", upload11.single('image'), ctrl.UploadImagedirsoc);
router.post("/UploadImagecia", upload12.single('image'), ctrl.UploadImagecia);
router.post("/UploadImagecia", upload12.single('image'), ctrl.UploadImagecia);

router.post("/UploadImageannuaire", upload13.single('image'), ctrl.UploadImageannuaire);




router.post('/envoyermess', ctrl.envoyermess)
router.post('/login', ctrl.login)
router.post('/Enregitrermedia', ctrl.Enregitrermedia)
router.post('/Enregitrermediact', ctrl.Enregitrermediact)
router.post('/ajoutercontact', ctrl.ajoutercontact)
router.post('/ajouterdir', ctrl.ajouterdir)
router.post('/ajouterservig', ctrl.ajouterservig)
router.post('/ajouterhsse', ctrl.ajouterhsse)
router.post('/ajoutermark', ctrl.ajoutermark)
router.post('/ajoutersi', ctrl.ajoutersi)
router.post('/ajoutersupply', ctrl.ajoutersupply)
router.post('/ajouterrh', ctrl.ajouterrh)
router.post('/ajouteraf', ctrl.ajouteraf)
router.post('/ajouterad', ctrl.ajouterad)
router.post('/ajoutercia', ctrl.ajoutercia)

router.post('/ajouterdirsoc', ctrl.ajouterdirsoc)

router.post('/sendComment', ctrl.sendComment)



//postOrgannigramme
router.post("/uploadImage2", upload2.single('image'), ctrl.UploadImage2);
router.post("/ajouterPersonnes", ctrl.ajouterPersonnes)
router.post("/ajouterPersonne", ctrl.ajouterPersonne)

router.get("/recupakadin", ctrl.recupakadin)
router.get("/recupguilmann", ctrl.recupguilmann)
router.get("/recupstta", ctrl.recupstta)
router.get("/recupstd", ctrl.recupstd)
router.get("/recupspider", ctrl.recupspider)
router.get("/recupnpakadin", ctrl.recupnpakadin)

//post annuaire
router.post('/addannuaire', ctrl.addannuaire)


router.get('/profils/:id', ctrl.profils)


router.delete('/deleteannuaire/:id', ctrl.deleteannuaire)

//delete
router.delete('/deleteuser/:id', ctrl.deleteuser)
router.delete('/deleteMedia/:id', ctrl.deleteMedia)
router.delete('/supprimerPersonnes/:id', ctrl.supprimerPersonnes)
router.delete('/suppridselected/:id', ctrl.suppridselected)
router.delete('/confsupprimerservg/:id', ctrl.confsupprimerservg)
router.delete('/confsupprimerhsse/:id', ctrl.confsupprimerhsse)
router.delete('/confsupprimermark/:id', ctrl.confsupprimermark)
router.delete('/confsupprimersupply/:id', ctrl.confsupprimersupply)
router.delete('/confsupprimerrh/:id', ctrl.confsupprimerrh)
router.delete('/confsupprimeraf/:id', ctrl.confsupprimeraf)
router.delete('/confsupprimerad/:id', ctrl.confsupprimerad)
router.delete('/confsupprimercia/:id', ctrl.confsupprimercia)
router.delete('/supprarticle/:id', ctrl.supprarticle)
router.delete('/deletedir/:id', ctrl.deletedir)
router.delete('/confirmersuppression/:id', ctrl.confirmersuppression)



//deleteOrgannigramme
router.delete("/supprimerPersonne/:id", ctrl.supprimerPersonne)
router.delete("/confsupprimer/:id", ctrl.confsupprimer)


//modification 
router.put('/modif', ctrl.modif)
router.put('/modifmedia/:id', ctrl.modifmedia)
router.put('/modifperso/:id', ctrl.modifperso)
router.put('/updatedata/:id', ctrl.updatedata)
router.put('/updatedatas/:id', ctrl.updatedatas)
router.put('/updatedataservg/:id', ctrl.updatedataservg)
router.put('/updatedatahsse/:id', ctrl.updatedatahsse)
router.put('/updatedatamark/:id', ctrl.updatedatamark)
router.put('/updatedatasupply/:id', ctrl.updatedatasupply)
router.put('/updatedatarh/:id', ctrl.updatedatarh)
router.put('/updatedataaf/:id', ctrl.updatedataaf)
router.put('/updatedataad/:id', ctrl.updatedataad)
router.put('/updatedcia/:id', ctrl.updatedcia)
router.put('/manovaarticle/:id', ctrl.manovaarticle)
router.put('/validermodifications/:id', ctrl.validermodifications)
router.put('/autorisersuperadmin/:id', ctrl.autorisersuperadmin)
router.put('/autoriseradmin/:id', ctrl.autoriseradmin)
router.put('/autoriser/:id', ctrl.autoriser)
router.put('/valider/:id', ctrl.valider)

//modificarion 
router.put('/updateannuaire/:id', ctrl.updateannuaire)

// Route pour renvoyer la structure des dossiers
router.get('/directorytree', ctrl.directorytree)
router.get('/recupenbraf', ctrl.recupenbraf)
router.get('/recupenbrassdir', ctrl.recupenbrassdir)
router.get('/recupecias', ctrl.recupecias)
router.get('/recupehsses', ctrl.recupehsses)
router.get('/recupemks', ctrl.recupemks)
router.get('/recuperhs', ctrl.recuperhs)
router.get('/recupesrvgs', ctrl.recupesrvgs)
router.get('/recupesis', ctrl.recupesis)
router.get('/recupesups', ctrl.recupesups)


//evaluation
router.get('/getAlldataevaluation/:ids/:type', ctrl.getAlldataevaluation)
router.get('/getAlldataevaluationnoncadre/:ids/:type', ctrl.getAlldataevaluationnoncadre)
router.get('/getAlldataevaluationnonmanager/:ids/:type', ctrl.getAlldataevaluationnonmanager)


router.get('/getdatabyid/:ids', ctrl.getdatabyid)
router.get('/getgataeva/:loggedInUser', ctrl.getgataeva)
router.get('/getevaluationid/:id', ctrl.getdatabyid)
router.get('/fetchevaldata', ctrl.fetchevaldata)

//enregistrement auto evaluation
router.post('/enregistrement/:ids', ctrl.enregistrement)
router.post('/enregistrementnoncadre/:ids', ctrl.enregistrementnoncadre)
//router.post('/enregistrementevalcadrenonmanager/:ids', ctrl.enregistrementevalcadrenonmanager)


router.post('/enregistrementvalide/:id', ctrl.enregistrementvalide)
router.post('/validerEvaluation/:id', ctrl.validerEvaluation);




//new evaluation
router.post('/ajouteval/:ids', ctrls.ajouteval);
router.post('/ajoutevalnoncadre/:ids', ctrls.ajoutevalnoncadre);
router.get('/getAlldataevaluations/:ids/:type', ctrls.getAlldataevaluations)
router.post('/getStatus', ctrls.getStatus)
router.get('/getAlldataevaluationnoncadres/:ids/:type', ctrls.getAlldataevaluationnoncadres)

router.get('/getgataevas/:loggedInUser', ctrls.getgataevas)
router.post('/validerEvaluations/:id', ctrls.validerEvaluations);
router.get('/fetchevaldatas', ctrls.fetchEvalDatas)
router.get('/fetchevaldatashisto', ctrls.fetchEvalDatashisto)
router.get('/getAlldataevaluationnoncadre/:ids/:type', ctrls.getAlldataevaluationnoncadres)
router.get('/getAlldataevaluationcadrenonmanager/:ids/:type', ctrls.getAlldataevaluationcadrenonmanager)
router.post('/enregistrementevalcadrenonmanager/:ids', ctrls.enregistrementevalcadrenonmanager)
router.post('/updaterh', ctrls.updaterh)
router.post('/deleteeval', ctrls.deleteeval)
router.post('/fetchAndInsertDailyData', ctrls.fetchAndInsertDailyData)
router.post('/fetchAlldate', ctrls.fetchAlldate);
router.post('/get-histo-eval-data', ctrls.fetchAlldataEval);


router.post('/tester', ctrl.getPhoneBookEntries);

//pbx

router.get('/fetchpbxdata', ctrl.fetchpbxdata)
router.get('/fetchfix', ctrl.fetchfix)




router.get('/getEmails', ctrl.getEmails)



router.get('/getimg', ctrl.getimg)


router.get('/selectPhone/:fixe', ctrl.selectPhone);


//GED

  

const GOOGLE_API_KEY = 'AIzaSyCztFgW7XcsaY4glnr_dTi3I0eQS2rrU5c';
const CX = '12e408343f6ce4571';

router.post('/getdir', ctrl.getDirectoryContents);

module.exports = router;
