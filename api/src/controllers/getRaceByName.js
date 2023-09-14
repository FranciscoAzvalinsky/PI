const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/search?q='
const URL_2 = 'https://cdn2.thedogapi.com/images';
const { API_KEY } = process.env;
const { Dog } = require('../db')
const { Op } = require('sequelize');


const getRaceByName = async (req, res) => {
    let { name } = req.query;
    try {
        let response2 = Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        if (response2.data) {
            res.status(201).json(response2.data);
        } else {
            let { data } = await axios(`${URL}${name}`)
            if (data) {
                data.forEach( dog => {
                    if (dog.id === 15 || dog.id === 125 || dog.id === 212) {
                        extension = 'png';
                    } else {
                        extension = 'jpg';
                    }
                    dog.reference_image_id = `${URL_2}/${dog.reference_image_id}.${extension}`
                })
                res.status(200).json(data);
            }
            else {
                res.status(403).json('No se ha encontrado ninguna raza con ese nombre')
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error: ' + error.message)
    }
}

module.exports = getRaceByName;