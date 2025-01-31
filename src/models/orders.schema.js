const { Schema, model } = require('mongoose');


const Orders  = Schema({

    user: {
        type:Schema.ObjectId,
        require:true,
        unique:true
    },
    truck:{
        type:Schema.ObjectId,
        require:true
    },
    status:{
        type:String,
        require:true,
        default:'created'
    },
    pickup:{
        type:Schema.ObjectId,
        require:true
    },
    dropoff:{
        type:Schema.ObjectId,
        require:true
    },

});

module.exports = model('order',Orders);