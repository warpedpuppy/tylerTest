import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../../config';
 
export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(`${config.APIURL}/users`, {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('error registering the user')
        });
    }

    return (
        <Form>
            <Form.Group controlId='registerUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='registerPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='registerEmail'>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='text' onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='registerBirthdate'>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control type='text' onChange={e => setBirthdate(e.target.value)} />
            </Form.Group>
            
            <Button variant='success' type='submit' onClick={handleRegister}>
                Submit
            </Button>
            <Button variant='primary' onClick={props.toggleRegister}>
                Existing User
            </Button>
            
        </Form>
    )

    // return (
    //     <form>
    //         <label>
    //             Username:
    //             <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
    //         </label>
    //         <label>
    //             Password:
    //             <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
    //         </label>
    //         <label>
    //             Email:
    //             <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
    //         </label>
    //         <label>
    //             Birthdate:
    //             <input type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
    //         </label>
    //         <button type='button' onClick={handleSubmit}>Submit</button>
    //     </form>
    // )
}

RegistrationView.Proptypes = {
    onRegister: Proptypes.func.isRequired
};