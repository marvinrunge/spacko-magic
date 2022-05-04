const fetch = require("node-fetch");
const http = require("http");

const host = 'localhost';
const port = 8000;

var url = "https://deckstats.net/"
var response;

var getDeckList = function() {
  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow'
  };

  return fetch(url + "api.php?action=get_deck&id_type=saved&owner_id=24472&id=1126678&response_type=list", requestOptions)
    .then(response => response.text())
    .then(result => response = result)
    .catch(error => response = error);
}

const requestListener = async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  await getDeckList();
  res.end(response);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
