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
      <div>
        <button 
          onClick={() => this.setState({ liked: true })}>
          Like
        </button>
        <p>testing</p>
      </div>
    );
  }
}

ReactDOM.render(<LikeButton/>, document.querySelector("#react-container"));
