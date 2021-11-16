import React, { Component } from 'react';
import Link from 'next/link'

import { getTVshowDetails } from '../lib/moviesLib'
import Layout from '../components/Layout'
import TvShowModal from '../components/TvModal'
import { Spinner } from 'react-bootstrap';


class TV extends Component {

    static getInitialProps({ req, res, query }) {
        const storyid = query.id;

        return { storyid }
    }

    componentDidMount() {
        this.setState({ loading: true })
         getTVshowDetails(this.props.storyid).then(TVshow => this.setState({ TVshow, loading: false }))
            .catch(this.handleError) 
    }

    handleError = error => {

        this.setState({ error: error.response || "Something went Wrong", loading: false })
    }

    state = {
        TVshow: {},
        error: null,
        loading: false
    }
    render() {


        const { TVshow, error } = this.state;
        const { name, overview, image_url, homepage, tagline, first_air_date,networks, number_of_seasons, vote_average,created_by, genres, imdb_id } = TVshow;

        let content = (
            this.state.loading ? <Spinner animation="border" variant="primary" /> :

                <>
                    <h1>{name}</h1>
                    <p className="tagline">{tagline}</p>
                    <img src={image_url} onClick={() => window.open(`${homepage}`, '_blank')} />

                    <h3>About</h3>
                    <p>{overview}</p>
                    <TvShowModal
                        homepage={homepage}
                        title={name}
                        genres={genres}
                        rating={vote_average}
                        release_date={first_air_date}
                        seasons={number_of_seasons}
                        networks={networks}
                        creators={created_by}
                    >

                    </TvShowModal>
                </>
        )

        content = error?<p>{error.data||error}</p>:content
        return (
            <Layout title={name}>
                <div className="movie-details">
                    {content}
                </div>
            </Layout>
        );
    }
}

export default TV;