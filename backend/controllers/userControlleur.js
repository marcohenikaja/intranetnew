const { Evaluateur, Phonebook, PbxData, Evalue, Commentaire, Annuaire, Cia, Histo_art, Dirsoc, Ad, Af, Rh, UserInsrcription, Media, Contact, Personne, Perso, Serviceg, Hsse, Mark, Si, Supply, Message } = require('../models/userModel');
const { Sequelize, DataTypes, Op, where } = require('sequelize')
const assert = require('assert');
const nodemailer = require('nodemailer');
const ldap = require('ldapjs');
const { createThumbnails } = require('video-thumbnails');
const crypto = require('crypto');
const fs = require('fs');

const path = require('path');
const { promisify } = require('util');
const { spawn } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');

const getImage = async (req, res) => {
  try {
    const images = await Media.findAll({
      where: {
        [Sequelize.Op.or]: [
          { imageUrl: { [Sequelize.Op.like]: '%.png' } },
          { imageUrl: { [Sequelize.Op.like]: '%.jpg' } }
        ]
      }
    });
    const imageNames = images.map(image => image.imageUrl.split('/').pop());

    res.send(imageNames);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des images.' });
  }
};



const insrciptionIntra = async (req, res) => {


  const { nom, mot_de_passe, mail, poste } = req.body;

  // Vérifiez d'abord si l'adresse e-mail existe déjà dans la base de données
  const existingUser = await UserInsrcription.findOne({
    where: { mail },
  });
  const existingName = await UserInsrcription.findOne({
    where: { nom },
  });

  if (existingName) {
    return res.send({ message: "Le nom d'utilisateur existe déjà" });

  }

  if (existingUser) {
    return res.send({ message: "L'adresse e-mail existe déjà" });
  }

  // Si l'e-mail n'existe pas, vous pouvez continuer avec l'inscription normalement
  const activationToken = generateActivationToken();
  console.log(activationToken);

  try {
    const user = await UserInsrcription.create({
      nom,
      mot_de_passe,
      mail,
      poste,
      activationToken,
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'marcohenikajarakotobe@gmail.com',
        pass: 'lcnu lhmf hshq eymu',
      },
    });


    const mailOptions = {
      from: 'marcohenikajarakotobe@gmail.com',
      to: mail,
      subject: 'Confirmation de l\'inscription',
      text: 'Contenu de l\'e-mail',
      html: `<p>Cliquez sur ce lien pour activer votre compte : <a href="http://intranet.npakadin.mg:8000/activate/${activationToken}">Activer le compte</a></p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail envoyé :', info.response);
      res.status(200).send('E-mail envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).send('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur');
  }
};


process.env.PATH += ';C:\\ffmpeg\\';

const asyncSpawn = promisify(spawn);




const getVideos = async (req, res) => {
  try {
    const videos = await Media.findAll({
      where: {
        imageUrl: {
          [Sequelize.Op.or]: [
            { [Sequelize.Op.like]: '%.mp4' },
            { [Sequelize.Op.like]: '%.avi' }
          ]
        }
      }
    });

    // const videopure = videos.map(v => v.imageUrl.split('/').pop());
    console.log(videos);
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des vidéos.' });
  }
};










const login = async (req, res) => {
  const ldapClient = ldap.createClient({
    url: 'ldap://172.16.1.19:389',
  });

  try {
    await new Promise((resolve, reject) => {
      ldapClient.bind('administrateur@npakadin.mg', 'P4$$w0rdNPAroot753951/*-+', (err) => {
        if (err) {
          console.error('Erreur de connexion LDAP:', err);
          ldapClient.unbind();
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const cn = req.body.username;
    const password = req.body.password;

    await new Promise((resolve, reject) => {

      ldapClient.bind(cn, password, async (err) => {
        if (err) {
          console.error('Erreur de connexion LDAPS:', err);
          ldapClient.unbind();
          res.json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
          reject(err);
        } else {
          console.log('Connexion LDAPS réussie');

          try {
            const existingUser = await UserInsrcription.findOne({
              where: { mail: cn },
            });

            let userId;
            let poste = 'Utilisateur';
            if (!existingUser) {
              const newUser = await UserInsrcription.create({
                mail: cn,
                mot_de_passe: password,
                nom: cn,
                poste: poste,
              });
              console.log('Utilisateur inséré avec succès');
              userId = newUser.id;
            } else {
              userId = existingUser.id;
              poste = existingUser.poste;
            }

            // Authentification réussie, retourne l'ID de l'utilisateur
            res.send({ success: true, login: cn, ids: userId, poste: poste });
            resolve();
          } catch (error) {
            console.error('Erreur lors de la recherche de l\'utilisateur dans la base de données:', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
            reject(error);
          }
        }
      });
    });

  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    ldapClient.unbind();
  }
};


//requete get all mail 











const getEmails = async (req, res) => {
  const client = ldap.createClient({
    url: 'ldap://172.16.1.19:389',
    timeout: 30000, // 30 seconds
    connectTimeout: 30000 // 30 seconds
  });

  const emails = []; // Tableau pour stocker les e-mails

  // Gestionnaire d'erreurs global pour le client LDAP
  client.on('error', (err) => {
    console.error('LDAP client error:', err);
    res.status(500).send({ error: 'Unable to connect to LDAP server' });
  });

  client.bind('administrateur@npakadin.mg', 'P4$$w0rdNPAroot753951/*-+', function (err) {
    if (err) {
      console.error('Bind error:', err);
      res.status(500).send({ error: 'Bind failed' });
      return;
    }

    let iObjectsFound = 0;

    const opts = {
      filter: '(&(samaccountname=*))',
      scope: 'sub',
      attributes: ['sAMAccountName', 'mail'] // Spécifiez les attributs que vous voulez
    };

    client.search('DC=npakadin,DC=mg', opts, (err, ldapRes) => {
      if (err) {
        console.error('Search error:', err);
        res.status(500).send({ error: 'Search failed' });
        return;
      }

      ldapRes.on('searchEntry', (entry) => {
        iObjectsFound++;
        try {
          const entryString = entry.toString();
          const entryObject = JSON.parse(entryString);

          // Extraire les attributs spécifiques
          const sAMAccountName = entryObject.attributes.find(attr => attr.type === 'sAMAccountName')?.values[0];
          const mailAttribute = entryObject.attributes.find(attr => attr.type === 'mail');
          const mail = mailAttribute ? mailAttribute.values[0] : undefined;

          // Vérifier si l'adresse e-mail est définie avant de l'ajouter au tableau
          if (mail !== undefined) {
            emails.push({ sAMAccountName, mail });
          }
        } catch (parseError) {
          console.error('Error parsing entry:', parseError);
        }
      });

      ldapRes.on('searchReference', (referral) => {
        console.log('referral: ' + referral.uris.join());
      });

      ldapRes.on('error', (err) => {
        console.error('Search error: ' + err.message);
        res.status(500).send({ error: err.message });
      });

      ldapRes.on('end', (result) => {
        console.log('status: ' + result.status);
        console.log("]");

        // Fermer la connexion LDAP
        client.unbind();

        // Envoyer le tableau d'e-mails au frontend une fois la recherche terminée
        res.status(200).send({ success: true, emails });
      });
    });
  });
};









const UploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const mediaPath = path.join(__dirname, '..', 'public', 'medias', req.file.filename);
    const thumbnailPath = path.join(__dirname, '..', 'public', 'thumbnails', `${req.file.filename}-thumbnail.jpg`);

    // Création de la miniature avec ffmpeg
    ffmpeg(mediaPath)
      .screenshots({
        count: 1,
        folder: path.dirname(thumbnailPath),
        filename: path.basename(thumbnailPath),
        size: '200x125',
        timemarks: ['1'] // Capture à 1 seconde
      })
      .on('end', () => {
        // Chemin où sera stockée l'image téléchargée
        const imageUrl = `/medias/${req.file.filename}`;
        const thumbnailUrl = `/thumbnails/${req.file.filename}-thumbnail.jpg`;

        // Réponse JSON
        console.log(imageUrl + 'et' + thumbnailUrl);
        res.json({ imageUrl, thumbnailUrl, success: true });
      })
      .on('error', (err) => {
        console.error('Erreur lors de la génération de la miniature:', err);
        res.status(500).json({ error: 'Image upload failed' });
      });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};




const UploadImages = async (req, res) => {

  const imageUrl = `/medias/${req.file.filename}`;
  res.json({ imageUrl, success: true });
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }


  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};







const UploadImageannuaire = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgannuaire/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};




const UploadImageserviceg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgserviceg/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};

const UploadImagesi = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgsi/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};


const UploadImagerh = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgrh/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};

const UploadImagemark = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgmark/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};

const UploadImagehsse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imghsse/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }

};

const Enregitrermediact = async (req, res) => {
  try {
    const ids = req.body.ids;
    const imageUrl = req.body.imageUrl;
    const titre = req.body.titre;
    const service = req.body.pole;
    const description = req.body.description;
    const loggedInUser = req.body.loggedInUser;
    const urlthm = req.body.urlthm;

    const insert = await Media.create({
      id_pers: ids,
      titre: titre,
      nom_pers: loggedInUser,
      service: service,
      description: description,
      imageUrl: imageUrl,
      service: service,
      urlthm: urlthm
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}
const Enregitrermedia = async (req, res) => {
  try {
    const ids = req.body.ids;
    const imageUrl = req.body.imageUrl;
    const titre = req.body.titre;
    const service = req.body.dep;
    const description = req.body.description;
    const loggedInUser = req.body.loggedInUser;


    const insert = await Media.create({
      id_pers: ids,
      titre: titre,
      nom_pers: loggedInUser,
      service: service,
      description: description,
      imageUrl: imageUrl,
      service: service
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

//bonplan
const makamedia = async (req, res) => {
  try {
    const mediaData = await Media.findAll();

    // Filtrer les résultats pour ne conserver que ceux ayant "service" égal à "Bons plans"
    const bonsPlansMedia = mediaData.filter(item => item.service === 'Bons plans');

    bonsPlansMedia.sort((a, b) => b.createdAt - a.createdAt);
    res.send(bonsPlansMedia);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};

//Actus collaborateurs
const makamediacollab = async (req, res) => {
  try {
    const mediaData = await Media.findAll();

    // Filtrer les résultats pour ne conserver que ceux ayant "service" égal à "Actus collaborateurs"
    const actusCollaborateursMedia = mediaData.filter(item => item.service === 'Actus collaborateurs');

    actusCollaborateursMedia.sort((a, b) => b.createdAt - a.createdAt);
    res.send(actusCollaborateursMedia);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};

//actus entreprises
const makamediaentrep = async (req, res) => {
  try {
    const mediaData = await Media.findAll();

    // Filtrer les résultats pour ne conserver que ceux ayant "service" égal à "Actus entreprises"
    const actusEntreprisesMedia = mediaData.filter(item => item.service === 'Actus entreprises');

    actusEntreprisesMedia.sort((a, b) => b.createdAt - a.createdAt);
    res.send(actusEntreprisesMedia);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};






const makafichier = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Ajoute la condition pour filtrer par service "Services généraux"
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('service')),
            'LIKE',
            '%services généraux%'
          ),
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


const ajoutercontact = async (req, res) => {

  try {
    const ajout = await Contact.create({
      mat: req.body.matricule,
      nom: req.body.nom,
      prenom: req.body.prenom,
      tel: req.body.telephone,
      mail: req.body.email,
      poste: req.body.role,
      idUser: req.body.ids,
      service: req.body.service
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }

}

const getcontact = async (req, res) => {
  try {
    const contact = await Contact.findAll();
    res.send({ success: true, contact })
  } catch (error) {

  }
}

const deleteuser = async (req, res) => {

  try {
    const userId = req.params.id;

    const deletedUser = await Contact.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedUser) {
      res.send({ success: true, message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
    } else {
      res.status(404).send({ success: false, message: `Utilisateur avec l'ID ${userId} introuvable` });
    }
  } catch (error) {
    console.error(error);
  }
};


