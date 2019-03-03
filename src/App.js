import React, { Component } from "react";
import ReactDOM from "react-dom";
import './App.css';

class App extends Component {
  constructor() {
      super();
      this.state = { 
        numCorrect: 0,
        numTries: 0,
        score: 0,
        pic1: "",
        pic2: "",
        weight1: 0,
        weight2: 0,
        name1: "",
        name2: "",
        message: "",
        outcome: ""
      };
    }

  click1 = () => {
    if (this.state.weight1 > this.state.weight2) {
      this.setState({
        score: ((this.state.numCorrect + 1) * 100 / (this.state.numTries + 1)),
        numCorrect: this.state.numCorrect + 1,
        outcome: "correct!"
      })
    } else {
      this.setState({
        score: (this.state.numCorrect * 100 / (this.state.numTries + 1)),
        outcome: "incorrect!"
      })
    }
    this.updateStats();
    this.loadPokemon();
  }

  click2 = () => {
    if (this.state.weight2 > this.state.weight1) {
      this.setState({
        score: ((this.state.numCorrect + 1) * 100 / (this.state.numTries + 1)),
        numCorrect: this.state.numCorrect + 1,
        message: "Correct!"
      })
    } else {
      this.setState({
        score: (this.state.numCorrect * 100 / (this.state.numTries + 1)),
        message: "Incorrect!"
      })
    }
   
    this.updateStats();
    this.loadPokemon();
  }

  updateStats() {
    this.setState({
      message: this.state.name1 + " weighs " + this.state.weight1 + " pounds and " + this.state.name2 + " weighs " + this.state.weight2 + " pounds.",
      numTries: this.state.numTries + 1
    })
  }

  async loadPokemon() {
    const p1_id = Math.floor(Math.random() * 387);
    let p2_id = Math.floor(Math.random() * 387);
    while (p1_id == p2_id) {
      p2_id = Math.floor(Math.random() * 387);
    }

    const response1 = await fetch("https://pokeapi.co/api/v2/pokemon/" + p1_id + "/");
    const json1 = await response1.json();
    this.setState({
      weight1: json1.weight,
      pic1: json1.sprites.front_default,
      name1: json1.name
    });

    const response2 = await fetch("https://pokeapi.co/api/v2/pokemon/" + p2_id + "/");
    const json2 = await response2.json();
    this.setState({
      weight2: json2.weight,
      pic2: json2.sprites.front_default,
      name2: json2.name
    });
  }

  async componentDidMount() {
    this.loadPokemon();
  }

  render() {
    return (
      <div className="font">
        <div className="header">
          which pokemon is heavier?
        </div>

        <div className="name-row">
          <div className="name">
            {this.state.name1}
          </div>
          <div className="name">
            {this.state.name2}
          </div>
        </div>

        <div className="pokemon-row">
          <div className="pokemon" align="center;">
            <img src={this.state.pic1} />
          </div>
          <div className="pokemon" align="center;">
            <img src={this.state.pic2} />          
          </div>
        </div>

        <div className="button-row">
          <button className='button' onClick={this.click1}>
              this one!
          </button>

          <button className="button" onClick={this.click2}>
              this one!
          </button>
        </div>

        <div className="score">
            score: {this.state.score.toFixed(0) + "% "}
            &nbsp;
            &nbsp;
            tries: {this.state.numTries}
        </div>

        <div className="outcome">
          {this.state.outcome}
        </div>

        <div className="message">
          {this.state.message}
        </div>
      </div>
    )
  }
}

export default App;
