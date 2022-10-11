import React from 'react';
import './ClientInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import useFetch from './../../Hooks/useFetch';

const ClientInfo = () => {
    const {services} = useFetch();
    const navigate = useNavigate();
    const {id} = useParams();
    const splitedId = id.split("-");
    const selectedService = services.find(service => service.id == splitedId[0]);
    const price = selectedService?.price[splitedId[1]]
    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm();
    const position = [51.505, -0.09];

    const handleNavigate = (data) => {
        if(data){
            navigate("/booking-success",{
                state:{data}
            })
        }
    };

    const mobileView = window.matchMedia("(max-width: 668px)");
    return (
        <section className='client-info'>
            <div className='client-info-form'>
                <p>Leave your contact here and I will get back to you asap. <br /> I'm here to help you.</p>
                <form onSubmit={handleSubmit((data)=>handleNavigate(data))}>
                    <div className="input-box">
                        <label htmlFor="name">Your Name</label>
                        <input {...register('name',{required: "This is required"})} name="name" id='name'/>
                        <p className='error-message'>{errors.name?.message}</p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input {...register('email',{required: "This is required"})} name="email" 
                        id='email'/>
                        <p className='error-message'>{errors.email?.message}</p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="name">Phone</label>
                        <input {...register('phone',{required: "This is required"})} name="phone" id='phone'/>
                        <p className='error-message'>{errors.phone?.message}</p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="name">Address</label>
                        <input {...register('address',{required: "This is required"})} name="address" id='address'/>
                        <p className='error-message'>{errors.address?.message}</p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="name">Date</label>
                        <input {...register('date',{required: "This is required"})} type="date" name="date" id='date'/>
                    </div>
                    <div className='input-box'>    
                        <label htmlFor="name">Event Location</label>
                        <input {...register('location',{required: "This is required"})} name="location" id='location'/>
                        <p className='error-message'>{errors.location?.message}</p>
                    </div>
                    <button type='submit' className='book-now-btn'>Book Now</button>
                </form>
                <div className='leaflet'>
                    <MapContainer 
                    id='leaflet' 
                    center={position} 
                    zoom={13} 
                    style={{
                        height:mobileView.matches ? "200px" : "300px", 
                        width: mobileView.matches ? "100%" : "90%"
                        }}         scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>
                </MapContainer>
                </div>
                
            </div>
            <div className='selected-event'>
                <h1>Event:</h1>
                <div className="selected-service-card">
                    <img src={selectedService?.image} alt="" />
                    <div className="selected-service-card-content">
                        <p className='selected-service-title'>{selectedService?.title}</p>
                        <p>Package: <strong>{splitedId[1]}</strong></p>
                        <p>Price:<strong> $ {price}</strong></p>
                    </div>
                </div>
                <div className='selected-package-card'>
                </div>
            </div>
        </section>
    );
};

export default ClientInfo;