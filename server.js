'use strict';

const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
const application = express();

application.set('view engine', 'ejs');
application.use(express.static('public'));
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());

application.get('/', (request, response) => {

    let SortMovieByTitle = (movies) => {
        return movies.sort(function(a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        });
    };

    let FirstThreeFavoriteFilms = (movies, limit) => {
        return movies.filter(movie => movie.favorite === 1).slice(0, limit);
    };

    database.list(function(err, movies) {
        if (err)
            throw err;
        else {
            response.render('main', {
                movies: SortMovieByTitle(movies),
                myFavorites: FirstThreeFavoriteFilms(movies, 3)
            });
        }
    });
});

application.post('/create', (request, response) => {

    const movie = {
        title: request.body.title,
        year: request.body.year,
        picture: request.body.picture,
    };

    database.create(movie, function(err, movieCreated) {
        if (err)
            throw err;
        else {
            console.log("movie created into database");
            response.redirect("/");
        }
    });

});

application.post('/update/:id', (request, response) => {

    const id = request.params.id;
    const favorite = request.query.favorite;

    database.update(favorite, id, function(err, movieUpdated) {
        if (err)
            throw err;
        else {
            console.log("movie updated to database");
            response.redirect("/");
        }
    });

});

application.post('/delete/:id', (request, response) => {
    const id = request.params.id;

    database.delete(id, function(err, movieDeleted) {
        if (err)
            throw err;
        else {
            console.log("movie deleted to database");
            response.redirect("/");
        }
    });

});

application.listen(3000);

console.log('Go to http://localhost:3000 dans ton navigateur :) ');