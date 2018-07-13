const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // this lets us get access to the socketio javascript library
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    var rooms = users.getRoomList();
    if(rooms.length > 0){
        socket.emit('activeRooms', rooms);
    }
    // socket.emit('newMessage', {
    //     from: 'Juliet',
    //     text: 'How are you? dear.',
    //     createdAt: 123
    // });// this emits the event to a single connection



    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.')
        }

        var userName = users.getUserList(params.room).filter((name)=>name === params.name);
        
        
        if(userName.length >= 1){
            return callback('UserName already taken by another user in this  room.');
        }
        socket.join(params.room); // this is use to join a room so others in other rooms won't see your message
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave
        // io.emit -> io.to('room name').emit
        // socket.broadcast.emit -> socket.broadcast.to('room name').emit
        // socket.emit 

        //Socket.emit, message from admin 'welcome to the chat app'
        //socket.broadcast.emit from admin text; new user joined
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMessage', (message, callback) => { // adding acknowledgement
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); // this emits the event to every single connection
        }
        
         callback(); // this sends an event to the front end 
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
}) // this lets you register an event listener

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
// console.log(__dirname + '/../public');
// console.log(publicPath);
// Broadcasting is a term for emitting an event to everybody but one specific user. 