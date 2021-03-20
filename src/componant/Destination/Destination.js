import React, { useState } from 'react';
import './Destination.css';
import DataForTransport from '../../Fakedata/FakeDataForTransport.json'
import { useParams } from 'react-router';
import TransportList from '../TransportList/TransportList';
import MapImage from '../../images/Map.png'

const Destination = () => {
    const { id } = useParams();
    const [transports, setTransport] = useState([]);
    const handleSearch = () => {
        const Data = DataForTransport.filter(transport => transport.id === id);
        setTransport(Data);
    }
    console.log(DataForTransport);
    console.log(transports);
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <p>Pick Up</p>
                        <h1>Mirpur</h1>
                        <p>Pick to</p>
                        <h1>Dhanmondi</h1>
                        {transports.length === 0
                            ? <button onClick={handleSearch} className="btn btn-danger">Search</button>
                            : transports.map(transport => <TransportList transports={transport}></TransportList>)
                        }
                    </div>
                </div>
                <div className="col-md-8">
                    <img src={MapImage} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Destination;