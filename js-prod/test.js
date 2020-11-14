// Display a "Like" <button>
function LikeButton() {
  var _this = this;

  return React.createElement(
    "button",
    {
      onClick: function onClick() {
        return _this.setState({ liked: true });
      } },
    "Like"
  );
}

var domContainer = document.querySelector("#react-container");
ReactDOM.render(LikeButton, domContainer);