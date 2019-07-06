import React, { useState } from 'react';
import Tile from '../components/Tile'
import './Board.css'

function generateInitialBoard(width, height) {
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
  // console.log("Hello from count")
  let sum = 0
  const neighborOffset = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  neighborOffset.forEach(offset => {
    let offsetX = x + offset[0]
    let offsetY = y + offset[1]
    // debugger
    if (offsetX >= 0 && offsetX <= board[0].length - 1 && offsetY >= 0 && offsetY <= board.length - 1) {
      if (board[offsetY][offsetX] === true) {
        sum++
      }
    }
  })
  return sum
}

function generateNewBoard(board) {
  const newBoard = [...board]
  board.forEach((column, y) => {
    column.forEach((tile, x) => {
      let neighbors = countNeighbors(board, x, y)
      if ((neighbors < 2 || neighbors > 3) && board[y][x]) {
        newBoard[y][x] = false
      } else if (neighbors === 3 && !board[y][x]) {
        newBoard[y][x] = true
      }
    })
  })
  console.log(newBoard)
  return newBoard
}

function Board() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  
  const boardArray = generateInitialBoard(width, height);
  const [boardState, setBoardState] = useState(boardArray)

  const handleClick = (x, y) => {
    const newBoard = [...boardState]
    newBoard[y][x] = !boardState[y][x]
    setBoardState(newBoard)
    // console.log(countNeighbors(boardState, x, y))
  }

  // const calculateTick = generateNewBoard(boardState)

  return (
    <>
    <div id="board">
      {boardArray.map((row, i) => (
        row.map((column, j) => (
          <Tile
            coordinates={[j, i]}
            alive={boardState[i][j]}
            onClick={handleClick}
            key={`x=${j}, y=${i}`}
          />)
        )
      ))}
    </div>
    <button onClick={(e) => {
      e.preventDefault()
      setBoardState(generateNewBoard(boardState))
    }}>
      Click Me
    </button>
    </>
  );
};

export default Board;
