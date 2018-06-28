const express = require('express');
const application = express();
const database = require('./database');

application.set('view engine', 'ejs');
application.use(express.static('public'));

application.get('/', (request, response) => {

    database
    .list()
    .then((movies) => {

        response.render('main', {movies: movies}, function(err, result) {
            if (err) throw err;

            console.log("all is good");
        })
    });

});

application.post('/create', (request, response) => {

    const title = request.body.title;
    const year = request.body.year;
    const picture = request.body.picture;

    database
    .create(title, year, picture)
    .then((movieCreated) => {
        console.log("movie added to database : " + movieCreated);

        response.redirect("/");
    }).catch((err) => {
        return console.error(err);
    });

});

application.post('/favorite', (request, response) => {

    const id = request.body.id;
    const favorite = request.body.favorite;

    database.update(favorite, id).then((movieUpdated) => {
        console.log("movie updated to database : " + movieUpdated);

        response.redirect("/");
    }).catch((err) => {
        return console.error(err);
    });

});

application.delete('/delete', (request, response) => {

    const id = request.body.id;

    database.delete(id).then((movieDeleted) => {
        console.log("movie deleted to database : " + movieDeleted);

        response.redirect("/");
    }).catch((err) => {
        return console.error(err);
    });

});

application.listen(3000);

console.log('Go to http://localhost:3000 dans ton navigateur :) ');