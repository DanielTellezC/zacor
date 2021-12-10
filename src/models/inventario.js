const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const user = mongoose.model('users');
const { Schema } = mongoose;

const userInventario = new Schema({
    rollo: String,
    color: String,
    metros: String,
    tipodetela: String,
    usuario: {type: Schema.ObjectId, ref: "users"}
});

module.exports = mongoose.model('inventario', userInventario);