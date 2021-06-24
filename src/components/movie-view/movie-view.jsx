import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className='movie-view'>
                <div className='movie-poster'>
                    <img src={`/img/${movie.ImagePath}`} />
                </div>
                <div className='movie-title'>
                    <span className='label'>Title: </span>
                    <span className='value'>{movie.Title}</span>
                </div>
                <div className='movie-description'>
                    <span className='label'>Description: </span>
                    <span className='value'>{movie.Description}</span>
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant='link'>Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant='link'>Genre</Button>
                </Link>
                <Link to={`/`}>
                    <Button variant='primary'>Back</Button>
                </Link>
                <Button variant='primary'>Add to Favorites</Button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};