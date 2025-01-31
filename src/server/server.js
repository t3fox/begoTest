const express = require('express');
const cors = require('cors');

const { DBConn } = require('../db/config');



class ApiServer {

    constructor(){

        this.app  = express();
        this.port = process.env.PORT;

        this.users    = '/';
        this.orders = '/api';
        this.trucks = '/api';
        this.locations = '/api';


        this.db();
        this.configs();
        this.routes();

    }

    async db(){
        await DBConn();
    }

    configs(){

        this.app.use(cors({
            origin:['http://localhost:8080'],
            preflightContinue: true,
            optionsSuccessStatus: 200,
            credentials: true,
            methods:['POST,GET'],
            allowedHeaders:['Origin', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Request-Method']
            
        }));

        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.users,require('../routes/user.routes'));
        this.app.use(this.orders,require('../routes/order.routes'));
        this.app.use(this.trucks,require('../routes/trucks.routes'));
        this.app.use(this.locations,require('../routes/locations.routes'));
    }


    listener(){
        this.app.listen(this.port,(err)=> {

            if(err){
                console.log('error de arranque ',err);    
            }
            else{
                console.log('API | OK',this.port);

            }
            
        });
    } 


}

module.exports = ApiServer;