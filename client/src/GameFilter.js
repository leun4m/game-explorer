import React from "react";
import GameService from "./GameService";
import GameLister from "./GameLister";

class GameFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        players: "",
      },
      games: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    GameService.getGames().then((games) => this.setState({ games: games }));
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      filter: {
        [name]: value,
      },
    });
  }

  get filteredGames() {
    const filter = this.state.filter;
    return this.state.games.filter((game) => {
      return (
        !filter.players ||
        (game.minPlayers <= filter.players && game.maxPlayers >= filter.players)
      );
    });
  }

  render() {
    return (
      <div className="flex-container">
        <aside>
          <h2>Filter</h2>
          <label>
            Players
            <input
              type="number"
              name="players"
              value={this.state.filter.players}
              onChange={this.handleInputChange}
            />
          </label>
        </aside>
        <main>
          <GameLister games={this.filteredGames}></GameLister>
        </main>
      </div>
    );
  }
}

export default GameFilter;
