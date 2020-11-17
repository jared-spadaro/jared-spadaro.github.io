"use strict";

function Square(props) {
  return (
    <button key={props.value} id={props.value} className={props.class} onClick={props.onClick}></button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(400).fill(false)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = !squares[i];
    console.log('setting squares[' + i + '] to ' + !squares[i]);
    this.setState({
      squares : squares
    });
  }

  renderSquare(i) {
    const className = this.state.squares[i] ? 'black-square' : 'white-square';
    return (
      <Square
        value={i}
        onClick={i => this.handleClick(i)}
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
      <div>
        {squareRows}
      </div>
    );
  }
}

ReactDOM.render(<Board/>, document.querySelector("#snake-game"));
