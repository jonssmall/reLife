"use strict";
import React from "react";
import Board from "../components/board";

/*
  The GameContainer is responsible for resolving the underlying state of the game board
  and passing that state to the Board react component to display in the view.
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
    const neighbors = this.getNeighbors(row, cell);    
    let liveCount = 0;
    for (const key of Object.keys(neighbors)) {      
      if (neighbors[key].alive) liveCount++;
    }        
    return cellObj.alive ? (liveCount > 1 && liveCount < 4) : liveCount == 3;    
  }

  // for given coords get the 8 adjacent neighbors,
  // including other side of board
  getNeighbors(row, cell) {        
    return {
      left: this.getLeft(row, cell),
      upperLeft: this.getUpperLeft(row, cell),
      upper: this.getUpper(row, cell),
      upperRight: this.getUpperRight(row, cell),
      right: this.getRight(row, cell),
      lowerRight: this.getLowerRight(row, cell),
      lower: this.getLower(row, cell),
      lowerLeft: this.getLowerLeft(row, cell)
    }
  };

  getLeft(row, cell) {
    return cell == 0 ? this.state.board[row][this.state.width - 1] : this.state.board[row][cell - 1];
  };

  getUpperLeft(row, cell) {
    if(row == 0) {
      return cell == 0 ? this.state.board[this.state.height - 1][this.state.width - 1] : this.state.board[this.state.height - 1][cell - 1];
    } else {
      return cell == 0 ? this.state.board[row - 1][this.state.width - 1] : this.state.board[row - 1][cell - 1];
    }
  };

  getUpper(row, cell) {
    return row == 0 ? this.state.board[this.state.height - 1][cell] : this.state.board[row - 1][cell];
  };

  getUpperRight(row, cell) {
    if(row == 0) {
      return cell == this.state.width - 1 ? this.state.board[this.state.height - 1][0] : this.state.board[this.state.height - 1][cell + 1];
    } else {
      return cell == this.state.width - 1 ? this.state.board[row - 1][0] : this.state.board[row - 1][cell + 1];
    }
  };

  getRight(row, cell) {
    return cell == this.state.width - 1 ? this.state.board[row][0] : this.state.board[row][cell + 1];
  };

  getLowerRight(row, cell) {
    if(row == this.state.height - 1) {
      return cell == this.state.width - 1 ? this.state.board[0][0] : this.state.board[this.state.height - 1][cell + 1];
    } else {
      return cell == this.state.width - 1 ? this.state.board[row + 1][0] : this.state.board[row + 1][cell + 1];
    }
  };

  getLower(row, cell) {
    return row == this.state.height - 1 ? this.state.board[0][cell] : this.state.board[row + 1][cell];
  };

  getLowerLeft(row, cell) {
    if(row == this.state.height - 1) {
      return cell == 0 ? this.state.board[0][this.state.width - 1] : this.state.board[0][cell - 1];
    } else {
      return cell == 0 ? this.state.board[row + 1][this.state.width - 1] : this.state.board[row + 1][cell - 1];
    }
  };

  componentDidMount() {
    this.startLife();
  };
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  clearCells() {
    const board = this.state.board;    
    const clearedBoard = [];
    board.map((r, rIndex) => {
      const newRow = [];
      r.map((c, cIndex) => {
        newRow.push({
          alive: false
        });
      });
      clearedBoard.push(newRow);
    });    
    this.setState({board: clearedBoard, generation: 0});
    clearInterval(this.intervalId);
    //todo: clearBoard & nextBoard can be DRYed out
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