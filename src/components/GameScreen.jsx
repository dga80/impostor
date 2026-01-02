import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Home, MessageCircle, Search } from 'lucide-react';
import CountdownReveal from './CountdownReveal';

const GameScreen = () => {
    const { newRound, resetGame, currentWord, players } = useGame();
    const [showReveal, setShowReveal] = useState(false);

    const impostorNames = players
        .filter(p => p.role === 'impostor')
        .map(p => p.name);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-10">
            <AnimatePresence>
                {showReveal && (
                    <CountdownReveal
                        impostors={impostorNames}
                        onFinish={() => setShowReveal(false)}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
            >
                <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-6 rounded-full inline-block shadow-2xl shadow-cyan-500/30">
                    <MessageCircle size={64} className="text-white" />
                </div>

                <h1 className="text-4xl font-black text-white">
                    ¡A DISCUTIR!
                </h1>
                <p className="text-slate-400 text-lg max-w-md mx-auto">
                    ¿Quién es el infiltrado? Haced preguntas y descubrid al impostor.
                </p>
            </motion.div>

            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 w-full max-w-sm">
                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Categoría</p>
                <p className="text-2xl text-slate-200 font-semibold">{currentWord?.category}</p>
            </div>

            <div className="w-full max-w-sm space-y-3">
                <button
                    onClick={() => setShowReveal(true)}
                    className="w-full py-6 mb-4 relative group overflow-hidden rounded-2xl transition-all active:scale-95"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 group-hover:from-red-500 group-hover:to-pink-500 transition-all"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle,white_10%,transparent_10%)] bg-[length:20px_20px] transition-opacity"></div>
                    <div className="relative flex items-center justify-center gap-3 text-white font-black text-xl uppercase tracking-wider">
                        <Search size={28} />
                        DESCUBRIR IMPOSTOR
                    </div>
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={newRound}
                        className="py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Ronda
                    </button>

                    <button
                        onClick={resetGame}
                        className="py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Menú
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameScreen;

