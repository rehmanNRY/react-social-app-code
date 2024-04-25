require("dotenv").config();
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE;
// console.log(DATABASE);
const connectToMongo = ()=>{
   try {
      mongoose.connect(mongoURI, ()=>{
         console.log("Connected to mongo successfully");
      })
   } catch (error) {
      console.log("Error connecting with mongoose database");
   }
}
module.exports = connectToMongo;