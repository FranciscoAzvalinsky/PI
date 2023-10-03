const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/search?q='
const URL_2 = 'https://cdn2.thedogapi.com/images';
const { Dog } = require('../db')
const { Op } = require('sequelize');


const getRaceByName = async (req, res) => {

    //se extrae el name del query
    let { name } = req.query;
    
    try {
        //busca en la base de datos perros que contengan ese nombre
        let response2 = Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        let { data } = await axios(`${URL}${name}`)
        //busca en la api perros que contengan ese nombre
        if (data) {
             data.forEach( dog => {
                if (dog.id === 15 || dog.id === 125 || dog.id === 212) {
                    extension = 'png';
                } else {
                    extension = 'jpg';
                }
                 dog.reference_image_id = `${URL_2}/${dog.reference_image_id}.${extension}`
            })
            //envia la union de ambas busquedas
            res.status(200).json(data.concat(response2.data));
        }
        else {
            res.status(403).json('No se ha encontrado ninguna raza con ese nombre')
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Error: ' + error.message)
    }
}

module.exports = getRaceByName;