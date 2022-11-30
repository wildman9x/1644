const express = require("express");
const app = express();

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", { title: "Hello World!", name: "John Doe", time: new Date().toLocaleTimeString() });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
