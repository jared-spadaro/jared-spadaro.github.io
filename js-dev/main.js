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
      direction : RIGHT
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
    console.log('move, dir = ' + dir);
    for (let i = 0; i < NUM_SQUARES; i++) {
      if (squares[i] === true) {
        if (dir === RIGHT) {
          if (i < NUM_SQUARES - 1 && squares[i+1] === false) {
            console.log('adding square in move (index = ' + i + ')');
            squares[i+1] = true;
          }
          if (i > 0 && squares[i-1] === false) {
            console.log('removing square in move (index = ' + i + ')');
            squares[i] = false;
          }
        }
      }
    }
    this.setState({
      squares : squares,
      swap : !this.state.swap
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
      <div>
        {squareRows}
      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
window.setInterval(this.setSquares)
