const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/SauceController');



router.post('/api/sauces', sauceCtrl.createSauce);
router.post('/api/sauces/:id/like', sauceCtrl.createLikeSauce);


router.get('/api/sauces',sauceCtrl.getAllSauces);
router.delete('/api/sauces/:id',sauceCtrl.deleteSauce);
router.put('/api/sauces/:id',sauceCtrl.modifySauce);
router.get('/api/sauces/:id',sauceCtrl.getOneSauce);