use crate::controller::FilterParams;
use crate::database;
use crate::game::{Game, GameType};

pub fn get_games() -> Vec<Game> {
    database::get_games().expect("Couldn't get games")
}

pub fn get_games_filtered(filter_params: FilterParams) -> Vec<Game> {
    let games = get_games();
    return games
        .iter()
        .cloned()
        .filter(|game| {
            if filter_params.players.is_none() {
                return true;
            }
            game.is_turn_based == filter_params.is_turn_based.unwrap()
        })
        .filter(|game| {
            if filter_params.players.is_none() {
                return true;
            }
            game.name
                .contains(filter_params.name.as_ref().unwrap().as_str())
        })
        .filter(|game| {
            if filter_params.players.is_none() {
                return true;
            }

            let player_count = filter_params.players.unwrap();
            game.min_players <= player_count && player_count <= game.max_players
        })
        .collect();
}

pub fn get_game(id: u32) -> Option<Game> {
    let mut game: Option<Game> = Option::None;
    for g in get_games() {
        if g.get_id() == id {
            game = Option::Some(g);
        }
    }
    game
}

pub fn create_game(
    name: &str,
    min_players: u8,
    max_players: u8,
    is_turn_based: bool,
    game_type: GameType,
    duration: Option<u32>
) -> Game {
    let game = Game::new(
        next_game_id(),
        name.as_ref(),
        min_players,
        max_players,
        is_turn_based,
        game_type,
        duration
    );
    database::save_game(&game).expect("Couldn't save game");
    game
}

fn next_game_id() -> u32 {
    let games = database::get_games().unwrap();
    let mut latest_id = 0;
    for game in games {
        let id = game.get_id();
        if latest_id < id {
            latest_id = id;
        }
    }
    latest_id + 1
}

pub fn update_game(update_game: Game) {
    let mut games = get_games();

    let mut index = 0;
    let mut has_found = false;

    for i in 0..games.len() {
        if games[i].id == update_game.id {
            has_found = true;
            index = i;
        }
    }
    if !has_found {
        println!("Couldn't find game to update")
    }

    games[index] = update_game;

    database::save_games(games.iter().map(|s| s).collect()).expect("Couldn't save games");
}

pub fn delete_game(game_id: u32) {
    database::delete_game(game_id);
}
