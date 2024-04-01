const mysql = require('mysql2');


//not needed for production -- the build still doesn't work -- need to do something about @azure/msal-node
const connectData = require ('./config.json')

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host || connectData.host,
    user: process.env.user || connectData.user,
    password: process.env.password || connectData.password,
    database: process.env.database || connectData.database,
    port: process.env.port || connectData.port
});


connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to SQL!")
    }
})


module.exports = connection;
