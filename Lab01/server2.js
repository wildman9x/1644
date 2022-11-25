var express = require("express");
var app = express();
var fs = require("fs");
var crypto = require("crypto");
const csv = require("@fast-csv/parse");
const { parse } = require("path");

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
  var uuid = crypto.randomBytes(16).toString("hex");
  var name = req.body.name;
  var country = req.body.country;
  var gender = req.body.gender;
  var date = new Date().toLocaleDateString("en-US", options);
  // save data in csv form
  fs.writeFileSync(
    "data.csv",
    `${uuid},${name},${country},${gender}\n`,
    { flag: "a" },
    (err) => {
      if (err) throw err;
    }
  );

  res.render("confirm", {
    name: name,
    country: country,
    gender: gender,
  });
});

app.get("/usersList", (req, res) => {
  var users = [];
  fs.createReadStream("data.csv")
    .pipe(
      csv.parse({
        delimiter: ",",
        headers: ["uuid", "name", "country", "gender"],
      })
    )
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      users.push(row);
    })
    .on("end", (rowCount) => {
      // first column is name
      // second column is country
      // third column is gender
      res.render(
        "usersList",
        {
          users: users,
          // backgroundColor: users.map((user) => user.uuid).substr(0, 6),
        },
        console.log(`Parsed ${rowCount} rows`),
        console.log(users),
        // console log only the name of the users
        console.log(users.map((user) => user.name)),
        // console.log(backgroundColor),
      );
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

