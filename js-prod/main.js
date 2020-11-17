"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NUM_SQUARES = 441;
var RIGHT = 0;
var LEFT = 1;
var UP = 2;
var DOWN = 3;

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
      turns: new Map() //<location, directon> -- add on keyboardInterrupt, remove when tail arrives
    };
    _this.initBoard();
    window.setInterval(_this.move.bind(_this), 500);
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
      var dir = void 0;
      console.log('in key press, event.key = ' + event.key);
      switch (event.key) {
        case 'ArrowDown':
          dir = 21;
        case 'ArrowUp':
          dir = -21;
        case 'ArrowLeft':
          dir = -1;
        case 'ArrowRight':
          dir = 1;
        default:
          dir = null;
      }
      var turns = this.state.turns.slice();
      if (dir) turns.set(this.state.head, dir);else throw new Error('dir is null');
      this.setState({
        headDirection: dir,
        turns: turns
      });
    }
  }, {
    key: 'move',
    value: function move() {
      var squares = this.state.squares.slice();
      var dir = this.state.headDirection;
      var turns = new Map(this.state.turns);
      //move the head in the proper direction
      if (this.state.head + dir > 0 && this.state.head + dir < NUM_SQUARES) {
        squares[this.state.head + dir] = true;
      } else throw new Error('reached boundary');
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
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'renderSquare',
    value: function renderSquare(i) {
      var className = this.state.squares[i] ? 'black-square' : 'white-square';
      return React.createElement(Square, {
        id: i,
        'class': className
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var squareRows = [];
      var ndx = 0;
      for (var i = 0; i < 21; i++) {
        var squares = [];
        for (var j = 0; j < 21; j++) {
          squares.push(this.renderSquare(ndx++));
        }
        squareRows.push(React.createElement(
          'div',
          { key: i, className: 'board-row' },
          squares
        ));
      }
      return React.createElement(
        'div',
        { onKeyPress: this.handleKeyPress },
        squareRows
      );
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.querySelector("#snake-game"));
window.setInterval(this.setSquares);