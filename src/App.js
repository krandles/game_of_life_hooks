import React from 'react';
import './App.css';
import Board from '../src/components/Board'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Conway's Game of Life</h1>
      </header>
      <Board/>
    </div>
  );
}

export default App;
