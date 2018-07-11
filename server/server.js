const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this lets us get access to the socketio javascript library

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}) // this lets you register an event listener

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
// console.log(__dirname + '/../public');
// console.log(publicPath);