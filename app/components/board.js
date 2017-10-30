"use strict";
import React from "react";
import Row from "./row";

/*
  2 dimensional array e.g.
  [[row1cell1, row1cell2], [row2cell1, row2cell2]]
*/
export default function Board(props) {  
  const rows = props.board.map((r,i) => {
    return <Row key={i} row={r} rowIndex={i} cellClick={props.cellHandler}/>;
  });
  return (
    <div className="board">
      {rows}
    </div>
  );
};