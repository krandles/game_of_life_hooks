import React, { useState, useEffect, useRef } from 'react';
import Tile from '../components/Tile'
import './Board.css'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
  let sum = 0
  const neighborOffset = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  
  neighborOffset.forEach(offset => {
    let offsetX = x + offset[0]
    let offsetY = y + offset[1]
    if (offsetX >= 0 && offsetX <= board[0].length - 1 && offsetY >= 0 && offsetY <= board.length - 1) {
      sum = sum + board[offsetY][offsetX]
    }
  })
  return sum
}

function generateNewBoard(board) {
  const newBoard = []
  board.forEach((el, i) => newBoard[i] = Array.from(el))
  board.forEach((column, y) => {
    column.forEach((tile, x) => {
      let neighbors = countNeighbors(board, x, y)
      if (tile === true) {
        switch (neighbors) {
          case 2:
          case 3:
            newBoard[y][x] = true
            break
          default:
            newBoard[y][x] = false
            break;
        }
      } else if (tile === false) {
        switch (neighbors) {
          case 3:
            newBoard[y][x] = true
            break;
          default:
            newBoard[y][x] = false
            break;
        }
      }
    })
  })
  return newBoard
}

function Board() {
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [generations, setGenerations] = useState(1);
  const [counterRunning, setCounterRunning] = useState(false)
  
  const boardArray = generateInitialBoard(width, height);
  const [boardState, setBoardState] = useState(boardArray)

  const handleTileClick = (x, y) => {
    const newBoard = [...boardState]
    newBoard[y][x] = !boardState[y][x]
    setBoardState(newBoard)
  }

  const incrementTurn = (board) => {
    console.log("from increment", board)
    setBoardState(generateNewBoard(board))
    setGenerations(generations + 1)
  }

  const startCounter = (e) => {
    e.preventDefault()
    setCounterRunning(true)
  }

  const stopCounter = (e) => {
    e.preventDefault()
    setCounterRunning(false)
  }

  useInterval(() => {
    incrementTurn(boardState)
  }, counterRunning ? 1000 : null)

  return (
    <>
    <div id="wrapper">
      <div id="board">
        {boardArray.map((row, i) => (
          row.map((column, j) => (
            <Tile
              neighbors={countNeighbors(boardState, j, i)}
              coordinates={[j, i]}
              alive={boardState[i][j]}
              onClick={handleTileClick}
              key={`x=${j}, y=${i}`}
            />)
          )
        ))}
      </div>
    </div>
    <button onClick={() => setBoardState(generateInitialBoard(width, height))}>
      Reset
    </button>
    <button onClick={(e) => {
      e.preventDefault()
      incrementTurn(boardState)
    }}>
      Next Generation
    </button>
    {counterRunning ? 
    <button onClick={(e) => stopCounter(e)}>Stop</button> :
    <button onClick={(e) => startCounter(e)}>Start</button>
    }
    <p>Generation {generations}</p>
    </>
  );
};

export default Board;
