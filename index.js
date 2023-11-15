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

  const query = `SELECT DISTINCT
                      crs_group.term_id,
                      crs_group.context_type as parent_context_type,
                      crs_group.context_id as parent_context_id,
                      content.context_type,
                      content.context_id,
                      content.unique_content_id,
                      content.content_type,
                      content.content_id,
                      content.content_name,
                      content.content_url,
                      content.created_at,
                      content.updated_at,
                      content.workflow_state,
                      content.content_body,
                      content.content_body_char_length,
                      content.page_url,
                      content.assignment_id,
                      content.old_assignment_id,
                      content.root_discussion_topic_id
                    FROM filtered_groups_cte crs_group
                      JOIN curated.content_items content ON content.context_type = 'Group'
                            AND content.context_id = crs_group.group_id
                    WHERE content.updated_at > ((now() at time zone 'utc') - INTERVAL '2 day');`;
  
  client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
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