const confirmersuppression = async (req, res) => {

  try {
    const userId = req.params.id;

    const deletedir = await UserInsrcription.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedir) {
      res.send({ success: true, message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
    } else {
      res.status(404).send({ success: false, message: `Utilisateur avec l'ID ${userId} introuvable` });
    }
  } catch (error) {
    console.error(error);
  }
};

const deletedir = async (req, res) => {

  try {
    const userId = req.params.id;

    const deletedir = await Dirsoc.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedir) {
      res.send({ success: true, message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
    } else {
      res.status(404).send({ success: false, message: `Utilisateur avec l'ID ${userId} introuvable` });
    }
  } catch (error) {
    console.error(error);
  }
};

const modif = async (req, res) => {
  try {
    const { idup, matriculeup, nomup, prenomup, telup, mailup, roleup } = req.body;
    const contact = await Contact.update(
      {
        mat: matriculeup,
        nom: nomup,
        prenom: prenomup,
        tel: telup,
        mail: mailup,
        poste: roleup,
      },
      {
        where: {
          id: idup,
        },
      }
    );

    res.send({ success: true, contact });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Une erreur s'est produite lors de la modification du contact." });
  }
};




//organigramme 

const ajouterPersonne = async (req, res) => {
  const nom = req.body.noms;
  const prenom = req.body.prenoms;
  const genre = req.body.genre;
  const numero = req.body.num;
  const poste = req.body.poste;
  const mail = req.body.mail;
  const imageUrl = req.body.imageUrl;



  try {

    const inserer = await Personne.create({
      nom: nom,
      prenom: prenom,
      genre: genre,
      numero: numero,
      poste: poste,
      mail: mail,
      imageUrl: imageUrl
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
};

const ajouterPersonnes = async (req, res) => {
  const nom = req.body.noms;
  const prenom = req.body.prenoms;
  const genre = req.body.genre;
  const numero = req.body.num;
  const poste = req.body.poste;
  const mail = req.body.mail;
  const imageUrl = req.body.imageUrl;



  try {

    const inserer = await Personne.create({
      nom: nom,
      prenom: prenom,
      genre: genre,
      numero: numero,
      poste: poste,
      mail: mail,
      imageUrl: imageUrl
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
};


const afficherPersonne = async (req, res) => {
  try {
    const pers = await Personne.findAll();
    res.send(pers)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la classe' });
  }
}

const supprimerPersonne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Personne.findByPk(id); // Chercher l'utilisateur par l'ID
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await Personne.destroy(); // Supprimer l'utilisateur

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
  }
}


const UploadImage2 = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const imageUrl = `/images/${req.file.filename}`;



    res.status(201).json(imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
};

const nomsg = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Secrétaire Général'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};


const nomassistdir = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Assistante de direction générale'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};


const namecia = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Contrôle Interne et Audit'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};





const nomrsg = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Responsable SG'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};

const nomvert = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Coursier',
            'Femmes de Ménage',
            'Responsable Contrat Groupe',
            'Assistant achat interne',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};
const nomdhsse = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'DHSSE'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};
const nommark = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Directrice Marketing et Communication'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};

const nomdsi = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: `Directeur du Système d'Information`
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};


const nomsupply = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'Directrice Supply Chain'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomsdrh = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'DRH'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomdaf = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: 'DAF'
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomdhssev = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Responsable Service Audit',
            'Responsable Service Sureté',
            'Responsable HSE',
            'Assistante de direction hsse',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nommarkv = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Coordinateur Marketing-Détachée',
            'Responsable Communication',
            'Responsable Marketing',
            'Assistante de direction Marketing et Communication',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}



const nomdethssee = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Chantier',
            'Entrepôt',
            'Base principale NP AKADIN',
            'Base secondaire en région',
            'Accueil'
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomdsiv = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            `Responsable Système d'information`,
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomsupplyv = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Chef de Departement Opérations',
            'Chef de Departement Transit',
            'Chef de Departement Approvisionnement',
            'Assistante de direction Supply Chain',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}


const nomdrhv = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Contrôleur Interne',
            'Trésoriers',
            'ADMINISTRATION RH',
            'Responsable Développement RH/Recrutement',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomdafv = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Assistante de direction DAF',
            'RAF',
            'Resp Contrôle de Gestion',
            'Resp Process & Contrôle interne',
            'Resp Trésorerie',
            'Resp Facturations & Recouvrements',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}


const contintinvs = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Contrôleur interne + Process',
            'Investigation',

          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}

const nomtour = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Surveillant tour de contrôl',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}
const nomdethse = async (req, res) => {
  try {
    const users = await Personne.findAll({
      where: {
        poste: {
          [Sequelize.Op.or]: [
            'Détaché HSE',
          ]
        }
      }
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
}


const deleteMedia = async (req, res) => {
  const id = req.params.id;

  try {
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({ message: 'Media non trouvé' });
    }

    await media.destroy(); // Supprimer le média

    res.status(200).json({ message: 'Media supprimé avec succès' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du média' });
  }
}

const modifmedia = async (req, res) => {
  const id = req.params.id;
  const titre = req.body.titrenew;
  const service = req.body.deps;

  try {
    const media = await Media.update(
      {
        titre: titre,
        service: service
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }

}
const ajouterdir = async (req, res) => {

  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const genre = req.body.genre;
  const numero = req.body.num;
  const poste = req.body.poste;
  const mail = req.body.mail;
  const imageUrl = req.body.imageUrl;



  try {
    const inserer = await Perso.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      imageUrl: imageUrl
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}

const ajouterdirsoc = async (req, res) => {


  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const poste = req.body.poste;
  const imageUrl = req.body.imageUrl;
  const descri = req.body.descri;

  try {
    const inserer = await Dirsoc.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      image: imageUrl,
      descri: descri
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}

const getdir = async (req, res) => {
  try {
    const getdir = await Perso.findAll();
    res.send(getdir);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
}
const getdirsoc = async (req, res) => {
  try {
    const getdirsoc = await Dirsoc.findAll();
    res.send(getdirsoc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
}


const ajoutersi = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Si.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}


const ajouterrh = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Rh.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}



const ajouteraf = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Af.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });
    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}


const ajouterservig = async (req, res) => {

  const { nom, prenom, poste, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Serviceg.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}


const ajouterhsse = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Hsse.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}

const ajoutermark = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Mark.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}



const ajoutersupply = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Supply.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}



const ajouterad = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Ad.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}

const ajoutercia = async (req, res) => {

  const { nom, prenom, poste, tel, mail, desc, imageUrlToSend } = req.body;
  try {
    const ServiceG = await Cia.create({
      nom: nom,
      prenom: prenom,
      poste: poste,
      tel: tel,
      mail: mail,
      description: desc,
      imageUrl: imageUrlToSend
    });

    res.send({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la personne:', error);
    res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
  }
}

const UploadImagesupply = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgsupply/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }


}

const UploadImageaf = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgaf/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}

const UploadImagead = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgad/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}

const UploadImagecia = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgcia/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}

