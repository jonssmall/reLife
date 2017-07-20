var React = require("react");
var ReactDom = require("react-dom");

const boardParams = {
  width: 50,
  height: 50,
  delay: 100,
};

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
    const board = [];
    //cool new ES6 iteration. The underscore means undefined.
    [...Array(this.state.height)].map((_, i) => board.push(this.buildRow()));
    this.setState({board, generation: 0});
  };

  buildRow() {
    const row = [];
    for(var i = 1; i <= this.state.width; i++) {
      const cell = {
        alive: Boolean(Math.round(Math.random()))
      }
      row.push(cell);
    }
    return row;
  };

  nextBoard() {
    const board = this.state.board;
    let generation = this.state.generation;
    const newBoard = [];
    board.map((r, rIndex) => {
      const newRow = [];
      r.map((c, cIndex) => {
        newRow.push({
          alive: this.nextState(c, rIndex, cIndex)
        });
      });
      newBoard.push(newRow);
    });
    generation++;
    this.setState({board: newBoard, generation});
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

  render() {    
    return (
      <div>
        <button onClick={this.startLife.bind(this)}>Restart</button>
        <button onClick={this.clearCells.bind(this)}>Clear</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
        <button onClick={this.resume.bind(this)}>Play</button>
        Generation: {this.state.generation}
        {/*<button onClick={this.nextBoard}>Test Board</button>*/}
        <Board board={this.state.board} />
      </div>
    );
  };
}

//[[row1cell1, row1cell2], [row2cell1, row2cell2]]
function Board(props) {
  const rows = [];
  props.board.map((r,i) => {
    rows.push(<Row key={i} row={r} />)
  })
  return (
    <div className="board">
      {rows}
    </div>
  );
};

function Row(props) {    
  const rowStyle = {
    height: "10px"
  };
  const cells = [];
  props.row.map((c,i) => {        
    const cellStyle = {
      border: "1px solid black",
      //borderRight: "1px solid black", 
      display: "inline-block",
      height: "10px",
      width: "10px",
      backgroundColor: c.alive ? "#175118" : "gray"
    };
    cells.push(<div key={i} style={cellStyle} className={c.alive} ></div>)
  });
  return (
    <div className="row" style={rowStyle} >
      {cells}
    </div>
  );
};

ReactDom.render(
  <GameContainer {...boardParams} />,
  document.getElementById("app")
);