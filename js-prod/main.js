"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NUM_SQUARES = 400;
var RIGHT = 1;
var LEFT = -1;
var UP = -20;
var DOWN = 20;

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      page: "Home"
    };
    _this.setPage = _this.setPage.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: "setPage",
    value: function setPage(event) {
      console.log('setting page to ' + event.target.dataset.id);
      this.setState({
        page: event.target.dataset.id
      });
    }

    //check what page we are on and load it

  }, {
    key: "render",
    value: function render() {
      var content = void 0;
      switch (this.state.page) {
        case 'Home':
          content = React.createElement(Home, null);
          break;
        case 'Snake':
          content = React.createElement(Board, null);
          break;
        default:
          content = null;
          break;
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-expand-md navbar-dark bg-dark fixed-top" },
          React.createElement(
            "a",
            { className: "navbar-brand", href: "#", onClick: this.setPage, "data-id": "Home" },
            "Home"
          ),
          React.createElement(
            "button",
            {
              className: "navbar-toggler",
              type: "button",
              "data-toggle": "collapse",
              "data-target": "#navbarsExampleDefault",
              "aria-controls": "navbarsExampleDefault",
              "aria-expanded": "false",
              "aria-label": "Toggle navigation"
            },
            React.createElement("span", { className: "navbar-toggler-icon" })
          ),
          React.createElement(
            "div",
            { className: "collapse navbar-collapse", id: "navbarsExampleDefault" },
            React.createElement(
              "ul",
              { className: "navbar-nav mr-auto" },
              React.createElement(
                "li",
                { className: "nav-item active" },
                React.createElement(
                  "a",
                  { className: "nav-link", href: "#" },
                  "Google ",
                  React.createElement(
                    "span",
                    { className: "sr-only" },
                    "(current)"
                  )
                )
              ),
              React.createElement(
                "li",
                { className: "nav-item" },
                React.createElement(
                  "a",
                  { className: "nav-link", href: "#", onClick: this.setPage, "data-id": "Snake" },
                  "Snake"
                )
              ),
              React.createElement(
                "li",
                { className: "nav-item" },
                React.createElement(
                  "a",
                  {
                    className: "nav-link disabled",
                    href: "#",
                    tabIndex: "-1",
                    "aria-disabled": "true"
                  },
                  "???"
                )
              ),
              React.createElement(
                "li",
                { className: "nav-item dropdown" },
                React.createElement(
                  "a",
                  {
                    className: "nav-link dropdown-toggle",
                    href: "#",
                    id: "dropdown01",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "false"
                  },
                  "Check These Out"
                ),
                React.createElement(
                  "div",
                  { className: "dropdown-menu", "aria-labelledby": "dropdown01" },
                  React.createElement(
                    "a",
                    { className: "dropdown-item", href: "#" },
                    "Action"
                  ),
                  React.createElement(
                    "a",
                    { className: "dropdown-item", href: "#" },
                    "Another action"
                  ),
                  React.createElement(
                    "a",
                    { className: "dropdown-item", href: "#" },
                    "Something else here"
                  )
                )
              )
            ),
            React.createElement(
              "form",
              { className: "form-inline my-2 my-lg-0" },
              React.createElement("input", {
                className: "form-control mr-sm-2",
                type: "text",
                placeholder: "Search",
                "aria-label": "Search"
              }),
              React.createElement(
                "button",
                { className: "btn btn-secondary my-2 my-sm-0", type: "submit" },
                "Search"
              )
            )
          )
        ),
        content
      );
    }
  }]);

  return Header;
}(React.Component);

function Home() {
  return React.createElement(
    "div",
    { className: "container", id: "jsDiv" },
    React.createElement(
      "div",
      { className: "starter-template" },
      React.createElement(
        "h1",
        null,
        "Official Site of Antisocialistic"
      )
    )
  );
}

