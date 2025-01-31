const mongoose = require('mongoose');


const DBConn = async () => {

    try{
        mongoose.connect(process.env.MONGO_DB);
        console.log("DB  | OK");
    }
    catch(err){
        console.log("error en la BD");
    }

}



module.exports = {
    DBConn
}