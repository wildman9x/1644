// use nodejs

var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var server = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    // display a greeting html
    if (queryData.id === undefined) {
      fs.readFile(
        `${__dirname}/data/${queryData.id}`,
        "utf8",
        function (err, description) {
          var title = "Welcome";
          var description = "Hello, Node.js";
          var template = `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- CSS only -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
    <!-- JavaScript Bundle with Popper -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
      crossorigin="anonymous"
    ></script>
    <script>
      //sayHi() function that greet the user with
      //their name, country and gender
      function sayHi() {
        var name = document.getElementById("name").value;
        var country = document.getElementById("country").value;
        var gender = document.querySelector(
          'input[name="gender"]:checked'
        ).value;
        var message =
          "Hello " + name + " from " + country + " gender " + gender;
        alert(message);
      }
    </script>
    <title>Document</title>
  </head>

  <body>
    <!--{# Create a form to enter basic information information include name,
    country, gender after submitting the form, say Hello + name + country +
    gender #} {# use javascript #}-->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form action="" method="">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
            <div class="mb-3">
              <label for="country" class="form-label">Country</label>
              <input
                type="text"
                class="form-control"
                id="country"
                name="country"
                placeholder="Enter your country"
              />
            </div>
            <div class="mb-3">
              <!--checkbox for gender, m, f, o-->
              <p>Input gender</p>
              <label for="male" class="form-label">Male</label>
              <input
                type="radio"
                class=""
                name="gender"
                id="male"
                value="male"
              />
              <label for="female" class="form-label">Female</label>
              <input
                type="radio"
                class=""
                name="gender"
                id="female"
                value="female"
              />
              <label for="other" class="form-label">Other</label>
              <input
                type="radio"
                class=""
                name="gender"
                id="other"
                value="other"
              />
            </div>
            <button type="submit" class="btn btn-primary" onclick="sayHi()">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>

        `;
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(template);
        }
      );
    } else {
      fs.readFile(
        `${__dirname}/data/${queryData.id}`,
        "utf8",
        function (err, description) {
          var title = queryData.id;
          var template = `
        <!doctype html>
        <html>
        <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
        </body>
        </html>
        `;
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(template);
        }
      );
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log(`Server running on port ${PORT}`);
