import React from 'react';
import './TransportList.css';

const TransportList = (props) => {
    const {id, img, price} = props.transports;
    return (
        <div className='transport-card d-flex justify-content-evenly align-item-center'>
            <img src={img} alt=""/>
            <h3>{id}</h3>
            <h3>${price}</h3>
        </div>
    );
};

export default TransportList;