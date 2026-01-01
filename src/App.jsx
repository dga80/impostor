import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import HomeScreen from './components/HomeScreen';
import RevealScreen from './components/RevealScreen';
import GameScreen from './components/GameScreen';

const GameRouter = () => {
  const { gamePhase } = useGame();

  switch (gamePhase) {
    case 'SETUP':
      return <HomeScreen />;
    case 'REVEAL':
      return <RevealScreen />;
    case 'PLAYING':
      return <GameScreen />;
    default:
      return <HomeScreen />;
  }
};

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-slate-900 text-white selection:bg-purple-500 selection:text-white">
        <GameRouter />
      </div>
    </GameProvider>
  );
}

export default App;
