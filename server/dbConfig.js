const mysql = require('mysql2');



require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
});

//not needed for production -- the build still doesn't work -- need to do something about @azure/msal-node
// const connectData = require ('./config.json')

// const connection = mysql.createConnection({
//     host: connectData.host,
//     user: connectData.user,
//     password: connectData.password,
//     database: connectData.database,
//     port: connectData.port,
// });


connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to SQL!")
    }
})


module.exports = connection;
