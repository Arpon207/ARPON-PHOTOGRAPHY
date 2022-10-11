import React from 'react';
import './Retouching.css'
import photoEditing from '../../../images/photo-editing.jpg'

const Retouching = () => {
    return (
        <section id='gears' className='retouching'>
            <div>
                <div 
                className='image-box'
                data-aos = "zoom-in-right"
                data-aos-duration = '800'
                >
                    <img src={photoEditing} alt="" />
                </div>

                <div
                    data-aos = "zoom-in-left"
                    data-aos-duration = '800'
                >
                    <h1>Professional Retouching</h1>
                    <p>Each frame, each picture undergoes a full correction to accurately represent colors. <br /> <br /> Best shots are being fully retouched to turn into a works of art of the highest jpgquality. <br /> <br /> At the end you get pictures that delight our eyes!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Retouching;