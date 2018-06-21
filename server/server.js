const path= require('path');
const express=require('express');
const publicPath = path.join(__dirname,'../public');
const app=express();
const socketIO=require('socket.io');
const http=require('http');
const port=process.env.PORT||3000;
const {generateMessage} = require('./utils/message');

var server=http.createServer(app);
app.use(express.static(publicPath));
var io=socketIO(server);

io.on('connection',function(socket){
console.log("new user connected");

socket.emit('newMessage',generateMessage('Admin','Welcome User'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New user Joined'));

socket.on('createMessage',function(message){
console.log("New Messgae Created",message);
io.emit('newMessage',generateMessage(message.from,message.text));
});

socket.on('disconnect',function(socket){
	console.log("user disconnected");
});



});



server.listen(port,function(){
	console.log("Server running at port "+port);
});

