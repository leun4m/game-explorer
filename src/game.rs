use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub id: u32,
    pub name: String,
    pub min_players: u8,
    pub max_players: u8,
    pub is_turn_based: bool,
}

impl Game {
    pub fn new(id: u32, name: &str, min_players: u8, max_players: u8, is_turn_based: bool) -> Game {
        Game {
            id,
            name: String::from(name),
            min_players,
            max_players,
            is_turn_based
        }
    }

    pub fn get_id(&self) -> u32 {
        self.id
    }

}