const UploadImagedirsoc = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imageUrl = `/imgdirsoc/${req.file.filename}`;
    res.send({ imageUrl, success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}

// const recupeservig = async (req, res) => {
//   try {
//     const Service = await Serviceg.findAll();
//     res.send(Service);
//   } catch (error) {

//     res.status(500).json({ success: false, error: 'Erreur lors de l\'ajout de la personne' });
//   }
// }


const recupeservig = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'SERVICES GENERAUX',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}



const recupemark = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'MARKETING',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupehsse = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'Dhsse',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}



const recupesupply = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'DSC',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recupesi = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'DSI',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recupead = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'Sg',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}
const recupecia = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'CIA',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recuperh = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'DRH',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recupeaf = async (req, res) => {
  try {
    const Service = await Annuaire.findAll({
      where: {
        dep: 'DAF',
        soc: 'NP AKADIN Services'
      },
      order: [['ordre', 'ASC']] // Tri des résultats par ordre croissant de la colonne 'ordre'
    });
    res.send(Service);
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recupenbraf = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'DAF',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}



const recupenbrassdir = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'Sg',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupecias = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'CIA',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupehsses = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'Dhsse',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupemks = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'MARKETING',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recuperhs = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'DRH',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupesrvgs = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'SERVICES GENERAUX',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}

const recupesis = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'DSI',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}


const recupesups = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        dep: 'DSC',
        soc: 'NP AKADIN Services'
      }
    });
    res.send({ count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Erreur lors de la récupération des services" });
  }
}






const fetchAll = async (req, res) => {
  const ids = req.params.ids;
  try {
    const fetch = await UserInsrcription.findAll({
      where: {
        id: {
          [Op.ne]: ids, // Cette condition signifie "pas égal à ids"
        },
      },
    });
    res.send(fetch);
  } catch (error) {
    console.log(error);
  }
}
const makamessjiaby = async (req, res) => {
  const id = req.params.id;
  const ids = req.params.ids;

  try {
    const sms = await Message.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ id_send: ids }, { id_rec: id }],
          },
          {
            [Op.and]: [{ id_send: id }, { id_rec: ids }],
          },
        ],
      },
      order: [['id', 'ASC']], // Tri par ID en ordre ascendant
    });

    res.send({ success: true, sms });
  } catch (error) {
    console.log(error);
  }
};

