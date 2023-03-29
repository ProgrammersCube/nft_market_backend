const makeUser = require('./makeUser');
const User = require('../models/User');



const userService = makeUser({
  User,
  
});

module.exports = {
  user: userService,
};
