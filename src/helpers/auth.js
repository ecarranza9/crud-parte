
//Esto es un middleware para saber si el usuario esta autenticado o no
const helpers = {};


helpers.isAuthenticated = (req,res,next) =>{

    console.log(req.isAuthenticated())

    if(req.isAuthenticated()) {
        return next();
    }

    req.flash('error_msg', 'No esta autorizado para ingresar, Debe registrarse');
    res.redirect('/users/signin');

};
    
module.exports = helpers;