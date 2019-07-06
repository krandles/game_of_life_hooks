import React, { useState } from 'react';
import './Tile.css';

function Tile(props) {
  // const [alive, setAlive] = useState(props.isAlive)
  return (
    <span onClick={(e) => props.onClick(props.coordinates[0], props.coordinates[1], e)} >
      <p className={props.alive ? 'alive' : 'dead'}>
      {props.alive ? "O" : "X"}
      </p>
    </span>
  );
}

export default Tile;