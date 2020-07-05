const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;



 const UserSchema = new Schema({

    usuario: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    role: {
        type:String,
        default: 'regular',
        enum:[
            'regular', 'admin'
        ]
    }


});

UserSchema.methods.encryptPassword = async (password) => {
const salt = await bcrypt.genSalt(10); //algoritmo de cifrado
const hash = bcrypt.hash(password, salt); //Lo aplico a la contraseña
return hash;
};

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}







module.exports = mongoose.model('user', UserSchema);