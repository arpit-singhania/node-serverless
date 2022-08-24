'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
// const todos_json = require('./todos.json');
const fs = require("fs");

// const todos = todos_json['todos']
const todos = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todo', (req, res) => {
  todos.push({
    "id": todos.length + 1,
    "description": req.body["description"],
    "isDone": req.body["isDone"] || false
  });
  // todos_json["todos"] = todos;
  // fs.writeFile("./todos.json", JSON.stringify(todos_json), err => {
  //   if (err) throw err; 
  //   console.log("Done writing"); // Success
  // });
  res.send("Successfully added new todo");
});

app.put('/todo/:id', (req, res) => {
  const {id} = req.params;
  todos.find((o, i) => {
    if(o["id"] === parseInt(id)){
      todos[i]["isDone"] = true;
    }
  });
  // todos_json["todos"] = todos;
  // fs.writeFile("./todos.json", JSON.stringify(todos_json), err => {
  //   if (err) throw err; 
  //   console.log("Done writing"); // Success
  // });
  res.send("Successfully updated todo");
});

// app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);
