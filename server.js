const express = require('express');
const app = express();
const mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(express.static('public'));



// First you need to create a connection to the db
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'girlscancode',
});

con.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});






app.get('/', (req, res) => {

    let data = {
        'coucou' : 'COUCOU'
    };

   let  content = res.render('main', data);
   // let content =  ejs.renderFile('main.ejs', [], [], function(err, str){
   //      // str => Rendered HTML string
   //  });


    res.send(content);
});

app.listen(3000, function () {
    console.log('Go to http://localhost:3000 dans ton navigateur :) ')
})