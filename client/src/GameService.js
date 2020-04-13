class GameService {
  static get host() {
    return "http://localhost:8088";
  }

  static async createGame(data = {}) {
    const response = await fetch(GameService.host + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  }

  static async getGames() {
    const response = await fetch(GameService.host + "/games");
    return response.json();
  }
}

export default GameService;
