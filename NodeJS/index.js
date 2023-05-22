const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var cors = require('cors');
app.use(cors());
dbo.connectToServer();



app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


app.get("/account/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("account")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching accounts!");
        } else {
          res.json(result);
        }
      });   
  });
  
app.get("/version/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("version")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching accounts!");
        } else {
          res.json(result);
        }
      });   
  });