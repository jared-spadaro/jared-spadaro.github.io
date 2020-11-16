"use strict";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }
    return (
      <button 
        onClick={() => this.setState({ liked: true })}>
        Like
      </button>
    );
  }
}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(<LikeButton/>, domContainer);
console.log('rendered node --> ' + JSON.stringify(LikeButton));
console.log('testing456');
