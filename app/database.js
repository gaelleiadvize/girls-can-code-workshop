'use strict';

// We use the mysql.js library to connect to the DB 
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
    // TODO
};

let deleteMovie = (id, callback) => {
    // TODO
};

let updateMovie = (favorite, id, callback) => {
    // TODO
};

module.exports = {
    list: listMovies,
    create: createMovie,
    delete: deleteMovie,
    update: updateMovie
};
