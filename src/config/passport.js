const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
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
passport.serializeUser((user, done)=>{
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})