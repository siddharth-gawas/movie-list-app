const express = require('express');
const axios = require('axios');
const { json, response } = require('express');

let router = express.Router();

const API_KEY = ''
const BASE_URL = 'https://api.themoviedb.org/3'
const MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search'
const IMAGE_URL = 'http://image.tmdb.org/t/p/w300'



searchMovies = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

searchCast = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/person?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}

searchTV = async (query) => {
    try {
        const { data } = await axios.get(`${MOVIE_SEARCH_URL}/tv?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`)
        return data;
    } catch (err) {
        return err.response || err;
    }
}



//routes

router.get('/film/:query', (req, res) => {
    searchMovies(req.params.query).then(response => {
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
    });
})


router.get('/cast/:query', (req, res) => {
    searchCast(req.params.query).then(response => {
        if (response.results) {
            if (response.results[0]) {
                const moviesData = response.results[0].known_for.map(each => {
                    return {
                        ...each,
                        image_url: `${IMAGE_URL}${each.poster_path}`
                    }
                })

                res.json(moviesData)
            }
            else return res.json(response.results)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }
    });
})


router.get('/tv/:query', (req, res) => {
    searchTV(req.params.query).then(response => {
        if (response.results) {
            const tvShows = response.results.map(each => {
                return {
                    ...each,
                    image_url: `${IMAGE_URL}${each.poster_path}`
                }
            })

            res.json(tvShows)
        } else {
            res.status(403).send(response.data.status_message || "Not Able to Fetch")
        }
    });
})


module.exports = router;