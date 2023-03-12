const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

const PORT =  3000;
const auth = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/auth", auth);

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
