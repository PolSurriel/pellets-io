import { UserEvents } from '../Player/UserEvents.js';
import { shareMousePosition, sendMouseRightDown } from '../../match.js';
import { mouseRightDown } from './Socket.js';
import { UMI } from '../Logic/UMI.js';

export class MatchEventListeners {
    public static start(canvas:any){
        
        document.onkeydown = function (e) {
            UserEvents.playingKeyDown(e.keyCode);
        }

        document.onkeyup = function (e) {
            UserEvents.playingKeyUp(e.keyCode);
        }

        canvas.onmousemove = function(e) {
            UserEvents.playingMouseMove(e, canvas.getBoundingClientRect());
        }

        canvas.onmousedown = function(e){
            
            if(e.button == 0){
                shareMousePosition(e.clientX, e.clientY, UserEvents.fixedPoint);     
                UserEvents.playingMouseDown();
            } 
            else if (e.button == 2){
                UserEvents.playingRigthMouseDown();
                sendMouseRightDown(e.clientX, e.clientY, UserEvents.fixedPoint);
            } 
        }

       

        canvas.onmouseup = function(){
            UserEvents.playingMouseUp();
        }

        function eventsIterator(objs:Array<any>){
            objs.forEach(obj => {
                obj.colision();
            });
        }

       
    }
}
