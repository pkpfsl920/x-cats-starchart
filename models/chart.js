const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
    firstname: 
    {
        type: String,
        required: true
    },
    lastname:
    {
        type: String,
        required: true
    },
    hours:
    {
        type: Number,
        required: true
    },
    fundRaisingTriangle: 
    {
        type: Number,
        required: true
    },
    journalCircle:
    {
        type: Number,
        required: true
    },
    communitySquare:
    {
        type: Number,
        required: true
    },
    preSessionPaw: 
    {
        type: Number,
        required: true
    },
    extraHoursPaw:
    {
        type: Number,
        required: true
    },
    fundRaisingPaw: 
    {
        type: Number,
        required: true
    },
    journalPaw:
    {
        type: Number,
        required: true
    },
    communityPaw:
    {
        type: Number,
        required: true
    },
    projectPaw: 
    {
        type: Number,
        required: true
    },
    casual: 
    {
        type: Boolean,
        required: true
    },
    juniorVarsity:
    {
        type: Boolean,
        required: true
    },
    varsity:
    {
        type: Boolean,
        required: true
    },
    targetVarsityHours: 
    {
        type: Number,
        required: true
    }
});

// Compile model from schema
// *** IMPORTANT *** - 
//      *** first param string determines the collection name in the database ***

var StarChartModel = mongoose.model( "StarChart", chartSchema );

module.exports = { StarChartModel };;

// OR just simply ...
// module.exports = mongoose.model("StarChart", chartSchema);

