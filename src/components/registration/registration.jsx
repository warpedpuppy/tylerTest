import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Form from 'react-bootstrap';
import Button from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthdate);
        props.onRegister(username);
    }

    // return (
    //     <Form>
    //         <Form.Group controlId='registerUsername'>
    //             <Form.Label>Username:</Form.Label>
    //             <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
    //         </Form.Group>
    //         <Button variant='primary' type='submit' onClick={handleSubmit}>
    //             Submit
    //         </Button>
    //     </Form>
    // )

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                Birthdate:
                <input type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
            </label>
            <button type='button' onClick={handleSubmit}>Submit</button>
        </form>
    )
}

RegistrationView.Proptypes = {
    onRegister: Proptypes.func.isRequired
};