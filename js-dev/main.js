"use strict";

function Square(props) {
  return (
    <button key={props.id} id={props.id} className={props.class} onClick={props.onClick}></button>
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
    this.setState({
      squares : squares
    });
    console.log('setting state to ' + JSON.stringify(this.state.squares));
  }

  renderSquare(i) {
    const className = this.state.squares[i] ? 'black-square' : 'white-square';
    console.log('setting classname to ' + className + ', state = ' + JSON.stringify(this.state.squares));
    return (
      <Square
        id={i}
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
