require("dotenv").config();
const crypto = require("crypto");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const { DATABASE } = process.env;

var storage = new GridFsStorage({
  // url: DATABASE,
  url: `mongodb+srv://usama:Usama1122@cluster0.yfbmuyz.mongodb.net/?retryWrites=true&w=majority`,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
module.exports = { upload };
