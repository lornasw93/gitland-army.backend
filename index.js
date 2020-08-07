const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

var bodyParser = require("body-parser");
var http = require("http");
var server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PORT = process.env.PORT || 5000;

const whitelist = ["http://localhost:4200"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.get("/warhead/status", cors(corsOptions), (request, res) => {
  var textArray = ["online", "offline"];
  var randomNumber = Math.floor(Math.random() * textArray.length);
  var result = textArray[randomNumber];

  console.log(`status result: ${result}`);

  res.send(result);
});

app.post("/warhead/launch/:code", cors(corsOptions), (request, res) => {
  var date = "200807"; //new Date().toISOString("yyMMdd");
  var secret = "NICEGAMEOFCHESS";

  //console.log(request.body.code);

  if (request.body.code === `${date}${secret}`) {
    res.send("success");
  } else {
    response.status(400).send({
      message: "failure",
    });
  }
});

server.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});
