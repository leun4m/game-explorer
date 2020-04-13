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
      sort: {
        sortBy: "name",
        ascending: true,
      },
      games: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
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
        ...this.state.filter,
        [name]: value,
      },
    });
  }

  handleSortChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      sort: {
        ...this.state.sort,
        [name]: value,
      },
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
      .sort((gameA, gameB) => {
        const a = gameA[this.state.sort.sortBy];
        const b = gameB[this.state.sort.sortBy];
        console.log(a, b);
        if (a > b) {
          return this.state.sort.ascending ? -1 : 1;
        }
        if (b > a) {
          return this.state.sort.ascending ? 1 : -1;
        }
        return 0;
      });
  }

  render() {
    return (
      <div className="flex-container">
        <aside>
          <h2>Sort</h2>
          <label>
            Sort ascending:
            <input
              type="checkbox"
              name="ascending"
              checked={this.state.sort.ascending}
              onChange={this.handleSortChange}
            />
          </label>
          <label>
            Sort by:
            <select
              name="sortBy"
              value={this.state.sort.sortBy}
              onChange={this.handleSortChange}
            >
              <option value="name">Name</option>
              <option value="minPlayers">Min. Players</option>
              <option value="maxPlayers">Max. Players</option>
            </select>
          </label>
          <h2>Filter</h2>
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
