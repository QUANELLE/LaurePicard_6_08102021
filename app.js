"use strict";
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const sauceRoute = require('./routes/SauceRoute');
const userRoute = require('./routes/UserRoute');


mongoose.connect('mongodb+srv://OCLP6:testmdp@clusterp6.82nvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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



app.use('/api/auth', userRoute);

app.use('/api/sauces', sauceRoute);



// export de l'app pour qu'autres fichiers du projet puissent y accéder dt serveur node
module.exports = app;
