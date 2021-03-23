var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var port  = process.env.PORT || 4201;
var path = require('path');
var Router = express.Router();
var bodyParser = require('body-parser');



var urlencodedParser = bodyParser.urlencoded({ extended: false })
const staticPath = path.join(__dirname, "../public")
// app.use(express.static(staticPath));

var connection = mysql.createConnection({
    host: "upptis.c8xet7vkqyyb.ap-south-1.rds.amazonaws.com",
    user: "vinesh",
    password: "vin@123",
    database: "ptis_dev"
});

connection.connect(function(error) {
    if(error){
        console.log('error');
    }else{
        console.log('conected');
    }
});


app.get('/',cors(),function(req,res) {
    res.send('YOUR APP IS RUNNING')
    });


    
app.get('/firstquery',cors(),function(req,res) {
    connection.query('select MapID,BuildingName from land_master', function(error,rows,fields) {
        if(!!error){
            console.log(error)
        }else{
            console.log('success');
            res.send(rows)
        }
    });
});

app.post('/secondquery',urlencodedParser,cors(),function(req,res) {
    var reqData = req.body;
    var colName = Object.keys(reqData)[0];
    var sqlQuery = "SELECT MapId,BuildingName,AddressLine1,AddressLine2,Pincode,"+colName+" from land_master WHERE "+colName+" = "+reqData[colName]+";";
    console.log(sqlQuery)

    connection.query(sqlQuery,function(error,rows,fields) {
        if(!!error){
            console.log(`This is the error in second query: ${error}`)
        }else{
            res.send(rows)
        }
    });

});


app.listen(port); 