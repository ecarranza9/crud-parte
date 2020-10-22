const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const User = require('../models/user');
const passport = require('passport');

router.get('/users/signin', (req,res) =>{

    res.render('users/signin');
})

router.post('/users/signin', passport.authenticate('local',{
    successRedirect:'/tasks/1',
    failureRedirect:'/users/signin',
    failureFlash: true
}
))

router.get('/users/signup', (req,res) =>{
    const errors = 0;
    const usuario = null;
    const password = null;
    const confirm_password = null;
   
    res.render('users/signup',{
        errors,
        usuario,
        password,
        confirm_password
    })
})

 router.post('/users/signup', async (req,res) => {

    const {usuario, password, confirm_password} = req.body;
    const errors = [];
    

    if(usuario.length <= 0){
        errors.push({text:'Por favor, inserte un usuario.'})
    }
    if(password != confirm_password) {
        errors.push({text:'Contraseñas no coinciden'});
    }
    if(password.length < 4) {
        errors.push({text: 'Debe escribir una contraseña mayor a 4 caracteres'});
    }
    if(errors.length > 0 ){
        res.render('users/signup',
        {errors, usuario, password, confirm_password})
    }else{
       const newUser = new User({usuario, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save(function(err){
            if(err){
                errors.push({text:'El usuario ya ha sido registrado'})
                res.render('users/signup', {
                    err,errors,usuario,password, confirm_password})
            } else{
                req.flash('success_msg', 'Se ha registrado correctamente'); 
                 res.redirect('/users/signin');     
            }
        });
        
       
           
    }   
}
)

router.get('/users/resetpassword', (req,res) =>{
    res.render('users/resetpass')
})
router.post('/users/resetpassword',async(req,res) =>{

    const errors = []
    console.log(req.body)
    const newPassword = '1234'
    const user = await User.findOne({usuario:req.body.usuario})
    
    if(user){
    user.password = await user.encryptPassword(newPassword)

    await user.save()

    req.flash('success_msg', 'Se ha reseteado la password correctamente'); 
    res.redirect('/users/signin');     
} else{

    errors.push({message:'Error en el usuario, no se ha podido reiniciar la contraseña'})
    if(errors.length > 0){res.render('users/resetpassword', errors)}
}

   
})



router.get('/users/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
})

module.exports = router;