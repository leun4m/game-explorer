import React from "react";
import "./App.css";
import CreateGame from "./CreateGame";
import GameFilter from "./GameFilter";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>GameExplorer</h1>
        </header>
        <div>
          <GameFilter></GameFilter>
        </div>
        <footer>
          <hr></hr>
          <CreateGame></CreateGame>
        </footer>
      </div>
    );
  }
}

export default App;