const envoyermess = async (req, res) => {
  try {
    const inserer = await Message.create({
      id_send: req.body.ids,
      id_rec: req.body.selectedPerson,
      content: req.body.mess,
    });

    res.send({ success: true });
  } catch (error) {

  }
}
const modifperso = async (req, res) => {

  const { nom, prenom, genre, numero, email } = req.body;

  try {
    const modifperso = await Personne.update(
      {
        nom: nom,
        prenom: prenom,
        genre: genre,
        numero: numero,
        mail: email,

      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const validermodifications = async (req, res) => {
  const { nom, prenom, poste, descri } = req.body;
  try {
    const modifperso = await Dirsoc.update(
      {
        nom: nom,
        prenom: prenom,
        poste: poste,
        descri: descri,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const autorisersuperadmin = async (req, res) => {

  try {
    const modifperso = await UserInsrcription.update(
      {

        poste: "Super admin",

      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}
const autoriseradmin = async (req, res) => {

  try {
    const modifperso = await UserInsrcription.update(
      {

        poste: "Administrateur",

      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const autoriser = async (req, res) => {

  try {
    const modifperso = await UserInsrcription.update(
      {

        poste: "Utilisateur",

      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const suppridselected = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Perso.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const confsupprimer = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Personne.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedata = async (req, res) => {
  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Si.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const updatedatas = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nom, prenom, poste } = req.body
    const up = await Perso.update(
      {
        nom: nom,
        prenom: prenom,
        poste: poste,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const supprimerPersonnes = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Si.findByPk(id); // Chercher l'utilisateur par l'ID
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Utilisez l'option "where" pour spécifier la condition de suppression
    await Si.destroy({
      where: {
        id: id // Supprimer l'utilisateur avec l'ID correspondant
      }
    });

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur' });
  }
};


const confsupprimerservg = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Serviceg.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedataservg = async (req, res) => {
  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Serviceg.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const confsupprimerhsse = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Hsse.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedatahsse = async (req, res) => {
  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Hsse.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}



const confsupprimermark = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Mark.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedatamark = async (req, res) => {
  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Mark.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const confsupprimersupply = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Supply.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedatasupply = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Supply.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}



const confsupprimerrh = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Rh.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedatarh = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Rh.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const confsupprimeraf = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Af.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedataaf = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Af.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}


const updatedcia = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Cia.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const confsupprimerad = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Ad.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const confsupprimercia = async (req, res) => {
  const id = req.params.id;

  try {
    const confsupprimer = await Cia.destroy({
      where: {
        id: id,
      },
    });
    res.send({ success: true })
  } catch (error) {
    console.log(error);

  };
}

const updatedataad = async (req, res) => {

  const idup = req.params.id;
  try {
    const { nomup, prenomup, posteup, mailup, telup, descup } = req.body
    const up = await Ad.update(
      {
        nom: nomup,
        prenom: prenomup,
        poste: posteup,
        tel: telup,
        mail: mailup,
        description: descup,
      },
      {
        where: {
          id: idup,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const manovaarticle = async (req, res) => {
  console.log(req.body);
  const idup = req.params.id;
  try {
    const { titre, description, pole, nom } = req.body
    const up = await Media.update(
      {
        titre: titre,
        description: description,
        service: pole
      },
      {
        where: {
          id: idup,
        },
      },
    );

    const ins = await Histo_art.create({
      titre_nouv: titre,
      description_nouv: description,
      actus_nouv: pole,
      nom: nom,
      id_actus: idup,
    })
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }

}



const supprarticle = async (req, res) => {
  const id = req.params.id;

  try {
    // Vérifier s'il existe des commentaires liés à l'article
    const commentairesExistants = await Commentaire.findOne({
      where: {
        id_media: id,
      },
    });

    // Si des commentaires existent, les supprimer d'abord
    if (commentairesExistants) {
      await Commentaire.destroy({
        where: {
          id_media: id,
        },
      });
    }

    // Supprimer l'article
    await Media.destroy({
      where: {
        id: id,
      },
    });

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: 'Erreur lors de la suppression de l\'article' });
  }
};


const getAlluserliste = async (req, res) => {
  try {
    const allUserList = await UserInsrcription.findAll();
    res.send(allUserList);
  } catch (error) {
    console.log(error);
    res.status(500).send('Une erreur s\'est produite.');
  }
}


const valider = async (req, res) => {
  const { nom, mail, poste } = req.body;

  try {
    const mod = await Media.update(
      {
        nom_pers: nom,

      },
      {
        where: {
          id_pers: req.params.id,
        },
      }
    )
    const modifperso = await UserInsrcription.update(
      {
        nom: nom,

        mail: mail,
        poste: poste

      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

const makafichierhsse = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Ajoute la condition pour filtrer par service "Services généraux"
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('service')),
            'LIKE',
            '%HSSE%'
          ),
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


const Ressmktc = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Ajoute la condition pour filtrer par service "Services généraux"
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('service')),
            'LIKE',
            '%Marketing et Communication%'
          ),
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


const Makafichierdsi = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Système d\'information%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


const Makafichiersupply = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Supply Chain%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


const Makafichierrh = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Ressources Humaines%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};

const Makafichierdaf = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Administratif et Financier%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};




const Makafichiercia = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Contrôle Interne et Audit%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};




const Makafichierassistdir = async (req, res) => {
  try {
    const mediaData = await Media.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { imageUrl: { [Op.like]: '%.pdf' } },
              { imageUrl: { [Op.like]: '%.xlsx' } },
              { imageUrl: { [Op.like]: '%.xls' } },
              { imageUrl: { [Op.like]: '%.docx' } },
              { imageUrl: { [Op.like]: '%.doc' } },
              { imageUrl: { [Op.like]: '%.txt' } },
            ],
          },
          // Condition pour filtrer par service "Système d'information"
          { service: { [Op.like]: '%Assistance de direction%' } },
        ],
      },
    });
    res.send(mediaData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite.");
  }
};


//ajouter annuaire 



//update annuaire
const updateannuaire = async (req, res) => {
  const id = req.params.id
  console.log(req.body);
  const { matmodif, nommodif, prenommodif, socmodif, mailmodif, phonemodif, postemodif, fixup, depmodif, ordremodif, imageUrlToSend, birthmodif } = req.body;

  try {
    const mod = await Annuaire.update(
      {
        mat: req.body.matmodif,
        nom: nommodif,
        prenom: prenommodif,
        soc: socmodif,
        dep: depmodif,
        poste: postemodif,
        mail: mailmodif,
        Fixe: fixup,
        tel: phonemodif,
        ordre: ordremodif,
        annif: birthmodif,
        imageUrl: imageUrlToSend,
      },
      {
        where: {
          id: id,
        },
      }
    )
    res.send({ success: true })
  } catch (error) {
    console.log(error);
  }
}

//add annuaire
const addannuaire = async (req, res) => {


  console.log(req.body);

  const { ids, matajout, nomajout, prenomajout, socajout, depSelectedajout, selectposteajout, mailajout, fix, birth, telajout, imageUrlToSend } = req.body
  const insert = await Annuaire.create({
    ids,
    mat: matajout,
    nom: nomajout,
    prenom: prenomajout,
    soc: socajout,
    dep: depSelectedajout,
    poste: selectposteajout,
    mail: mailajout,
    Fixe: fix,
    tel: telajout,
    annif: birth,
    imageUrl: imageUrlToSend
  });
  res.send({ success: true })

}


const recupeannuaire = async (req, res) => {
  const makaannuaire = await Annuaire.findAll();
  res.send(makaannuaire);

}

const deleteannuaire = async (req, res) => {

  try {
    const userId = req.params.id;

    const deletedUser = await Annuaire.destroy({
      where: {
        id: userId,
      },
    });

    if (deletedUser) {
      res.send({ success: true, message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
    } else {
      res.status(404).send({ success: false, message: `Utilisateur avec l'ID ${userId} introuvable` });
    }
  } catch (error) {
    console.error(error);
  }
};



const profil = async (req, res) => {
  const idWithColon = req.params.id;
  const id = idWithColon.split(':')[1];
  console.log("ID from URL:", id); // Vérifiez la valeur de l'ID

  try {
    if (!id) {
      return res.status(400).json({ message: 'ID manquant dans la requête' });
    }

    const user = await Annuaire.findOne({
      where: { mat: id }
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur' });
  }
}




const profils = async (req, res) => {
  const idWithColon = req.params.id;
  console.log(idWithColon);
  try {
    const user = await Annuaire.findByPk(idWithColon);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur' });
  }
}



const selectDep = async (req, res) => {
  try {
    const distinctDepsForSoc = await Annuaire.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('dep')), 'dep']],
      where: {
        soc: req.params.soc, // Utilisez req.params.soc sans les guillemets simples pour référencer la valeur du paramètre de requête
      },
      order: [['dep', 'ASC']],
    });

    // Envoie les résultats en tant que réponse JSON
    res.send(distinctDepsForSoc);
  } catch (error) {
    console.error("Erreur lors de la récupération des départements :", error.message);
    res.status(500).send("Erreur lors de la récupération des départements");
  }
};


const selectPoste = async (req, res) => {
  console.log(req.params.dep);
  try {
    const distinctDepsForSoc = await Annuaire.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('poste')), 'poste']],
      where: {
        dep: req.params.dep,
      },
      order: [['dep', 'ASC']],
    });

    // Envoie les résultats en tant que réponse JSON
    res.send(distinctDepsForSoc);
  } catch (error) {
    console.error("Erreur lors de la récupération des départements :", error.message);
    res.status(500).send("Erreur lors de la récupération des départements");
  }
};


const sendComment = async (req, res) => {
  const { cardId, comment, ids } = req.body
  try {
    const user = await Commentaire.create({
      id_media: cardId,
      id_pers: ids,
      contenu: comment
    });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
  }
}



const getallcomment = async (req, res) => {

  try {
    const comments = await Commentaire.findAll({
      include: [
        {
          model: UserInsrcription,
          attributes: ['id', 'nom', 'mail'],
        },
        {
          model: Media,
          attributes: ['id', 'id_pers', 'nom_pers'],
          where: { id: req.params.id },
        },
      ],

    });

    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des commentaires.' });
  }
};


const recupakadin = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'AKADIN',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'AKADIN' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}


const recupguilmann = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'GUILMANN',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'Guilmann' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}

const recupstta = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'STTA',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'STTA' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}

const recupstd = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'STD',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'STD' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}




const recupspider = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'SPIDER',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'SPIDER' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}


const recupnpakadin = async (req, res) => {
  try {
    const count = await Annuaire.count({
      where: {
        soc: 'NP AKADIN Services',
      },
    });

    console.log(`Nombre de lignes où soc est égal à 'np akadin services' : ${count}`);
    res.send({ count })
  } catch (error) {
    console.error('Erreur lors du comptage des lignes :', error);
  }
}


// // Fonction pour récupérer la structure des dossiers de manière récursive
// function getDirectoryTree(dirPath) {
//   const name = path.basename(dirPath);
//   const node = { name };
//   const stat = fs.statSync(dirPath);
//   if (stat.isDirectory()) {
//       node.type = 'folder';
//       node.children = fs.readdirSync(dirPath).map(child => getDirectoryTree(path.join(dirPath, child)));
//   } else {
//       node.type = 'file';
//   }
//   return node;
// }

// // Contrôleur pour gérer la récupération de la structure des dossiers
// function directorytree(req, res) {
//   const folderPath = 'C://Users//rakotobe.marco//Downloads/material-ui-stepper-multi-stepper-rhf/';

//   try {
//       const directoryTree = getDirectoryTree(folderPath);
//       res.json(directoryTree);
//   } catch (error) {
//       console.error('Erreur lors de la récupération de la structure des dossiers :', error);
//       res.status(500).json({ error: 'Erreur interne du serveur' });
//   }
// }

function directorytree(req, res) {
  const folderPath = 'C://Users//rakotobe.marco//Downloads/material-ui-stepper-multi-stepper-rhf/';

  try {
    const directoryTree = getDirectoryTree(folderPath, folderPath); // Passer le chemin de base à la fonction getDirectoryTree
    res.json(directoryTree);
  } catch (error) {
    console.error('Erreur lors de la récupération de la structure des dossiers :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

// Fonction pour récupérer la structure des dossiers avec les chemins complets
function getDirectoryTree(folderPath, basePath) {

  const items = fs.readdirSync(folderPath);
  const directoryTree = {
    name: path.basename(folderPath),
    type: 'folder',
    fullPath: folderPath.replace(basePath, '').replace(/\\/g, '/'), // Obtenez le chemin relatif par rapport au chemin de base
    children: []
  };

  items.forEach(item => {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      directoryTree.children.push(getDirectoryTree(itemPath, basePath)); // Récursivement récupérer la structure des sous-dossiers
    } else {
      directoryTree.children.push({ name: item, type: 'file' });
    }
  });

  return directoryTree;
}


const getAlldataevaluation = async (req, res) => {
  const { ids, type } = req.params;

  const getAlldataevaluation = await Evalue.findAll(
    {
      where: {
        id_pers: ids,
        typeeval: type,
      },
      order: [['id', 'DESC']],
    }
  );
  res.send(getAlldataevaluation)
}

const getAlldataevaluation1 = async (req, res) => {
  const id = req.params.ids
  const typeeval = req.params.type
  const getAlldataevaluation = await Evalue.findAll(
    {
      where: {
        id_pers: id,
      },
      order: [['id', 'DESC']],
    }
  );
  res.send(getAlldataevaluation)
}



const getAlldataevaluationnoncadre = async (req, res) => {
  const id = req.params.ids
  const getAlldataevaluation = await Evalue.findAll(
    {
      where: {
        id_pers: id,
        typeeval: 'Evaluation non cadre',
      },
      order: [['id', 'DESC']],
    }
  );
  res.send(getAlldataevaluation)
}


const getAlldataevaluationnonmanager = async (req, res) => {
  const id = req.params.ids
  const getAlldataevaluation = await Evalue.findAll(
    {
      where: {
        id_pers: id,
        typeeval: 'Evaluation cadre non manager',
      },
      order: [['id', 'DESC']],
    }
  );
  res.send(getAlldataevaluation)
}


const getdatabyid = async (req, res) => {
  const id = req.params.ids
  console.log(id);
  const getAlldataevaluation = await Evalue.findAll(
    {
      where: {
        id_pers: id,
      },
      order: [['id', 'DESC']],
    }
  );
  res.send(getAlldataevaluation)
}






function genererClesRSA() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 1000, // Longueur de la clé
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  return { clePublique: publicKey, clePrivee: privateKey };
}










// const enregistrement = async (req, res) => {
//   const id = req.params.ids;
//   const typeeval = 'Evaluation cadre';
//   const todayis = req.body.todayis;
//   // Conversion de la chaîne de caractères en objet Date
//   const dateObject = new Date(todayis);

//   // Obtenir des parties spécifiques de la date et les formater
//   const year = dateObject.getFullYear();
//   const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Ajouter un zéro si le mois est inférieur à 10
//   const day = String(dateObject.getDate()).padStart(2, '0'); // Ajouter un zéro si le jour est inférieur à 10

//   const formattedDate = `${year}-${month}-${day}`;

//   const {
//     nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission, objectifs = [],
//     resultat, selectedValue1 = [], selectedValue2 = [], selectedVal1 = [], selectedVal2 = [], selectedVal3 = [],
//     selectedVal4 = [], selectedVal5 = [], selectedVal6 = [], selectedVal7 = [], selectedVal8 = [], selectedVal9 = [],
//     selectedVal10 = [], selectedVal11 = [], selectedVal12 = [], selectedVal13 = [], selectedVal14 = [], selectedVal15 = [],
//     r1 = '', r2 = '', r3 = '', r4 = '', r5 = '',
//     cdc1 = '', cdc2 = '', cdc3 = '', cdc4 = '', cdc5 = '',
//     cmt1 = '', cmt2 = '', cmt3 = '', cmt4 = '', cmt5 = '',
//     nivactus = '', nouvnivs = '', concl = '', ancienneteniv = '', com = '',
//     pg = '', classification = '', idr = '', f1 = '', f2 = '', f3 = '', f4 = '',
//     c1 = '', c2 = '', c3 = '', c4 = '', am1 = '', am2 = '', am3 = '', am4 = '',
//     c21 = '', c22 = '', c23 = '', c24 = '', t1 = '', t2 = '', t3 = '', t4 = '',
//     compac1 = '', compac2 = '', compac3 = '', compac4 = '', apav1 = '', apav2 = '', apav3 = '', apav4 = '',
//     apap1 = '', apap2 = '', apap3 = '', apap4 = '', comm1 = '', comm2 = '', comm3 = '', comm4 = '',
//     ccd1 = '', ccd2 = '', ccd3 = '', ccd4 = '', catcomp1 = '', catcomp2 = '', catcomp3 = '', catcomp4 = '',
//     motif1 = '', motif2 = '', motif3 = '', motif4 = '',
//     pa1 = '', pa2 = '', pa3 = '', pa4 = '', dp1 = '', dp2 = '', dp3 = '', dp4 = '',
//     ct1 = '', ct2 = '', ct3 = '', mt1 = '', mt2 = '', mt3 = '', ml1 = '', ml2 = '', ml3 = '',
//     cpr1 = '', cpr2 = '', cpr3 = '', cg1 = '', cg2 = '', cg3 = '', comcollab = '', somme,
//     objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn2 = '', emailSg = ''
//   } = req.body;

//   // Clean up the data by replacing undefined with default values
//   const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);

//   try {
//     const { clePublique, clePrivee } = genererClesRSA();

//     let evaluationData = {
//       id_pers: id,
//       alp1,
//       alp2,
//       nom: cleanData(nom),
//       prenom: cleanData(prenom),
//       mat: cleanData(mat),
//       dateentree: cleanData(daty),
//       datetoday: cleanData(formattedDate),
//       direction: cleanData(dir),
//       nomeval: cleanData(nomeval),
//       posteeval: cleanData(posteeval),
//       fonc: cleanData(fonc),
//       maileval: cleanData(email),
//       datedu: cleanData(datys),
//       dateau: cleanData(datyss),
//       mission: cleanData(mission),
//       libelle1: cleanData(objectifs[0]?.libelle),
//       poids1: cleanData(objectifs[0]?.poids),
//       notation1: cleanData(objectifs[0]?.notation),
//       commentaire1: cleanData(objectifs[0]?.commentaire),
//       libelle2: cleanData(objectifs[1]?.libelle),
//       poids2: cleanData(objectifs[1]?.poids),
//       notation2: cleanData(objectifs[1]?.notation),
//       commentaire2: cleanData(objectifs[1]?.commentaire),
//       libelle3: cleanData(objectifs[2]?.libelle),
//       poids3: cleanData(objectifs[2]?.poids),
//       notation3: cleanData(objectifs[2]?.notation),
//       commentaire3: cleanData(objectifs[2]?.commentaire),
//       libelle4: cleanData(objectifs[3]?.libelle),
//       poids4: cleanData(objectifs[3]?.poids),
//       notation4: cleanData(objectifs[3]?.notation),
//       commentaire4: cleanData(objectifs[3]?.commentaire),
//       res1: cleanData(resultat),
//       val1: cleanData(selectedValue1[0]),
//       val2: cleanData(selectedValue2[0]),
//       somme,
//       v1: cleanData(selectedVal1[0]),
//       v2: cleanData(selectedVal2[0]),
//       v3: cleanData(selectedVal3[0]),
//       v4: cleanData(selectedVal4[0]),
//       v5: cleanData(selectedVal5[0]),
//       v6: cleanData(selectedVal6[0]),
//       v7: cleanData(selectedVal7[0]),
//       v8: cleanData(selectedVal8[0]),
//       v9: cleanData(selectedVal9[0]),
//       v10: cleanData(selectedVal10[0]),
//       v11: cleanData(selectedVal11[0]),
//       v12: cleanData(selectedVal12[0]),
//       v13: cleanData(selectedVal13[0]),
//       v14: cleanData(selectedVal14[0]),
//       v15: cleanData(selectedVal15[0]),
//       com1: cleanData(cmt1),
//       com2: cleanData(cmt2),
//       com3: cleanData(cmt3),
//       com4: cleanData(cmt4),
//       com5: cleanData(cmt5),
//       r1: cleanData(r1, 0),
//       r2: cleanData(r2),
//       r3: cleanData(r3),
//       r4: cleanData(r4),
//       r5: cleanData(r5),
//       critere1: cleanData(cdc1),
//       critere2: cleanData(cdc2),
//       critere3: cleanData(cdc3),
//       critere4: cleanData(cdc4),
//       critere5: cleanData(cdc5),
//       nivactus: cleanData(nivactus),
//       nouvnivs: cleanData(nouvnivs),
//       conclusion: cleanData(concl),
//       ancienneteniv: cleanData(ancienneteniv),
//       comment: cleanData(com),
//       perfglob: cleanData(pg),
//       classification: cleanData(classification),
//       idr: cleanData(idr),
//       f1: cleanData(f1),
//       f2: cleanData(f2),
//       f3: cleanData(f3),
//       f4: cleanData(f4),
//       f5: cleanData(f5),
//       c1: cleanData(c1),
//       c2: cleanData(c2),
//       c3: cleanData(c3),
//       c4: cleanData(c4),
//       c5: cleanData(c5),
//       am1: cleanData(am1),
//       am2: cleanData(am2),
//       am3: cleanData(am3),
//       am4: cleanData(am4),
//       am5: cleanData(am5),
//       c21: cleanData(c21),
//       c22: cleanData(c22),
//       c23: cleanData(c23),
//       c24: cleanData(c24),
//       c25: cleanData(c25),
//       t1: cleanData(t1),
//       t2: cleanData(t2),
//       t3: cleanData(t3),
//       t4: cleanData(t4),
//       compac1: cleanData(compac1),
//       compac2: cleanData(compac2),
//       compac3: cleanData(compac3),
//       compac4: cleanData(compac4),
//       apav1: cleanData(apav1),
//       apav2: cleanData(apav2),
//       apav3: cleanData(apav3),
//       apav4: cleanData(apav4),
//       apap1: cleanData(apap1),
//       apap2: cleanData(apap2),
//       apap3: cleanData(apap3),
//       apap4: cleanData(apap4),
//       comm1: cleanData(comm1),
//       comm2: cleanData(comm2),
//       comm3: cleanData(comm3),
//       comm4: cleanData(comm4),
//       ccd1: cleanData(ccd1),
//       ccd2: cleanData(ccd2),
//       ccd3: cleanData(ccd3),
//       ccd4: cleanData(ccd4),
//       catcomp1: cleanData(catcomp1),
//       catcomp2: cleanData(catcomp2),
//       catcomp3: cleanData(catcomp3),
//       catcomp4: cleanData(catcomp4),
//       motif1: cleanData(motif1),
//       motif2: cleanData(motif2),
//       motif3: cleanData(motif3),
//       motif4: cleanData(motif4),
//       pa1: cleanData(pa1),
//       pa2: cleanData(pa2),
//       pa3: cleanData(pa3),
//       pa4: cleanData(pa4),
//       dp1: cleanData(dp1),
//       dp2: cleanData(dp2),
//       dp3: cleanData(dp3),
//       dp4: cleanData(dp4),
//       ct1: cleanData(ct1),
//       ct2: cleanData(ct2),
//       ct3: cleanData(ct3),
//       mt1: cleanData(mt1),
//       mt2: cleanData(mt2),
//       mt3: cleanData(mt3),
//       ml1: cleanData(ml1),
//       ml2: cleanData(ml2),
//       ml3: cleanData(ml3),
//       cpr1: cleanData(cpr1),
//       cpr2: cleanData(cpr2),
//       cpr3: cleanData(cpr3),
//       cg1: cleanData(cg1),
//       cg2: cleanData(cg2),
//       cg3: cleanData(cg3),
//       nomevalN2: cleanData(emailn2),
//     //  nomevalSg: cleanData(emailn2),
//       comcollab: cleanData(comcollab),
//       libelleend1: cleanData(objectifs1[0]?.libelle),
//       poidsend1: cleanData(objectifs1[0]?.poids),
//       notationend1: cleanData(objectifs1[0]?.notation),
//       commentaireend1: objectifs1[0]?.commentaire || "",
//       libelleend2: cleanData(objectifs1[1]?.libelle),
//       poidsend2: cleanData(objectifs1[1]?.poids),
//       notationend2: cleanData(objectifs1[1]?.notation),
//       commentaireend2: cleanData(objectifs1[1]?.commentaire),
//       libelleend3: cleanData(objectifs1[2]?.libelle),
//       poidsend3: cleanData(objectifs1[2]?.poids),
//       notationend3: cleanData(objectifs1[2]?.notation),
//       commentaireend3: cleanData(objectifs1[2]?.commentaire),
//       libelleend4: cleanData(objectifs1[3]?.libelle),
//       poidsend4: cleanData(objectifs1[3]?.poids),
//       notationend4: cleanData(objectifs1[3]?.notation),
//       commentaireend4: cleanData(objectifs1[3]?.commentaire),
//       clePublique: clePublique,
//       cleSecrete: clePrivee,
//       valide: false,
//       typeeval
//     };


//     const todayDate = new Date(todayis);

//     // Recherche de l'évalué existant avec les champs valide et datetoday
//     let existingEvalue = await Evalue.findOne({
//       where: { id_pers: id },
//       attributes: ['valide', 'datetoday']
//     });

//     if (existingEvalue) {
//       // Vérifier la valeur des champs "valide" et "datetoday"
//       const { valide, datetoday } = existingEvalue;
//       console.log(`Valide: ${valide}, Datetoday: ${datetoday}`);

//       if (valide === true) {
//         console.log("ato");
//         // Convertir datetoday en objet Date et ajouter 3 mois
//         const dateTodayFromDB = new Date(datetoday);
//         const threeMonthsLater = new Date(dateTodayFromDB);
//         threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

//         // Vérifier si la date actuelle est après les 3 mois suivant datetoday
//         console.log(`Today Date: ${todayDate}, Three Months Later: ${threeMonthsLater}`);
//         if (todayDate < threeMonthsLater) {
//           return res.status(400).json({ message: 'La mise à jour n\'est pas autorisée dans les 3 mois suivant la validation.' });
//         }
//       }

//       // Si valide est false ou la date actuelle est au-delà des 3 mois suivant datetoday, procéder à la mise à jour
//       let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
//       if (existingEvaluateur) {
//         await Evalue.update(evaluationData, { where: { id_pers: id } });
//         await Evaluateur.update({ nomeval, fonc, maileval: email }, { where: { maileval: email } });
//         return res.status(200).json({ message: 'Mise à jour réussie.' });
//       } else {
//         return res.status(404).json({ message: 'Evaluateur non trouvé.' });
//       }
//     } else {
//       // Si l'évalué n'existe pas
//       let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
//       if (!existingEvaluateur) {
//         // Création de l'évaluateur s'il n'existe pas
//         await Evaluateur.create({ nomeval, fonc, maileval: email });
//       }
//       // Création de l'évalué
//       await Evalue.create(evaluationData);
//       return res.status(200).json({ message: 'Enregistrement réussi.' });
//     }
//   } catch (error) {
//     console.error('Erreur lors de l\'enregistrement :', error);
//     res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
//   }
// };









const enregistrement = async (req, res) => {
  const id = req.params.ids;
  const todayis = req.body.todayis;
  const typeeval = 'Evaluation cadre';
  // Conversion de la chaîne de caractères en objet Date
  const dateObject = new Date(todayis);
  const formattedDate = `${dateObject.getFullYear()}-${String(dateObject.getMonth() + 1).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}`;

  // Fonction pour nettoyer les données en remplaçant les valeurs indéfinies par des valeurs par défaut
  const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);

  try {
    const { clePublique, clePrivee } = genererClesRSA();

    // Extraction et nettoyage des données du corps de la requête
    const {
      nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission, objectifs = [],
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
      objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn2 = '', emailSg = ''
    } = req.body;


    // Préparer les données d'évaluation
    const evaluationData = {
      id_pers: id,
      alp1, alp2,
      nom: cleanData(nom),
      prenom: cleanData(prenom),
      mat: cleanData(mat),
      dateentree: cleanData(daty),
      datetoday: cleanData(formattedDate),
      direction: cleanData(dir),
      nomeval: cleanData(nomeval),
      posteeval: cleanData(posteeval),
      fonc: cleanData(fonc),
      maileval: cleanData(email),
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
      somme,
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
      r1: cleanData(r1, 0),
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
      f5: cleanData(f5),
      c1: cleanData(c1),
      c2: cleanData(c2),
      c3: cleanData(c3),
      c4: cleanData(c4),
      c5: cleanData(c5),
      am1: cleanData(am1),
      am2: cleanData(am2),
      am3: cleanData(am3),
      am4: cleanData(am4),
      am5: cleanData(am5),
      c21: cleanData(c21),
      c22: cleanData(c22),
      c23: cleanData(c23),
      c24: cleanData(c24),
      c25: cleanData(c25),
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
      nomevalN2: cleanData(emailn2),
      nomevalSg: cleanData(emailSg),
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
      clePublique: clePublique,
      cleSecrete: clePrivee,
      typeeval: 'Evaluation cadre'
    };



    // Recherche de l'évalué existant avec les champs valide, valideN2 et valideSg
    let existingEvalue = await Evalue.findOne({ where: { id_pers: id } });
    let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
    if (existingEvalue) {
      console.log("ok");
      // Mettre à jour les données en fonction des conditions spécifiées
      if (existingEvalue.valide === false || existingEvalue.valide === 0) {
        // Mettre à jour les données
        await Evalue.update(evaluationData, { where: { id_pers: id } });
        if (existingEvaluateur) {
          console.log("2");
          await Evaluateur.update({ nomeval, fonc, maileval: email }, { where: { maileval: email } });
        }
        return res.status(200).json({ message: 'Données mises à jour avec succès.' });
      } else if (existingEvalue.valide === true && existingEvalue.valideN2 === false && existingEvalue.nomevalN2 === emailn2) {
        console.log("3");

        await Evalue.update(evaluationData, { where: { id_pers: id } });
        return res.status(200).json({ message: ' mis à jour avec succès.' });
      } else if (existingEvalue.valide === true && existingEvalue.valideN2 === false && existingEvalue.nomevalN2 === emailn2) {
        console.log("automatisme");

        await Evalue.update(evaluationData, { where: { id_pers: id } });
        return res.status(200).json({ message: ' mis à jour avec succès.' });
      } else if (existingEvalue.valideN2 === true && existingEvalue.valideSg === false && existingEvalue.nomevalSg === email) {
        console.log("4");

        await Evalue.update(evaluationData, { where: { id_pers: id } });
        return res.status(200).json({ message: ' mis à jour avec succès.' });
      } else {
        return res.status(400).json({ message: 'Evaluation déjà valiider par votre N+1; impossible de modfier' });
      }
    } else {

      if (!existingEvaluateur) {
        // Création de l'évaluateur s'il n'existe pas
        await Evaluateur.create({ nomeval, fonc, maileval: email });
      }
      // Création de l'évalué
      await Evalue.create(evaluationData);
      return res.status(200).json({ message: 'Enregistrement réussi.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
  }
};




//evaluation non cadre
const enregistrementnoncadre = async (req, res) => {
  const id = req.params.ids;
  const typeeval = 'Evaluation non cadre';
  const todayis = req.body.todayis;
  // Conversion de la chaîne de caractères en objet Date
  const dateObject = new Date(todayis);

  // Obtenir des parties spécifiques de la date et les formater
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Ajouter un zéro si le mois est inférieur à 10
  const day = String(dateObject.getDate()).padStart(2, '0'); // Ajouter un zéro si le jour est inférieur à 10

  const formattedDate = `${year}-${month}-${day}`;

  const {
    nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission, objectifs = [],
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
    objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '',
  } = req.body;

  // Clean up the data by replacing undefined with default values
  const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);

  try {
    const { clePublique, clePrivee } = genererClesRSA();

    let evaluationData = {
      id_pers: id,
      alp1,
      alp2,
      nom: cleanData(nom),
      prenom: cleanData(prenom),
      mat: cleanData(mat),
      dateentree: cleanData(daty),
      datetoday: cleanData(formattedDate),
      direction: cleanData(dir),
      nomeval: cleanData(nomeval),
      posteeval: cleanData(posteeval),
      fonc: cleanData(fonc),
      maileval: cleanData(email),
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
      somme,
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
      r1: cleanData(r1, 0),
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
      f5: cleanData(f5),
      c1: cleanData(c1),
      c2: cleanData(c2),
      c3: cleanData(c3),
      c4: cleanData(c4),
      c5: cleanData(c5),
      am1: cleanData(am1),
      am2: cleanData(am2),
      am3: cleanData(am3),
      am4: cleanData(am4),
      am5: cleanData(am5),
      c21: cleanData(c21),
      c22: cleanData(c22),
      c23: cleanData(c23),
      c24: cleanData(c24),
      c25: cleanData(c25),
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
      commentaireend1: objectifs1[0]?.commentaire || "",
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
      clePublique: clePublique,
      cleSecrete: clePrivee,
      valide: false,
      typeeval
    };


    const todayDate = new Date(todayis);

    // Recherche de l'évalué existant avec les champs valide et datetoday
    let existingEvalue = await Evalue.findOne({
      where: { id_pers: id },
      attributes: ['valide', 'datetoday']
    });

    if (existingEvalue) {
      // Vérifier la valeur des champs "valide" et "datetoday"
      const { valide, datetoday } = existingEvalue;
      console.log(`Valide: ${valide}, Datetoday: ${datetoday}`);

      if (valide === true) {
        console.log("ato");
        // Convertir datetoday en objet Date et ajouter 3 mois
        const dateTodayFromDB = new Date(datetoday);
        const threeMonthsLater = new Date(dateTodayFromDB);
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

        // Vérifier si la date actuelle est après les 3 mois suivant datetoday
        console.log(`Today Date: ${todayDate}, Three Months Later: ${threeMonthsLater}`);
        if (todayDate < threeMonthsLater) {
          return res.status(400).json({ message: 'La mise à jour n\'est pas autorisée dans les 3 mois suivant la validation.' });
        }
      }

      // Si valide est false ou la date actuelle est au-delà des 3 mois suivant datetoday, procéder à la mise à jour
      let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
      if (existingEvaluateur) {
        await Evalue.update(evaluationData, { where: { id_pers: id } });
        await Evaluateur.update({ nomeval, fonc, maileval: email }, { where: { maileval: email } });
        return res.status(200).json({ message: 'Mise à jour réussie.' });
      } else {
        return res.status(404).json({ message: 'Evaluateur non trouvé.' });
      }
    } else {
      // Si l'évalué n'existe pas
      let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
      if (!existingEvaluateur) {
        // Création de l'évaluateur s'il n'existe pas
        await Evaluateur.create({ nomeval, fonc, maileval: email });
      }
      // Création de l'évalué
      await Evalue.create(evaluationData);
      return res.status(200).json({ message: 'Enregistrement réussi.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
  }
};



//evaluation non cadre
const enregistrementevalcadrenonmanager = async (req, res) => {
  const id = req.params.ids;
  const typeeval = 'Evaluation cadre non manager';
  const todayis = req.body.todayis;
  // Conversion de la chaîne de caractères en objet Date
  const dateObject = new Date(todayis);

  // Obtenir des parties spécifiques de la date et les formater
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Ajouter un zéro si le mois est inférieur à 10
  const day = String(dateObject.getDate()).padStart(2, '0'); // Ajouter un zéro si le jour est inférieur à 10

  const formattedDate = `${year}-${month}-${day}`;

  const {
    nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission, objectifs = [],
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
    objectifs1 = [], alp1 = '', alp2 = '', f5 = '', c5 = '', am5 = '', c25 = '', emailn1, emailn2, emaildr, emailsg, emaildg, emaildrh,
  } = req.body;

  // Clean up the data by replacing undefined with default values
  const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);

  try {
    const { clePublique, clePrivee } = genererClesRSA();

    let evaluationData = {
      id_pers: id,
      alp1,
      alp2,
      nom: cleanData(nom),
      prenom: cleanData(prenom),
      mat: cleanData(mat),
      dateentree: cleanData(daty),
      datetoday: cleanData(formattedDate),
      direction: cleanData(dir),
      nomeval: cleanData(nomeval),
      posteeval: cleanData(posteeval),
      fonc: cleanData(fonc),
      maileval: cleanData(email),
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
      somme,
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
      r1: cleanData(r1, 0),
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
      f5: cleanData(f5),
      c1: cleanData(c1),
      c2: cleanData(c2),
      c3: cleanData(c3),
      c4: cleanData(c4),
      c5: cleanData(c5),
      am1: cleanData(am1),
      am2: cleanData(am2),
      am3: cleanData(am3),
      am4: cleanData(am4),
      am5: cleanData(am5),
      c21: cleanData(c21),
      c22: cleanData(c22),
      c23: cleanData(c23),
      c24: cleanData(c24),
      c25: cleanData(c25),
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
      commentaireend1: objectifs1[0]?.commentaire || "",
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
      clePublique: clePublique,
      cleSecrete: clePrivee,
      valide: false,
      typeeval
    };


    const todayDate = new Date(todayis);

    // Recherche de l'évalué existant avec les champs valide et datetoday
    let existingEvalue = await Evalue.findOne({
      where: { id_pers: id },
      attributes: ['valide', 'datetoday']
    });

    if (existingEvalue) {
      // Vérifier la valeur des champs "valide" et "datetoday"
      const { valide, datetoday } = existingEvalue;
      console.log(`Valide: ${valide}, Datetoday: ${datetoday}`);

      if (valide === true) {
        console.log("ato");
        // Convertir datetoday en objet Date et ajouter 3 mois
        const dateTodayFromDB = new Date(datetoday);
        const threeMonthsLater = new Date(dateTodayFromDB);
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

        // Vérifier si la date actuelle est après les 3 mois suivant datetoday
        console.log(`Today Date: ${todayDate}, Three Months Later: ${threeMonthsLater}`);
        if (todayDate < threeMonthsLater) {
          return res.status(400).json({ message: 'La mise à jour n\'est pas autorisée dans les 3 mois suivant la validation.' });
        }
      }

      // Si valide est false ou la date actuelle est au-delà des 3 mois suivant datetoday, procéder à la mise à jour
      let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
      if (existingEvaluateur) {
        await Evalue.update(evaluationData, { where: { id_pers: id } });
        await Evaluateur.update({ nomeval, fonc, maileval: email }, { where: { maileval: email } });
        return res.status(200).json({ message: 'Mise à jour réussie.' });
      } else {
        return res.status(404).json({ message: 'Evaluateur non trouvé.' });
      }
    } else {
      // Si l'évalué n'existe pas
      let existingEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
      if (!existingEvaluateur) {
        // Création de l'évaluateur s'il n'existe pas
        await Evaluateur.create({ nomeval, fonc, maileval: email });
      }
      // Création de l'évalué
      await Evalue.create(evaluationData);
      return res.status(200).json({ message: 'Enregistrement réussi.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
  }
};



const enregistrementvalide = async (req, res) => {
  const id = req.params.ids;
  console.log(req.body.fonc);
  const typeeval = 'Evaluation cadre'
  const {
    nom, prenom, mat, daty, dir, nomeval, posteeval, fonc, email, datys, datyss, mission, objectifs = [],
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
    cpr1 = '', cpr2 = '', cpr3 = '', cg1 = '', cg2 = '', cg3 = '', comcollab = '',
    objectifs1 = []
  } = req.body;

  // Clean up the data by replacing undefined with default values
  const cleanData = (data, defaultValue = '') => (data !== undefined ? data : defaultValue);

  try {
    const { clePublique, clePrivee } = genererClesRSA();

    // Vérifiez si l'évaluateur existe déjà par email
    let evaluateur = await Evaluateur.findOne({ where: { maileval: email } });

    if (!evaluateur) {
      // Insérer l'évaluateur s'il n'existe pas
      evaluateur = await Evaluateur.create({ nomeval, fonc, maileval: email });
    }

    // Préparer les données pour l'insertion ou la mise à jour
    let evaluationData = {
      id_pers: id,
      nom: cleanData(nom),
      prenom: cleanData(prenom),
      mat: cleanData(mat),
      dateentree: cleanData(daty),
      direction: cleanData(dir),
      nomeval: cleanData(nomeval),
      posteeval: cleanData(posteeval),
      fonc: cleanData(fonc),
      maileval: cleanData(email),
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
      r1: cleanData(r1, 0),
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
      commentaireend1: objectifs1[0]?.commentaire || "",
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
      clePublique: clePublique,
      cleSecrete: clePrivee,
      valide: false,
      typeeval
    };

    // Vérifier si l'enregistrement existe
    let evaluation = await Evalue.findOne({ where: { id_pers: id } });

    if (evaluation) {
      // Mise à jour de l'évaluateur si le maileval a changé
      if (evaluation.maileval !== email) {
        let newEvaluateur = await Evaluateur.findOne({ where: { maileval: email } });
        if (!newEvaluateur) {
          newEvaluateur = await Evaluateur.create({ nomeval, fonc, maileval: email });
        }
        evaluationData.nomeval = newEvaluateur.nomeval;
        evaluationData.fonc = newEvaluateur.fonc;
        evaluationData.maileval = newEvaluateur.maileval;
      }

      // Mise à jour de l'enregistrement existant
      await Evalue.update(evaluationData, { where: { id_pers: id } });
      res.status(200).json({ message: 'Mise à jour réussie.' });
    } else {
      // Insérer un nouvel enregistrement
      await Evalue.create(evaluationData);
      res.status(200).json({ message: 'Enregistrement réussi.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
  }
};










const fetchpbxdata = async (req, res) => {
  try {
    const fetchpbxdata = await PbxData.findAll()
    res.send(fetchpbxdata)
  } catch (error) {
    console.log(error);
  }

}


const fetchfix = async (req, res) => {
  try {
    const fetchfix = await Phonebook.findAll({
      attributes: ['nom', 'tel'] // Mettre les attributs entre parenthèses et les séparer par des virgules
    });
    console.log(fetchfix);
    res.send(fetchfix);
  } catch (error) {
    console.log(error);
    res.status(500).send('Une erreur s\'est produite lors de la récupération des données.');
  }
}


const getgataeva = async (req, res) => {
  const mails = req.params.loggedInUser;

  // Vérification de l'existence de loggedInUser
  if (!mails) {
    return res.status(400).send('Bad Request: Missing loggedInUser parameter');
  }

  console.log('test:', mails);

  try {
    const getgataeva = await Evalue.findAll({

      where: {
        [Op.or]: [
          {
            [Op.and]: [
              { nomevalN2: mails },
              { valideN2: 0 },
              { valide: 1 }
            ]
          },
          {
            [Op.and]: [
              { nomevalSg: mails },
              { valideN2: 1 },
              { valideSg: 0 }
            ]
          },
          {
            [Op.and]: [
              { maileval: mails },
              { valide: 0 }
            ]
          }
        ]
      },
      order: [['id', 'DESC']], // Ordre décroissant par ID
    });

    res.json(getgataeva);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

//validation d'evauation

const validerEvaluation = async (req, res) => {
  const { id } = req.params;
  const mail = req.body.loggedInUser;

  try {
    // Rechercher l'évaluation par ID
    const evaluation = await Evalue.findOne({ where: { id_pers: id } });
    if (!evaluation) {
      return res.status(404).json({ message: 'Évaluation non trouvée.' });
    }

    // Mettre à jour les champs appropriés en fonction de l'email
    let updateFields = {};

    if (mail === evaluation.maileval) {
      console.log("validation n+1");
      console.log(evaluation.maileval);
      console.log(mail);
      updateFields.valide = true;
    } else if (mail === evaluation.nomevalN2) {
      console.log("validation n+2");
      updateFields.valideN2 = true;
    } else if (mail === evaluation.nomevalDr) {
      console.log("validation directeur de rattachement");
      updateFields.valideDr = true;
    } else if (mail === evaluation.nomevalSg) {
      console.log("validation Sg");
      updateFields.valideSg = true;
    } else if (mail === evaluation.nomevalDg) {
      console.log("validation DG");
      updateFields.valideDg = true;
    }
    else if (mail === evaluation.nomevalDrh) {
      console.log("validation drh");
      updateFields.valideDrh = true;
    } else {
      return res.status(400).json({ message: 'L\'email ne correspond à aucun évaluateur autorisé.' });
    }

    // Mettre à jour l'évaluation
    await Evalue.update(updateFields, { where: { id_pers: id } });

    return res.status(200).json({ message: 'Évaluation validée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la validation de l\'évaluation :', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};



const fetchevaldata = async (req, res) => {
  try {
    const fetchevaldata = await Evalue.findAll()
    res.send(fetchevaldata)
  } catch (error) {
    console.log(error);
  }
}


const fetchBirthdays = async (req, res) => {
  const today = req.params.today;
  console.log('Date reçue :', today);

  // Vérification du format de la date (par exemple, 'YYYY-MM-DD')
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(today)) {
    return res.status(400).send('Format de date invalide. Utilisez YYYY-MM-DD.');
  }

  // Extraction du mois et du jour
  const [year, month, day] = today.split('-');

  try {
    const birthdays = await Annuaire.findAll({
      where: Sequelize.and(
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('annif')), month),
        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('annif')), day)
      )
    });

    if (birthdays.length === 0) {
      return res.status(404).json({ message: 'Aucun anniversaire trouvé pour cette date.' });
    }

    res.status(200).json(birthdays);
  } catch (error) {
    console.error('Error fetching birthdays:', error);
    res.status(500).send('Internal Server Error');
  }
};


const getimg = async (req, res) => {
  const userEmail = req.query.user; // Utilisation de req.query pour récupérer le paramètre d'URL
  console.log(userEmail);

  if (!userEmail) {
    return res.status(400).json({ error: 'Email de l\'utilisateur est manquant dans la requête' });
  }

  try {
    const user = await Annuaire.findOne({
      where: { mail: userEmail }
    });

    if (user) {
      res.json({ imgUrl: user.imageUrl }); // Supposons que `imgUrl` est la colonne qui stocke l'URL de l'image
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



const getPhoneBookEntries = async (req, res) => {
  const client = ldap.createClient({
    url: 'ldap://172.16.1.19:389',
    timeout: 30000, // 30 secondes
    connectTimeout: 30000 // 30 secondes
  });

  const phoneBookEntries = []; // Tableau pour stocker les entrées du PHONEBOOK

  // Gestionnaire d'erreurs global pour le client LDAP
  client.on('error', (err) => {
    console.error('Erreur du client LDAP:', err);
    res.status(500).send({ error: 'Impossible de se connecter au serveur LDAP' });
  });

  client.bind('administrateur@npakadin.mg', 'P4$$w0rdNPAroot753951/*-+', (err) => {
    if (err) {
      console.error('Erreur de liaison (bind):', err);
      res.status(500).send({ error: 'Échec de la liaison (bind)' });
      return;
    }

    const opts = {
      scope: 'sub', // Recherche dans l'OU spécifié et ses sous-unités
      attributes: ['cn', 'homePhone'] // Spécifiez les attributs à récupérer
    };

    client.search('OU=PHONEBOOK,DC=npakadin,DC=mg', opts, (err, ldapRes) => {
      if (err) {
        console.error('Erreur de recherche:', err);
        res.status(500).send({ error: 'Échec de la recherche' });
        return;
      }

      ldapRes.on('searchEntry', (entry) => {

        const result = {
          cn: entry.attributes.find(attr => attr.type === 'cn')?.values[0] || 'Non défini',
          homePhone: entry.attributes.find(attr => attr.type === 'homePhone')?.values[0] || 'Non défini'
        };



        phoneBookEntries.push(result); // Ajout au tableau des résultats
      });

      ldapRes.on('searchReference', (referral) => {
        console.log('Référence de recherche:', referral.uris.join());
      });

      ldapRes.on('error', (err) => {
        console.error('Erreur lors de la recherche:', err.message);
        res.status(500).send({ error: err.message });
      });

      ldapRes.on('end', (result) => {

        console.log('Entrées collectées:', phoneBookEntries);

        client.unbind();

        // Envoi des résultats au client
        res.status(200).send({ success: true, phoneBookEntries });
      });
    });
  });
};

// controller.js

const selectPhone = async (req, res) => {
  console.log('Requête reçue avec fixe :', req.params.fixe);  // Log pour vérifier la valeur reçue

  const { fixe } = req.params;
  if (!fixe) {
    console.log('Numéro de téléphone non fourni');
    return res.status(400).json({ error: 'Numéro de téléphone non fourni' });
  }

  try {
    const result = await Annuaire.findAll({
      where: { fixe: fixe }  // Utilisation correcte de Sequelize pour la condition WHERE
    });

    res.json(result);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


const getDirectoryContents = (req, res) => {
  const networkPath = 'C:\\Users\\rakotobe.marco\\OneDrive - NP AKADIN\\Marco RAKOTOBE\\Bureau\\intranetnew';

  console.log('Chemin :', networkPath);

  fs.readdir(networkPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du répertoire :', err);
      return res.status(500).json({ message: 'Erreur lors de la lecture du répertoire', error: err });
    }

    const fileList = files.map((file) => ({
      name: file.name,
      isDirectory: file.isDirectory(),
    }));
    console.log('Fichiers trouvés :', fileList);
    res.json(fileList);
  });
};



const getGecosEntries = async (req, res) => {


  const client = ldap.createClient({
    url: 'ldap://172.16.1.19:389',
    timeout: 30000,
    connectTimeout: 30000
  });

  client.on('error', (err) => {
    console.error('Erreur du client LDAP:', err);
    res.status(500).send({ error: 'Impossible de se connecter au serveur LDAP' });
  });

  client.bind('administrateur@npakadin.mg', 'P4$$w0rdNPAroot753951/*-+', (err) => {
    if (err) {
      console.error('Erreur de liaison (bind):', err);
      res.status(500).send({ error: 'Échec de la liaison (bind)' });
      return;
    }

    const opts = {
      filter: `(mail=${req.body.loggedInUser})`, // Insère dynamiquement l'email de l'utilisateur connecté
      scope: 'sub',
      attributes: ['gecos'] // Spécifiez les attributs à récupérer (ici 'gecos')
    };

    client.search('DC=npakadin,DC=mg', opts, (err, ldapRes) => {
      if (err) {
        console.error('Erreur de recherche:', err);
        res.status(500).send({ error: 'Échec de la recherche' });
        return;
      }

      let gecosValue = null;

      ldapRes.on('searchEntry', (entry) => {
        gecosValue = entry.attributes.find(attr => attr.type === 'gecos')?.values[0] || 'Non défini';
      });

      ldapRes.on('error', (err) => {
        console.error('Erreur lors de la recherche:', err.message);
        res.status(500).send({ error: err.message });
      });

      ldapRes.on('end', (result) => {
        client.unbind();

        if (gecosValue) {
          res.status(200).send({ success: true, gecos: gecosValue });
        } else {
          res.status(404).send({ error: 'Utilisateur non trouvé ou attribut gecos non défini' });
        }
      });
    });
  });
};





module.exports = { getGecosEntries, getDirectoryContents, selectPhone, getPhoneBookEntries, getAlldataevaluationnonmanager, getAlldataevaluationnoncadre, enregistrementevalcadrenonmanager, enregistrementnoncadre, getimg, fetchBirthdays, getEmails, fetchevaldata, validerEvaluation, enregistrementvalide, getdatabyid, getgataeva, fetchfix, fetchpbxdata, enregistrement, getAlldataevaluation, recupesups, recupesis, recupesrvgs, recuperhs, recupemks, recupehsses, recupecias, recupenbrassdir, recupenbraf, recupstd, Makafichiercia, directorytree, UploadImages, recupnpakadin, recupspider, recupstta, recupguilmann, recupakadin, profils, getallcomment, sendComment, selectPoste, selectDep, profil, UploadImageannuaire, deleteannuaire, updateannuaire, recupeannuaire, addannuaire, namecia, updatedcia, recupecia, UploadImagecia, Enregitrermedia, Makafichierassistdir, Makafichierdaf, Makafichierrh, Makafichiersupply, Makafichierdsi, Ressmktc, makafichierhsse, nomassistdir, makamediaentrep, makamediacollab, confirmersuppression, valider, autoriser, autoriseradmin, autorisersuperadmin, deletedir, validermodifications, getAlluserliste, getdirsoc, ajouterdirsoc, UploadImagedirsoc, nomdethssee, nomdethse, nomtour, supprarticle, manovaarticle, confsupprimerad, confsupprimercia, updatedataad, confsupprimeraf, updatedataaf, confsupprimerrh, updatedatarh, confsupprimersupply, updatedatasupply, confsupprimermark, updatedatamark, confsupprimerhsse, updatedatahsse, updatedataservg, confsupprimerservg, suppridselected, updatedatas, supprimerPersonnes, updatedata, confsupprimer, modifperso, envoyermess, makamessjiaby, fetchAll, ajouterad, ajoutercia, recupead, UploadImagead, recupeaf, ajouteraf, UploadImageaf, recuperh, ajouterrh, UploadImagerh, recupesupply, ajoutersupply, UploadImagesupply, recupesi, UploadImagesi, ajoutersi, recupemark, UploadImagemark, ajoutermark, recupehsse, ajouterhsse, UploadImagehsse, recupeservig, UploadImageserviceg, ajouterservig, getVideos, getImage, getdir, ajouterdir, insrciptionIntra, login, UploadImage, Enregitrermediact, makamedia, makafichier, ajoutercontact, getcontact, deleteuser, modif, nomsg, ajouterPersonne, modifmedia, afficherPersonne, supprimerPersonne, UploadImage2, nomsg, nomrsg, ajouterPersonnes, nomvert, nomdhsse, nommark, nomdsi, nomsupply, nomsdrh, nomdaf, nomdhssev, nommarkv, nomdsiv, nomsupplyv, nomdrhv, nomdafv, contintinvs, deleteMedia, getAlldataevaluation1 };
