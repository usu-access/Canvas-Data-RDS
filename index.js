require('dotenv').config({path:__dirname + '/../..'});
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
var mysql = require('mysql');

const app = express();

let port = process.env.PORT;

if (port == null || port == "") {
  port = 7000;
}

// const client = new Client({
//   user: process.env.user,
//   host: process.env.host,
//   database: process.env.db,
//   password: process.env.password,
//   port: 5432
// })

// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
  var con = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    database: process.env.db,
    password: process.env.password
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
    res.send("<h1>Successful</h1>");
});

app.listen(port, function() {
    console.log("Server started");
    console.log(process.env.host);
    console.log(process.env.user);
    console.log(process.env.password);
    console.log(process.env.db);
});