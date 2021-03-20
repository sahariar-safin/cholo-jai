import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserCotex } from '../../App';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserCotex);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    console.log(loggedInUser, user);

    const GoogleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                const users = result.user;
                setLoggedInUser(users);
                setUser(users);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
    const handleBlur = (e) => {
        if (e.target.name === 'email') {
            user.email = e.target.value;
            console.log(user);
        }
        if (e.target.name === 'password') {
            user.password = e.target.value;
            console.log(user);
        }
    }
    const handleSignInWithEmailAndPassword = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed in
                var users = userCredential.user;
                setLoggedInUser(users);
                setUser(users);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
            e.preventDefault();
    }

    return (
        <div className='container'>
            <div className="text-center col-md-6 from-container">
                <h2>LogIn</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleBlur} name='email' type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} name='password' type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button onClick={handleSignInWithEmailAndPassword} variant="primary" type="submit"> Login</Button>
                </Form>
                <p>Don't have an account! <Link to='/signup'>Create an account.</Link></p>
            </div>
            <div className="google text-center">
                <button onClick={handleGoogleSignIn} className='btn btn-light'>Continue with Google</button>

            </div>

        </div>
    );
};

export default Login;