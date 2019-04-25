import { UMI } from '../Logic/UMI.js';
import { PHY } from '../Logic/PHY.js';
import { Teleport } from './Abilities/Teleport.js';

export class PlayerDataController {

    /**KEY CODES */
    private readonly UP = 38;
    private readonly DOWN = 40;
    private readonly LEFT = 37;
    private readonly RIGHT = 39;
    private readonly CHAR_UP = 87;
    private readonly CHAR_DOWN = 83;
    private readonly CHAR_LEFT = 65;
    private readonly CHAR_RIGHT = 68;
    private readonly E = 69;
    private readonly F = 70;
    private readonly SPACE = 32;

    public up = false;
    public down = false;
    public left = false;
    public right = false;

    public nega_up = false;
    public nega_down = false;
    public nega_left = false;
    public nega_right = false;
    
    public hab1 = false;
    public hab2 = false;
    public hab3 = false;
    public hab4 = false;

    public cx:number;
    public cy:number;

    public fixedPoint:Array<number> = [0, 0];
    public ca = 0;

    private clicked = false;

    public distance = 0;

    
    public MainPlayer = false;


    public playingKeyDown(kCode:number) {

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
                this.hab4 = true;
            break;
            

        }

    }

    public playingKeyUp(kCode:number) {
        
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
            

        }

    }

    public getCA(){
        return this.ca;
    }

    public setMousePosition(x, y, pjx, pjy, ca, fx){
        this.cx = x;
        this.cy = y;
        
        this.ca = ca;
        this.fixedPoint = fx;
    
        
    }

    public playingMouseMove(e, rect){
        this.cx = UMI.getUMI(e.clientX - rect.left);
        this.cy = UMI.getUMI(e.clientY - rect.top);
    }
    
    public getCX(){
        return this.cx;
    }

    public getCY(){
        return this.cy;
    }

    public clickOn():boolean{
        return this.clicked;
    }

    public playingMouseDown():void{
        this.clicked = true;
    }

    public playingRigthMouseDown():void{
        this.hab1 = true;
    }

    public playingMouseUp():void{
        this.clicked = false;
    }




}

