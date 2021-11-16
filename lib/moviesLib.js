import axios from 'axios';



//search
export const searchMovies = async (query) => {
    const {data} = await axios.get(`/search/film/${query}`)
    return data
}

export const searchTVshows = async (query) => {
    const {data} = await axios.get(`/search/tv/${query}`)
    return data
}
//movies
export const getUpcomingMovies = async () => {
    const {data} = await axios.get('/film/playing')
    return data
}


export const getMovieDetails = async (id) => {
    const {data} = await axios.get(`/film/${id}`)
    return data
}


//tv
export const getTVshowDetails = async (id) => {
    const {data} = await axios.get(`/tvshow/${id}`)
    return data
}


