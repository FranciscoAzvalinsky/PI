const express = require('express');
const router = express.Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getRaces = require ('../controllers/getRaces')
const getRaceById = require ('../controllers/getRaceById')
const getRaceByName = require ('../controllers/getRaceByName')
const postDog = require ('../controllers/postDog')
const getTemperaments = require ('../controllers/getTemperaments')

//https://api.thedogapi.com/v1/breeds
//https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getRaces)
router.get('/dogs/name?', getRaceByName)
router.get('/dogs/:idRaza', getRaceById)
router.post('/dogs', postDog)
router.get('/temperaments', getTemperaments)

module.exports = router;
