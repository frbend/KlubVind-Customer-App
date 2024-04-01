const express = require('express'); // The express.js library for implementing the API
const cors = require('cors');
const connection = require('./dbConfig');
const path = require("path");


apiPort = 8080;
const port = process.env.PORT || apiPort; // Pick port 8080 if the PORT env variable is empty.
const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));



app.get('/list', function (req, res) {

    var getTopList = "SELECT * FROM KlubVindStagingDb LIMIT 3";

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

    var getCallList = 'SELECT * FROM KlubVindStagingDb WHERE Kommune = ? LIMIT 1';


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

    var getNextRow = 'SELECT * FROM KlubVindStagingDb WHERE id > ? LIMIT 1'
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

    var getPrevRow = 'SELECT * FROM KlubVindStagingDb WHERE id < ? ORDER BY id DESC LIMIT 1'
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

//get ID from search Result
//post into the table with the same ID
//post into the Note row
//if Note row already has something --> add it to that row


app.post('/list/Kommune/:Kommune/:id/Note/:Note', function (req, res) {

    // Query from sql = UPDATE `call_list` SET Note = 'Testing' WHERE id = 9258;

    //pull data from DB and check if it's empty - select note and check if it's null
    //if it is set it to add it to the string or else just add the string input If (!isEmpty(note)) { note += ” ” }
    //note += text and setState

     var postNote = 'UPDATE call_list SET Note = ? WHERE id = ?'

    connection.query(postNote,[req.params.Note, req.params.id], function(err, result){
        if(err){
            console.log(err);
            res.send("Unable to get call list");
        }
        else{
            res.send(result);
        }
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });


 app.listen(port, () =>console.log(`Listening on port ${port}`));
 
 // Gracefully shutdown server when SIGTERM signal is received
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Closing server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });