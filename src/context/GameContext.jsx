import React, { createContext, useContext, useState } from 'react';
import { assignRoles, getRandomWord } from '../lib/gameLogic';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [players, setPlayers] = useState([]);
    const [impostorCount, setImpostorCount] = useState(1);
    const [gamePhase, setGamePhase] = useState('SETUP'); // SETUP, REVEAL, PLAYING
    const [currentWord, setCurrentWord] = useState(null);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    const addPlayer = (name) => {
        if (!name.trim()) return;
        setPlayers((prev) => [...prev, { id: crypto.randomUUID(), name, role: null }]);
    };

    const removePlayer = (id) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
    };

    const startGame = () => {
        if (players.length < impostorCount + 2) return;

        // Assign roles
        const playerNames = players.map(p => p.name);
        const assignedPlayers = assignRoles(playerNames, impostorCount);
        setPlayers(assignedPlayers);

        // Pick word
        const wordPayload = getRandomWord();
        setCurrentWord(wordPayload);

        // Set Phase
        setGamePhase('REVEAL');
        setCurrentPlayerIndex(0);
    };

    const nextReveal = () => {
        // Mark current player as seen (optional based on updated logic, but good for tracking)
        // Actually we just move index.
        if (currentPlayerIndex < players.length - 1) {
            setCurrentPlayerIndex(prev => prev + 1);
        } else {
            setGamePhase('PLAYING');
        }
    };

    const resetGame = () => {
        setGamePhase('SETUP');
        setPlayers([]);
        setCurrentWord(null);
        setCurrentPlayerIndex(0);
    };

    const newRound = () => {
        // Keep players, just re-roll roles and word
        const playerNames = players.map(p => p.name);
        const assignedPlayers = assignRoles(playerNames, impostorCount);
        setPlayers(assignedPlayers);
        setCurrentWord(getRandomWord());
        setGamePhase('REVEAL');
        setCurrentPlayerIndex(0);
    };

    const value = {
        players,
        impostorCount,
        setImpostorCount,
        gamePhase,
        currentWord,
        currentPlayerIndex,
        currentPlayer: players[currentPlayerIndex],
        addPlayer,
        removePlayer,
        startGame,
        nextReveal,
        resetGame,
        newRound
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
