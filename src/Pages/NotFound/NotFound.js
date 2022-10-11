import React from 'react';
import './NotFound.css'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='not-found'>
            <div>
                <p>ERROR 404<br />NOT FOUND
                </p>
                <p>
                    You may have mis-typed the URL. <br />
                    Or the page has been removed. <br />
                    Actually, there is nothing to see here... <br />
                    Click on the links below to do something, Thanks! <br />
                </p>
                <button onClick={()=>navigate('/')}>Home</button>
            </div>
        </div>
    );
};

export default NotFound;