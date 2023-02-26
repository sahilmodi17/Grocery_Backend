const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect")

const PORT = 5000 || process.env.PORT;


app.use(express.json());


const start = async () => {
    console.log("this time");
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
};
  
start();


