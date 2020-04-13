import React from "react";
import "./App.css";
import CreateGame from "./CreateGame";
import GameLister from "./GameLister";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>GameExplorer</h1>
        </header>
        <main>
          <GameLister></GameLister>
        </main>
        <footer>
          <hr></hr>
          <CreateGame></CreateGame>
        </footer>
      </div>
    );
  }
}

export default App;
