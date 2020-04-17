const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PartSchema = new Schema({

    usuario: String,
    fecha: String,
    tasks: [{
     ot: String,
     interno: String,
     cod: String,
     description: String,
     hs: Number
    }]
})


module.exports = mongoose.model('parts', PartSchema);



