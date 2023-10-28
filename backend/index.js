const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors')

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

// Avalible routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/post", require("./routes/Post"));

const start =()=>{
   try {
      app.listen(port, () => {
         console.log(`Example app listening on port ${port}`)
       })
   } catch (error) {
      console.log("Cannot start server");
   }
}
start();