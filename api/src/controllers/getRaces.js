const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds';
const URL_2 = 'https://cdn2.thedogapi.com/images';
const { API_KEY } = process.env 

const getRaces = async (req, res) => {
    try {
        let extension;

        let { data } = await axios(`${URL}?api_key=${API_KEY}`);
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
            res.status(404).json('Error: ' + response)
        }
        
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
}

module.exports = getRaces;