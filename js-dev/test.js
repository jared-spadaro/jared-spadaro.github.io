// Display a "Like" <button>
function LikeButton() {
  return (
    <button 
        onClick={() => this.setState({ liked: true })}>
        Like
    </button>
  );
}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(LikeButton, domContainer);
