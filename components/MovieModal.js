import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

/**
 * Modal to show details of movie.
 */
class MovieModal extends Component {
    state = {
        show: false,

    }
    render() {
        // console.log(this.props)
        const { title, genres, revenue, release_date, production_companies, imdb_id } = this.props;
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        //revenueC
        let revenueValue = revenue
        if (revenueValue >= 1000000000) {
            revenueValue = (revenueValue / 1000000000).toFixed(2) + " billion"
        } else if (revenueValue >= 1000000) {
            revenueValue = (revenueValue / 1000000).toFixed(2) + " million"
        }
        else if (revenueValue >= 1000) {
            revenueValue = (revenueValue / 1000).toFixed(2) + " thousand";
        }
        let rel_date = "";
        let companies = "";
        let Moviegenres = ""
        if (title) {

            //date
            var parts = release_date.split("-"),
                date = new Date(parts[0], parts[1] - 1, +parts[2]);
            rel_date = `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

            //production companies

            production_companies.forEach((element) => {
                companies = companies + element.name + ", "
            });

            //genres

            genres.forEach((element) => {
                Moviegenres = Moviegenres + element.name + ", "
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
                        <p><strong>Release date: </strong>{rel_date}</p>
                        <p><strong>Revenue: </strong>${revenueValue}</p>
                        <p><strong>Genres: </strong>{Moviegenres}</p>
                        <p><strong>Production Companies: </strong>{companies}</p>
                        <p><span className="link" onClick={() => window.open(`https://www.imdb.com/title/${imdb_id}`, '_blank')}>IMDB Link</span></p>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default MovieModal;