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
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/executeQuery", function(req, res) {

  console.log("Body Params");
  console.log(req.body);

  const query = `SELECT * FROM curated.courses_summary WHERE course_id=737725;`;
  
  client.query(query, (err, response) => {
        if (err) {
            console.error(err);
            res.json({error:err});
        }

        res.json(response);
    });
});

app.listen(port, function() {
    console.log("Server started");
    console.log(process.env.host);
    console.log(process.env.user);
    console.log(process.env.password);
    console.log(process.env.db);
});