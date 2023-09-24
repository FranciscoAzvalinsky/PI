const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/search?q='
const { API_KEY } = process.env;
const { Dog } = require('../db')
const { Temperaments } = require('../db')
const stringToArray = require('./stringToArray')


const postDog = async (req, res) => {
    try {
        let dog = req.body;
        const race = await Dog.create(dog);
        let tempers = dog.temperament;
        //tempers=stringToArray(tempers);
        //console.log(tempers);


        tempers.forEach(async (temper) => {
            let iden = await Temperaments.findOne({where: {nombre: temper}});
            if (iden) {
                await race.addTemperaments(iden.id);
            }
            
        })
        
        if (race){
            res.status(200).json(race);
        }
        else {
            res.status(401).send('Ya se encuentra registrado')
        }
    } catch (error) {
        res.status(500).json('Error: ' + error.message)
    }
    

}

module.exports = postDog;