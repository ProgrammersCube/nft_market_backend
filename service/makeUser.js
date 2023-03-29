const {
  toJson,
} = require("./utils");


module.exports = ({ User, authHelper }) => {
  const userService = {};

  async function getUserByEmail(email) {
    const user = await User.findOne({ email }, (err, user) => {});
    return toJson(user);
  }
  async function getUserByWalletAddress(walletAddress){
    const user = await User.findOne({ walletAddress }, (err, user) => {});
    return toJson(user);
  }
  async function getUserByName(name) {
    const user = await User.findOne(
      { name },
      (err, user) => {}
    );
    return toJson(user);
  }



  async function createUser(
    name,
    email,
    password,
    phoneNumber,
     walletAddress,
    role,
    res
  ) {
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
     walletAddress,
      role,
      res
    });
    await user.save(async(err, user) => {
    
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


 
  
  userService.createUser = async (
    name,
    email,
    password,
    phoneNumber,
     walletAddress,
    role,
    res

  ) => {
    try {
      const approveUser = await getUserByEmail(email);
         
      

      if (approveUser) {
        return res.status(200).json({
          error: "This Email Already Exist ",
        });
      }
      const walletCheck=await getUserByWalletAddress(walletAddress);
      if (walletCheck) {
        return res.status(200).json({
          error: "This wallet address Already Exist ",
        });
      }
      
      
      const user = await createUser(
        name,
        email,
        password,
        phoneNumber,
        walletAddress,
        role,
        res
    
      );
    } catch (e) {
      const errorName = e.name;
    }
  };

  
  return userService;
};
 