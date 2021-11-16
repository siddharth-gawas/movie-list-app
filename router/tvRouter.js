const express = require('express');
const axios = require('axios');
const { json, response } = require('express');

let router = express.Router();

const API_KEY = ''
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search'
const IMAGE_URL = 'http://image.tmdb.org/t/p/w300'


getTVshowDetails = async (id) => {

    try {
        const { data } = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}




router.get('/:id', (req, res) => {

    getTVshowDetails(req.params.id).then(response => {

        if (response.name) {
            res.json({ ...response, image_url: `${IMAGE_URL}${response.poster_path}` })
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })

})



module.exports = router;