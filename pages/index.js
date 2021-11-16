import React, { Component } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { InputGroup, FormControl, Button, Form, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';

import { getUpcomingMovies, searchMovies, searchCast, searchTVshows } from '../lib/moviesLib'
import Layout from '../components/Layout'
import Card from '../components/Card'


class Index extends Component {
    static getInitialProps({ req, res, query }) {
        const searchQuery = query.search;
        const searchType = query.type;

        return { searchQuery, searchType }

    }


    componentDidMount() {

        const { searchQuery, searchType } = this.props

        if (searchQuery && searchQuery.trim() !== "") {
            switch (searchType) {
                case "TVshows": {
                    this.setState({ search: searchQuery, select: searchType })
                    this.getSearchedTVshows(searchQuery)
                    break;
                }
                default: {
                    this.setState({ search: searchQuery })
                    this.getSearchedMovies(searchQuery)
                    break;
                }
            }
            return
        }

        this.defaultMovies()

    }

    defaultMovies = () => {
        this.setState({ loading: true, headText: "new" })
        getUpcomingMovies().then(
            movies => this.setState({ movies, loading: false })
        ).catch(this.handleError)
    }

    handleError = error => {
        this.setState({ error, loading: false })
    }

    onChangeHandler = event => {

        if (event.target.value.trim() === "" && event.target.value.trim() != this.state.search.trim()) {
            // console.log("loaded")
            Router.push('/')
            this.defaultMovies();
        }
        this.setState({ input_error: false })
        this.setState({ search: event.target.value })

    }

    submitHandler = event => {
        event.preventDefault();
        // console.log("submitted")
        const { search } = this.state
        if (search.trim() === "") {
            this.setState({ input_error: true })
            return
        }

        Router.push(`?type=${this.state.select}&search=${search}`)

        if (this.state.select == "Movie")
            this.getSearchedMovies(search)
        else if (this.state.select == "TVshows")
            this.getSearchedTVshows(search)
    }

    getSearchedMovies = (search) => {

        this.setState({ loading: true, headText: "movie" })
        searchMovies(search).then(
            movies => this.setState({ movies, loading: false })
        ).catch(this.handleError)
    }

    getSearchedTVshows = (search) => {

        this.setState({ loading: true, headText: "tv" })
        searchTVshows(search).then(
            movies => this.setState({ movies, loading: false })
        ).catch(this.handleError)
    }


    state = {
        movies: [],
        select: "Movie",
        search: "",
        error: null,
        input_error: false,
        loading: false,
        headText: ""
    }
    render() {

        const { movies, error, search, select, input_error, loading, headText } = this.state;

        //   console.log(this.state.select)

        let titleText = "";
         switch (headText) {
            case "new": { titleText= "Latest Movies"; break;}
            case "movie": { titleText= "Movies"; break;}
            case "tv": { titleText= "TV Shows"; break;}
            default:{ titleText= "Movies"; break;}
        }

        return (
            <Layout title={titleText}>
                <Form onSubmit={this.submitHandler} className="searchForm">
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Search by</Form.Label>
                        <Form.Control as="select" custom value={select} onChange={(event) => this.setState({ select: event.target.value })}>
                            <option>Movie</option>
                            <option>TVshows</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup className="mb-1"   >
                            <FormControl
                                placeholder="Search Movies"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                onChange={this.onChangeHandler}
                                value={search}
                                className="input-search"
                                type="search"
                            />
                            <InputGroup.Append>
                                <Button variant="primary" className="search" type="submit" disabled={loading}>Search</Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Form.Group>
                    {input_error ?
                        <Alert variant="danger">
                            Field can not be Empty!
                    </Alert> : null}

                </Form>



                {loading ? <Spinner animation="border" variant="primary" /> :
                    <>
                        <h1><Badge className="head-text" variant="secondary">{!movies.length ? "Sorry! We did not find anything" :`${titleText}`}</Badge></h1>

                        <Row>
                            {
                                movies.map(movie => {
                                    return <Card key={movie.id} movie={movie} type={select} />
                                })
                            }
                        </Row>
                    </>
                }
            </Layout >
        );
    }
}

export default Index;