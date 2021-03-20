import React, { useContext } from 'react';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserCotex } from '../../App';
import './Navbar.css'

const NavbarCom = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserCotex);
    return (
        <div className='container'>
            <Navbar bg="" expand="lg">
                <Navbar.Brand><Link to='/'>Cholo Jai</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end">
                        <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                        <Nav.Link><Link to='/destination'>Destination</Link></Nav.Link>
                        <Nav.Link><Link to='/blog'>Blog</Link></Nav.Link>
                        <Nav.Link><Link to='/contact'>Contact</Link></Nav.Link>

                        <Link to='login' className='login'>{loggedInUser.displayName === "" ? <button className='btn btn-danger'>Login</button> : loggedInUser.displayName}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavbarCom;