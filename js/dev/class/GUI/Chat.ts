import { sendMessage } from '../EventListeners/Socket.js';
import { UserEvents } from '../Player/UserEvents.js';
import { Sound } from '../Element/Sound.js';

export class Chat {

    private static messages:Array<String> = new Array();
    private static writing:string = "";
    private static littleShow = false;
    private static interval;

    private static sounds = {
        notificacion: new Sound("../js/sounds/chat.wav", 0.3)
    };

    public static add(char){
        if(Chat.writing.length < 32) Chat.writing += char;

    }

    public static push(str){
        this.messages.push(str);
        this.sounds.notificacion.play();
        this.littleShow = true;
        clearInterval(this.interval);
        this.interval= setInterval(function() {
            Chat.littleShow = false;
            clearInterval(this.interval);
        }, 4000);
    }

    public static send(){
        if(Chat.writing != ""){
            sendMessage(Chat.writing);
            Chat.writing = "";
        }
        
    }

    public static deleteLastChar(){
        this.writing = this.writing.substring(0, this.writing.length-1)
    }

    public static draw(ctx, w, h){
        ctx.textAlign="start";

        if(UserEvents.onChat){

            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.rect(0,0,w/2,h);
            ctx.fill();

            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "15px Arial";
            ctx.fillText('>'+Chat.writing,10,h-30);

            var hreg = 50;
            for ( var j = 0, i = this.messages.length; i > 0 && j < (h/25)+3 ; i--, j++) {
                ctx.fillText(this.messages[i-1],10,h-hreg);
                hreg += 20;
            }
        }else if(this.littleShow){
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = "15px Arial";
            var hreg = 50;
            for ( var j = 0, i = this.messages.length; i > 0 && j < 4 ; i--, j++) {
                ctx.fillText(this.messages[i-1],10,h-hreg);
                hreg += 20;
            }
        }

    }

}