const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/search?q='
const { API_KEY } = process.env;
const { Dog } = require('../db')


const postDog = async (req, res) => {
    try {
        let dog = req.body; 
        const race = await Dog.create(dog);
        
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