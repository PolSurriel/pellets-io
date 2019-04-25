import { GameElement } from './GameElement.js';
import { UMI } from '../Logic/UMI.js';
import { PHY } from '../Logic/PHY.js';

export class Circle extends GameElement{
    
    private radio:number;
    private readonly eAngle:number = 2*Math.PI;
    private color:string;
    private img:HTMLElement;

    constructor(x:number, y:number, radio:number, color:string, img?:HTMLElement){
        super(x, y);
        this.radio = radio;
        this.color = color;

        if (this.color !== null) {
            this.drawShape = function (ctx) {

                ctx.lineWidth = 10;
                ctx.strokeStyle = this.color;
                ctx.beginPath();                
                ctx.stroke();
                ctx.arc(UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(this.radio),0,this.eAngle);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }else {
            this.img = img;
            this.drawShape = function (ctx) {
                ctx.drawImage(this.img, this.getX, this.getY);
            }
        }
    }

    public getRadio(){
        return this.radio;
    }

    public getCenterX(){
        return this.getX()+(this.radio/2);
    }

    public getCenterY(){
        return this.getY()+(this.radio/2);
    }

    public setRadio(r:number){
        this.radio = r;
    }
    /**
     * Seted on constructor.
     */
    public drawShape:(ctx)=>void;

    public draw(ctx):void{
        this.drawShape(ctx);
    }

    public static colision(obj, x, y, radio): boolean {
        return PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) - radio < radio;
    }
    
}

