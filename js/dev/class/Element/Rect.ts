import { GameElement } from './GameElement.js';
import { UMI } from './../Logic/UMI.js';

export class Rect extends GameElement{
    
    private width:number;
    private height:number;
    private centerX:number;
    private centerY:number;
    private color:string;

    constructor(x:number, y:number, width:number, height:number, color:string, img?){
        super(x, y);
        this.width = width;
        this.height = height;
        this.centerX = width/2; 
        this.centerY = height/2;
        this.color = color;
    }
    
    public draw(ctx){
        ctx.strokeStyke = this.color;
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(UMI.screenX(this.getX()), 
                 UMI.screenY(this.getY()), 
                 UMI.getPX(this.width),
                 UMI.getPX(this.height)
                );
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
    public getWidth(){
        return this.width;
    }

    public getHeight(){
        return this.height;
    }

    public getPoints():Array<Array<number>>{
        return [
            [this.getX(), this.getY()],
            [this.getX()+this.width, this.getY()],
            [this.getX(), this.getY()+this.getHeight()],
            [this.getX() + this.width, this.getY()+this.getHeight()]
    
        ];
    }

    public getMaxX(){
        return this.getX() +this.width ;
    }

    public getMinX(){
        return this.getX();
    }

    public getMaxY(){
        return this.getY() +this.height ;
    }

    public getMinY(){
        return this.getY();
    }


}