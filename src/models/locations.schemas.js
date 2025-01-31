const { Schema, model } = require('mongoose');


const Locations  = Schema({

    address: {
        type:String,
        require:true 
    },
    place_id:{
        type:String,
        require:true,
        unique:true
    },
    latitude:{
        type:Number,
        require:true
    },
    longitude:{
        type:Number,
        require:true
    },

});

module.exports = model('coord',Locations);