import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration/registration';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount(){
        axios.get('https://boemyflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    onBackClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)}/>;

        if (!movies) return <div className='main-view'/>;
        
        return (
            <div className='main-view'>
                {selectedMovie
                    ? <MovieView movie={selectedMovie}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                    ))
                }
            </div>
        );
    }
}

export default MainView;