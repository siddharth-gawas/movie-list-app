import React, { Component } from 'react';
import Link from 'next/link'

import { getMovieDetails } from '../lib/moviesLib'
import Layout from '../components/Layout'
import MovieModal from '../components/MovieModal'
import { Spinner } from 'react-bootstrap';


class Movie extends Component {

    static getInitialProps({ req, res, query }) {
        const storyid = query.id;

        return { storyid }
    }

    componentDidMount() {
        this.setState({ loading: true })
        getMovieDetails(this.props.storyid).then(movie => this.setState({ movie, loading: false }))
            .catch(this.handleError)
    }

    handleError = error => {

        this.setState({ error: error.response || "Something went Wrong", loading: false })
    }

    state = {
        movie: {},
        error: null,
        loading: false
    }
    render() {


        const { movie, error } = this.state;
        const { title, overview, image_url, homepage, tagline, release_date, revenue, production_companies, genres, imdb_id } = movie;

        let content = (
            this.state.loading ? <Spinner animation="border" variant="primary" /> :

                <>
                    <h1>{title}</h1>
                    <p className="tagline">{tagline}</p>
                    <img src={image_url} onClick={() => window.open(`${homepage}`, '_blank')} />

                    <h3>About</h3>
                    <p>{overview}</p>
                    <MovieModal
                        imdb_id={imdb_id}
                        title={title}
                        genres={genres}
                        production_companies={production_companies}
                        revenue={revenue}
                        release_date={release_date}
                    >

                    </MovieModal>
                </>
        )

        content = error?<p>{error.data||error}</p>:content
        return (
            <Layout title={title}>
                <div className="movie-details">
                    {content}
                </div>
            </Layout>
        );
    }
}

export default Movie;