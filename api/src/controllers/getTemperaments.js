const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
const { API_KEY } = process.env;
const { Temperaments } = require('../db')
const stringToArray = require('./stringToArray');
//const orderArray = require('./orderArray');


const getTemperaments = async (req, res) => {
    try {
        let everything = [];
        everything = await axios(`${URL}?api_key=${API_KEY}`)
        let temperaments = [];
        everything.data.forEach(race => {
            if (race.temperament) {
                let raceArray = stringToArray(race.temperament)
                raceArray.forEach(temper => {
                    if (!temperaments.includes(temper)){
                        temperaments.push(temper);
                    }
                })
            }
        });
        //temperaments=orderArray(temperaments);
        temperaments.forEach((temper) => {
            Temperaments.findOrCreate({where: {nombre: temper}});
        })
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(500).json('Error: ' + error.message)
    }
}

module.exports = getTemperaments;