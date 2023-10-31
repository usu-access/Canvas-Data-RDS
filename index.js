require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

let port = process.env.PORT;

if (port == null || port == "") {
  port = 7000;
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.send("<h1>Successful</h1>");
});

app.listen(port, function() {
    console.log("Server started");
});