import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Check, Ghost } from 'lucide-react';

const RevealScreen = () => {
    const { currentPlayer, nextReveal, currentWord } = useGame();
    const [isRevealed, setIsRevealed] = useState(false);

    // Determine what to show
    const isImpostor = currentPlayer.role === 'impostor';
    const secretWord = isImpostor ? currentWord.impostor : currentWord.citizen;
    const category = currentWord.category;

    const handleReveal = () => setIsRevealed(true);
    const handleNext = () => {
        setIsRevealed(false);
        nextReveal();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 text-center relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <AnimatePresence mode='wait'>
                {!isRevealed ? (
                    <motion.div
                        key="prompt"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-6 z-10"
                    >
                        <div className="bg-slate-800 p-4 rounded-full mb-4 ring-4 ring-slate-700/50">
                            <Ghost size={64} className="text-cyan-400" />
                        </div>

                        <h2 className="text-3xl font-bold text-white">
                            Turno de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{currentPlayer.name}</span>
                        </h2>

                        <p className="text-slate-400 text-lg max-w-xs">
                            Pasa el dispositivo a <strong>{currentPlayer.name}</strong>.
                        </p>

                        <button
                            onClick={handleReveal}
                            className="mt-8 relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative px-8 py-6 bg-slate-900 rounded-2xl ring-1 ring-white/10 flex items-center gap-3">
                                <Eye size={32} className="text-pink-500" />
                                <span className="text-2xl font-bold text-white tracking-wider">VER MI ROL</span>
                            </div>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex flex-col items-center justify-center gap-8 z-10 w-full"
                    >
                        <div className={`p-8 rounded-3xl w-full max-w-sm border-4 ${isImpostor
                                ? 'bg-red-500/20 border-red-500 shadow-xl shadow-red-900/50'
                                : 'bg-green-500/10 border-green-500/50'
                            } backdrop-blur-xl relative transition-all duration-300`}>

                            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border-2 text-sm uppercase tracking-widest font-bold shadow-lg ${isImpostor
                                    ? 'bg-red-600 border-red-400 text-white'
                                    : 'bg-slate-900 border-slate-700 text-slate-400'
                                }`}>
                                {category}
                            </div>

                            {isImpostor ? (
                                <div className="flex flex-col items-center gap-4 mt-4">
                                    <span className="text-6xl animate-bounce">🤫</span>
                                    <h1 className="text-5xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] uppercase tracking-tight py-2">
                                        {secretWord}
                                    </h1>
                                    <div className="px-6 py-2 bg-red-600 rounded-xl text-white font-bold text-xl animate-pulse shadow-lg border border-red-400">
                                        ⚠️ ERES EL IMPOSTOR
                                    </div>
                                    <p className="text-red-300 text-sm font-medium mt-2">Disimula y culpa a otros.</p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl text-slate-300 mb-2 font-medium">Tu palabra es:</h3>
                                    <h1 className="text-5xl font-black text-green-400 drop-shadow-lg">
                                        {secretWord}
                                    </h1>
                                </>
                            )}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full max-w-sm py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/30"
                        >
                            <Check size={24} strokeWidth={3} />
                            Entendido / Ocultar
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RevealScreen;
