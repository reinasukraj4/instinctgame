const express = require('express');
var app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
io.on('connection', function (socket) {
  console.log('a user connected');
  
  //create sign in listener 
socket.on('user name', function(OnlineUsers){
	console.log('logged in user:', + OnlineUsers);
	io.emit('user name', OnlineUsers);
	
});

    socket.on('username', function(user){
        console.log('user Name: ' + user);
        io.emit('user name', user);
    });
  
	socket.on('disconnect', function (user) {
		 console.log('A user disconnected');
		});
	
     socket.on('logout', function(OnlineUsers){
        io.emit('user name',OnlineUsers);
        socket.disconnect();
    })
	
     socket.on('winner', function(OnlineUsers){
        io.emit('user name',OnlineUsers);
    })
});
 
	
http.listen(process.env.PORT ||8080,function(){
    console.log('Waiting for visitors');
});

