var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var players = new Array();

app.use(express.static('../'));

var tokens = 0;
var respawns = [{x:0, y:0},{x:1000, y:0},{x:0, y:1000},{x:1000, y:1000}];

io.on('connection', function(socket){

    // RESPAWN REQUEST
    socket.on('respawnRequest', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        var i = Math.floor(Math.random() * (respawns.length-1));
        socket.emit('respawn',{ 
            x:respawns[i].x,
            y:respawns[i].y
        });

        io.sockets.emit('respawnEnemy',{ 
            x:respawns[i].x,
            y:respawns[i].y,
            id:theID
        });
    });
    //---------------

    // USER JOIN TO SESION
    var token = ++tokens;
    players.push({ id:token, socketId:socket.id });
    
    players.forEach(function (player) {
        if(socket.id != player.socketId){
            io.to(player.socketId).emit('userJoin',
            {
                id:token, 
                text:'Un jugador se ha unido a la sesion'
            });
        }
    }, this);
    socket.emit('welcome',{ 
        id:token,
        players:players,
        text:'Te has unido a la sesión.'
    });
    socket.emit('mensaje',{ text:'Pulsa [F11] para jugar en PANTALLA COMPLETA'});
    //------------------


        // BLIND TO PLAYER
        socket.on('blindTo', function (data) {
            players.forEach(function(player) {
                if(player.id == data.id) io.to(player.socketId).emit('setBlinded',{});
            }, this);
    
            
        });
        //---------------

    
    
    // POSICIONES
    socket.on('sharePositions', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setPosition',{
                    x: data.x,
                    y: data.y,
                    id: theID
                });
            }
        }, this);
    });
    //---------------



    // Kill
    socket.on('kill', function (data) {
        players.forEach(function(player) {
            if(player.id == data.id){
                io.to(player.socketId).emit('killYou',{});
            } 
        }, this);
        
    });
    //---------------


    // KEY DOWN
    socket.on('keyDown', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setKeyDown',{
                    kCode:data.kCode,
                    id: theID
                });
            }
        }, this);
    });
    //---------------


    // KEY UP
    socket.on('keyUp', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setKeyUp',{
                    kCode:data.kCode,
                    id: theID
                });
            }
        }, this);
    });
    //---------------

    // LEFT MOUSE DOWN
    socket.on('mouseLeftDown', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setMouseLeftDown',{
                    x:data.x,
                    y:data.y,
                    id: theID
                });
            }
        }, this);
    });
    //---------------

    


    // LEFT MOUSE UP
    socket.on('mouseLeftUp', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setMouseLeftUp',{
                    x:data.x,
                    y:data.y,
                    id: theID
                });
            }
        }, this);
    });
    //---------------

     // RIGHT MOUSE DOWN
     socket.on('mouseRightDown', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setMouseRightDown',{
                    x:data.x,
                    y:data.y,
                    pjx:data.pjx,
                    pjy:data.pjy,
                    ca:data.ca,
                    fx:data.fx,
                    distance:data.distance,
                    id: theID
                });
            }
        }, this);
    });
    //---------------


    // MOUSE POSITION
    socket.on('sendMousePosition', function (data) {
        var theID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
        }, this);

        players.forEach(function (player) {
            if(true && socket.id != player.socketId){
                io.to(player.socketId).emit('setMousePosition',{
                    x:data.x,
                    y:data.y,
                    pjx:data.pjx,
                    pjy:data.pjy,
                    ca:data.ca,
                    fx:data.fx,
                    id: theID
                });
            }
        }, this);
    });
    //---------------

    // DAMAGE
    socket.on('sendDamage', function (data) {
        var theID;
        var socketDamagedID;
        players.forEach(function(player) {
            if(player.socketId == socket.id) theID = player.id;
            if(player.id == data.id) socketDamagedID = player.socketId;
        }, this);

        io.to(socketDamagedID).emit('setDamage', {});
        
        io.sockets.emit('setDamageToEnemy', {
            id: data.id
        });
            
        
    });
    //---------------



    //Mensaje:
    socket.on('env', function(data){ io.sockets.emit('mensaje',{ text:'@anon: '+data.text});});

    // Socket disconnected
    setInterval(function() {
        for (var i = 0; i < players.length; i++) {
            if(io.sockets.sockets[players[i].socketId] == undefined){
                io.sockets.emit('playerLeft',{id: players[i].id, text:'Un jugador ha abandonado la sesion'});
                players.splice(i, 1);
                
            }
        }

        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n-- Players in session:\n",players);

        
    }, 1000);
    
});



server.listen(80, function(){
    console.log('sevidor iniciado')
});