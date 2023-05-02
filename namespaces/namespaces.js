const express = require('express');
const app = express();

const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8001);

const io = socketio(expressServer)

io.of("/").on('connection',(socket)=>{
    socket.join('chat');

    io.of('/').to('chat').emit('welcomeToChatRoom',{});
    io.of('/').to(socket.id).emit('socketCheck',socket.id);

    io.of('/admin').emit('userJoinedMainNS',"")

    console.log(socket.id,"has connected")
    
    socket.on('newMessageToServer',(dataFromClient)=>{
        console.log("Data:",dataFromClient);
        io.of("/").emit('newMessageToClients',{text:dataFromClient.text});

    })
})

io.of("/admin").on('connection',(socket)=>{
    console.log(socket.id,"has joined /admin")

    io.of('/admin').to('chat').emit('welcomeToChatRoom',{});
});