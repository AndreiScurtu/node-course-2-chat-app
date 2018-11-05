const socket = io(),
      messageForm = $('#message-form'),
      messageList = $('#messages'),
      locationButton = $('#send-location');



// Socket listeners

socket.on('connect', socketOnConnect);
socket.on('disconnect', socketOnDisconnect);
socket.on('updateUserList', socketOnUpdateUserList);
socket.on('newMessage', socketOnNewMessage);
socket.on('newLocationMessage', socketOnNewLocationMessage);


// Event listeners

messageForm.on('submit', messageFormOnSubmit);
locationButton.on('click', locationButtonOnClick);


// Methods

function socketOnConnect() {
    const params = $.deparam(window.location.search);
    
    socket.emit('join', params, err => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error.');
        };
    });
};

function socketOnDisconnect() {
    console.log('Disconnected from server');
};

function socketOnUpdateUserList(users) {
    const ol = $('<ol></ol>');

    users.forEach(user => ol.append($('<li></li>').text(user)));

    $('#users').html(ol);
};

function socketOnNewMessage(message) {
    const template = $('#message-template').html(),
          formatedTime = moment(message.createdAt).format('h:mm a'),
          html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formatedTime
        });

    messageList.append(html);
    scrollToBottom();
};

function socketOnNewLocationMessage(message) {
    const template = $('#location-message-template').html(),
          formatedTime = moment(message.createdAt).format('h:mm a'),
          html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formatedTime
        });

    messageList.append(html);
    scrollToBottom();
};

function messageFormOnSubmit(event) {
    event.preventDefault();

    const messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
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

function scrollToBottom() {
    const newMessage = messageList.children('li:last-child'),

          clientHeight = messageList.prop('clientHeight'),
          scrollTop = messageList.prop('scrollTop'),
          scrollHeight = messageList.prop('scrollHeight'),
          newMessageHeight = newMessage.innerHeight()
          lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messageList.scrollTop(scrollHeight);
    }
};