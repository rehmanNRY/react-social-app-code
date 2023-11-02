const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/socailApp?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";
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