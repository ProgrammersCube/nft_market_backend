const express = require("express");
const { connectDB } = require("../config/db");
const { upload } = require("../config/multer");



const {
 getAllNfts,
 createNFT,
 getIpfs,
 getAllNftsByUserId,
 viewProfile,
 uploadIPFS,
 getNfts,
 insertMintHash,
 getallidsofnft,
 insertListHash,
 approveNfts,
 insertListingStatus,
 getAllNftsForMarketplace,
 checkBuyingStatus,
 insertNewNftData,
 insertPendingBuyingStatus
} = require("../controllers/nft");

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

router.post("/users/createNFT",upload.single("file"), createNFT);
router.post("/users/getIpfs",upload.single("file"), getIpfs);
router.post("/users/getNftByStatus", getAllNfts);
router.post("/users/getNfts", getNfts);
router.post("/users/approveNfts", approveNfts);


router.post("/users/getAllNftsByUserId", getAllNftsByUserId);
router.get("/users/nft_image/:filename", addingGFS, viewProfile);
router.post("/users/uploadIPFS", uploadIPFS);
router.post("/users/InsertMintHash",insertMintHash);
router.post("/getallidsofnft",getallidsofnft)
router.post("/users/insertListHash",insertListHash)
router.post("/users/insertListingStatus",insertListingStatus)
router.post("/users/getAllNftsForMarketplace",getAllNftsForMarketplace)
router.post("/users/insertNewNftData",insertNewNftData)
router.post("/users/insertPendingBuyingStatus",insertPendingBuyingStatus)
router.post("/users/checkBuyingStatus",checkBuyingStatus)
module.exports = router;
