import React from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTop = () => {
    
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    
    return (
        <div>
            <BsFillArrowUpCircleFill className="scrollTop" onClick={scrollTop}/>
        </div>
    );
};

export default ScrollToTop;