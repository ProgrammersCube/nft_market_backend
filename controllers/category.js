const { user: userService } = require("../service");
const User = require('../models/User')
const Category = require("../models/Category")
const {
  toJson,
} = require("../service/utils");

async function getNftById(userId) {
  const user = await NFT.find({ userId:userId }, (err, user) => {});
  return toJson(user);
}


exports.getAllCategories  = async (req, res) => {
  try {
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await Category.find({
     
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {
           
           return  res.status(200).json({
            data :userDetails,
          });

   
    } else {
      return  res.status(200).json({
        data:[],
      });

    }

    // throw "User not found";
  }
   catch (ex) {
    throw "User not found";
  }
};





exports.createCategory = async (req, res) => {
  const { 
    name,
   } = req.body;
   try {
    const catg = new Category({
   name :name
    });
    await catg.save(async(err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          // error: errorHandler(err)
          error: err.message,
        });
      }
  
  
      return res.status(200).json({
        message: "created",
        success:true,
        data:user
        // token: user.confirmationCode,
        //  user:user
      });
    });
  }

 catch(e){

 }
   
};


exports.login  = async (req, res) => {
  try {
    const { email,password} =   req.body
    res.header( "Access-Control-Allow-Origin" );

    const userDetails = await User.findOne({
       email,
       password
     
    })
      // .populate("artist_artwork")
      .lean();
      console.log('user',userDetails)
    if (userDetails) {
      return res.status(200).json({
        data: userDetails,
      }); 
      
    } else {
      res.status(200).json({
        error:'Incorrect UserName Or Password'
      });

    }

    // throw "User not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};
