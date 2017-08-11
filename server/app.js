// import files and packages up here


// create your express server below
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');



// add your routes and middleware below
 app.use(morgan('dev'));
// finally export the express application

app.use('/data',function(req,res){

   res.send(require( "./data.json" ));
});


app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.get( '/', function( req, res ) {
    res.sendFile( path.join( 'public', 'index.html' ));
  });
 
 
if(!module.parent){ 
    app.listen(port);
}
console.log('server listening',port);
module.exports = app;
