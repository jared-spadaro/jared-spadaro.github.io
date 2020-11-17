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

function Square(props) {
  return React.createElement('button', { key: props.id, id: props.id, className: props.class });
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = {
      squares: _this.initBoard(),
      headDirection: RIGHT,
      tailDirection: RIGHT,
      head: 112,
      tail: 110,
      turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
      start: false,
      gameOver: false
    };
    _this.initBoard();
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleBackClick = _this.handleBackClick.bind(_this);
    window.setInterval(_this.move.bind(_this), 100);
    return _this;
  }

  _createClass(Board, [{
    key: 'initBoard',
    value: function initBoard() {
      var squares = Array(400).fill(false);
      squares[110] = squares[111] = squares[112] = true;
      return squares;
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      event.preventDefault();
      var dir = void 0;
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
      var turns = new Map(this.state.turns);
      if (dir) turns.set(this.state.head, dir);else throw new Error('dir is null');
      this.setState({
        headDirection: dir,
        turns: turns
      });
    }
  }, {
    key: 'move',
    value: function move() {
      if (!this.state.start) return;
      var squares = this.state.squares.slice();
      var dir = this.state.headDirection;
      var turns = new Map(this.state.turns);

      //first, check for boundaries
      if (dir === RIGHT && (this.state.head + 1) % 20 === 0 || //19,39,59,79,etc
      dir === LEFT && this.state.head % 20 === 0 || dir === UP && this.state.head < 20 || dir === DOWN && this.state.head > 379) {
        this.setState({
          gameOver: true
        });
      }

      //move the head in the proper direction
      squares[this.state.head + dir] = true;
      //set tail to false
      squares[this.state.tail] = false;
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
        tail: this.state.tail + tailDir,
        tailDirection: tailDir,
        turns: turns
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (!this.state.start) {
        this.setState({
          start: true
        });
      }
    }
  }, {
    key: 'renderSquare',
    value: function renderSquare(i) {
      var className = this.state.squares[i] ? 'black-square' : 'white-square';
      return React.createElement(Square, {
        key: i,
        id: i,
        'class': className
      });
    }
  }, {
    key: 'handleBackClick',
    value: function handleBackClick() {
      this.setState({
        squares: this.initBoard(),
        headDirection: RIGHT,
        tailDirection: RIGHT,
        head: 112,
        tail: 110,
        turns: new Map(), //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
        start: false,
        gameOver: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var squareRows = [];
      var ndx = 0;
      for (var i = 0; i < 20; i++) {
        var squares = [];
        for (var j = 0; j < 20; j++) {
          squares.push(this.renderSquare(ndx++));
        }
        squareRows.push(React.createElement(
          'div',
          { key: i, className: 'board-row' },
          squares
        ));
      }
      if (this.state.gameOver) {
        return React.createElement(
          'div',
          { 'class': 'game-over' },
          'Game Over',
          React.createElement('br', null),
          React.createElement(
            'button',
            { 'class': 'back-button', onClick: this.handleBackClick },
            'Go Back'
          )
        );
      } else {
        return React.createElement(
          'div',
          { id: 'board', tabIndex: '0', onClick: this.handleClick, onKeyDown: this.handleKeyPress },
          squareRows
        );
      }
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.querySelector("#snake-game"));