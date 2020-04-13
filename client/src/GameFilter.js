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
      sortBy: "name",
      sortAscending: true,
      games: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortDirectionChange = this.handleSortDirectionChange.bind(this);
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

  handleSortDirectionChange(event) {
    const target = event.target;
    const value = target.checked;

    this.setState({
      sortAscending: value,
    });
  }

  get filteredGames() {
    const filter = this.state.filter;
    return this.state.games
      .filter((game) => {
        return (
          !filter.players ||
          (game.minPlayers <= filter.players &&
            game.maxPlayers >= filter.players)
        );
      })
      .sort((a, b) => {
        const ax = a[this.state.sortBy];
        const bx = b[this.state.sortBy];
        if (ax > bx) {
          return this.state.sortAscending ? -1 : 1;
        }
        if (bx > ax) {
          return this.state.sortAscending ? 1 : -1;
        }
        return 0;
      });
  }

  render() {
    return (
      <div className="flex-container">
        <aside>
          <h2>Filter</h2>
          <label>
            Sort ascending:
            <input
              type="checkbox"
              name="sortAscending"
              checked={this.state.sortAscending}
              onChange={this.handleSortDirectionChange}
            />
          </label>
          <br />
          <label>
            Players:
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
