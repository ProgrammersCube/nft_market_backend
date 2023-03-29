const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
  {
    token_id: {
      type: String,
      trim: true,
    },
    nft_id: {
        type: String,
        trim: true,
    },
    list_pending_date:{
      type:Date,
      trim:true
    },
    list_confirm_date:{
      type:Date,
      trim:true
    },
    list_status:{
      type:String,
      trim:true
    },  
    list_hash:{
      type:String,
      trim:true
    },  
    listed_price:{
        type:String,
        trim:true
    },
    index_hash:{
      type:String,
      trim:true
  },
  cancel_listing_status:{
    type:String,
    trim:true
},
cancel_listing_hash:{
  type:String,
  trim:true
},
userId:{
  type:String,
  trim:true
},
buying_status:{
  type:String,
  trim:true
},
status:{
  type:String,
  trim:true
},
buying_hash:{
  type:String,
  trim:true
},
buyer_user_id:{
  type:String,
  trim:true
},
buying_wallet_address:{
  type:String,
  trim:true
}

  },
  { timestamps: true }

);
module.exports = mongoose.model("listednft", nftSchema);
