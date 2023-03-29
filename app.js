const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const {
  mintjob,
  listjob,
  cancellisting,
  buyJob
  
 } = require("./controllers/jobs");

var cron = require('node-cron');




// app
const app = express();

// middlewares
app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator()); 
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello from Polka!')
})

// import routes
const userRoutes = require("./routes/user");
const nftRotes = require("./routes/nft")
const categoryRoutes = require("./routes/category")

// app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", nftRotes); 
app.use("/api", categoryRoutes);

cron.schedule('* * * * * *', () => {
  mintjob()
  listjob()
  cancellisting()
  buyJob()
  
});

const port = 8000;

app.listen(port, () => {
  
});
   