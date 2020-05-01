const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Rutas para acceder desde el navegador y ejecutar los distintos metodos (Funciona como controlador)

//Me traigo el modelo de la base de datos para realizar operaciones

const Part = require('../models/part');
const User = require('../models/user')
const { isAuthenticated }  = require('../helpers/auth');



router.post('/admin', isAuthenticated, (req,res) =>{
    const error = [];
    const user = req.user;

    if(user.role == 'regular'){
     
        error.push({ text: 'No estas habilitado para ingresar a la pestaña de Administrador'})

    }

    if(error.length > 0) {
        res.render('index',{ 
            error,
            user
        })
    } else{
     res.redirect('/admin')
    }


})


router.get('/admin', isAuthenticated, async (req,res) =>{
    const error = [];
    const user = req.user

    if(user.role == 'regular'){
     
        error.push({ text: 'No estas habilitado para ingresar a la pestaña de Administrador'})

    }

    if(error.length > 0) {
        res.render('index',{ 
            error,
            user
        })
    } else{
        const {id} = req.params;
        const horas = await Part.aggregate([ 
            {$unwind: {path: '$tasks',preserveNullAndEmptyArrays: true}},
            {$group: {
                _id: "$user.id",
                "total_horas":{$sum: "$tasks.hs" },
                 
            }},
            {$sort:{_id: -1}}
            
        ])    
    const parts = await Part.find()
    const tasks = await Part.distinct("tasks",{});
    const users = await User.find()
    res.render('admin',{
      tasks:tasks,
      horas:horas,  
      parts:parts,  
      user:user,
      users:users
    });
    }

})








module.exports = router;