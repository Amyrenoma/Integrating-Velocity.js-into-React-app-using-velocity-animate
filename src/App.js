import React from "react";
import axios from "axios";
import { VelocityComponent } from 'velocity-react'; // The import
import "./App.css";

class App extends React.Component {
  state = { advice: "", isVisible: true };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;

        // Animate the advice text using Velocity.js
        this.setState({ advice });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleVisibility = () => {
    this.setState((prevState) => ({
      isVisible: !prevState.isVisible
    }));
  };

  render() {
    return (
      <div className="app">
        <div className="card">
          <VelocityComponent animation={{ opacity: this.state.isVisible ? 1 : 0 }} duration={500}>
            <h1 className="heading">{this.state.advice}</h1>
          </VelocityComponent>
          
          <button>
          <div onClick={this.toggleVisibility}>
            Click me to toggle visibility!
          </div>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
