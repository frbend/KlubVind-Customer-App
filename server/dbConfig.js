const mysql = require('mysql');


const connection = mysql.createConnection( {
    host: 'mysql201.dandomain.dk',
    user: 'klubvinddk02',
    password: 'RmrzosDZnj31pD',
    database: 'klubvinddk02_db',
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
