import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './../Pages/Home/Home/Home';
import SignIn from './../Pages/SignIn/SignIn';
import SignUp from './../Pages/SignUp/SignUp';
import RequiredAuth from './../RequiredAuth/RequiredAuth';
import ClientInfo from './../Pages/ClientDetails/ClientInfo';
import ResetPassword from './../Pages/ResetPassword/ResetPassword';
import Gratitude from './../Pages/Gratitude/Gratitude';
import NotFound from './../Pages/NotFound/NotFound';

const Router = () => {
    return (
        <>
           <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path=':id' element={<RequiredAuth>
                    <ClientInfo />
                </RequiredAuth>}/>
                <Route path='/reset-password' element={<ResetPassword/>}/> 
                <Route path='/booking-success' element={<Gratitude/>}/> 
                <Route path='*' element={<NotFound/>}/>
            </Routes> 
        </>
    );
};

export default Router;