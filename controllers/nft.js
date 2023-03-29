const NFT = require('../models/NFT')
const User = require('../models/User')
const ListedNft=require('../models/ListedNft')
const {
  toJson,
} = require("../service/utils");
const { create, urlSource } = require("ipfs-http-client");

const client = create("https://ipfs.infura.io:5001/api/v0");





async function getUserByEmail(email) {
  const user = await User.findOne({ _id:email }, (err, user) => {});
  return toJson(user);
}
async function testing()
{
  NFT.findOneAndUpdate({ file:"55e75e2729d448d622a36eea623ac015.jpg",userId:"62c2e98e29634c49418fbdaa"},
    { $pull: { "minted_ids.0" : "78"  } }, (err,data) => {
      
        if (err) {
          
            
        }
    }
);
} 
async function getNftLitedById(id,userId) {
  const user = await ListedNft.find({ nft_id:id,list_status:"listed",userId:userId,status:1 }, (err, user) => {});
  return toJson(user);
}

exports.getNfts  = async (req, res) => {
  try {


    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
            
    })
      .lean();
    if (nftDetails) {
      return res.status(200).json({
        data: nftDetails,
      });
    } else {
      return res.status(200).json({
        data: [],
      });
    }

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};
exports.getAllNfts  = async (req, res) => {
  try {

    const status = req.body.status

    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
      status :status      
    })
      .lean();
    if (nftDetails) {
      return res.status(200).json({
        data: nftDetails,
      });
    } else {
      return res.status(200).json({
        data: [],
      });
    }

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};



exports.approveNfts  = async (req, res) => {
  try {

    const nftId = req.body.nftId

    res.header( "Access-Control-Allow-Origin" );

    NFT.updateOne(
        { "_id": nftId}, // Filter
        {"status": 1} // Update
    )
    .then((obj) => {
        
        return res.status(200).json({
          data: [],
        });
    })
    .catch((err) => {
        
    })

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};



exports.getAllNftsByUserId  = async (req, res) => {
  try {

    const userId = req.body.userId

    const approveUser = await getUserByEmail(userId);
    // const approveUser = await getUserByEmail(userId);
    
    

    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
      userId      
    })
      .lean();
    if (nftDetails) {
      let data=[];

      const primises  =     nftDetails?.map(async(x)=>{
                 
            let list = await getNftLitedById(x?._id,x?.userId);
            // 
                x['nftList'] = list
           // 
            data.push(x);

             return x

           })
         await  Promise.all(primises)

           
           
           return  res.status(200).json({
            data,
            walletAddress:approveUser.walletAddress
          });
      


      //  

     
    } else {
    return res.status(200).json({
        data: [],
      });
    }

    // throw "NFT not found";
  } catch (ex) {
    return res.status(200).json({
      error: ex,
    });
  }
};
exports.getAllNftsForMarketplace  = async (req, res) => {
  try {

    res.header( "Access-Control-Allow-Origin" );

    const nftDetails = await NFT.find({
          status:3
    })
      .lean();
    if (nftDetails) {
      let data=[];

      const primises  =     nftDetails?.map(async(x)=>{
                 
            let list = await getNftLitedById(x?._id,x?.userId);
            const approveUser = await getUserByEmail(x?.userId); 
            list?.forEach(object => {
              object.walletAddress = approveUser?.walletAddress;
              object.file=x?.file;
              object.title=x?.title;
              object.description=x?.description;
              object.userId=x?.userId
            });
            
            data.push(...list);
           })
          //  const data=data?.sort( () => Math.random() - 0.5) );
         await  Promise.all(primises)
           return  res.status(200).json({
           data
            
          });
     
    } else {
    return res.status(200).json({
        data: [],
      });
    }

    // throw "NFT not found";
  } catch (ex) {
    
    return res.status(200).json({
      error: ex,
    });
  }
};



exports.viewProfile = (req, res) => {
  try {
    req.gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }

      // Check if image
      // Read output to browser
      const readstream = req.gfs.createReadStream(file.filename);
      readstream.pipe(res);
      //   res.json({ readstream });
    });
  } catch (ex) {
    res.status(400).json({ error: "No file exists" });
  }
  //   const { payload } = req.body;
  //   const {
  //     name,
  //     yearOfBirth,
  //     nationality,
  //     coverArt,
  //     biography,
  //     networkCategory,
  //     links,
  //   } = payload;
};


