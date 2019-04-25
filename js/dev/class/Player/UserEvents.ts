import { UMI } from '../Logic/UMI.js';
import { Chat } from '../GUI/Chat.js';
import { userKeyUp, userKeyDown, mouseLeftDown, mouseRightDown, mouseLeftUp, sendMousePosition } from '../EventListeners/Socket.js';
import { shareMousePosition } from '../../match.js';

export class UserEvents {

    /**KEY CODES */
    private static readonly UP = 38;
    private static readonly DOWN = 40;
    private static readonly LEFT = 37;
    private static readonly RIGHT = 39;
    private static readonly CHAR_UP = 87;
    private static readonly CHAR_DOWN = 83;
    private static readonly CHAR_LEFT = 65;
    private static readonly CHAR_RIGHT = 68;
    private static readonly E = 69;
    private static readonly F = 70;
    private static readonly SPACE = 32;
    private static readonly T = 84;

    public static up = false;
    public static down = false;
    public static left = false;
    public static right = false;

    public static nega_up = false;
    public static nega_down = false;
    public static nega_left = false;
    public static nega_right = false;

    public static ESC = 27;
    public static esc = false;
    
    public static hab1 = false;
    public static hab2 = false;
    public static hab3 = false;
    public static hab4 = false;

    public static cx:number = 0;
    public static cy:number = 0;

    public static fixedPoint:Array<number> = [0,0];
    public static ca;

    private static clicked = false;

    public static wheelUp = false;
    public static wheelDown = false;
    
    public static MainPlayer = true;

    public static onChat = false;

    public static wShift = false;
    public static wBloq = false;

    public static playingKeyDown(kCode:number) {
        

        if(UserEvents.onChat){
            if(kCode== 16) this.wShift = true;
            else if(kCode== 20) this.wBloq = !this.wBloq;
            else if(kCode == 13) Chat.send();
            else if(kCode == 27) UserEvents.onChat = !UserEvents.onChat;
            else if(kCode == 8) Chat.deleteLastChar();
            else{
                
                if(this.wShift) Chat.add(String.fromCharCode(kCode));
                else if(this.wBloq) Chat.add(String.fromCharCode(kCode));
                else Chat.add(String.fromCharCode(kCode).toLocaleLowerCase());
            } 
        }else{
            userKeyDown(kCode);
        }

        switch(kCode) {
            case (this.UP): case (this.CHAR_UP):
                this.up = true;
                this.nega_up = false;
                this.nega_down = true;
            break;
            case (this.DOWN): case (this.CHAR_DOWN):
                this.down = true;
                this.nega_down = false;
                this.nega_up = true;

            break;
            case (this.LEFT): case (this.CHAR_LEFT):
                this.left = true;
                this.nega_left = false;
                this.nega_right = true;

            break;
            case (this.RIGHT): case (this.CHAR_RIGHT):
                this.right = true;
                this.nega_right = false;
                this.nega_left = true;
            break;
            case (this.SPACE):
                this.hab2 = true;
                break;
            case (this.F):
                this.hab3 = true;
            break;
            case (this.E):
                UserEvents.hab4 = true;
            break;
            case (this.T):
                if(!UserEvents.onChat) UserEvents.onChat = !UserEvents.onChat;
            break;
            
            

        }

    }

    public static playingKeyUp(kCode:number) {
        userKeyUp(kCode);

        if(kCode== 16) this.wShift = false;
        
        switch(true) {
            case (kCode == this.UP || kCode == this.CHAR_UP):
                this.up = false;
                this.nega_down = false;

            break;
            case (kCode == this.DOWN || kCode == this.CHAR_DOWN):
                this.down = false;
                this.nega_up = false;
            break;
            case (kCode == this.LEFT || kCode == this.CHAR_LEFT):
                this.left = false;
                this.nega_right = false;
            break;
            case (kCode == this.RIGHT || kCode == this.CHAR_RIGHT):
                this.right = false;
                this.nega_left = false;
            break;
            case (kCode == 187):
                this.wheelUp = true;
            break;
            case(kCode == 189):
                this.wheelDown = true;
            

        }

    }

    public static playingMouseMove(e, rect){
        
        if(this.clickOn()) shareMousePosition(e.clientX, e.clientY, this.fixedPoint);
        this.cx = UMI.getUMI(e.clientX - rect.left);
        this.cy = UMI.getUMI(e.clientY - rect.top);

    }
    
    public static getCX(){
        return this.cx;
    }

    public static getCY(){
        return this.cy;
    }

    public static clickOn():boolean{
        return this.clicked;
    }

    public static playingMouseDown():void{
        mouseLeftDown(this.cx, this.cy);
        this.clicked = true;
    }

    public static playingRigthMouseDown():void{
        this.hab1 = true;
    }

    public static playingMouseUp():void{
        mouseLeftUp();
        this.clicked = false;
    }


}

