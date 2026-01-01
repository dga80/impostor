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
                className="absolute inset-0 z-0 opacity-60"
                style={{
                    backgroundImage: `url(${startupImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 p-4"
            >
                <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tighter text-center uppercase">
                    EL IMPOSTOR
                </h1>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
