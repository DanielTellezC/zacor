const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const empleado = new Schema({
    nombre: String,
    horaentrada: String,
    horasalida: String,
    fecha: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('empleado', empleado);