var express = require("express");
var app = express();

var date = new Date();
var options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

// post register
app.post("/register", (req, res) => {
  var name = req.body.name;
  var country = req.body.country;
  var gender = req.body.gender;
  var date = new Date().toLocaleDateString("en-US", options);
  res.render("confirm", {
    name: name,
    country: country,
    gender: gender,
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/", function (req, res) {
  res.render("home", {
    title: "Home",
    message: "Hello, Node.js",
    now: date.toLocaleDateString("vi-VN", options),
  });
});

app.get("/about", function (req, res) {
  res.render("about", { title: "About" });
});

const PORT = 8080;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server running on port 8080");
