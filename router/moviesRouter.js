const express = require('express');
const axios = require('axios');
const { json, response } = require('express');

let router = express.Router();

const API_KEY = ''
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search'
const IMAGE_URL = 'http://image.tmdb.org/t/p/w300'

getPlayingMovies = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err
    }
}

getMovieDetails = async (id) => {

    try {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}




//router
router.get('/playing', (req, res) => {
    getPlayingMovies().then(response => {
        if (response.results) {
            const moviesData = response.results.map(each => {
                return {
                    ...each,
                    image_url: `${IMAGE_URL}${each.poster_path}`
                }
            })

            res.json(moviesData)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })
})



router.get('/:id', (req, res) => {

    getMovieDetails(req.params.id).then(response => {

        if (response.title) {
            res.json({ ...response, image_url: `${IMAGE_URL}${response.poster_path}` })
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }

    }).catch(err => {
        res.status(403).send("err")
    })

})






module.exports = router;