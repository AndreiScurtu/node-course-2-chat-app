const socket = io(),
      messageForm = $('#message-form'),
      messageList = $('#messages'),
      locationButton = $('#send-location');



// Socket listeners

socket.on('connect', socketOnConnect);
socket.on('disconnect', socketOnDisconnect);
socket.on('newMessage', socketOnNewMessage);
socket.on('newLocationMessage', socketOnNewLocationMessage);


// Event listeners

messageForm.on('submit', messageFormOnSubmit);
locationButton.on('click', locationButtonOnClick);


// Methods

function socketOnConnect() {
    console.log('Connected to server');
};

function socketOnDisconnect() {
    console.log('Disconnected from server');
};

function socketOnNewMessage(message) {
    const formatedTime = moment(message.createdAt).format('h:mm a'),
          li = $('<li></li>');

    li.text(`${message.from} ${formatedTime}: ${message.text}`);
    messageList.append(li);
};

function socketOnNewLocationMessage(message) {
    const li = $('<li></li>'),
          a = $('<a target="_blank">My current location</a>'),
          formatedTime = moment(message.createdAt).format('h:mm a');
    
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);

    li.append(a);
    messageList.append(li);
};

function messageFormOnSubmit(event) {
    event.preventDefault();

    const messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, () => {
        messageTextbox.val('');
    });
};

function locationButtonOnClick() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton
        .attr('disabled', 'disabled')
        .text('Sending location...');

    navigator.geolocation.getCurrentPosition(position => {
        locationButton
            .removeAttr('disabled')
            .text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton
            .removeAttr('disabled')
            .text('Send location');
        alert('Unable to fetch location.');        
    });
};