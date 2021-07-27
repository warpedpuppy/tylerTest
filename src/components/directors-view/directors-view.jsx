import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function DirectorsView(props) {
    console.log(props);
    let directorsName = props.movies[0].Director.Name
    return(
        <div>
            <Link to={`/`}>
                <Button variant='link'>Home</Button>
            </Link>
            <h1>{directorsName}</h1>
            {props.movies.map((movie) => (
                <Col md={3}  key={movie._id}>
                    <MovieCard
                        user={props.user}
                        userData={props.userData}
                        addFavoriteToUserData={props.addFavoriteToUserData}
                        removeFavoriteFromUserData={props.removeFavoriteFromUserData} 
                        movie={movie}
                    />
                </Col>
            ))}
        </div>
    )
}