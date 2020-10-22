const {MessageHandler} = require('./message.controller');
const Part = require('../../models/part');
const {getUserFromToken} = require('../middlewares/auth')


async function getAllParts(req,res,next){
    const decoded = await getUserFromToken(req.query.secret_token)
    const user = decoded.id

    const parts =  await Part.find({user: user}).sort({'fecha': -1}) 
    //Agrego el acumulador de horas, " en unwind coloco la coleccion de docu"
const horas = await Part.aggregate([ 
        {$match:{ user : user}}, 
        {$unwind: {path: '$tasks',preserveNullAndEmptyArrays: true}},
        {$group: {
           
            _id: "$_id",
            "total_horas": {$sum: "$tasks.hs" },
             
        }},
        {$sort:{_id: -1}}
        
    ])

    try{
        if(user){
            return MessageHandler(res,[parts,horas],"Ok",200)
        } else{
            return MessageHandler(res,{},"Hubo algun error", 404)
        }


    }catch(err){
        return MessageHandler(res,{},"Error interno",500)
    }

}

async function updatePart(req,res,next){

    const decoded = await getUserFromToken(req.query.secret_token)
    const user = decoded.id
    const {id} = req.params;
    
    
        let part = await Part.findById(id)
        if(!part){
            return MessageHandler(res,{},"No se encontro el parte",404)
        }
        let newPart = {
            fecha: req.body.fecha,
            user: user
        }
        const filter = {_id: id}
        if(newPart){
            let update = await Part.findOneAndUpdate(filter,newPart)
            if(update){
                return MessageHandler(res,newPart,"Parte modificado con exito",200)
            }
            else{
                return MessageHandler(res,{},"No se pudo actualizar el parte",404)
            }
        }
}

async function createPart(req,res,next){

    const decoded = await getUserFromToken(req.query.secret_token)
    const user = decoded.id
    console.log(user)

    try{
        let newPart = await Part.create({
            fecha: req.body.fecha,
            user: user
        })

        console.log(req.body)

    if(newPart){
        return MessageHandler(res,{newPart},"Parte creado con exito",200)
    }
}catch(err){
    res.send({text:'La fecha ya existe'})
}

}

    async function deletePart(req,res,next){
        const decoded = await getUserFromToken(req.query.secret_token)
        console.log(decoded);
        const user = decoded.id
        const {id} = req.params;

        let part = await Part.findById(id);
        if(!part){
            return MessageHandler(res,{},"No se encontro el parte",404)
        }

        let deletePart = await Part.remove(part);
        if(deletePart){
            return MessageHandler(res,deletePart,"El parte ha sido eliminado",200)
        }else{
            return MessageHandler(res,{},"No se pudo eliminar el parte",404)
        }



    }





module.exports = {
    getAllParts,
    createPart,
    updatePart,
    deletePart
}