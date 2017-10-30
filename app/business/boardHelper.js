"use strict";

export default {
  getLeft: (row, cell) => {
    return cell == 0 ? state.board[row][state.width - 1] : state.board[row][cell - 1];
  },

  getUpperLeft: (row, cell) => {
    if(row == 0) {
      return cell == 0 ? state.board[state.height - 1][state.width - 1] : state.board[state.height - 1][cell - 1];
    } else {
      return cell == 0 ? state.board[row - 1][state.width - 1] : state.board[row - 1][cell - 1];
    }
  },

  getUpper: (row, cell) => {
    return row == 0 ? state.board[state.height - 1][cell] : state.board[row - 1][cell];
  },

  getUpperRight: (row, cell) => {
    if(row == 0) {
      return cell == state.width - 1 ? state.board[state.height - 1][0] : state.board[state.height - 1][cell + 1];
    } else {
      return cell == state.width - 1 ? state.board[row - 1][0] : state.board[row - 1][cell + 1];
    }
  },

  getRight: (row, cell) => {
    return cell == state.width - 1 ? state.board[row][0] : state.board[row][cell + 1];
  },

  getLowerRight: (row, cell) => {
    if(row == state.height - 1) {
      return cell == state.width - 1 ? state.board[0][0] : state.board[state.height - 1][cell + 1];
    } else {
      return cell == state.width - 1 ? state.board[row + 1][0] : state.board[row + 1][cell + 1];
    }
  },

  getLower: (row, cell) => {
    return row == state.height - 1 ? state.board[0][cell] : state.board[row + 1][cell];
  },

  getLowerLeft: (row, cell) => {
    if(row == state.height - 1) {
      return cell == 0 ? state.board[0][state.width - 1] : state.board[0][cell - 1];
    } else {
      return cell == 0 ? state.board[row + 1][state.width - 1] : state.board[row + 1][cell - 1];
    }
  }
}