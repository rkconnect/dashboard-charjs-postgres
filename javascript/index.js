/**
 * Created by Rohit on 7/18/2016.
 */
var express = require('express');
var pg = require('pg');
var path = require('path');

var connectionString = require(path.join(__dirname, 'config'));

var app = express();

//Serving Index.html
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

//Serving main.js
app.get('/javascript/main.js', function(req, res){
    res.sendFile(path.join(__dirname, 'main.js'));
});

//Getting Postgres Data
app.get('/api/v1/test', function(req, res){
    var startDate = req.query.start;
    var endDate = req.query.end;
    var result = [];

    //Postgres Client
    var client = new pg.Client(connectionString);
    client.connect();

    //Creating SQL Query
    var query = client.query("SELECT date, users FROM table1 WHERE date > ($1::date)-1 AND date < ($2::date)+1", [startDate, endDate]);
    query.on('row', function(row){
        result.push(row);
    });
    query.on('end', function(){
        client.end();
        return res.end(JSON.stringify(result));
    });
});


app.listen(8081, function(){
    console.log('Server listening on 8081');
});