use crate::game::Game;
use std::fs::File;
use std::io::Read;
use std::io::{Error, Write};

const FILENAME: &str = "data.json";

pub fn get_games() -> Result<Vec<Game>, Box<Error>> {
    // Read the input file to string.
    let mut file = File::open(FILENAME)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    // Deserialize and print Rust data structure.
    let data: Vec<Game> = serde_json::from_str(&contents).expect("File not valid");

    Ok(data)
}

pub fn save_games(games: Vec<&Game>) -> std::io::Result<()> {
    let json_all = serde_json::to_string(&games);

    let mut file = File::create(FILENAME)?;
    file.write_all(json_all.unwrap().as_ref())?;
    Ok(())
}

pub fn save_game(game: &Game) -> std::io::Result<()> {
    let result = get_games();
    let games = result.as_ref().unwrap();

    let mut games_ref = Vec::new();
    for game in games {
        games_ref.push(game);
    }

    games_ref.push(game);

    save_games(games_ref)
}

pub fn delete_game(game_id: u32) {
    let mut games = get_games().unwrap();
    games.retain(|x| game_id != x.id);
    save_games(games.iter().map(|s| s).collect()).expect("Couldn't delete games");
}
