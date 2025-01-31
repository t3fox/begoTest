const { request,response } = require('express')

const dbuser = require('../models/user.schema');
const dbtruck = require('../models/trucks.schema');


const Addtruck = async (req = request,res = response) => {
    
    const { id } = req;
    const { year, color, plates } = req.body
    try{

        const agent = await dbuser.findById({_id:id });

        if(agent.id != null)  {

            const truck = new dbtruck({
                user:agent.id,
                year,
                color,
                plates
            })
            await truck.save();
    
            res.status(200).json({
                ok:true,
                msg:'Camion agregado',
                uid:truck.id
                
            });
        }
        

    }
    catch(err){
        console.log('LaData:',err)
        res.status(400).json({ok:false});
    }

  
}

const All_trucks = async  (req = request,res = response)=> {

    const { id } = req;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            const trucks = await dbtruck.find();

            res.status(200).json({
                ok:true,
                data:trucks
            });
        }


    }
    catch(err){
        res.status(400).json({ok:false});
    }
   
}
const Deltruck = async (req = request,res = response)=> {

    const { ide_truck } = req.body;
    const { id } = req;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){


            await dbtruck.findOneAndDelete({_id:ide_truck})

            res.status(200).json({
                ok:true,
                msg:'camion eliminado'
            });
        }


    }
    catch(err){
        console.log(err)
        res.status(400).json({ok:false});
    }
}
const Reltruck = async (req = request,res = response)=> {

    const { ide_truck } = req.headers;
    const { id } = req;

    const { year, color, plates } = req.body

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            await dbtruck.findOneAndUpdate({
                _id:ide_truck    
            },{ $set:{
                    year,
                    color,  
                    plates                      
                }
            });

            const trucks  = await dbtruck.findById({_id:ide_truck})
     
            res.status(200).json({
                ok:true,
                data:trucks
            });
        }


    }
    catch(err){
        res.status(400).json({ok:false});
    }

}


module.exports = {
    Addtruck,
    All_trucks,

    Deltruck,
    Reltruck


}