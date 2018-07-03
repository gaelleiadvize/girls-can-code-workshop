const express = require('express');
const application = express();
const database = require('./database');
const bodyParser = require('body-parser');

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

    let FirstThreeFavoriteFilms = (movies) => {
        return movies.filter(movie => movie.favorites === 1).slice(0, 3);
    };

    database.list(function(err, movies) {
        if (err)
            throw err;
        else {
            response.render('main', {movies: SortMovieByTitle(movies), myFavorites: FirstThreeFavoriteFilms(movies)});
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

application.put('/favorite', (request, response) => {

    const id = request.body.id;
    const favorite = request.body.favorites;

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