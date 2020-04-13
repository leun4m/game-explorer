import React from "react";

class GameLister extends React.Component {
  render() {
    const games = this.props.games ? this.props.games : [];
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
