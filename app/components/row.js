"use strict";
import React from "react";

export default function Row(props) {    
  const rowProps = {
    style: {
      height: "10px"
    },
    className: "row"
  };  
  const cells = props.row.map((c,i) => {
    const cellProps = {
      style: {
        border: "1px solid black",      
        display: "inline-block",
        height: "10px",
        width: "10px",
        backgroundColor: c.alive ? "#175118" : "gray"
      },
      key: i,
      className: c.alive,
      onClick: props.cellClick.bind(null, props.rowIndex,i)
    }
    return <div {...cellProps}></div>;
  });
  return (
    <div {...rowProps} >
      {cells}
    </div>
  );
}