const mysql = require('mysql');

// First you need to create a connection to the db
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girlscancode',
    database: 'movies'
});

let listMovies = (callback) => {

    let query = "SELECT * FROM movies";

    connexion.connect();

    connexion.query(query, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });

    connexion.end();
};

let createMovie = (title, year, picture) => {

    // exemple : insert into movies (title, year) VALUES ("Eragon", "2002", "http://fr.web.img3.acsta.net/r_1280_720/medias/nmedia/18/36/15/42/18700877.jpg")
    let query = "INSERT INTO movies (title, year) VALUES (" + title + "," + year + "," + picture + ")";

    connexion.connect();

    connexion.query(query, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });

    connexion.end();

};

let deleteMovie = (id) => {
    let query = "DELETE * FROM movies WHERE id = " + id;

    connexion.connect();

    connexion.query(query, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });

    connexion.end();
};

let updateMovie = (favorite, id) => {
    let query = "UPDATE movies SET favorite = " + favorite + "  WHERE id = " + id;

    connexion.connect();

    connexion.query(query, (err, rows) => {
        if (err)
            callback(err, null);
        else
            callback(null, rows);
    });

    connexion.end();
};

module.exports = {
    list: listMovies,
    create: createMovie,
    delete: deleteMovie,
    update: updateMovie
};
