import React, { useState } from 'react';
import './Tile.css';

function Tile(props) {
  // const [alive, setAlive] = useState(props.isAlive)
  return (
      <div
        className={props.alive ? 'alive' : 'dead'} 
        onClick={(e) => props.onClick(props.coordinates[0], props.coordinates[1], e)}  
      >
      {props.neighbors}
      </div>
  );
}

export default Tile;