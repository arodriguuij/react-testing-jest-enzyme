import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: "",
    };
  }

  handleIncrementClick() {
    if (this.state.counter === 0 && this.state.error) {
      this.setState({ error: "" });
    }
    this.setState({ counter: this.state.counter + 1 });
  }

  handleDecrementClick() {
    if (this.state.counter === 0) {
      this.setState({ error: "The counter cannot go below 0" });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        {this.state.error && (
          <h2 className="errorMessage" data-test="error-display">
            {this.state.error}
          </h2>
        )}
        <button
          data-test="increment-button"
          onClick={() => this.handleIncrementClick()}
        >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={() => this.handleDecrementClick()}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
