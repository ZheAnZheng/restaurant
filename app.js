const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mongoose=require('mongoose');
mongoose.connect('mongodb://192.168.31.155:2000/restaurant');
const Restaurant=require('./models/restaurant.js')
const db =mongoose.connection;
db.on('error',(err)=>console.log(err));
db.once('open',()=>{
  console.log('db connected')
})



//setting handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

// make 'public' directory static
app.use(express.static("public"));
app.use(express.urlencoded({'extended':true}));

app.get("/", (req, res) => {

  Restaurant.find()
            .lean()
            .then((restaurants)=>{res.render("index", { restaurants })})
            .catch(error=>console.log(error))
});
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch(error=>console.log(error));
});
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});
app.post("/restaurants/new",(req,res)=>{
    const data=req.body;
    Restaurant.create({
      name:data.name,
      name_en:data.name_en,
      category:data.category,
      image:data.image,
      location:data.location,
      phone:data.phone,
      rating:data.rating,
      description:data.description
    })
    .then(()=>res.redirect('/'))
    .catch(error=>console.log(error))
})
app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const data=req.body;
  Restaurant.findById(id)
    .then(restaurantModel=>{
      restaurantModel.name=data.name;
      restaurantModel.name_en=data.name_en;
      restaurantModel.rating=data.rating
      restaurantModel.save();
    })
    .then((()=>res.redirect('/')))
    
});
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  
  Restaurant.findById(id)
    .then((restaurantModel) => {
      restaurantModel.remove()
    })
    .then(() => res.redirect("/"));
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
