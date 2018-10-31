const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),

      { generateMessage } = require('./utils/message'),
      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000,
      
      app = express(),
      server = http.createServer(app),
      io = socketIO(server); 


app.use('', express.static(publicPath));


io.on('connection', socket => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });       

    socket.on('disconnect', () => console.log('User was disconnected'));
});


server.listen(port, () => console.log(`Server is up on port ${port}`));