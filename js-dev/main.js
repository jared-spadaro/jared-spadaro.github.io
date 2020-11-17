"use strict";

const numSquares = 441;

function Square(props) {
  return (
    <button key={props.id} id={props.id} className={props.class} onClick={props.onClick}></button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(400).fill(false),
      swap : false
    };
    window.setInterval(this.setSquares.bind(this), 500);
  }

  handleClick(i) {
    console.log('handle click, i = ' + i);
  }

  setSquares() {
    const squares = this.state.squares.slice();
    for (let i = 0; i < numSquares; i++) {
      if (i % 2 === 0) {
        squares[i] = this.state.swap ? false : true;
      }
      else {
        squares[i] = this.state.swap ? true : false;
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
