const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

app.use(cors()); 

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var http = require("http");
var server = http.Server(app);

var PORT = process.env.PORT || 5000;

app.get("/warhead/status", (request, res) => {
  var textArray = ["online", "offline"];
  var randomNumber = Math.floor(Math.random() * textArray.length);
  var result = textArray[randomNumber];

  res.send({
    status: result,
  });
});

app.post("/warhead/launch/:code", cors(corsOptions),  (request, res) => {
    console.log('called launch code func');
  var date = new Date().toISOString("yyMMdd");
  var secret = "NICEGAMEOFCHESS";
 
  if (request.params.code === `${date}${secret}`) {
    res.send({
        status: 'success',
      });
  } else {
    res.status(400).send({
      message: "failure",
    });
  }
});

server.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});
