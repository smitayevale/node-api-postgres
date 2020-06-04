var http = require('http');
var port = process.env.PORT || 3000
var app = require('./server');
http.createServer(app.handleRequest).listen(port);
