import { UMI } from "../../Logic/UMI.js";
import { Sound } from "../../Element/Sound.js";
import { PHY } from "../../Logic/PHY.js";

export class Blind {

    private blinding = false;
    private blindSpeed = UMI.getSpeed(20);
    private currentblindSpeed = UMI.getSpeed(20);
    private blindRadio = 0;
    private blindOpacity = 0.8;
    private blindContraction = false;
    private blind = false;

    private blindedOpacity = 1;
    private blinded = false;

    private sound = new Sound("../js/sounds/blind.wav");

    constructor(){}

    public do(){
        this.sound.stop();
        this.sound.play();
        this.blinding = true;
        return true;
    }

    public doing(){
        return this.blinding;
    }

    public setBlinded(){
        this.blinded = true;
    }

    public getBlind(){
        return this.blind;
    }

    public updateStatus(obj){
        if(this.blindRadio < 310){
            this.blindRadio += this.currentblindSpeed;
            this.currentblindSpeed -= this.blindSpeed/15;
        }else{
            this.blindRadio += this.currentblindSpeed;
            this.currentblindSpeed -= this.blindSpeed/60;
        }
        if(this.blindRadio < 0){
            this.blind = true;
            this.blinding = false;
            this.blindRadio = 0;
            this.currentblindSpeed = this.blindSpeed;
        }
    }

    public blindOff(){
        this.blind = false;
    }

    public draw(ctx, x, y){
        ctx.fillStyle = 'rgba('+this.blindRadio+', '+this.blindRadio/2+', '+this.blindRadio/2+', 0.5)';
        ctx.strokeStyle= 'rgba(255, 255, 255,0.05)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'blue';
        ctx.beginPath();
        ctx.arc(UMI.screenX(x),UMI.screenY(y),UMI.getPX(this.blindRadio),0,2*Math.PI);
        ctx.fill();
        //ctx.stroke();

        ctx.lineJoin = "round";
        ctx.shadowBlur = 100;
        ctx.strokeStyle= 'rgba(255, 255, 255,0.25)';
        
        ctx.beginPath();
        ctx.moveTo(UMI.screenX(x),UMI.screenY(y));
        var maxX = UMI.screenX(x)+UMI.getPX(this.blindRadio);
        var minX = UMI.screenX(x)-UMI.getPX(this.blindRadio);
        var maxY = UMI.screenY(y)+UMI.getPX(this.blindRadio);
        var minY = UMI.screenY(y)-UMI.getPX(this.blindRadio);
        for (var index = 0; index < 40; index++) {
            var p = [ Math.round(Math.random() * (maxX - minX) + minX), Math.round(Math.random() * (maxY - minY) + minY) ];
            if(PHY.getDistanceBetween(p[0], p[1], UMI.screenX(x),UMI.screenY(y)) < UMI.getPX(this.blindRadio)) ctx.lineTo(p[0], p[1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    public drawBlind(ctxFG, w, h){
        this.blindOpacity -= this.blindSpeed / 1800;
        if(this.blindOpacity > 0){
            ctxFG.fillStyle = 'rgba(255,255,255,'+this.blindOpacity+')';
            ctxFG.beginPath();
            ctxFG.rect(0,0,w,h);
            ctxFG.fill();
        }else{
            this.blindOff();
            this.blindOpacity = 0.8;
        }
    }

    public getBlinded(){
        return this.blinded;
    }
    

    public drawBlinded(ctxFG, w, h){
        this.blindedOpacity -= this.blindSpeed/15000;
        if(this.blindedOpacity > 0){
            ctxFG.fillStyle = 'rgba(255,255,255,'+this.blindedOpacity+')';
            ctxFG.beginPath();
            ctxFG.rect(0,0,w,h);
            ctxFG.fill();

        }else{
            this.blinded = false;
            this.blindedOpacity = 1;
        }
    }
}