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

    connexion.query(query, (err, movies) => {
        if (err)
            callback(err, null);
        else
            callback(null, movies);
    });
};

let createMovie = (movie, callback) => {
    let query = "INSERT INTO movies SET ?";

    connexion.query(query, movie, (err, movie) => {
        if (err)
            callback(err, null);
        else
            callback(null, movie);
    });
};

let deleteMovie = (id, callback) => {
    let query = "DELETE FROM movies WHERE `id` = ?";

    connexion.query(query, [id], (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });
};

let updateMovie = (favorite, id, callback) => {
    let query = "UPDATE movies SET favorite = " + favorite + "  WHERE id = " + id;

    connexion.query(query, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });
};

module.exports = {
    list: listMovies,
    create: createMovie,
    delete: deleteMovie,
    update: updateMovie
};
