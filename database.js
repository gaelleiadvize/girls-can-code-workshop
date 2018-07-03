'use strict';

const mysql = require('mysql');

// First you need to create a connection to the db
const connexion = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'girlscancode',
    database: 'movies'
});


let listMovies = (callback) => {

    let query = "SELECT * FROM movies";

    connexion.query(query, callback)
};

let createMovie = (movie, callback) => {
    let query = "INSERT INTO movies SET ?";

    connexion.query(query, movie, callback);
};

let deleteMovie = (id, callback) => {
    let query = "DELETE FROM movies WHERE `id` = ?";

    connexion.query(query, [id], callback);
};

let updateMovie = (favorite, id, callback) => {
    let query = "UPDATE movies SET `favorite` = NOT ?  WHERE id = ?";

    connexion.query(query, [favorite, id], callback);
};

module.exports = {
    list: listMovies,
    create: createMovie,
    delete: deleteMovie,
    update: updateMovie
};
