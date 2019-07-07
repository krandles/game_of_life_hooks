import React, { useState } from 'react';
import './Tile.css';

function Tile(props) {
  return (
      <div
        className={props.alive ? 'alive' : 'dead'} 
        onClick={(e) => props.onClick(props.coordinates[0], props.coordinates[1], e)}  
      >
      {/* {`${props.neighbors}\n`} */}
      {/* {`${props.coordinates[0]}, ${props.coordinates[1]})`} */}
      </div>
  );
}

export default Tile;