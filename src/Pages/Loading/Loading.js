import React from 'react';
import './Loading.css'
import HashLoader from "react-spinners/HashLoader";

const Loading = ({loading}) => {
    return (
        <div className="loading-container">
          <HashLoader color={'#4c516d'} loading={loading} size={150} />
        </div>
    );
};

export default Loading;
