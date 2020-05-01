const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Rutas para acceder desde el navegador y ejecutar los distintos metodos (Funciona como controlador)
 
//Me traigo el modelo de la base de datos para realizar operaciones

const Part = require('../models/part');
const { isAuthenticated }  = require('../helpers/auth');









//primera ruta, la home

router.get('/', (req, res) =>{

    
    res.render('index',{   
    })
})




//ruta task, una vez identificado el usuario

router.get('/tasks', isAuthenticated, async (req,res) =>{
    const err = 0;
    const {id} = req.params;
    const parts =  await Part.find({user: req.user.id}).sort({'fecha': -1}) 
    const user = req.user
    

    //Agrego el acumulador de horas, " en unwind coloco la coleccion de docu"
const horas = await Part.aggregate([ 
        {$match:{ user : req.user.id}}, 
        {$unwind: {path: '$tasks',preserveNullAndEmptyArrays: true}},
        {$group: {
            _id: "$fecha",
            "total_horas": {$sum: "$tasks.hs" },
             
        }},
        {$sort:{_id: -1}}
        
    ])






    res.render('tasks', {
        user:user,  
        err:err,
        parts:parts,
        horas:horas 
    })
})

//agrego parte diario -

router.post('/add', isAuthenticated, async (req,res) =>{

    const parts =  await Part.find({user: req.user.id}).sort({'fecha': -1})  
    


    //Agrego el acumulador de horas, " en unwind coloco la coleccion de docu"
const horas = await Part.aggregate([ 
        {$match:{ user : req.user.id}}, 
        {$unwind: {path: '$tasks',preserveNullAndEmptyArrays: true}},
        {$group: {
            _id: "$fecha",
            "total_horas": {$sum: "$tasks.hs" },
             
        }},
        {$sort:{_id: -1}}
        
    ])

    
    const  nuevo_part = new Part({
        _id: req.body._id,
        fecha: req.body.fecha,
    })

nuevo_part.user = req.user._id

await nuevo_part.save(function (err) {

    if(err){
        res.render('tasks', {err,parts,horas})
    }else{
        res.render('addtask', {
            nuevo_part : nuevo_part,
        });

    }




});



});





router.get('/tasks/delete/:id', async(req,res) =>{
    const { id } = req.params;
    await Part.remove({_id: id});
    res.redirect('/tasks')
})




router.get('/addtask', isAuthenticated, function(req,res){
    const  nuevo_part = new Part({
        _id: req.body._id,
        fecha: req.body.fecha
       
                
});
nuevo_part.user = req.user.id

    

    res.render('addtask', {

        nuevo_part : nuevo_part,
  
    })
    })



    router.post('/addtask', isAuthenticated, function(req,res) {

       
        const  nuevo_part = new Part({
            _id: req.body._id,
            fecha: req.body.fecha,
                    
    });
 


   nuevo_part.user = req.user.id
   
      
    Part.update({ _id: req.body._id}, {
        $push: {'tasks': {
          
            ot: req.body.ot,
            interno: req.body.interno,
            cod: req.body.cod,
            description: req.body.description,
            hs: req.body.hs
              
        }
        }},
    
    
    function(err){
        if(err) { 
            return res.json({
                success: false,
                msj: req.body
            });
        } else {
            
            console.log(req.body);
            req.flash('success_msg','Ok, has cargado un parte');
            res.redirect('/tasks')
            
               
            }
            
        }

)
})


//listado de tareas

router.get('/listaks/:id', isAuthenticated, async (req,res) =>{
    const {id} = req.params;
    const parts =  await Part.find({user: req.user.id})
   const tasks = await Part.distinct("tasks",{_id: id});
   
  

   res.render('listaks',{
       tasks:tasks,
       parts:parts,
       id:id
   })
   

})

//Eliminar tareas.

router.get('/listaks/delete/:id/:idTask', isAuthenticated, async (req,res) => {

    const idTask = req.params.idTask;
    //console.log(idTask)
    const id = req.params.id;
   // console.log(id);
    //console.log(req.params)
    const tasks = await Part.distinct("tasks",{_id: id});
     
        await  Part.update({_id:id},{
            $pull: {"tasks": {_id: idTask}        
            }}, function(error){
                if(error) { 
                    return res.json({
                        success: false,
                        msj: req.body
                    });
                } else {
                    
                    console.log(req.body);
                    res.redirect('/tasks')
                    
                       
                    }
                    
                }
            
            
            )

})

router.get('/listaks/edit/:id/:idTask', isAuthenticated,async(req,res) => {

    const idTask = req.params.idTask;
    //console.log(idTask)
    const id = req.params.id;
   // console.log(id);
    //console.log(req.params)
    const tasks = await Part.distinct("tasks",{_id: id});

    res.render('editask', {
     
        tasks:tasks,
        id:id,
        idTask:idTask
    })
})

router.post('/listaks/edit/:id/:idTask', isAuthenticated, async(req,res)=>{

    console.log(req.body)

    const idTask = req.params.idTask;
    console.log(idTask)
    const id = req.params.id;
    console.log(id);

  await Part.update(
    {_id: id,
    "tasks._id":idTask,
    },
    {
        $set:{"tasks.$.ot": req.body.ot,
        "tasks.$.interno": req.body.interno,
        "tasks.$.cod": req.body.cod,
        "tasks.$.description": req.body.description,
        "tasks.$.hs": req.body.hs,

    
    }
    
    
    
    
    
    
    
}, function(error){
    if(error) { 
        return res.json({
            success: false,
            msj: req.body
        });
    } else {
        
        console.log(req.body);
        res.redirect('/tasks')
        
           
        }
        
    }



    
    
    )
})


router.get('/tasks/:id', async(req,res) =>{
    const{ id } = req.params;
    const part = await Part.findById(id);
    
    res.render('edit', {
        part:part
    });
})
    
    router.post('/tasks/:id', async(req,res) =>{
        const { id } = req.params;
        await Part.update({_id: id}, {
            $push: {'tasks': {
          
                cod: req.body.cod,
                interno: req.body.interno
                  
            }
        }})
        res.redirect('/tasks');
        
      
    })








module.exports = router;

