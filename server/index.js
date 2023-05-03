const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const port = 8800 || process.env.PORT

dotenv.config();

mongoose.connect( process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Successfully connected to DB");})
      .catch((err) => {console.log(err);});
      
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(port, () => {
    console.log(`Backend server is running at ${port}`);
  });