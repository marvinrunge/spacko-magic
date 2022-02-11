const fetch = require("node-fetch");

var users = [
  "Marvin", "Arthur", "Bernd", "Ole", "Marc", "Simon", "Lennard", "Steffen", "Robin", "Maik", "Timo", "Lukas", "Marius"
];

var url = "http://admin:5trengGehe!m@spacko-magic.de:5984/"

var addPlayerDB = function() {
  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow'
  };

  fetch(url + "players", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var addUserCardDb = function(user) {
  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow'
  };

  fetch(url + user.toLowerCase() + "_cards", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var addUser = function(user) {
  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": user,
      "password": user + "1234",
      "roles": [],
      "type": "user"
    }),
    redirect: 'follow'
  };

  fetch(url + "_users/org.couchdb.user:" + user, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var addUserToPlayerDb = function(user) {
  var raw = JSON.stringify({
    "_id": user,
    "name": user,
    "life": 20,
    "poison": 0,
    "energy": 0,
    "other": 0,
    "activeDeck": ""
  });

  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: raw,
    redirect: 'follow'
  };

  fetch(url + "players/" + user, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var addUserPermissionsToPlayerDb = function(user) {
  var raw = JSON.stringify({
    "members": {
      "roles": [],
      "names": users
    },
    "admins": {
      "roles": [],
      "names": [
        user
      ]
    }
  });

  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: raw,
    redirect: 'follow'
  };

  fetch(url + "players/_security", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var addUserPermissionsToCardDb = function(user) {
  var raw = JSON.stringify({
    "members": {
      "roles": [],
      "names": users
    },
    "admins": {
      "roles": [],
      "names": [
        user
      ]
    }
  });

  var requestOptions = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: raw,
    redirect: 'follow'
  };

  fetch(url + user.toLowerCase() + "_cards/_security", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

addPlayerDB();

setTimeout(() => {}, 1000);

users.forEach(function(user) {
  addUser(user);
  addUserCardDb(user);
  addUserToPlayerDb(user);
  addUserPermissionsToCardDb(user);
  addUserPermissionsToPlayerDb(user);
});
