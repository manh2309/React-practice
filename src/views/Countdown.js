import React from "react";

class CountDown extends React.Component {
  state = {
    count: 10,
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    //   console.log("Me");
    // }, 1000);
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count - 1,
      });
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count && this.state.count === 0) {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
  render() {
    return (
      <>
        {this.state.count === 0 ? (
          <div>TimeUp!!! Class</div>
        ) : (
          <div>{this.state.count}</div>
        )}
      </>
    );
  }
}
export default CountDown;
