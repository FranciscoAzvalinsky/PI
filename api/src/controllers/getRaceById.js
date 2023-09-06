const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/'
const { API_KEY } = process.env;
const { Dog } = require('../db')

const getRaceById = async (req, res) => {
const { idRaza } = req.params;
try {
    let response2 = await Dog.findOne({where: {id: idRaza}});
    if (response2) {
        res.status(201).send(response2);
    }
    else {
        let response = await axios(`${URL}${idRaza}?api_key=${API_KEY}`)
        if (response) {
            console.log(response);
            res.status(200).send(response.data);
        }
        else {
            res.status(404).json('No se ha encontrado ninguna raza con esa ID');
        }
    }
} catch (error) {
    res.status(500).json('Error: ' + error.message);
}

}


module.exports = getRaceById;