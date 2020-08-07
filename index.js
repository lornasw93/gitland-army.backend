var express = require("express");
const app = express();

var http = require('http');
var server = http.Server(app);

var PORT = process.env.PORT || 5000;

app.get("/", (request, res) => {
   res.send('Hello world!');
  });

server.listen(PORT, function(){

console.log('Running');

});