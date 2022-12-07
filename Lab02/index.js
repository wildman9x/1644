const express = require("express");
const app = express();
// connect to mongodb
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://anhtrinh3189:SJbQQmsSrNP3YyW@cluster0.tjprwlu.mongodb.net/StoreDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const productModel = mongoose.model("Product", {
  name: String,
  image: String,
  price: Number,
  description: String,
});

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))

app.get("/products", async (req, res) => {
  const products = await productModel.find();
  res.render("products", { title: "Products", products });
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await productModel.findByIdAndDelete(id);
  res.redirect("/products");
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  productModel.findById(id, (err, product) => {
    if (err) {
      console.log(err);
    } else {
      console.log(product);
      res.render("editProduct", {
        title: "Edit Product",
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        id: product._id,
      });
    }
  });
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productModel
    .findById(id)
    .then((product) => {
      product.name = req.body.name;
      product.image = req.body.image;
      product.price = req.body.price;
      product.description = req.body.description;
      product.save();
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World!",
    name: "John Doe",
    time: new Date().toLocaleTimeString(),
  });
});

app.get("/new", (req, res) => {
  res.render("newProduct", { title: "Add new product" });
});

app.post("/new", async (req, res) => {
  const newProduct = new productModel(req.body);
  // let db = mongoose.connection.db('storeDB');
  await newProduct.save();
  console.log(newProduct);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
