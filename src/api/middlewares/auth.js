const {MessageHandler} = require('../controllers/message.controller');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const config = require('../../../config');

async function Auth(req,res,next){
    passport.authenticate('jwt', { session: false }, (err, users, info) => {
        if (err) {
          console.log(err);
          return MessageHandler(res, err, 400);
        }
        if (info != undefined) {
          return MessageHandler(res, info.message, {}, 500);
        }
        next();
      })(req, res, next);
}

async function getUserFromToken(token){

  var decoded =  jwt.verify(token,config.SECRET_TOKEN)
  console.log(decoded)
  return decoded

}

module.exports = {
    Auth,
    getUserFromToken
}