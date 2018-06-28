const mysql = require('promise-mysql');

// First you need to create a connection to the db
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girlscancode',
    database: 'movies'
});
// https://www.npmjs.com/package/promise-mysql

module.exports = {

    connexion: () => {
        return connexion;
    },

    list: () => {

        let query = "SELECT * FROM movies";

        return connexion.then(function(con) {

            let result = con.query(query, (err, rows) => {
                if (err) throw err;

                console.log('Data received from Db:\n');

                return JSON.parse(JSON.stringify(rows));
            });

            con.end();

            return result;
        });
    },


    create: (title, year, picture) => {

        // exemple : insert into movies (title, year) VALUES ("Eragon", "2002", "http://fr.web.img3.acsta.net/r_1280_720/medias/nmedia/18/36/15/42/18700877.jpg")
        let query = "INSERT INTO movies (title, year) VALUES (" + title + "," + year + "," + picture + ")";

        return connexion.then(function(con) {

            const result = con.query(query, (err, rows) => {
                if (err) throw err;

                console.log('data inserted in database !!');
                console.log(rows);

                return rows;
            });

            con.end();

            return result;
        });

    },

    delete: (id) => {
        let query = "DELETE * FROM movies WHERE id = " + id;

        return connexion.then(function(con) {

            const result = con.query(query, (err, rows) => {
                if (err) throw err;

                console.log('data deleted in database !!');
                console.log(rows);

                return rows;
            });

            con.end();

            return result;
        });
    },

    update: (favorite, id) => {
        let query = "UPDATE movies SET favorite = " + favorite + "  WHERE id = " + id;

        return connexion.then(function(con) {

            const result = con.query(query, (err, rows) => {
                if (err) throw err;

                console.log('data updated in database !!');
                console.log(rows);

                return rows;
            });

            con.end();

            return result;
        });
    }
};
