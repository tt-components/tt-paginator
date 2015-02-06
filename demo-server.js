var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 8000;
    portHttps = parseInt(process.env.PORT_HTTPS, 10) || 8443;


// https://github.com/senchalabs/connect#middleware
var serveStatic = require('serve-static');

// redirect
var http = require('http');





app.use(serveStatic(__dirname + '/../', {  'index': ['demo.html', 'index.html', 'index.htm']}))

var httpServer = http.createServer(app);
httpServer.listen(port);

console.log("Simple static server listening at http://localhost:" + port);
