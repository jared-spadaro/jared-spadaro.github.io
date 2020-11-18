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
      head : 47,
      tail : 45,
      turns : new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start : false,
      gameOver : false
    };
    for (let i = 0; i < NUM_SQUARES; i++) {
      console.log(JSON.stringify(this.state.squares[i]));
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    window.setInterval(this.move.bind(this), 100);
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  initBoard() {
    let squares = Array(NUM_SQUARES).fill({
      isSnake : false,
      isFood : false
    });
    for (let i = 0; i < NUM_SQUARES; i++) {
      console.log(JSON.stringify(squares[i]));
    }
    
    //initialize snake
    squares[45] = squares[46] = squares[47] = {
      isSnake : true,
      isFood : false
    };
    
    //initialize food
    squares[this.getRandom(80, NUM_SQUARES)] = {
      isSnake : false,
      isFood : true
    };
    for (let i = 0; i < NUM_SQUARES; i++) {
      console.log(JSON.stringify(squares[i]));
    }
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
    
    //check for boundaries
    if ((dir === RIGHT && (this.state.head + 1) % 20 === 0) ||  //19,39,59,79,etc
        (dir === LEFT && this.state.head % 20 === 0) ||
        (dir === UP && this.state.head < 20) ||
        (dir === DOWN && this.state.head > 379) || 
        (squares[this.state.head + dir].isSnake)) {
      this.setState({
        gameOver : true
      });
    }

    //move the head in the proper direction
    squares[this.state.head + dir].isSnake = true;

    //is food, place food in new spot and keep tail
    if (squares[this.state.head + dir].isFood) {
      squares[this.state.head + dir].isFood = false;
      let ndx = this.getRandom(0, NUM_SQUARES);
      while (squares[ndx].isSnake) ndx = this.getRandom(0, NUM_SQUARES);
      squares[ndx].isFood = true;
    }
    //no food, remove tail
    else {
      squares[this.state.tail].isSnake = false;
    }
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
    console.log('start of handle click. state = ' + JSON.stringify(this.state));
    if (!this.state.start) {
      this.setState({
        start : true
      });
    }
    console.log('end of handle click. state = ' + JSON.stringify(this.state));
  }

  renderSquare(i) {
    const className = (this.state.squares[i].isSnake || this.state.squares[i].isFood) ? 
     'black-square' : 'white-square';
    return (
      <Square
        key={i}
        id={i}
        class={className}
      />
    );
  }

  reset() {
    this.setState({
        squares : this.initBoard(),
        headDirection : RIGHT,
        tailDirection : RIGHT,
        head : 47,
        tail : 45,
        turns : new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
        start : false,
        gameOver : false
    });
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
    if (this.state.gameOver) {
      return (
        <div className="game-over">
          Game Over<br/>
          <button className="back-button" onClick={this.reset}>Go Back</button>
        </div>
      );
    }
    else {
      return (
        <div id="board" tabIndex="0" onClick={this.handleClick} onKeyDown={this.handleKeyPress}>
          {squareRows}
        </div>
      );
    }
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
