"use strict";

const NUM_SQUARES = 400;
const RIGHT = 1;
const LEFT = -1;
const UP = -20;
const DOWN = 20;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Home",
    };
    this.setPage = this.setPage.bind(this);
  }

  setPage(event) {
    this.setState({
      page : event.target.dataset.id
    });
  }

  //check what page we are on and load it
  render() {
    let content;
    switch (this.state.page) {
      case 'Home':
        content = <Home/>;
        break;
      case 'Snake':
        content = <Board/>;
      default:
        content = null;
        break;
    }
    return (
      <div>
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="generator" content="Jekyll v4.1.1" />

          <link
            rel="canonical"
            href="https://getbootstrap.com/docs/4.5/examples/starter-template/"
          />

          <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
          <link href="css/starter-template.css" rel="stylesheet" />
          <link href="css/styles.css" rel="stylesheet" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="favicon/site.webmanifest" />
        </head>
        <body>
          <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#" onClick={this.setPage} data-id="Home">
              Home
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.setPage} data-id="Snake">
                    Snake
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    ???
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="dropdown01"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Check These Out
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-secondary my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </body>
        {content}
      </div>
    );
  }
}

function Home() {
  return (
    <div class="container" id="jsDiv">
      <div class="starter-template">
        <h1>Official Site of Antisocialistic</h1>
        <p class="lead">Actual features TBD.</p>
      </div>
    </div>
  );
}

function Square(props) {
  return <button key={props.id} id={props.id} className={props.class}></button>;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.initBoard(),
      headDirection: RIGHT,
      tailDirection: RIGHT,
      head: 47,
      tail: 45,
      turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start: false,
      gameOver: false,
    };
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
      isSnake: false,
      isFood: false,
    });

    //initialize snake
    squares[45] = squares[46] = squares[47] = {
      isSnake: true,
      isFood: false,
    };

    //initialize food
    squares[this.getRandom(80, NUM_SQUARES)] = {
      isSnake: false,
      isFood: true,
    };
    return squares;
  }

  handleKeyPress(event) {
    event.preventDefault();
    let dir;
    switch (event.key) {
      case "ArrowDown":
        dir = DOWN;
        break;
      case "ArrowUp":
        dir = UP;
        break;
      case "ArrowLeft":
        dir = LEFT;
        break;
      case "ArrowRight":
        dir = RIGHT;
        break;
      default:
        dir = null;
        break;
    }
    const turns = new Map(this.state.turns);
    if (dir) turns.set(this.state.head, dir);
    else throw new Error("dir is null");
    this.setState({
      headDirection: dir,
      turns: turns,
    });
  }

  move() {
    if (!this.state.start) return;
    let squares = this.state.squares.slice();
    const dir = this.state.headDirection;
    const turns = new Map(this.state.turns);
    let found = false;

    //check for boundaries
    if (
      (dir === RIGHT && (this.state.head + 1) % 20 === 0) || //19,39,59,79,etc
      (dir === LEFT && this.state.head % 20 === 0) ||
      (dir === UP && this.state.head < 20) ||
      (dir === DOWN && this.state.head > 379) ||
      squares[this.state.head + dir].isSnake
    ) {
      this.setState({
        gameOver: true,
      });
      return;
    }

    //is food, place food in new spot and keep tail
    if (squares[this.state.head + dir].isFood) {
      found = true;
      console.log("found food");
      squares[this.state.head + dir] = {
        isSnake: true,
        isFood: false,
      };
      let ndx = this.getRandom(0, NUM_SQUARES);
      while (squares[ndx].isSnake) {
        ndx = this.getRandom(0, NUM_SQUARES);
      }
      squares[ndx] = {
        isSnake: false,
        isFood: true,
      };
    }
    //no food, remove tail
    else {
      squares[this.state.tail] = {
        isSnake: false,
        isFood: false,
      };
    }

    //move the head in the proper direction
    if (squares[this.state.head + dir]) {
      squares[this.state.head + dir] = {
        isSnake: true,
        isFood: false,
      };
    } else {
      this.setState({
        gameOver: true,
      });
      return;
    }

    //check if tail is at a turn
    let tailDir;
    if (turns.has(this.state.tail)) {
      tailDir = turns.get(this.state.tail);
      turns.delete(this.state.tail);
    } else {
      tailDir = this.state.tailDirection;
    }

    this.setState({
      squares: squares,
      head: this.state.head + dir,
      tail: !found ? this.state.tail + tailDir : this.state.tail,
      tailDirection: tailDir,
      turns: turns,
    });
  }

  handleClick() {
    this.setState({
      start: true,
    });
  }

  renderSquare(i) {
    const className =
      this.state.squares[i].isSnake || this.state.squares[i].isFood
        ? "black-square"
        : "white-square";
    return <Square key={i} id={i} class={className} />;
  }

  reset() {
    this.setState({
      squares: this.initBoard(),
      headDirection: RIGHT,
      tailDirection: RIGHT,
      head: 47,
      tail: 45,
      turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start: false,
      gameOver: false,
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
      squareRows.push(
        <div key={i} className="board-row">
          {squares}
        </div>
      );
    }
    if (this.state.gameOver) {
      return (
        <div className="game-over">
          Game Over
          <br />
          <button className="back-button" onClick={this.reset}>
            Go Back
          </button>
        </div>
      );
    } else {
      return (
        <div
          id="board"
          tabIndex="0"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyPress}
        >
          {squareRows}
        </div>
      );
    }
  }
}

ReactDOM.render(<Board />, document.querySelector("#snake-game"));
