const mysql = require('mysql2');

const connectData = require ('./config.json')

const connection = mysql.createConnection( {
    host: connectData.host,
    user: connectData.user,
    password: connectData.password,
    database: connectData.database,
    port: connectData.port
})


connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to SQL!")
    }
})


module.exports = connection;
