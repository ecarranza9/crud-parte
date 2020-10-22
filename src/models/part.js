const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PartSchema = new Schema({
    user:{type:String},
    fecha: {
        type: String,
        required:[true,'La fecha es requerida'],
        unique: true
    
    },
    tasks: [{
     ot: String,
     interno: String,
     cod: String,
     description: String,
     hs: Number
    }]
})


module.exports = mongoose.model('parts', PartSchema);



