const {MessageHandler} = require('./message.controller');
const Part = require('../../models/part');
const {getUserFromToken} = require('../middlewares/auth');


async function createTask(req,res,next){

    const { id } = req.params

    const decoded = await getUserFromToken(req.query.secret_token);
    const user = decoded.id;

    try{
        let newTask = await Part.update({ _id: id}, {
            $push: {'tasks': {
              
                ot: req.body.ot,
                interno: req.body.interno,
                cod: req.body.cod,
                description: req.body.description,
                hs: req.body.hs
                  
            }}})
    if(newTask){
        return MessageHandler(res,newTask,"La tarea se ha agregado correctamente")
    }
}catch(err){
    res.send({text:"Error al agregar la tarea"})
}

}


async function updateTask(req,res,next){
    const decoded = await getUserFromToken(req.query.secret_token)
    const user = decoded.id
    const idTask = req.params.idTask;
    const id = req.params.id;
    try{
 let updateTask = await Part.update(
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
})

if(updateTask){
    return MessageHandler(res,updateTask,"El parte ha sido actualizado",200)
}else{
    return MessageHandler(res,null,"El parte no se ha podido actualizar",404)
}
   }catch(err){ 

    return MessageHandler(res,err,"Error",500)

    }

}

async function deleteTask(req,res,next){

    const idTask = req.params.idTask;
    const id = req.params.id;

    let deleteTask = await Part.update({_id:id},{
        $pull: {"tasks": {_id: idTask}        
        }})

        if(deleteTask){
            return MessageHandler(res,updateTask,"El parte ha sido actualizado",200)
        }else{
            return MessageHandler(res,null,"El parte no se ha podido actualizar",404)
        }


}




module.exports = {
    createTask,
    updateTask,
    deleteTask
}

