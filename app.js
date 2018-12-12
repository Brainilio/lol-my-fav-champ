var express = require("express");
mongoose = require("mongoose");
bodyParser = require("body-parser");

if (process.env.ENV == "Test")
  db = mongoose.connect(
    "mongodb://localhost/league_test",
    { useNewUrlParser: true }
  );
else {
  mongoose.connect(
    "mongodb://localhost/league",
    { useNewUrlParser: true }
  );
}

var Champ = require("./models/champModel");

var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

champRouter = require("./Routes/champRoutes")(Champ);

app.use("/api/champs", champRouter);

app.get("/api", function(req, res) {
  res.send('<a href="/api/champs">collection</a>');
});

app.get("/", function(req, res) {
  res.send('<a href="/api">api</a>');
});

app.listen(port, function() {
  console.log("Gulp is running my app on PORT: " + port);
});

module.exports = app;
