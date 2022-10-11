import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../Firebase/Firebase.init';
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../Pages/Loading/Loading';

const RequiredAuth = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if(loading){
        return <Loading loading={loading}/>
    }

    if(!user){
        return <Navigate to="/signin" state={{from: location}} replace/>;
    };
    return children;
};

export default RequiredAuth;