use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub id: u32,
    pub name: String,
    pub min_players: u8,
    pub max_players: u8,
    pub is_turn_based: bool,
    pub game_type: GameType,
    // in minutes
    pub duration: Option<u32>,
    pub age: Option<u8>,
    pub details: Option<GameDetails>,
}

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameDetails {
    pub level: Option<u8>,
    pub luck: Option<u8>,
    pub strategy: Option<u8>
}

#[derive(Copy, Clone, Serialize, Deserialize)]
pub enum GameType {
    BOARD,
    CARD,
    DICE,
    SPECIAL,
}

//impl Copy for GameType {}

impl Game {
    pub fn new(
        id: u32,
        name: &str,
        min_players: u8,
        max_players: u8,
        is_turn_based: bool,
        game_type: GameType,
        duration: Option<u32>,
        age: Option<u8>,
        details: Option<GameDetails>
    ) -> Game {
        assert_ne!(name, "", "name must not be empty");
        assert!(min_players > 0, "min_players must be higher than 0");
        assert!(max_players > 0, "max_players must be higher than 0");
        assert!(
            min_players <= max_players,
            "max_players must not be lower than min_players"
        );
        Game {
            id,
            name: String::from(name),
            min_players,
            max_players,
            is_turn_based,
            game_type,
            duration,
            age,
            details
        }
    }

    pub fn get_id(&self) -> u32 {
        self.id
    }
}
