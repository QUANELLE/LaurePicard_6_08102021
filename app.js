
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
  app.post('/api/nom', (req, res, next)=> {
    delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
next();
  });

// objets "sortants" ds api
app.use('/api/nom',(req, res, next)=>{
  
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error })); 
   
});
// export de l'app pour qu'autre fichiers du projet puissent y accéder dt serveur node
module.exports = app;