function Square(props) {
  return React.createElement(
    "button",
    { key: props.id, id: props.id, className: props.class },
    React.createElement(
      "span",
      { className: "food-label" },
      props.label
    )
  );
}

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this2 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this2.state = {
      squares: _this2.initBoard(),
      headDirection: RIGHT,
      tailDirection: RIGHT,
      head: 47,
      tail: 45,
      turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start: false,
      gameOver: false,
      score: 0
    };
    _this2.handleKeyPress = _this2.handleKeyPress.bind(_this2);
    _this2.handleClick = _this2.handleClick.bind(_this2);
    _this2.reset = _this2.reset.bind(_this2);
    window.setInterval(_this2.move.bind(_this2), 100);
    return _this2;
  }

  _createClass(Board, [{
    key: "getRandom",
    value: function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: "initBoard",
    value: function initBoard() {
      var squares = Array(NUM_SQUARES).fill({
        isSnake: false,
        isFood: false
      });

      //initialize snake
      squares[45] = squares[46] = squares[47] = {
        isSnake: true,
        isFood: false
      };

      //initialize food
      squares[this.getRandom(80, NUM_SQUARES)] = {
        isSnake: false,
        isFood: true
      };
      return squares;
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      event.preventDefault();
      var dir = void 0;
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
      var turns = new Map(this.state.turns);
      if (dir) turns.set(this.state.head, dir);else throw new Error("dir is null");
      this.setState({
        headDirection: dir,
        turns: turns
      });
    }
  }, {
    key: "move",
    value: function move() {
      if (!this.state.start) return;
      var squares = this.state.squares.slice();
      var dir = this.state.headDirection;
      var turns = new Map(this.state.turns);
      var score = this.state.score;
      var found = false;

      //check for boundaries
      if (dir === RIGHT && (this.state.head + 1) % 20 === 0 || //19,39,59,79,etc
      dir === LEFT && this.state.head % 20 === 0 || dir === UP && this.state.head < 20 || dir === DOWN && this.state.head > 379 || squares[this.state.head + dir].isSnake) {
        this.setState({
          gameOver: true
        });
        return;
      }

      //is food, place food in new spot and keep tail
      if (squares[this.state.head + dir].isFood) {
        found = true;
        score++;
        console.log("found food");
        squares[this.state.head + dir] = {
          isSnake: true,
          isFood: false
        };
        var ndx = this.getRandom(0, NUM_SQUARES);
        while (squares[ndx].isSnake) {
          ndx = this.getRandom(0, NUM_SQUARES);
        }
        squares[ndx] = {
          isSnake: false,
          isFood: true
        };
      }
      //no food, remove tail
      else {
          squares[this.state.tail] = {
            isSnake: false,
            isFood: false
          };
        }

      //move the head in the proper direction
      if (squares[this.state.head + dir]) {
        squares[this.state.head + dir] = {
          isSnake: true,
          isFood: false
        };
      } else {
        this.setState({
          gameOver: true
        });
        return;
      }

      //check if tail is at a turn
      var tailDir = void 0;
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
        score: score
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        start: true
      });
    }
  }, {
    key: "renderSquare",
    value: function renderSquare(i) {
      var className = this.state.squares[i].isSnake ? "black-square" : "white-square";
      var label = this.state.squares[i].isFood ? "*" : "";
      return React.createElement(Square, { key: i, id: i, "class": className, label: label });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        squares: this.initBoard(),
        headDirection: RIGHT,
        tailDirection: RIGHT,
        head: 47,
        tail: 45,
        turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
        start: false,
        gameOver: false,
        score: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log('rendering board');
      var squareRows = [];
      var ndx = 0;
      for (var i = 0; i < 20; i++) {
        var squares = [];
        for (var j = 0; j < 20; j++) {
          squares.push(this.renderSquare(ndx++));
        }
        squareRows.push(React.createElement(
          "div",
          { key: i, className: "board-row" },
          squares
        ));
      }
      if (this.state.gameOver) {
        return React.createElement(
          "div",
          { className: "game-over" },
          "Game Over",
          React.createElement("br", null),
          React.createElement(
            "button",
            { className: "btn btn-dark", onClick: this.reset },
            "Go Back"
          )
        );
      } else {
        return React.createElement(
          "div",
          { className: "game" },
          React.createElement(
            "div",
            { className: "game-info" },
            React.createElement(
              "div",
              { className: "snake-title" },
              "Snake! (Click on game to start)"
            ),
            React.createElement(
              "div",
              { className: "snake-title" },
              "Score: ",
              this.state.score
            )
          ),
          React.createElement(
            "div",
            {
              className: "board",
              id: "board",
              tabIndex: "0",
              onClick: this.handleClick,
              onKeyDown: this.handleKeyPress
            },
            squareRows
          )
        );
      }
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Header, null), document.querySelector("#root"));