const mysql = require('mysql2');

const connectData = require ('./config.json')

const connection = mysql.createConnection( {
    host: connectData.host,
    user: connectData.user,
    password: connectData.password,
    database: connectData.database,
    port: connectData.port
})

//mysql --user avnadmin --password=************************ --host testingdb-for-klubvind-app-testingdb-for-project.a.aivencloud.com --port 14351 defaultdb

connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to SQL!")
    }
})


module.exports = connection;
