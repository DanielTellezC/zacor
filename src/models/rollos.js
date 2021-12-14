const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const rollos = new Schema({
    color: String,
    tipodetela: String,
    metros: String,
    cuenta: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('rollos', rollos);
