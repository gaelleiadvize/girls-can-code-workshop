const express = require('express');
const application = express();
const database = require('./database');

application.set('view engine', 'ejs');
application.use(express.static('public'));

application.get('/', (request, response) => {

    let sortMovieByTitle = (movies) => {
        movies.sort(function(a, b) {
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
            response.render('main', {movies: sortMovieByTitle(movies), myFavorites: FirstThreeFavoriteFilms});
        }
    });
});

application.post('/create', (request, response) => {

    const title = request.body.title;
    const year = request.body.year;
    const picture = request.body.picture;

    database.create(title, year, picture, function(err, movieCreated) {
        if (err)
            throw err;
        else {
            console.log("movie updated to database : " + movieCreated);
            response.redirect("/");
        }
    });

});

application.post('/favorite', (request, response) => {

    const id = request.body.id;
    const favorite = request.body.favorites;

    database.update(favorite, id, function(err, movieUpdated) {
        if (err)
            throw err;
        else {
            console.log("movie updated to database : " + movieUpdated);
            response.redirect("/");
        }
    });

});

application.delete('/delete', (request, response) => {

    const id = request.body.id;

    database.delete(id, function(err, movieDeleted) {
        if (err)
            throw err;
        else {
            console.log("movie deleted to database : " + movieDeleted);
            response.redirect("/");
        }
    });

});

application.listen(3000);

console.log('Go to http://localhost:3000 dans ton navigateur :) ');