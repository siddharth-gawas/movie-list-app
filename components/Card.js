import React from 'react';
import {Col} from 'react-bootstrap';
import Router from 'next/router'
/**
 * Displays posters. Navigate to /movie or /tv show based on type.
 * @param {*} props 
 */
const Card = (props) => {

    const { movie,type } = props;

    return (
        <Col xs={12} sm={6} md={6} lg={4} xl={3} className="display-card">
            <img className="preview-image" onClick={() => type=="TVshows"? Router.push(`/tv/?id=${movie.id}`) :Router.push(`/movie/?id=${movie.id}`)} src={movie.image_url}></img>
            
        </Col>
    )

}

export default Card;