const express = require('express'); // The express.js library for implementing the API
const cors = require('cors');
const connection = require('./dbConfig');


apiPort = 8080;
const port = process.env.PORT || apiPort; // Pick port 8080 if the PORT env variable is empty.
const app = express();
app.use(cors());


app.get('/list', function (req, res) {

    var getCallList = "SELECT * FROM call_list LIMIT 3";

    connection.query(getCallList, function(err, result){
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

    //return only 1 result --> temporary, would be better to return everything and 
    //then display one item + next
    var getCallList = `SELECT * FROM call_list WHERE Kommune = '${req.params.Kommune}' LIMIT 5`;


    connection.query(getCallList, function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});

// app.get('/list/one', function (req, res) {

//     var getNextRow = "SELECT [Next Row].* FROM call_list";

//     connection.query(getNextRow, function(err, result){
//         if(err){
//             console.log(err);
//             res.send("Unable to get call list");
//         }
//         else{
//             res.send(result);
//         }
//     });
// });


 app.listen(port, () =>console.log(`Listening on port ${port}`));