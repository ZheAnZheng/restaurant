const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const restaurants = require("./public/restaurant.json").results;

//setting handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// make 'public' directory static
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { restaurants });
});

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(
    (restaurant) => `${restaurant.id}` === id
  );
  res.render("show", { restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const matchItems = restaurants.filter(
    (restaurant) =>
      isIncludeName(restaurant.name, keyword) ||
      isIncludeName(restaurant.category, keyword)
  );

  function isIncludeName(name, keyword) {
    if (name.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  }

  res.render("index", { restaurants: matchItems, keyword });
});

app.listen(3000, () => {
  console.log("server run on http://localhost:3000");
});
