import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserCotex } from '../../App';
import firebaseConfig from '../../firebase.config';
import './SignIn.css'
import firebase from "firebase/app";
import "firebase/auth";



const SignIn = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserCotex);
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmedPassword: "",
        displayName: ''
    });

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
                const userError = {
                    error: errorMessage
                }
                setLoggedInUser(userError, ...loggedInUser)
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
        if (e.target.name === 'confirm-password') {
            user.confirmedPassword = e.target.value;
        }
        if (e.target.name === 'name') {
            user.displayName = e.target.value;
            setLoggedInUser(loggedInUser.displayName = e.target.value);
        }
    }

    const handleCreateAccount = (e) => {
        if (user.password === user.confirmedPassword && user.password.length > 5) {
            user.unconfirmedPassword = "";
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    setLoggedInUser(user);
                    setUser(user)
                    history.replace(from);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });
            console.log('confirmed!!!');
            console.log(user);
        } else {
            setUser({ unconfirmedPassword: "Your password don't matching or password is too short!!!", ...user })
        }
        e.preventDefault();
    }

    return (
        <div className='container'>
            <div className="text-center col-md-6 from-container">
                <h2>Create an account</h2>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onBlur={handleBlur} name="name" type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleBlur} name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleBlur} name='password' type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onBlur={handleBlur} name='confirm-password' type="password" placeholder="Password" />
                    </Form.Group>
                    <br />
                    {user.unconfirmedPassword === "" ? <p></p> : <p>{user.unconfirmedPassword}</p>}
                    <br />
                    <Button onClick={handleCreateAccount} variant="primary" type="submit"> Create an account</Button>
                </Form>
                <p>Already have an account! <Link to='/login'>Login.</Link></p>
            </div>
            <div className="google text-center">
                <button onClick={handleGoogleSignIn} className='btn btn-light'>Continue with Google</button>
            </div>
        </div>
    );
};

export default SignIn;