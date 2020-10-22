const User = require('../../models/user');
const passport = require('passport');
const {MessageHandler} = require('./message.controller');
const jwt = require('jsonwebtoken');
const config = require('../../../config')

async function Register(req,res,next){

    const {usuario, password} = req.body;
    
    try{
        const newUser = new User({usuario,password})
        newUser.password = await newUser.encryptPassword(password);
        if(newUser){
           await newUser.save();
            return MessageHandler(res,newUser,"Se completo correctamente el registro", 200)
        } else{
            console.log("Hay algun error")
        }
    }catch(err){
        return MessageHandler(res,err,"No se puede registrar el usuario", 500)
    }
}

async function Login(req,res,next){
    console.log(req)
    passport.authenticate('login', (err, user, info) => {  
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
            return MessageHandler(res, {}, info.message, 500);
          }
          req.logIn(user, err => {
            User.findOne({
              usuario: user.usuario,  
              })
              .then(user => {
                console.log(config.TOKEN_EXPIRES);
                console.log(user)
                const token = jwt.sign(
                  { id: user.id },
                  config.SECRET_TOKEN,
                  { expiresIn: config.TOKEN_EXPIRES },
                );
                return MessageHandler(
                  res,
                  {
                    auth: true,
                    token,
                  },
                  'user found & logged in',
                );
              });
          });
        })(req, res, next);

        }




module.exports = {
    Register,
    Login
}