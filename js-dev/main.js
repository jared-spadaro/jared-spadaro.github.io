"use strict";

const NUM_SQUARES = 441;
const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;

function Square(props) {
  return (
    <button key={props.id} id={props.id} className={props.class}></button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : this.initBoard(),
      headDirection : 1,
      tailDirection : 1,
      head : 112,
      tail : 110,
      turns : new Map() //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
    };
    this.initBoard();
    window.setInterval(this.move.bind(this), 500);
  }

  initBoard() {
    const squares = Array(400).fill(false);
    squares[110] = squares[111] = squares[112] = true;
    return squares;
  }
  
  handleKeyPress(event) {
    let dir;
    console.log('in key press, event.key = ' + event.key);
    switch (event.key) {
      case 'ArrowDown':
        dir = 21;
      case 'ArrowUp':
        dir = -21;
      case 'ArrowLeft':
        dir = -1;
      case 'ArrowRight':
        dir = 1;
      default:
        dir = null;
    }
    const turns = this.state.turns.slice();
    if (dir) turns.set(this.state.head, dir);
    else throw new Error('dir is null');
    this.setState({
      headDirection : dir,
      turns : turns
    });
  }

  move() {
    const squares = this.state.squares.slice();
    const dir = this.state.headDirection;
    const turns = new Map(this.state.turns);
    //move the head in the proper direction
    if (this.state.head + dir > 0 && this.state.head + dir < NUM_SQUARES) {
      squares[this.state.head + dir] = true;
    }
    else throw new Error('reached boundary');
    squares[this.state.tail] = false;
    //check if tail is at a turn
    let tailDir;
    if (turns.has(this.state.tail)) {
      tailDir = turns.get(this.state.tail);
      turns.delete(this.state.tail);
    }
    else {
      tailDir = this.state.tailDirection;
    }
    this.setState({
      squares : squares,
      head : this.state.head + dir,
      tail : this.state.tail + tailDir,
      tailDirection : tailDir,
      turns : turns
    });
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  renderSquare(i) {
    const className = this.state.squares[i] ? 'black-square' : 'white-square';
    return (
      <Square
        key={i}
        id={i}
        class={className}
      />
    );
  }

  render() {
    let squareRows = [];
    let ndx = 0;
    for (let i = 0; i < 21; i++) {
      let squares = [];
      for (let j = 0; j < 21; j++) {
        squares.push(this.renderSquare(ndx++));
      }
      squareRows.push(<div key={i} className="board-row">{squares}</div>);
    }
    return (
      <div tabIndex="0" onKeyPress={this.handleKeyPress}>
        {squareRows}
      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
window.setInterval(this.setSquares)
