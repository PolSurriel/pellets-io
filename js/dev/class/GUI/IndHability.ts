import { UMI } from '../Logic/UMI.js';
import { Sound } from '../Element/Sound.js';


export class IndHability {

    private static readonly COLOR ="rgba(11, 198, 46, 0.75)";
    private static xDrawable = 1900;
    private static yDrawable = 50;
    private static readonly spaceBetween = 20;
    private static readonly width = 12;
    private static readonly height = 35;

    private static count = 0;
    private static restablishCount = 0;

    private static sound = new Sound('../js/sounds/bonus1.wav', 0.1);

    public static getCount(){
        return this.count;
    }

    public static getRestablishCount(){
        return this.restablishCount;
    }

    public static setCount(count:number, restablishCount:number) {
        if(count > this.count){
            this.sound.stop();
            this.sound.play();
        }
        this.count = count;
        this.restablishCount = restablishCount;
    }
    
    public static draw(ctx){
        ctx.fillStyle = this.COLOR;
        ctx.strokeStyle = '#c7ccd6';
        for (var i = 0; i < this.count; i++) this.drawOne(ctx, i, 100);
        
        if(this.restablishCount != 0 ) this.drawOne(ctx, this.count, this.restablishCount/10);
        else this.drawOne(ctx, this.count-1, 100);

        ctx.beginPath();
        ctx.closePath();
        
        
    }

    public static drawOne(ctx, n, prc){
        
        var spaceBetween = n* this.spaceBetween;

        this.xDrawable = innerWidth-80;

        ctx.beginPath();
        ctx.lineWidth=1;                
        ctx.moveTo(this.xDrawable + spaceBetween, this.yDrawable);
        ctx.lineTo(this.xDrawable+this.width+ spaceBetween, this.yDrawable);
        ctx.lineTo((this.xDrawable+(this.width-(prc*this.width/100)) + spaceBetween), this.yDrawable-(prc*this.height/100));
        ctx.lineTo((this.xDrawable-(prc*this.width/100) + spaceBetween), this.yDrawable-(prc*this.height/100));
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();

        

    }
}