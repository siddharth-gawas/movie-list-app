import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'



/**
 * Modal to show details of tv show.
 */
class TvShowModal extends Component {
    state = {
        show: false,

    }
    render() {
        // console.log(this.props)
        const { title, genres, release_date, networks, rating, seasons, creators, homepage } = this.props;
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        //revenue

        let rel_date = "";
        let ProgramNetworks = "";
        let ProgramCreators = ""
        let ProgramGenres = ""
        if (title) {

            //date
            var parts = release_date.split("-"),
                date = new Date(parts[0], parts[1] - 1, +parts[2]);
            rel_date = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

            //production companies

            networks.forEach((element) => {
                ProgramNetworks = ProgramNetworks + element.name + ", "
            });

            //genres

            genres.forEach((element) => {
                ProgramGenres = ProgramGenres + element.name + ", "
            });

            //creators
            creators.forEach((element) => {
                ProgramCreators = ProgramCreators + element.name + ", "
            });
        }



        return (
            <>
                <Button variant="primary" onClick={() => this.setState({ show: true })}>
                    More Details
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Rating: </strong>{rating}
                            <span className="link homepage-link" onClick={() => window.open(`${homepage}`, '_blank')}>Homepage</span>
                        </p>
                        <p><strong>Release date: </strong>{rel_date}</p>
                        <p><strong>No. of seasons: </strong>{seasons}</p>
                        <p><strong>Network: </strong>{ProgramNetworks}</p>
                        <p><strong>Program Creators: </strong>{ProgramCreators}</p>
                        <p><strong>Genres: </strong>{ProgramGenres}</p>
                        <p></p>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default TvShowModal;