const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
const { API_KEY } = process.env 

const getRaces = async (req, res) => {
    try {
        let response = await axios(`${URL}?api_key=${API_KEY}`);
        if (response) {
            res.status(200).json(response.data);
        }
        else {
            res.status(404).json('Error: ' + JSON.stringify(response))
        }
        
    } catch (error) {
        res.status(500).send('Error: ' + error.message)
    }
}

module.exports = getRaces;