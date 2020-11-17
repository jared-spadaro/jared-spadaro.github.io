"use strict";

const NUM_SQUARES = 441;
const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;

function Square(props) {
  return (
    <button key={props.id} id={props.id} className={props.class} onClick={props.onClick}></button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : this.initBoard(),
      direction : RIGHT,
      head : 112,
      tail : 110,
      turns : [] //add on keyboardInterrupt, remove when tail arrives
    };
    this.initBoard();
    window.setInterval(this.move.bind(this), 500);
  }

  initBoard() {
    const squares = Array(400).fill(false);
    squares[110] = squares[111] = squares[112] = true;
    return squares;
  }

  handleClick(i) {
    console.log('handle click, i = ' + i);
  }

  move() {
    const squares = this.state.squares.slice();
    const dir = this.state.direction;
    if (this.state.head + 1 < NUM_SQUARES) {
      squares[this.state.head + 1] = true;
    }
    if (this.state.tail < NUM_SQUARES - 3) {
      squares[this.state.tail] = false;
    }
    this.setState({
      squares : squares,
      swap : !this.state.swap,
      head : this.state.head+1,
      tail : this.state.tail+1
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
        id={i}
        onClick={() => this.handleClick(i)}
        class={className}
      />
    );
  }

  handleKeyPress(event) {
    let dir;
    console.log('in key press, event.key = ' + event.key);
    switch (event.key) {
      case 'ArrowDown':
        dir = DOWN;
      case 'ArrowUp':
        dir = UP;
      case 'ArrowLeft':
        dir = LEFT;
      case 'ArrowRight':
        dir = RIGHT;
      default:
        dir = null;
    }
    this.setState({
      direction : dir
    });
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
      <div onkeypress={this.handleKeyPress}>
        {squareRows}
      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
window.setInterval(this.setSquares)
