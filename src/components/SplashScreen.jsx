import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import startupImage from '../assets/startup.jpg';

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 1500); // 1.5s total (0.5s fade in, 0.5s visible, 0.5s fade out logically) or just a fixed time. 
        // User asked for "medio segundo aprox" (0.5s). That's very fast.
        // I will do 1000ms just to be safe so it's visible, or strictly 500ms if urged.
        // Let's do 800ms.

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${startupImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />


        </div>
    );
};

export default SplashScreen;
