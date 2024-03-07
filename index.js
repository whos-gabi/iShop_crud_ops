require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { readAll, read, create, update, remove } = require("./db");
const {formatDate} = require("./functions");
const app = express();
const port = process.env.PORT || 3000;
const iphoneSpecs = require("./specs.json");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/src", express.static(path.join(__dirname, "/src")));

app.get("/", async (req, res) => {
  let data = await readAll();
  if (data === null) {
    data = [];
  }
  res.render("index", { products: data, specs: iphoneSpecs , formatDate});
});

app.post("/add-product", async (req, res) => {
  const { price, specs, secondHand } = req.body;
  const specsData = iphoneSpecs.find((spec) => spec.name === specs);
  const product = {
    price,
    secondHand: secondHand === "on" ? true : false,
    specs: specsData,
    date: new Date(),
  };
  console.log(product);
  await create(product);

  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await remove(id).then(() => {
    res.redirect("/");
  });
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const product = await read(id);
  res.render("update", { product, specs: iphoneSpecs });
});

app.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { price, specs, secondHand } = req.body;
    const specsData = iphoneSpecs.find((spec) => spec.name === specs);
    const product = {
        price,
        secondHand: secondHand === "on" ? true : false,
        specs: specsData,
        date: new Date(),
    };
    await update(id, product).then(() => {
        res.redirect("/");
    });
    }
);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
