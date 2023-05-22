const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});


app.get("/penalitybox/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("penalitybox")
        .find({})
        .toArray(function (err, result) {
        if (err) {
            res.status(400).send("Error fetching accounts!");
        } else {
            res.json(result);
        }
    });
});