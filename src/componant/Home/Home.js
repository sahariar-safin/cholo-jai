import React from 'react';
import { Link } from 'react-router-dom';
import Bike from '../../images/Frame-1.png';
import Car from '../../images/Frame-2.png';
import Bus from '../../images/Frame.png';
import Train from '../../images/Group.png';
import './Home.css';
import Fakedata from '../../Fakedata/Fakedata.json'
import Transport from '../Transport/Transport';

const Home = () => {
    return (
        <div className="container">
            <div className="d-flex flex-wrap m-5 justify-content-evenly">
                {Fakedata.map(transport => <Transport transport={transport}></Transport>)}
            </div>
        </div>
    );
};

export default Home;