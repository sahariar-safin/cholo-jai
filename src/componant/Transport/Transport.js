import React from 'react';
import { Link } from 'react-router-dom';

const Transport = (props) => {
    const { id, img } = props.transport;
    return (

        <Link to={"/transport/" + id}>
            <div className="card">
                <img src={img} alt="" />
                <h3>{id}</h3>
            </div>
        </Link>
    );
};

export default Transport;