"use strict";
import React from "react";
import Board from "../components/board";
import helper from "./boardHelper";

/*
  The GameContainer is responsible for resolving the underlying state of the game board
  and passing that state to the Board react component which in turn displays state in the view.
*/
class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      delay: props.delay,
      generation: 0,
      board: []
    };

    this.nextBoard = this.nextBoard.bind(this);
  };

  buildBoard() {    
    const board = [...Array(this.state.height)].map((_, i) => this.buildRow());
    this.setState({board, generation: 0});
  };

  buildRow() {    
    return [...Array(this.state.width)].map((_, i) => {
      return {alive: Boolean(Math.round(Math.random()))};
    });
  };

  nextBoard() {    
    const newBoard = this.state.board.map((r, rIndex) => {
      return r.map((c, cIndex) => {
        return {
          alive: this.nextState(c, rIndex, cIndex)
        };
      });
    });    
    this.setState({board: newBoard, generation: ++this.state.generation});
  };

  //return true/false based on Conway rules:
  // Alive, less than 2 neighbors - dead
  // Alive, 2-3 neighbors - alive
  // Alive, more than 3 neighbors - dead
  // Dead, exactly 3 neighbors - alive
  nextState(cellObj, row, cell) {        
    const neighbors = helper(this.state).getNeighbors(row, cell);
    let liveCount = 0;
    for (const key of Object.keys(neighbors)) {      
      if (neighbors[key].alive) liveCount++;
    }        
    return cellObj.alive ? (liveCount > 1 && liveCount < 4) : liveCount == 3;    
  }  

  componentDidMount() {
    this.startLife();
  };
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  clearCells() {    
    const clearedBoard = this.state.board.map((r, rIndex) => {      
      return r.map((c, cIndex) => {
        return {
          alive: false
        };
      });;
    });    
    this.setState({board: clearedBoard, generation: 0});
    clearInterval(this.intervalId);
    //todo: clearCells & nextBoard can be DRYed out
  }

  startLife() {
    clearInterval(this.intervalId);
    this.buildBoard();
    this.intervalId = setInterval(this.nextBoard.bind(this), this.state.delay);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  resume() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.nextBoard.bind(this), this.state.delay);    
  }

  flipCell(rowIndex, cellIndex) {
    const board = this.state.board;
    const cell = board[rowIndex][cellIndex];
    cell.alive = !cell.alive;
    this.setState({board});
  }

  render() {    
    return (
      <div>
        <button onClick={this.startLife.bind(this)}>Restart</button>
        <button onClick={this.clearCells.bind(this)}>Clear</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
        <button onClick={this.resume.bind(this)}>Play</button>
        Generation: {this.state.generation}        
        <Board board={this.state.board} cellHandler={this.flipCell.bind(this)} />
        <br/>
        Hint: Click a cell.
      </div>
    );
  };
}

export default GameContainer;