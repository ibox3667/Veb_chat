let express = require('express');
let app = express();
let server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000, () =>{ 
    console.log("Port is created in localhost:3000");
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
} );

let users = [];
let connectios = [];

io.sockets.on('connection', function(socket) {

    // console.log('good connection');
    
    connectios.push(socket);

    socket.on('disconnect', (data) =>{
        connectios.splice(connectios.indexOf(socket), 1);
        // console.log('good unconnection');
    });

    socket.on('send mess', (data) => {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className})
    });


})