/**
 * Created by Son on 6/30/2015.
 */
"use strict";

var express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs'),
    exec = require('child_process').exec,
    util = require('util'),
    port = 8080;

var sizeDownloaded = 0;
var size = 0;

var resetVar = function () {
    size = 0;
    sizeDownloaded = 0;
}

var done = false;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...\n');
        size = file.size;
        console.log(size + '\n')
    },
    onFileUploadData: function(file, data) {

    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
})); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

app.post('/upload', function (req, res) {
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

io.on('connection', function (socket) {
    console.log('connect');
});

http.listen(port, function () {
    console.log("server run on port " + port);
})