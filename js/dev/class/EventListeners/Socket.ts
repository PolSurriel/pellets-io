import { Chat } from "../GUI/Chat.js";
import { ServerDataController } from './serverDataController.js';
import { addEnemy, setPositionToEnemy, deleteEnemy, enemyKeyDown, enemyKeyUp, enemyMouseLeftDown, setMousePosition, enemyMouseLeftUp, setMouseRightUp, setDamage, setDamageTo, respawn, respawnEnemy, death, setBlinded } from '../../match.js';

var socket;
var id;

export function initSocket(){
    socket = (window as any ).io.connect('192.168.1.45', {'forceNew':true});
    
    socket.on('mensaje', function(data){
        Chat.push(data.text);
    });

    socket.on('welcome', function(data){
        Chat.push(data.text);
        data.players.forEach(player => {
            if(player.id != data.id) addEnemy(player.id);
        });
        id = data.id;
    });

    socket.on('userJoin', function(data){
        Chat.push(data.text);
        addEnemy(data.id);
    });

    socket.on('setPosition', function(data){
        setPositionToEnemy(data);
    });

    socket.on('playerLeft', function(data){
        deleteEnemy(data.id);
        Chat.push(data.text);
    });

    socket.on('setKeyUp', function(data){
        enemyKeyUp(data.id, data.kCode);
    });

    socket.on('setKeyDown', function(data){
        enemyKeyDown(data.id, data.kCode);
    });


    socket.on('setMouseLeftDown', function(data){
        enemyMouseLeftDown(data.id, data.x, data.y);
    });


    socket.on('setMouseLeftUp', function(data){
        enemyMouseLeftUp(data.id);
    });

    socket.on('setMouseRightDown', function(data){
        setMouseRightUp(data.id, data.x, data.y, data.pjx, data.pjy, data.ca, data.fx, data.distance);
    });

    socket.on('setMousePosition', function(data){
        setMousePosition(data.id, data.x, data.y, data.pjx, data.pjy, data.ca, data.fx);
    });
    
    socket.on('setDamage', function(data){
        setDamage();
    });

    socket.on('setDamageToEnemy', function(data){
        setDamageTo(data.id);
    });
    

    socket.on('respawn', function(data){
        respawn(data.x, data.y);
    });

    socket.on('respawnEnemy', function(data){
        respawnEnemy(data.id, data.x, data.y);
    });

    socket.on('killYou', function(data){
        death();
    });

    
    socket.on('setBlinded', function(data){
        setBlinded();
    });

    

    

}


// Envios

export function sendBlind(id){
    socket.emit('blindTo', {id:id});
}

export function userKeyDown(kCode){
    socket.emit('keyDown', {kCode:kCode});
}

export function kill(id){
    socket.emit('kill', {id:id});
}

export function userKeyUp(kCode){
    socket.emit('keyUp', {kCode:kCode});
}

export function sendMessage(str){
    socket.emit('env', {text:str});
}

export function sharePositions(x, y){
    socket.emit('sharePositions', {
        x:x,
        y:y,
        id:id
    });
    
}

export function mouseLeftDown(x, y){
    socket.emit('mouseLeftDown', {x:x, y:y});
}

export function mouseLeftUp(){
    socket.emit('mouseLeftUp', {});
}

export function mouseRightDown(x, y, pjx, pjy, ca, fx, distance){
    socket.emit('mouseRightDown', {x:x, y:y, pjx:pjx, pjy:pjy, ca:ca, fx:fx, distance:distance});
}

export function sendMousePosition(x, y, pjx, pjy, ca, fx){
    socket.emit('sendMousePosition', {x:x, y:y, pjx:pjx, pjy:pjy, ca:ca, fx:fx});
}

export function sendDamageToEnemy(id, x, y, ca){
    socket.emit('sendDamage', {id:id, x:x, y:y, ca:ca});
}

export function requestRespawn(){
    socket.emit('respawnRequest', {});
}


