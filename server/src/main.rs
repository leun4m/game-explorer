use actix_web::{App};
use actix_web::HttpServer;

mod game;
mod database;
mod controller;
mod service;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(controller::get_games)
            .service(controller::get_game)
            .service(controller::create_game)
            .service(controller::update_game)
            .service(controller::delete_game)
    })
    .bind("127.0.0.1:8088")?
    .run()
    .await
}




