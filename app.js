const express = require("express");

const app = express();


app.get("/", function(req, res) {
  res.sendFile(__dirname  + "/html/index.html")
});

app.get("/sobre", function(req, res) {
  res.send("MINHA sobre")
});




app.listen(8081, function() {
  console.log("Server Rodando na URL http://localhost:8081");
});
