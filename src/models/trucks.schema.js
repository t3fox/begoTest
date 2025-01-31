const { Schema, model } = require('mongoose');


const Truck  = Schema({

    user: {
        type:Schema.ObjectId,
        require:true,
    },
    year:{
        type:String,
        require:true
    },
    color:{
        type:String,
        require:true
    },
    plates:{
        type:String,
        require:true,
    
    },

});

module.exports = model('truck',Truck);
