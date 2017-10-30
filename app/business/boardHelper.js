"use strict";

const helper = state => {      

  function getLeft(row, cell) {
    return cell == 0 ? state.board[row][state.width - 1] : state.board[row][cell - 1];
  }

  function getUpperLeft(row, cell) {
    if(row == 0) {
      return cell == 0 ? state.board[state.height - 1][state.width - 1] : state.board[state.height - 1][cell - 1];
    } else {
      return cell == 0 ? state.board[row - 1][state.width - 1] : state.board[row - 1][cell - 1];
    }
  };

  function getUpper(row, cell) {
    return row == 0 ? state.board[state.height - 1][cell] : state.board[row - 1][cell];
  };

  function getUpperRight(row, cell) {
    if(row == 0) {
      return cell == state.width - 1 ? state.board[state.height - 1][0] : state.board[state.height - 1][cell + 1];
    } else {
      return cell == state.width - 1 ? state.board[row - 1][0] : state.board[row - 1][cell + 1];
    }
  };

  function getRight(row, cell) {
    return cell == state.width - 1 ? state.board[row][0] : state.board[row][cell + 1];
  };

  function getLowerRight(row, cell) {
    if(row == state.height - 1) {
      return cell == state.width - 1 ? state.board[0][0] : state.board[state.height - 1][cell + 1];
    } else {
      return cell == state.width - 1 ? state.board[row + 1][0] : state.board[row + 1][cell + 1];
    }
  };

  function getLower(row, cell) {
    return row == state.height - 1 ? state.board[0][cell] : state.board[row + 1][cell];
  };

  function getLowerLeft(row, cell) {
    if(row == state.height - 1) {
      return cell == 0 ? state.board[0][state.width - 1] : state.board[0][cell - 1];
    } else {
      return cell == 0 ? state.board[row + 1][state.width - 1] : state.board[row + 1][cell - 1];
    }
  };

  return {
    getNeighbors: function(row, cell) {
      return {
        left: getLeft(row, cell),
        upperLeft: getUpperLeft(row, cell),
        upper: getUpper(row, cell),
        upperRight: getUpperRight(row, cell),
        right: getRight(row, cell),
        lowerRight: getLowerRight(row, cell),
        lower: getLower(row, cell),
        lowerLeft: getLowerLeft(row, cell)
      }
    }
  };
}

export default helper;