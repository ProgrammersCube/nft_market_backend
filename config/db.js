


// const mongoURI = require("./keys").mongoURI
const mongoose = require("mongoose");
require("dotenv").config();
const Grid = require("gridfs-stream");


let gfs;


const connectDB = async () => {
  try {
    const url = `mongodb+srv://usama:Usama1122@cluster0.yfbmuyz.mongodb.net/?retryWrites=true&w=majority`

    // const url = DATABASE; //Name of database is sheraz .
    let conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    gfs = await Grid(mongoose.connection.db, mongoose.mongo);
    await gfs.collection("uploads"); // this will create chunks and files with uploads.chunks and upload.files
    console.log("Db connected successfully")
   
    return gfs;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
mongoose.Promise = global.Promise;
module.exports = { connectDB };
