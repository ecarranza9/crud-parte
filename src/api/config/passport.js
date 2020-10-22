const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const config = require('../../../config')

const secret = config.SECRET_TOKEN;

passport.use('login',new LocalStrategy({
    usernameField: 'usuario'
}, async(usuario,password,done) => {
const user = await User.findOne({usuario: usuario});
if(!user){
    return done(null,false,{message:'No se encuentra el usuario'});
} else {
   const match = await user.matchPassword(password);
   if(match){
       return done(null,user);
   }else{
       return done(null, false, {message:'Contraseña incorrecta'});
   }
}
}
))

const opts = {
    jwtFromRequest: extractJWT.fromUrlQueryParameter('secret_token'),
    secretOrKey: secret,
  };

passport.use('jwt',

new JWTStrategy(opts,(jwt_payload,done)=>{
    try{
        User.findOne({usuario: jwt_payload.id})
        .then(user => {
            console.log(`desde passport: ${user}`)
            if(user){
                console.log("usuario encontrado")
                done(null,user)
            }else{
                console.log("paso algo...")
                done(null,false)
            }
        })
    }catch(err){
       done(err)
    }
})

)