// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var storage = require('node-persist');
var googleapis = require('googleapis');
var DISCOVERY_URL = "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
var score = 0

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

storage.initSync();

function analyzeComment(id, comment, request, response, model) {
  googleapis.discoverAPI(DISCOVERY_URL, (err, client) => {
    if (err) throw err;
    var requestedAttributes = {};
    requestedAttributes[model] = {};   
    var analyzeRequest = {
      comment: {text: comment},
      requestedAttributes
    };
    client.comments.analyze({key: process.env.API_KEY, resource: analyzeRequest}, (err, response) => {
      if (err) throw err;
      var scores = response.attributeScores
      var score = scores[model].summaryScore.value
      analysis.unshift("🗯 " + request.query.comment + " 🤖 "+ model +" score: " + score.toString());
      storage.init(/* options ... */).then(function() {
        storage.setItem(id,{text: comment, model: model, score: score})
      });
    });
  });
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/analyze", function (request, response) {
  var pAnalysis = storage.values();
  response.send(pAnalysis);
});

app.post("/analyze", function (request, response) {
  analyzeComment(request.query.id, request.query.comment, request, response, request.query.model)
  response.sendStatus(200);
  storage.removeItem("3232747842");
});

// Simple in-memory store for now
var analysis = [
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
