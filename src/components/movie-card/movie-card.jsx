import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config';

export class MovieCard extends React.Component {
    
    addToFavs= () => {
        axios.post(`${config.APIURL}/users/${this.props.user}/movies/${this.props.movie._id}`, {}, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

        })
        .then(result => {
            this.props.addFavoriteToUserData(this.props.movie._id)

        })
        .catch(e => {
            console.error(e)
        })
    }

    removeFromFavs= () => {
        axios.post(`${config.APIURL}/users/${this.props.user}/movies/${this.props.movie._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

        })
        .then(result => {
            this.props.addFavoriteToUserData(this.props.movie._id)

        })
        .catch(e => {
            console.error(e)
        })
    }

    render() {
        const { movie } = this.props;
        return (
            <Card>
                <Card.Img variant='top' src={`/img/${movie.ImagePath}`} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant='link'>Open</Button>
                    </Link>
                    {!this.props.userData.FavoriteMovies.includes(movie._id) && <Button variant='primary' onClick={this.addToFavs}>Add to Favorites</Button>}
                    {this.props.userData.FavoriteMovies.includes(movie._id) && <Button variant='danger' onClick={this.removeFromFavs}>Remove from Favorites</Button>}
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};