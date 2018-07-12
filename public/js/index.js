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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a  = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})


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

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val(), 
    }, () =>{
        messageTextBox.val('')
    });
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        // this function executes when the getCurrentPosition is executed successfully

        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (){
        // this gets executed when the getCurrentPosition has an error
        alert('Unable to fetch location');

        locationButton.removeAttr('disabled').text('Send location');
    }); // this gets the coordinates for the user
});