exports.createNFT = async (req, res) => {
  const { 
    title,
    description,
    price,
    amount_for_sale,
    userId, 
    category

    
   } = req.body;
   
   try {
    if (!req.file) {

      return res.status(200).json({
        message: "Failed to upload file",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });
    }

    if (!userId) {
      return res.status(200).json({
        message: "UserId is required",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });

    }

    const {filename} = req.file

   
    

    const nft = new NFT({
      file:filename, 
      title,
      description,
      price,
      amount_for_sale,
      userId, 
      status:0,
      category:category
  
    });
    await nft.save(async(err, user) => {
  
      if (err) {
        
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

exports.getIpfs = async (req, res) => {
  console.log("get IPFS");
  const { 
    title,
    description,
    price,
    amount_for_sale,
    userId, 
    nft_type
   } = req.body;
   try {
    if (!req.file) {

      return res.status(200).json({
        message: "Failed to upload file",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });
    }

    if (!userId) {
      return res.status(200).json({
        message: "UserId is required",
        success:false
      
        // token: user.confirmationCode,
        //  user:user
      });

    }

    const {filename} = req.file

    let url = "";

    const imageurl = `http://194.5.193.238:8000/api/users/nft_image/${filename}`
  try {
    const added = await client.add(urlSource(imageurl));
    url = `https://ipfs.infura.io/ipfs/${added.cid}`;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }

  // const cid = await ipfs.add({ content }, {
  //   cidVersion: 1,
  //   hashAlg: 'sha2-256'
  // }

  const data = JSON.stringify({
    name: title,
    description,
    image: url,
  });

  try {
    const added = await client.add(data);
    const meta = `https://ipfs.infura.io/ipfs/${added.path}`;
    console.log(meta);
    const nft = new NFT({
      file:filename, 
      title,
      description,
      price,
      amount_for_sale,
      userId, 
      status:0,
      nft_type
    });
    await nft.save(async(err, user) => {
  
      if (err) {
        console.log(err);
        return res.status(400).json({
          // error: errorHandler(err)
          error: err.message,
        });
      }
      console.log(user)
      return res.status(200).json({
        message: "created",
        success:true,
        data:user,
        ipfs_url:meta
        // token: user.confirmationCode,
        //  user:user
      });
    });
  } catch (error) {
    console.log("Error uploading file: ", error);
  }

  }

 catch(e){

 }
   
};


exports.uploadIPFS = async (req, res, next) => {
  
  const { title, description, imageurl } = req.body;
  
  let url = "";

  try {
    const added = await client.add(urlSource(imageurl));
    url = `https://ipfs.infura.io/ipfs/${added.cid}`;
  } catch (error) {
    
  }

  // const cid = await ipfs.add({ content }, {
  //   cidVersion: 1,
  //   hashAlg: 'sha2-256'
  // }

  const data = JSON.stringify({
    name: title,
    description,
    image: url,
  });

  try {
    const added = await client.add(data);
    const meta = `https://ipfs.infura.io/ipfs/${added.path}`;
    
    res.json(meta);
  } catch (error) {
    
  }
};

exports.insertMintHash = async (req, res, next) => {
  
  const { artId, hash } = req.body;
  
  

  NFT.findOne({ _id: artId }, async (err, nft) => {
    if (err || !nft) {
      return res.status(400).json({
        error: " not found",
      });
    }
    if (nft) {
      (nft.mint_status = "pending"), (nft.mint_hash = hash),
      (nft.nft_mint_pending_date=new Date()),
      (nft.status=2)
    }
    nft.save((err, updatedUser) => {
      if (err) {
        
        return res.status(400).json({
          error: "User update failed",
        });
      }
      res.json(updatedUser);
    });
  });
};
exports.insertListHash = async (req, res, next) => {
  
  
  const { artId, hash,token_id,listed_price,userId } = req.body;
  
  
  const check=await ListedNft.find({nft_id:artId,token_id:token_id,userId:userId,status:1})
  if(check?.length>0)
  {
    return res.status(200).json({
      error:"this token id already listed for sale"
    })
  }
   const obj=new ListedNft({
    list_status:"pending",
    list_hash:hash,
    list_pending_date:new Date(),
    token_id:token_id,
    nft_id:artId,
    listed_price,
    userId
   })
  obj.save((err,data)=>{
    return res.json({
      message:err?err:data
    })
    
  })
};
exports.insertNewNftData=async(req,res)=>{
  const {file,title,description,amount_for_sale,userId,nftId,token_id } = req.body;
  
   const getdata=await NFT.find({file:file,userId:userId})
  let array=[]
  let arry=getdata[0]?.minted_ids[0]
  for(var i=0;i<arry?.length;i++)
  {
    array?.push(arry[i])
  }
  
  
  array?.push(token_id)
  
  
  
  
  
  
  const obj={
        file:file,
        title:title,
        description:description,
        userId:userId,
        minted_ids:[array],
        amount_for_sale:array?.length,
        status:3
   }
   NFT.updateOne({file:file,userId:userId},obj,{ upsert : true },function(err,data){
    
      return res.status(200).json({
        success:"Document added"
      })
    
  })

}
exports.insertListingStatus=async(req,res)=>{
const {id,hash,userId}=req.body
ListedNft.find({_id:id}).exec((err,data)=>{
  data?.map(async(x)=>{
    x.cancel_listing_status="pending",
    x.cancel_listing_hash=hash
    x.save((err,data)=>{
      return res.status(200).json({
        success:"done"
      })
    })
  })
})
}
exports.checkBuyingStatus=async(req,res)=>{
  const {nft_id,userId,token_id }=req.body
  ListedNft.find({nft_id:nft_id,userId:userId,token_id:token_id}).exec((err,data)=>{
    if(data[0]?.buying_status=="pending")
    {
      return res.json({
        error:"Nft already in selling state"
      })
    }
    else
    {
      return res.json({
        success:"ok"
      })
    }
  })
}
exports.insertPendingBuyingStatus=async(req,res)=>{
  const {userId,nftId,tokenId,hash,buyer_user_id,buying_wallet_address}=req.body
  
  
  
  ListedNft.find({userId:userId,nft_id:nftId,token_id:tokenId}).exec((err,data)=>{
    
    data?.map(async(x)=>{
        x.buying_status="pending"
        x.buying_hash=hash
        x.buyer_user_id=buyer_user_id
        x.buying_wallet_address=buying_wallet_address
        x.save((err,data)=>{
          if(err)
          {
            return res.status(400).json({
              error:err
            })
          }
          
        })
       

    })
    return res.status(200).json({
      success:"pending status added."
    })
  })
}
exports.getallidsofnft=async (req,res)=>{
  // const {_id}=req.body
  // const nftids = await NFT.find({
  //   _id      
  // })
  //   .lean();
  //  res.status(200).json{
  //      ids:nftids[0]?.minted_ids[0]
  //   }
}