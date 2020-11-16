"use strict";

import ReactDOM from "react-dom";
import react from "react";

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
ReactDOM.render(LikeButton, domContainer);
