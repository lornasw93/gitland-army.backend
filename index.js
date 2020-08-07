var express = require("express");

const app = express();
var cors = require("cors"),
  bodyParser = require("body-parser");

var http = require("http");
var server = http.Server(app);
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/warhead/status", (request, res) => {
  var textArray = ["online", "offline"];
  var randomNumber = Math.floor(Math.random() * textArray.length);
  var result = textArray[randomNumber];

  console.log(`status result: ${result}`);

  res.send(result);
});

app.post("/warhead/launch/:code", (request, res) => {
  var date = "200807"; //new Date().toISOString("yyMMdd");
  var secret = "NICEGAMEOFCHESS";

  //console.log(request.body.code);

  if (request.body.code === `${date}${secret}`) {
    res.status(200).send({
      message: "success",
    });
  } else {
    response.status(400).send({
      message: "failure",
    });
  }
});

server.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});
