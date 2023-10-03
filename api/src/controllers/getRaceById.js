const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/'
const URL_2 = 'https://cdn2.thedogapi.com/images';
const { API_KEY } = process.env;
const { Dog, Temperaments } = require('../db')

const getRaceById = async (req, res) => {

    //extrae el id de la url
const { idRaza } = req.params;


try {
    //busca el perro que tenga ese id
    let response2 = await Dog.findOne({
        where: { id: idRaza },
        //incluye los temperamentos traidos de la tabla intermedia
        include: [
            {
                model: Temperaments,
                attributes: ["nombre"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    //si existia un perro con ese id en la base de datos, lo envia
    if (response2) {
        res.status(201).send(response2);
    }
    //si no existia, lo busca en la api
    else {
        let { data } = await axios(`${URL}${idRaza}?api_key=${API_KEY}`)

        //chequeo de la extension de la imagen del perro guardada en la api
        if (data) {
            let extension
            if (data.id === 15 || data.id === 125 || data.id === 212) {
                extension = 'png';
            } else {
                extension = 'jpg';
            }
            data.reference_image_id = `${URL_2}/${data.reference_image_id}.${extension}`
            //se envia el perro de la api
            res.status(200).send(data);
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