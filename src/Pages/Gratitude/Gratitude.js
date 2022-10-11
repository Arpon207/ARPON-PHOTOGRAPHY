import React from 'react';
import './Gratitude.css'
import { useLocation } from 'react-router-dom';

const Gratitude = () => {
    const location = useLocation();
    const {name} = location.state.data;
    return (
        <div className='gratitude'>
            <div>
                <p>Thank you <strong>{name}</strong> for your booking.</p>
                <p>I will contact you asap.</p>
            </div>
        </div>
    );
};

export default Gratitude;