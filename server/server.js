const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this lets us get access to the socketio javascript library

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'Juliet',
    //     text: 'How are you? dear.',
    //     createdAt: 123
    // });// this emits the event to a single connection

    //Socket.emit, message from admin 'welcome to the chat app'
    //socket.broadcast.emit from admin text; new user joined
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => { // adding acknowledgement
        console.log('createMessage', message);
        
        io.emit('newMessage', generateMessage(message.from, message.text)); // this emits the event to every single connection
        callback(); // this sends an event to the front end 
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}) // this lets you register an event listener

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
// console.log(__dirname + '/../public');
// console.log(publicPath);
// Broadcasting is a term for emitting an event to everybody but one specific user. 