require('dotenv').config();
const ApiServer = require('./src/server/server');



const SERVER = new ApiServer(); 



SERVER.listener();