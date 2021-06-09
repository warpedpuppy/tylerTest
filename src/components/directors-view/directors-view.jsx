import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';

export function DirectorsView(props) {
    console.log(props);
    let directorsName = props.movies[0].Director.Name
    return(
        <div>
            <h1>{directorsName}</h1>
            {props.movies.map((movie) => (
                <Col md={3}  key={movie._id}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </div>
    )
}