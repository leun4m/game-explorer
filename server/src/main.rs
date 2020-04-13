use actix_cors::Cors;
use actix_web::{App};
use actix_web::HttpServer;
use actix_web::http::header;

mod game;
mod database;
mod controller;
mod service;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {

        App::new()
            .wrap(
            Cors::new()
                //.allowed_origin("http://localhost:3000")
                .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                .allowed_header(header::CONTENT_TYPE)
                .max_age(3600)
                .finish(),
            )
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




