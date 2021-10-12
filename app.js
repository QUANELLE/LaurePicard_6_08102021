// importer express et body-parser
const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

// déf de l'appli express
const app = express();

mongoose.connect('mongodb+srv://OCLP6:testmdp@clusterp6.82nvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//  headers pour donner permissions aux requêtes vers API; s'applique à toutes les routes
app.use((req, res, next) => {
    // accéder à l'API depuis n'importe quelle origine (ports différents)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'envoyer requêtes av méthoddes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//  transforme données en json
  app.use(bodyParser.json());
// requetes post
  app.post('/api/nom', (req, res, next)=> {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
next();
  });

// objets "sortants" ds api
app.use('/api/nom',(req, res, next)=>{
    const nomApi = [
        {
            objet:1
        },
        {
            objet: 2
        }
    ]
    next();
});
// export de l'app pour qu'autre fichiers du projet puissent y accéder dt serveur node
module.exports = app;
