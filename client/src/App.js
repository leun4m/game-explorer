import React from "react";
import "./App.css";
import CreateGame from "./CreateGame";

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
