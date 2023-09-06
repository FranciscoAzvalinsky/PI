const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
//search?q='
const { API_KEY } = process.env;
const { Dog } = require('../db')
const stringToArray = require('./stringToArray');
const orderArray = require('./orderArray');


const getTemperaments = async (req, res) => {
    try {
        let everything = [];
        everything = await axios(`${URL}?api_key=${API_KEY}`)
        //console.log(everything.data);
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
        temperaments=orderArray(temperaments);
        res.status(200).json(temperaments);
    } catch (error) {
        console.log(error);
        res.status(500).json('Error: ' + error.message)
    }
}

module.exports = getTemperaments;