const { user: userService } = require("../service");
const User = require('../models/User')
const NFT = require("../models/NFT")
const {
  toJson,
} = require("../service/utils");

async function getNftById(userId) {
  const user = await NFT.find({ userId:userId }, (err, user) => {});
  return toJson(user);
}


exports.getAllUser  = async (req, res) => {
  try {
    res.header( "Access-Control-Allow-Origin" );



    const userDetails = await User.find({
      
       role:'user'
      // account_type: "gallery",
      // invitation_status: payload.invitation_status,
      // gallery_signup_step: payload.gallery_signup_step,
      // pause_status:payload.pause_status
      // approved: true,
    })
      // .populate("artist_artwork")
      .lean();
    if (userDetails) {

        // console.log(userDetails)
      let data=[];

      const primises  =     userDetails?.map(async(x)=>{
                 
            let list = await getNftById(x?._id);

            console.log('list',list)
                x['nft'] = list
           // console.log('list',x)
            data.push(x);

             return x

           })
         await  Promise.all(primises)

           
           
           return  res.status(200).json({
            data,
          });

   
    } else {
      throw "User not found";
    }

    // throw "User not found";
  }
   catch (ex) {
    throw "User not found";
  }
};





exports.createAccount = async (req, res) => {
  const { 
    name,
    email,
    password,
    phoneNumber,
     walletAddress,
    role,
    
   } = req.body;
   
  const result = await userService.createUser(
   
    name,
    email,
    password,
    phoneNumber,
     walletAddress,
    role,
    res

  );
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
