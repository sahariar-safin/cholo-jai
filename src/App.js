import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './componant/Navbar/Navbar';
import Home from './componant/Home/Home';
import NavbarCom from './componant/Navbar/Navbar';
import Destination from './componant/Destination/Destination';
import Login from './componant/Login/Login';
import SignIn from './componant/SignIn/SignIn';
import { createContext, useContext, useState } from 'react';
import privetRoute from './componant/PrivetRoute/privetRoute';
import PrivetRoute from './componant/PrivetRoute/privetRoute';

export const UserCotex = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    displayName: ''
  });
  return (
    <UserCotex.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <NavbarCom></NavbarCom>
        <Switch>
          <PrivetRoute path='/transport/:id'>
            <Destination></Destination>
          </PrivetRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignIn></SignIn>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserCotex.Provider>
  );
}

export default App;
