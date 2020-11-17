"use strict";

const NUM_SQUARES = 400;
const RIGHT = 1;
const LEFT = -1;
const UP = -20;
const DOWN = 20;

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
      headDirection : RIGHT,
      tailDirection : RIGHT,
      head : 112,
      tail : 110,
      turns : new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start : false
    };
    this.initBoard();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    window.setInterval(this.move.bind(this), 100);
  }

  initBoard() {
    const squares = Array(400).fill(false);
    squares[110] = squares[111] = squares[112] = true;
    return squares;
  }

  handleKeyPress(event) {
    event.preventDefault();
    let dir;
    console.log('in key press, event.key = ' + event.key);
    switch (event.key) {
      case 'ArrowDown':
        dir = DOWN;
        break;
      case 'ArrowUp':
        dir = UP;
        break;
      case 'ArrowLeft':
        dir = LEFT;
        break;
      case 'ArrowRight':
        dir = RIGHT;
        break;
      default:
        dir = null;
        break;
    }
    const turns = new Map(this.state.turns);
    if (dir) turns.set(this.state.head, dir);
    else throw new Error('dir is null');
    this.setState({
      headDirection : dir,
      turns : turns
    });
  }

  move() {
    if (!this.state.start) return;
    const squares = this.state.squares.slice();
    const dir = this.state.headDirection;
    const turns = new Map(this.state.turns);
    
    //first, check for boundaries
    if ((dir === RIGHT && (this.state.head + 1) % 20 === 0) ||  //19,39,59,79,etc
     (dir === LEFT && this.state.head % 20 === 0) ||
     (dir === UP && this.state.head < 20) ||
     (dir === DOWN && this.state.head > 379)) {
      throw new Error('reached boundary');
    }

    //move the head in the proper direction
    squares[this.state.head + dir] = true;
    //set tail to false
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

  handleClick() {
    if (!this.state.start) {
      this.setState({
        start : true
      });
    }
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
    for (let i = 0; i < 20; i++) {
      let squares = [];
      for (let j = 0; j < 20; j++) {
        squares.push(this.renderSquare(ndx++));
      }
      squareRows.push(<div key={i} className="board-row">{squares}</div>);
    }
    return (
      <div id="board" tabIndex="0" onClick={this.handleClick} onKeyDown={this.handleKeyPress}>
        {squareRows}
      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
