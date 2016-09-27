var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
// creates socket.io server, which is an EventEmitter
var io = socket_io(server);

// add listener to the connection event of the server, this will be called when new client connects to the socket.io server
io.on('connection', function (socket) {
  console.log('Client connected');

  socket.on('mousemove', function (draw) {
    console.log('Received drawing:', draw);
    // broadcase message to any other connected clients
    socket.broadcast.emit('mousemove', draw);
  });
});

server.listen(process.env.PORT || 8080);
