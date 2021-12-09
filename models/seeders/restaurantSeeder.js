const mongoose = require("mongoose");
const Restaurant=require('../restaurant.js');
mongoose.connect("mongodb://192.168.31.155:2000/restaurant");
const restaurantsData=require('/app/public/restaurant.json').results;
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("db connected");

  restaurantsData.forEach(restaurant=>{
      const {id ,...data} = restaurant;
      
      Restaurant.create({
          name:data.name,
          name_en:data.name_en,
          category:data.category,
          image:data.image,
          location:data.location,
          phone:data.phone,
          google_map:data.google_map,
          rating:data.rating,
          description:data.description
      })

      
  })
});
