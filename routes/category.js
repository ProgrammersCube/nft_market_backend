const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");



const {
 createCategory,
 getAllCategories
} = require("../controllers/category");

let gfs;

(async function () {
  gfs = await connectDB();
})();

const addingGFS = async (req, res, next) => {
  if (!gfs) {
    gfs = await connectDB();
  }
  req.gfs = gfs;
  next();
};

const router = express.Router();
router.post("/users/createCategory",createCategory);
router.get("/users/getAllCategories", getAllCategories);
module.exports = router;
