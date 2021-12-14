const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const prenda = new Schema({
    foto: String,
    tipodeprenda: String,
    color: String,
    talla: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('prenda', prenda);