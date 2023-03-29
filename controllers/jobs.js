const NFT = require('../models/NFT')
const ListedNft=require('../models/ListedNft')
var Web3 = require('web3');
var provider = "https://data-seed-prebsc-1-s1.binance.org:8545/";
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var abi=require("../abis/abi.json")
var marketplaceabi=require("../abis/marketplaceabi.json")
const abiDecoder = require('abi-decoder');
const abiDecoder1=require('abi-decoder')
const { resolve } = require('path');
abiDecoder.addABI(abi.abi);
abiDecoder1.addABI(marketplaceabi.abi)


exports.mintjob  = async () => {
   
    NFT.find({
      mint_status: "pending",
    }).exec((err, data) => {
     
      // 
      data?.map(async (x) => {
        
          let hash = x.mint_hash;
          await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
            
            if (err) {
              
            }
            if (receipt !== null && receipt !== undefined) {
              if (receipt.status == true) {
                
                const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
               
                let arr=[]
                for(var i=0;i<decodedLogs?.length;i++)
                {
                     arr.push(decodedLogs[i]?.events[2]?.value)
                }
                
                x.minted_ids.push(arr)
                
                x.status = 3;
                x.mint_status="minted";
                x.nft_mint_confirmed_data=new Date()
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                   
                  }
                });
              }
               else if (receipt.status == false) {
                x.status = "false";
                x.failed_transaction=true
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                    
                  }
                });
              }
            } else {
              
            }
          });
        
      });
    });
}
exports.listjob  = async () => {
  
  ListedNft.find({
      list_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.list_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              const decodedLogs = abiDecoder1.decodeLogs(receipt.logs);
              
              if(decodedLogs[0].events[1].value)
              {
                x.index_hash=decodedLogs[0].events[1].value
             
                x.list_status="listed";
                x.list_confirm_date=new Date()
                x.status=1
                x.save((err, user) => {
                  if (err) {
                    
                  } else {
                  //  
                  }
                });  
              }
            
            }
             else if (receipt.status == false) {
              x.list_status = "rejected";
              x.failed_transaction=true
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}
exports.cancellisting  = async () => {
  
  ListedNft.find({
    cancel_listing_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.cancel_listing_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              
              
              x.delete((err,data)=>{
                 if(err)
                 {
                  
                 }
                 
              })
              
            }
             else if (receipt.status == false) {
              x.cancel_listing_status = "rejected";
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}
exports.buyJob  = async () => {
  
  ListedNft.find({
    buying_status: "pending",
  }).exec((err, data) => {
    
    data?.map(async (x) => {
      
      
        let hash = x.buying_hash;
        await web3.eth.getTransactionReceipt(hash, function (err, receipt) {
         
          if (err) {
            
          }
          if (receipt !== null && receipt !== undefined) {
            if (receipt.status == true) {
              x.buying_status="bought"
              x.status=2
              NFT.findOneAndUpdate({_id:x?.nft_id},
              { $pull: { "minted_ids.0" : `${x?.token_id}` } }, (err,data) => {
                
                  if (err) {
                    
                      
                  }
                })
                x.save()
            }
             else if (receipt.status == false) {
              x.buying_status=""
              x.buying_hash=""
              x.buying_wallet_address=""
              x.buyer_user_id=""
              x.status=1
              x.save((err, user) => {
                if (err) {
                  
                 } else {
                   // 
                 }
               });
             }
           } else {
             
           }
         });
         
        
     });
  });
}