import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';

export function GenresView(props) {
    console.log(props);
    let genresName = props.movies[0].Genre.Name
    return(
        <div>
            <h1>{genresName}</h1>
            {props.movies.map((movie) => (
                <Col md={3} key={movie._id}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </div>
    )
}