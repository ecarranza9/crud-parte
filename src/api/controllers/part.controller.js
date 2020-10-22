const {MessageHandler} = require('./message.controller');
const Part = require('../../models/part');
const {getUserFromToken} = require('../middlewares/auth')


async function getAllParts(req,res,next){
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






module.exports = {
    getAllParts,
    createPart,
    updatePart
}