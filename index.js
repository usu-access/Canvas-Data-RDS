require('dotenv').config({path:__dirname + '/../..'});
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const fs = require("fs");

const app = express();

let port = process.env.PORT;

if (port == null || port == "") {
  port = 7000;
}

const client = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.db,
  password: process.env.password,
  port: 5432,
  ssl: {
    ca: fs
      .readFileSync("./global-bundle.pem")
      .toString()
  }
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {

  const query = `SELECT table_name FROM information_schema.tables;`;
  
  client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of res.rows) {
            console.log(row);
        }
        client.end();
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