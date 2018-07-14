var socket = io();

var select = jQuery('#active');
var newRoom = jQuery('#new_room');
socket.on('activeRooms', function(rooms){

    // appends an empty option
    var opt = jQuery('<option value="">Select an Active room</option>');
    select.append(opt);

    rooms.forEach(room => {
        opt = jQuery('<option></option>');
        opt.attr('value', room);
        opt.text(room);
        select.append(opt);
    });
});

// change the protocol if the user access the page through unsecure server
if(window.location.protocol === 'http:' && window.location.hostname !== 'localhost'){
    window.location.protocol = 'https:';
}