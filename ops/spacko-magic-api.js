const fetch = require("node-fetch");
const http = require("http");
const express = require('express');
const { appendFile } = require("fs");

const host = 'localhost';
const port = 8001;
const app = express();

var couchdbUrl = "http://admin:couchdb@localhost:5984/";
var deckstatsApiUrl = "https://deckstats.net/";

var getDeckList = function(deckstatsApiUrl) {
  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow'
  };

  return fetch(url + deckstatsApiUrl, requestOptions)
    .then(response => response.text())
    .then(result => response = result)
    .catch(error => response = error);
}

var saveDeckstatsUserId = function(user) {
  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
    redirect: 'follow'
  };

  return fetch(`${couchdbUrl}/_users`, requestOptions)
    .then(response => response.text())
    .then(result => response = result)
    .catch(error => response = error);
}

var saveDeckstatsUserId = function(user) {
  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
    redirect: 'follow'
  };

  return fetch(`${couchdbUrl}/_users`, requestOptions)
    .then(response => response.text())
    .then(result => response = result)
    .catch(error => response = error);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.put('/deckstats-user-id/:id', async (req, res) => {
  var response = await addDeckstatsIdToUser();
  res.send(response.text());
})

app.listen(port, () => {
  console.log(`Spacko Magic API listening on port ${port}`)
})
