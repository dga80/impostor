import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost } from 'lucide-react';

const CountdownReveal = ({ impostors, onFinish }) => {
    const [count, setCount] = useState(3);
    const [phase, setPhase] = useState('countdown'); // countdown, reveal

    useEffect(() => {
        if (phase === 'countdown') {
            if (count > 0) {
                const timer = setTimeout(() => setCount(count - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => setPhase('reveal'), 800);
                return () => clearTimeout(timer);
            }
        }
    }, [count, phase]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
            {/* Cinematic Film Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Strobe Effect (only at count 0) */}
            {count === 0 && phase === 'countdown' && (
                <motion.div
                    animate={{ opacity: [0, 0.2, 0, 0.3, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="absolute inset-0 bg-white z-10 pointer-events-none"
                />
            )}

            <AnimatePresence mode="wait">
                {phase === 'countdown' ? (
                    <motion.div
                        key={count > 0 ? count : 'text'}
                        initial={{ scale: 2, opacity: 0, filter: 'blur(20px)' }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            filter: 'blur(0px)',
                            transition: { type: 'spring', damping: 12 }
                        }}
                        exit={{
                            scale: 0.5,
                            opacity: 0,
                            filter: 'blur(10px)',
                            transition: { duration: 0.2 }
                        }}
                        className="relative z-20 flex flex-col items-center gap-4"
                    >
                        {count > 0 ? (
                            <span className="text-[14rem] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                {count}
                            </span>
                        ) : (
                            <motion.span
                                animate={{ x: [-2, 2, -2, 2, 0] }}
                                transition={{ repeat: Infinity, duration: 0.1 }}
                                className="text-6xl font-black text-white uppercase tracking-[0.2em] italic"
                            >
                                IDENTIFICANDO...
                            </motion.span>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-20 flex flex-col items-center gap-12 w-full max-w-lg px-6"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="bg-red-600 p-8 rounded-full ring-8 ring-red-600/30 shadow-[0_0_80px_rgba(220,38,38,0.6)]"
                        >
                            <Ghost size={100} className="text-white animate-bounce" />
                        </motion.div>

                        <div className="space-y-4 w-full">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm"
                            >
                                Infiltrado detectado
                            </motion.p>

                            <div className="space-y-4">
                                {impostors.map((name, index) => (
                                    <motion.h2
                                        key={index}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 200,
                                            delay: 0.7 + (index * 0.2)
                                        }}
                                        className="text-7xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase break-words"
                                    >
                                        {name}
                                    </h2>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            onClick={onFinish}
                            className="group relative px-12 py-5 bg-white text-slate-950 rounded-full font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl overflow-hidden"
                        >
                            <span className="relative z-10">Continuar</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CountdownReveal;
