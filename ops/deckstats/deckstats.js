import fetch from 'node-fetch';
import http from 'http';

const host = '0.0.0.0';
const port = 8000;

var url = "https://deckstats.net/"
var response;

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

const requestListener = async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.writeHead(200);
  await getDeckList(req.url);
  res.end(response);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
