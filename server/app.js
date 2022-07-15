const express = require('express'); // The express.js library for implementing the API
const cors = require('cors');
const connection = require('./dbConfig');


apiPort = 8080;
const port = process.env.PORT || apiPort; // Pick port 8080 if the PORT env variable is empty.
const app = express();
app.use(cors());


app.get('/list', function (req, res) {

    var getTopList = "SELECT * FROM call_list LIMIT 3";

    connection.query(getTopList, function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});

app.get('/list/Kommune/:Kommune', function (req, res) {

    var getCallList = 'SELECT * FROM call_list WHERE Kommune = ? LIMIT 1';


    connection.query(getCallList, [req.params.Kommune], function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});

app.get('/list/Kommune/:Kommune/next/:id', function (req, res) {

    var getNextRow = 'SELECT * FROM call_list WHERE id > ? LIMIT 1'
    connection.query(getNextRow,[req.params.id], function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});

app.get('/list/Kommune/:Kommune/prev/:id', function (req, res) {

    var getPrevRow = 'SELECT * FROM call_list WHERE id < ? ORDER BY id DESC LIMIT 1'
    connection.query(getPrevRow,[req.params.id], function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});


 app.listen(port, () =>console.log(`Listening on port ${port}`));