const path = require('path'),
      http = require('http'),
      express = require('express'),
      socketIO = require('socket.io'),

      publicPath = path.join(__dirname, '../public'),
      port = process.env.PORT || 3000,
      
      app = express(),
      server = http.createServer(app),
      io = socketIO(server);   

app.use('', express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

    socket.on('createMessage', message => {
        console.log('createMessage', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });       

    socket.on('disconnect', () => console.log('User was disconnected'));
});

server.listen(port, () => console.log(`Server is up on port ${port}`));