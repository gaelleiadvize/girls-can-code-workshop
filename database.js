
const mysql = require('promise-mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girlscancode',
    database: 'movies'
});
// https://www.npmjs.com/package/promise-mysql

 module.exports={

    connexion:() => {

        con.then(function(con){
            var result = conn.query('select `name` from hobbits');
            con.end();
            return result;
        }).then(function(rows){
            // Logs out a list of hobbits
            console.log(rows);
        });




        return con.connect((err) => {
            if(err){
                console.log("Connexion non réussie :'(");
                return;
            }
            console.log('Connection réussie !!!!!');
        });
    },

     list : () => {

          let query = "SELECT * FROM movies";


         con.query(query, (err,rows) => {
             if(err) throw err;

             console.log('Data received from Db:\n');
             console.log(rows);
         });
     },

     create : () => {

     },

     delete : () => {

     },

     update : () => {

     }


};