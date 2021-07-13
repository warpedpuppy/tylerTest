import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration/registration';
import { DirectorsView } from '../directors-view/directors-view';
import { GenresView } from '../genres-view/genres-view';
import { ProfileView } from '../profile-view/profile-view';
import config from '../../config'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            userData: {FavoriteMovies: []},
            register: false
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            let user = localStorage.getItem('user')
            this.setState({
                user: user
            });
            this.getMovies(accessToken);
            this.getUserData(user, accessToken)
        }
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    getMovies(token) {
        axios.get(`${config.APIURL}/movies`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getUserData(username, token) {
        axios.get(`${config.APIURL}/users/${username}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            console.log(response.data)
            this.setState({
                userData: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    addFavoriteToUserData= (id) => {
        let tempObject= {
            ...this.state.userData
        }
        tempObject.FavoriteMovies.push(id)
        this.setState({
            userData: tempObject
        })
    }

    removeFavoriteFromUserData= (id) => {
        let tempObject= {
            ...this.state.userData
        }
        tempObject.FavoriteMovies.splice(tempObject.FavoriteMovies.indexOf(id), 1)
        this.setState({
            userData: tempObject
        })
    }

    onLoggedIn(authData) {
        // console.log(authData);
        this.setState({
            user: authData.user.Username,
            userData: authData.user
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    updateLocalUserData = (object) => {
        let tempObject = {...this.state.userData};
        if (object.Username) {
            tempObject.Username = object.Usename
        }
        if (object.Password) {
            tempObject.Password = object.Password
        }
        if (object.Email) {
            tempObject.Email = object.Email
        }
        if (object.Birthdate) {
            tempObject.Birthdate = object.Birthdate
        }
        this.setState( { userData: tempObject }, () => console.log(this.state.userData))
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

    toggleRegister = (e) => {
        e.preventDefault();
        this.setState({
            register: !this.state.register
        })
    }

    toggleUserView = (e) => {
        e.preventDefault();
        this.setState({
            // switch to profile-view
        })
    }

    render() {
        const { movies, selectedMovie, user, register, userData } = this.state;
        if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister}/>;

        if (!user) return (
            <Row>
                <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister}/>
                </Col>
            </Row>);

        if (movies.length === 0) return <div className='main-view' />;
        
        return (
            <div>
                
                
                <Router>
                    <Link to='/userview'>
                        <Button variant='primary'>
                            Go to Profile
                        </Button>
                    </Link>
                    <Row className='main-view justify-content-md-center'>
                        <Route exact path='/' render={() => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return movies.map(m => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} userData={userData} user={user} addFavoriteToUserData={this.addFavoriteToUserData} removeFavoriteFromUserData={this.removeFavoriteFromUserData} />
                                </Col>
                            ))
                        }} />
                        <Route path='/register' render={() => {
                            return <Col>
                                <RegistrationView />
                            </Col>
                        }} />
                        <Route path='/movies/:movieId' render={({ match }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return <Col md={8}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                                </Col>
                        }} />
                        <Route exact path='/genres/:name' render={({ match }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return <Col md={8}>
                                    <GenresView movies={movies.filter(m => m.Genre.Name === match.params.name)} />
                                </Col>     
                        }} />
                        <Route exact path='/directors/:name' render={({ match }) => {
                            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                            return <Col md={8}>
                                    <DirectorsView movies={movies.filter(m => m.Director.Name === match.params.name)} />
                                </Col>
                        }} />
                        <Route exact path='/userview' render={({ history }) => {
                            if (!user) {
                                return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>}
                            return (
                                <ProfileView updateLocalUserData={this.updateLocalUserData} user={user} favoriteMovies={movies.filter(m => userData.FavoriteMovies.includes(m._id))} userData={userData} history={history} />
                            )
                        }} />
                    </Row>
                </Router>
            </div>
        );
    }
}

export default MainView;