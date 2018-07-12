var socket = io(); // this is used to listen for data from the server and to send data to the server

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'Jude',
    //     text: 'Hey, can we meet at 6:00'
    // });// this registers an event to be listened to by the server

}); // registers the 'connection' event. (event listener)

// listening to a custom event
socket.on('newMessage', function(newMessage){
    console.log('newMessage', newMessage);
});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
});