import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const Animation = () =>{
    const animation = useAnimation();
    const {ref, inView} = useInView({threshold : 0.1});
    useEffect(()=>{
        if(inView){
            animation.start('show');
        }
    },[inView])
    return [ref, animation];
}