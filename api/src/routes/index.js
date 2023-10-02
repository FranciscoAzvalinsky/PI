const express = require('express');
const router = express.Router();

const getRaces = require ('../controllers/getRaces')
const getRaceById = require ('../controllers/getRaceById')
const getRaceByName = require ('../controllers/getRaceByName')
const postDog = require ('../controllers/postDog')
const getTemperaments = require ('../controllers/getTemperaments')

router.get('/dogs', getRaces)
router.get('/dogs/name?', getRaceByName)
router.get('/dogs/:idRaza', getRaceById)
router.post('/dogs', postDog)
router.get('/temperaments', getTemperaments)

module.exports = router;
