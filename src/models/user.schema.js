const { Schema, model } = require('mongoose');


const Users  = Schema({

    mail: {
        type:String,
        require:true,
    },
    passwd:{
        type:String,
        require:true
    },

});

module.exports = model('user',Users);