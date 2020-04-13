import React from "react";
import "./App.css";

class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      minPlayers: "",
      maxPlayers: "",
      isTurnBased: false,
      gameType: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Minimal Players:
          <input
            type="number"
            name="minPlayers"
            value={this.state.minPlayers}
            onChange={this.handleInputChange}
            min="1"
            step="1"
          />
        </label>
        <label>
          Minimal Players:
          <input
            type="number"
            name="maxPlayers"
            value={this.state.maxPlayers}
            onChange={this.handleInputChange}
            min="1"
            step="1"
          />
        </label>
        <label>
          Turn based:
          <input
            type="checkbox"
            name="isTurnBased"
            value={this.state.isTurnBased}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Type:
          <select
            name="gameType"
            value={this.state.gameType}
            onChange={this.handleInputChange}
          >
            <option value="">-- Please choose an option --</option>
            <option value="board">Board</option>
            <option value="card">Card</option>
            <option value="dice">Dice</option>
            <option value="special">Special</option>
          </select>
        </label>
        <input type="submit" value="Create" />
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <header>
        <h1>GameExplorer</h1>
        <CreateGame></CreateGame>
      </header>
    );
  }
}

export default App;
