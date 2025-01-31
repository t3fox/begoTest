const { request,response } = require('express')
const axios = require('axios');

const dbuser = require('../models/user.schema');
const dblocation = require('../models/locations.schemas');


const AddCoords = async(req = request,res = response) => {

    const { place_id } = req.body;
    try {

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyD25O88rMuGKCVcNFhvgkBGZyUNv_GGmwM`);
        const rispost = response.data.result


        if (!response) {
            return res.status(400).json({ok:false});
        }
      
        const locations = new dblocation({
            address: rispost.formatted_address,
            place_id,
            latitude:rispost.geometry.location.lat,
            longitude:rispost.geometry.location.lng
        });


        await locations.save();
 
        res.status(200).json({
            ok:true,
            data:locations
        });

    }
    catch(err){
        console.log(err)
        res.status(400).json({ok:false});
    }

    
}

const AllCoords = async (req = request,res = response)=> {
    
    const { id } = req;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            const locs = await dblocation.find();

            res.status(200).json({
                ok:true,
                data:locs
            });
        }


    }
    catch(err){
        res.status(400).json({ok:false});
    }

    
  
}
const DelCoords = async(req = request,res = response)=> {

    const { ide_loc } = req.headers;
    const { id } = req;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            await dblocation.findOneAndDelete({_id:ide_loc})
           
            res.status(200).json({
                ok:true,
                msg:'locación eliminada'
            });
        }

    }
    catch(err){
        console.log(err)
        res.status(400).json({ok:false});
    }

}
const RefreshCoords = async (req = request,res = response)=> {

    const { place_id,new_ide } = req.body;
    const { id } = req;

    try{
        const agent = await dbuser.findById({_id:id });

        if(agent.id != null){

            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${new_ide}&key=AIzaSyD25O88rMuGKCVcNFhvgkBGZyUNv_GGmwM`);
            const rispost = response.data.result
    
            if (!response) {
                return res.status(400).json({ok:false});
            }
            else {
                console.log('THIS: ',response);

                await dblocation.findOneAndUpdate({
                    place_id    
                },{ $set:{
                        address: rispost.formatted_address,
                        place_id,
                        latitude:rispost.geometry.location.lat,
                        longitude:rispost.geometry.location.lng                    
                    }
                });
    
                const locs =  await dblocation.findOne({place_id})
                res.status(200).json({
                    ok:true,
                    data:locs
                });
            }

        }


    }
    catch(err){
        console.log(err)
        res.status(400).json({ok:false});
    }
   
}

module.exports = {
    AddCoords,
    AllCoords,
    DelCoords,
    RefreshCoords
}