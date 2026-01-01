import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Plus, X, Users, User, Play, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomeScreen = () => {
    const { players, addPlayer, removePlayer, impostorCount, setImpostorCount, startGame } = useGame();
    const [name, setName] = useState('');

    const handleAddPlayer = (e) => {
        e.preventDefault();
        if (name.trim()) {
            addPlayer(name);
            setName('');
        }
    };

    const canStart = players.length >= impostorCount + 2;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 max-w-md mx-auto w-full">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center space-y-2"
            >
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-sm tracking-tighter">
                    IMPOSTOR
                </h1>
                <p className="text-slate-400 text-sm font-medium">¿Quién miente mejor?</p>
            </motion.div>

            {/* Player Input */}
            <motion.form
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleAddPlayer}
                className="w-full relative"
            >
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del jugador..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg shadow-xl"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl text-white hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                    disabled={!name.trim()}
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </motion.form>

            {/* Players List */}
            <div className="w-full flex-1 min-h-[200px] max-h-[400px] overflow-y-auto px-1 custom-scrollbar">
                <AnimatePresence>
                    {players.map((player) => (
                        <motion.div
                            key={player.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0, height: 0 }}
                            className="flex items-center justify-between bg-slate-800/80 p-4 rounded-xl mb-3 border border-slate-700 shadow-sm group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-700 p-2 rounded-full text-purple-400">
                                    <User size={20} />
                                </div>
                                <span className="font-semibold text-lg">{player.name}</span>
                            </div>
                            <button
                                onClick={() => removePlayer(player.id)}
                                className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-full transition-colors"
                                aria-label="Eliminar jugador"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    ))}
                    {players.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-slate-600 py-10 flex flex-col items-center gap-2"
                        >
                            <Users size={48} className="opacity-20" />
                            <p>Añade jugadores para empezar</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Settings & Start */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full space-y-6 bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium flex items-center gap-2">
                        <AlertCircle size={18} className="text-orange-500" />
                        Número de Impostores
                    </span>
                    <div className="flex bg-slate-900 p-1 rounded-lg">
                        {[1, 2].map((num) => (
                            <button
                                key={num}
                                onClick={() => setImpostorCount(num)}
                                className={`px-4 py-2 rounded-md font-bold transition-all ${impostorCount === num
                                        ? 'bg-gradient-to-tr from-orange-500 to-red-500 text-white shadow-lg'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={startGame}
                    disabled={!canStart}
                    className={`w-full py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl ${canStart
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-green-500/20'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    <Play size={24} fill="currentColor" />
                    Comenzar Juego
                </button>

                {!canStart && players.length > 0 && (
                    <p className="text-center text-xs text-red-400 font-medium">
                        Mínimo {impostorCount + 2} jugadores necesarios
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default HomeScreen;
