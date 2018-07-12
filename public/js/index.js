var socket = io(); // this is used to listen for data from the server and to send data to the server

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'Jude',
    //     text: 'Hey, can we meet at 6:00'
    // });// this registers an event to be listened to by the server

}); // registers the 'connection' event. (event listener)

// listening to a custom event
socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got it', data);
// }); // adding acknowledgement

jQuery('#message-form').on('submit', function(e){
    e.preventDefault(); // prevent the default behaviour of this event

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val(), 
    }, () =>{

    });
});