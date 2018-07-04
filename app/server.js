'use strict';

const express = require('express');
const database = require('./database');
const bodyParser = require('body-parser');
// We use express to help us run the web-app
const application = express();

// Some configuration
application.set('view engine', 'ejs');
application.use(express.static('public'));
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());

// This function will be called when you go to http://localhost:3000/
application.get('/', (request, response) => {

    let SortMovieByTitle = (movies) => {
        // TODO
        return movies
    };

    let FirstThreeFavoriteFilms = (movies, limit) => {
        // TODO 
        return movies
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

// This function will be called when you call http://localhost:3000/create from a html-form
// In other words, when you create a new movie via the "Add to my movie list" form
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

// This is the function that is called when a movie is added to favorites after clicking on the star icon
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

application.post('/addtofavorites/:id', (request, response) => {
    const id = request.params.id;

    database.update(true, id, function(err, movieUpdated) {
        if (err)
            throw err;
        else {
            console.log("movie updated to database");
            response.redirect("/");
        }
    });
})

application.post('/removefromfavorites/:id', (request, response) => {
    const id = request.params.id;

    database.update(false, id, function(err, movieUpdated) {
        if (err)
            throw err;
        else {
            console.log("movie updated to database");
            response.redirect("/");
        }
    });
})

// This function is called when you click on the trash icon to delete a movie
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

// Run the application on port 3000
application.listen(3000);

console.log('Go to http://localhost:3000 dans ton navigateur :) ');