const express = require("express");
const { connectDB } = require("../config/db");
const {
  
  createAccount,
  getAllUser,
  login
 
} = require("../controllers/user");

let gfs;

(async function () {
  gfs = await connectDB();
})();

const router = express.Router();

router.post("/users/createAccount", createAccount);
router.get("/users/getAllUser", getAllUser);
router.post("/users/login", login);


module.exports = router;
