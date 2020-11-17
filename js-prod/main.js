"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
  return React.createElement('button', { key: props.value, id: props.value, className: props.class, onClick: props.onClick });
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this.state = {
      squares: Array(400).fill(false)
    };
    return _this;
  }

  _createClass(Board, [{
    key: 'handleClick',
    value: function handleClick(i) {
      var squares = this.state.squares.slice();
      squares[i] = !squares[i];
      console.log('setting squares[' + i + '] to ' + !squares[i]);
      this.setState({
        squares: squares
      });
    }
  }, {
    key: 'renderSquare',
    value: function renderSquare(i) {
      var _this2 = this;

      var className = this.state.squares[i] ? 'black-square' : 'white-square';
      return React.createElement(Square, {
        value: i,
        onClick: function onClick(i) {
          return _this2.handleClick(i);
        },
        'class': className
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
      return React.createElement(
        'div',
        null,
        squareRows
      );
    }
  }]);

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.querySelector("#snake-game"));