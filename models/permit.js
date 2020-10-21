const mongoose = require('mongoose');

const permitSchema = new mongoose.Schema({
    email: 
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    }
//    loginStatus:
//    {
//        type: Boolean,
//        required: true
//    }
});

// Compile model from schema
// *** IMPORTANT *** - 
//      *** first param string determines the collection name in the database ***

var PermitModel = mongoose.model( "Certify", permitSchema );

module.exports = { PermitModel };;