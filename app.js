var http = require("http");
var request = require("request");
var fs = require('fs');
var express = require('express');
var app = express();

var port = 1337;
var url = "http://graph.facebook.com/NounenRena/photos?type=uploaded";
var url2 = "http://graph.facebook.com/ashin555/photos?type=uploaded";
var url3 = "http://graph.facebook.com/133557833621/photos?type=uploaded";
app.use(express.static(__dirname));
app.use(express.bodyParser());

app.get('/', function(req, res){
  res.sendfile('fanPagePhoto.html');
});

app.post('/items/:id', function(req, res){
	var toGet = "http://graph.facebook.com/" + req.params.id +"/photos?type=uploaded";
	request.get(toGet, function (err, body, response) {
		console.log(req.params.id);
		res.end(response);
    });
});
app.listen(port);

console.log("server is listening at port: " + port);

