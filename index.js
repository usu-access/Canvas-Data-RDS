require('dotenv').config({path:__dirname + '/../..'});
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

let port = process.env.PORT;

if (port == null || port == "") {
  port = 7000;
}

var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'dev'", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.send("<h1>Successful</h1>");
});

app.listen(port, function() {
    console.log("Server started");
    console.log(process.env.host);
    console.log(process.env.user);
    console.log(process.env.password);
    console.log(process.env.db);
});