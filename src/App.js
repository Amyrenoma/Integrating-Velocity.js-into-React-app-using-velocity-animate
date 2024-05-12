import React from "react";
import axios from "axios";
import Velocity from 'velocity-animate';

import "./App.css";

class App extends React.Component {
  state = { advice: "" };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;

        // Animate the advice text using Velocity.js
        Velocity(this.adviceText, { opacity: 0 }, { duration: 500, complete: () => {
          this.setState({ advice }, () => {
            Velocity(this.adviceText, { opacity: 1 }, { duration: 500 });
          });
        }});
      })

      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="app">
        <div className="card">
          <h1 className="heading" ref={(element) => this.adviceText = element}>{this.state.advice}</h1>
          <button className="button" onClick={this.fetchAdvice}>
            <span>Next Quote</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;