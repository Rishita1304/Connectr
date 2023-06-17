const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require('multer');
const cors = require("cors");
const path = require('path');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

const port = 8800 || process.env.PORT

dotenv.config();

mongoose.connect( process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Successfully connected to DB");})
      .catch((err) => {console.log(err);});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));



const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "public/images");
  },
  filename: (req, file, cb)=>{
    cb(null, req.body.name);
  }
})

const upload = multer({storage: storage});

app.post('/api/upload', upload.single('file'), (req,res)=>{
  try{
    return res.status(200).json("File uploaded successfully!")
  }catch(err){
    console.log(err);
  }
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/message", messageRoute)

app.listen(port, () => {
    console.log(`Backend server is running at ${port}`);
  });