
const express = require('express');
const mongoose = require('mongoose');
const Sauce = require('./models/SauceModel');

const app = express(); 

mongoose.connect('mongodb+srv://OCLP6:testmdp@clusterp6.82nvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//  transforme données en json
  app.use(express.json());
// requetes post
  
// export de l'app pour qu'autre fichiers du projet puissent y accéder dt serveur node
module.exports = app;
