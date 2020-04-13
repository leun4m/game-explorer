import React from "react";
import GameService from "./GameService";

class GameLister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    GameService.getGames().then((games) => this.setState({ games: games }));
  }

  render() {
    const games = this.state.games ? this.state.games : [];
    const listItems = games.map((game) => (
      <div key={game.id}>
        <h3>{game.name}</h3>
        Players: <span>{game.minPlayers}</span> - <span>{game.maxPlayers}</span>
      </div>
    ));
    return (
      <div>
        <h2>Collection</h2>
        <div>{listItems}</div>
      </div>
    );
  }
}

export default GameLister;
