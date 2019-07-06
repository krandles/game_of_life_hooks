import React, { useState } from 'react';
import Tile from '../components/Tile'
import './Board.css'

function generateBoard(width, height) {
  const result = []
  for (let y = 0; y < height; y++) {
    result.push([])
    for (let x = 0; x < width; x++) {
      result[y].push(false)
    }
  }
  return result;
}

function countNeighbors(board, x, y) {

}

function Board() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  
  const boardArray = generateBoard(width, height);
  const [boardState, setBoardState] = useState(boardArray)
  
  const handleClick = (x, y) => {
    const newBoard = [...boardState]
    newBoard[x][y] = !boardArray[x][y]
    setBoardState(newBoard)
  }

  return (
    <div id="board">
      {boardArray.map((row, i) => (
        row.map((x, j) => (
          <Tile
            coordinates={[i, j]}
            alive={boardState[i][j]}
            onClick={handleClick}
            key={`${i}.${j}`}
          />)
        )
      ))}
    </div>
  );
};

export default Board;
