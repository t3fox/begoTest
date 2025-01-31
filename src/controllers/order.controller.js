const { request,response } = require('express')

const dbuser = require('../models/user.schema');
const dborders = require('../models/orders.schema');


const AddOrder = async  (req = request,res = response) => {

    const { id } = req;
    const { ide_order,
            ide_truck,
            ide_init,
            ide_fin
     } = req.body;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){
        
            const order = new dborders({
                user:id,
                truck:ide_truck,
                pickup:ide_init,
                dropoff:ide_fin
            });

            await order.save();

            res.status(200).json({
                ok:true,
                msg:'Encargo recibido'
            });

        }
    }
    catch(err){
     
        console.log(err)
        res.status(400).json({ok:false});
    }

    res.status(200);
}

const RwOrder = async (req = request,res = response)=> {
    const { id } = req;
    
    const { stats,ide_order  } = req.body;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            await dborders.findOneAndUpdate({
                _id:ide_order
            },{
                $set:{status:stats}
            });
            
            res.status(200).json({
                ok:true,
                msg:'Encargo modificado'
            });
        }


    }
    catch(err){

        console.log(err)     
        res.status(400).json({ok:false});
    }

}

module.exports = {
    AddOrder,
    RwOrder
}