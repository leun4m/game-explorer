use actix_web::{delete, get, post, put, Responder, HttpResponse, web, Error};
use crate::game::{Game, GameType};
use crate::service;
use serde::{Deserialize};

mod content_types {
    pub const JSON: &str = "application/json";
}

#[get("/games")]
pub async fn get_games() -> impl Responder {
    let saved_games: Vec<Game> = service::get_games();

    let json = serde_json::to_string(&saved_games).unwrap();

    HttpResponse::Ok().content_type(content_types::JSON).body(json)
}

#[derive(Deserialize)]
pub struct Info {
    game_id: u32
}

#[get("/games/{game_id}")]
pub async fn get_game(params: web::Path<Info>) -> impl Responder {
    let game = service::get_game(params.game_id);

    if game.is_some() {
        let json = serde_json::to_string(&game).unwrap();
        HttpResponse::Ok().content_type(content_types::JSON).body(json)
    } else {
        HttpResponse::NoContent().content_type(content_types::JSON).body("")
    }

}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateGameDto {
    name: String,
    min_players: u8,
    max_players: u8,
    is_turn_based: bool,
    game_type: GameType,
}

#[post("/games")]
pub async fn create_game(game: web::Json<CreateGameDto>) -> Result<HttpResponse, Error> {
    println!("Create Game");

    let game = service::create_game(game.name.as_str().to_string(), game.min_players, game.max_players, game.is_turn_based, game.game_type);
    Ok(HttpResponse::Ok().json(game))
}

#[put("/games/{game_id}")]
pub async fn update_game(params: web::Path<Info>, game: web::Json<Game>) -> Result<HttpResponse, Error> {
    println!("Update Game");
    if params.game_id != game.id {
        return Ok(HttpResponse::BadRequest().body("ids not matching"));
    }

    let game = service::update_game(game.into_inner());
    Ok(HttpResponse::Ok().json(game))
}

#[delete("/games/{game_id}")]
pub async fn delete_game(params: web:: Path<Info>) -> Result<HttpResponse, Error> {
    println!("Delete Game");
    service::delete_game(params.game_id);
    Ok(HttpResponse::Ok().body("Delete successful"))
}
