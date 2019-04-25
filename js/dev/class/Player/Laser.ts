import { Circle } from '../Element/Circle.js';
import { Rect } from '../Element/Rect.js';
import { Polygon } from '../Element/Polygon.js';
import { PHY } from '../Logic/PHY.js';
import { UMI } from './../Logic/UMI.js';
import { Sound } from '../Element/Sound.js'; 
import { Player } from './Player.js';
import { sendDamageTo } from '../../match.js';

export class Laser {

    private sounds = {
        initLaser: new Sound("../js/sounds/initLaser.wav", 0.3),
        laser: new Sound("../js/sounds/laser.wav", 0.25),
        colision: new Sound("../js/sounds/laser-colision.wav", 0.03)
    };

    private colisionEffect;
    private colisionLines:Array<any> = new Array();
    private rangeColision = 22;
    private linesSpeed = UMI.getSpeed(1);
    private lastColisioned = false;
    private linesAngleVariation = 50;
    private lastVd;

    private color:string;
    private point:number = 0;
    private readonly RADIANSOF90 = 90 * Math.PI / 180;
    private readonly RADIANSOF180 = 180 * Math.PI / 180;
    private width:number  = 15;
    private readonly img:any = document.getElementById("laser");
    private speed:number = UMI.getSpeed(0.10);
    private np1:number;
    private np2:number;
    private waveLen = 0.3;
    private waveDesviation = 1;
    private shotDone = false;
    private soundStoped = false;

    private linesRemoving = new Array();
    private last_px:number;
    private last_py:number;
    private removeSpeed = UMI.getSpeed(10);

    private colisions = new Array();

    private readonly CIRCLE = 0;
    private readonly RECT = 2;
    private readonly POLYGON = 3;
    private objColisionType = 0;
    private objX;
    private objY;

    private mainPlayer;

    private last_vd;

    public controllerData;

    private first = true;

    private iteration_has_colision = false;
    

    constructor(color:string){
        this.color = color;
    }



    public action(controllerData){

        this.mainPlayer = controllerData.MainPlayer;

        if( this.iteration_has_colision ){
            this.sounds.colision.play();
           
        }else if (this.sounds.colision.playing()){
            this.sounds.colision.stop();
        }
        this.sounds.colision.loop(4, 0);

        this.iteration_has_colision = false;

        if(this.first){
            this.controllerData = controllerData;
            this.first = false;
        } 

        if (this.controllerData.clickOn()) {
            this.soundStoped = false;
            if(!this.shotDone){
                this.sounds.initLaser.play();
                this.sounds.laser.setCurrentTime(0);
                this.sounds.laser.play();
                this.shotDone = true;
            }else{
                this.sounds.laser.loop(10,5.2389);
            }
            if(this.point < UMI.getUMIsWidth()){
                this.point += this.speed;
            }

        }else{
            if(this.shotDone && this.controllerData.fixedPoint !== undefined){
                this.linesRemoving.push({
                    DbiggerX:this.np1 > this.last_px,
                    DbiggerY:this.np2 > this.last_py,
                    colision:false,
                    colisionB:false,
                    status:0,
                    xD:this.np1,
                    yD:this.np2,
                    x:this.last_px,
                    y:this.last_py,
                    vd: PHY.getVDirector(this.last_px, this.last_py, this.controllerData.fixedPoint[0], this.controllerData.fixedPoint[1])
                });
            }

            this.point = 0;
            this.np1 = 0;
            this.np2 = 0;
            this.shotDone = false;

            if(!this.soundStoped){
                this.sounds.laser.setCurrentTime(10.4);
                this.soundStoped = true;
            }
            this.sounds.initLaser.stop();
            
        }

        if(this.lastColisioned){
            this.lastColisioned = false;
            this.colisionEffect =  [
                [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
                [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
                [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
                [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision]
                   ];

            if(this.colisionLines.length < 2 || Math.floor((Math.random() * 4)) == 3){
                if(this.objColisionType == this.CIRCLE){
                    var a = Math.atan2( this.objX - this.np1,  this.objY - this.np2) + UMI.RADIANSOF90;
                    var a2 = Math.atan2(this.np1 - this.last_px, this.np2 - this.last_py) + UMI.RADIANSOF90;
                    a = (a+a2)/2;
                }else if(this.objColisionType == this.CIRCLE){
                    var a = Math.atan2(this.np1 - this.last_px, this.np2 - this.last_py) + UMI.RADIANSOF90;
                }else{
                    var a = Math.atan2(this.np1 - this.last_px, this.np2 - this.last_py) + UMI.RADIANSOF90;
                }

                if(this.np1 != 0 && this.np2 != 0){
                    a = PHY.plusAngles((a)*57.2957795, (Math.random() * (50 + 50) -50));
                    var p = PHY.createRectWithAngle([this.np1, this.np2], 30, a/57.2957795);
                    
                    this.colisionLines.push({
                        status:0,
                        p:p,
                        distance:0,
                        limit:Math.random() * (60 - 30) + 30,
                        angle: a,
                        x:this.np1,
                        y:this.np2,
                        vd:PHY.getVDirector(this.np1, this.np2, p[0], p[1])
                    });
                }
            }
            
        }else{
            this.colisionEffect = [];
        }
        
       
    }


    public getPoint(){
        return [this.np1, this.np2, this.point];
    }













    public colision(obj:any, xp:number, yp:number):boolean{
        

        this.last_px = xp;
        this.last_py = yp;
        var r = false;
        var vd;
        if(this.controllerData.fixedPoint !== undefined){
            vd = PHY.getVDirector(UMI.screenXUMI(xp), UMI.screenYUMI(yp), UMI.screenXUMI(this.controllerData.fixedPoint[0]), UMI.screenYUMI(this.controllerData.fixedPoint[1]));
            this.last_vd = vd;
        }else{
            vd = this.last_vd;
        }
        this.lastVd = vd;

        for (var i = 0, div = 15, f = false; i < this.point && !r; i+= this.speed/div) {

            var x = PHY.nextPointByK(i, xp, -vd[0]);
            var y = PHY.nextPointByK(i, yp, -vd[1]);

            if(obj instanceof Circle || obj instanceof Player){
                if(obj instanceof Player && obj.inShield()){
                    var shieldPoints = obj.getShieldPoints();
                    var distance = PHY.getDistanceBetween(x, y, obj.getX(), obj.getY());
                    var ao = PHY.plusAngles((Math.atan2( y - obj.getY(), x - obj.getX() ) +UMI.RADIANSOF180 )*57.2957795, 180);
                    var aDist = PHY.littlePathAngles(shieldPoints[2], shieldPoints[3]);
                    

                    r =  distance < 170 && ( aDist > PHY.littlePathAngles(ao, shieldPoints[2]) && aDist > PHY.littlePathAngles(ao, PHY.plusAngles(shieldPoints[2], +40)));
                    var shieldProtect = r;
                    if(!r) r = PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) < obj.getRadio();
                    this.objColisionType = this.CIRCLE;
                    this.objX = obj.getX() ;
                    this.objY = obj.getY() ;
                }else{
                    r = PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) < obj.getRadio();
                    this.objColisionType = this.CIRCLE;
                    this.objX = obj.getX() ;
                    this.objY = obj.getY() ;
                }

                 
            }
            else if(obj instanceof Polygon && !r){
                 r = PHY.insidepPoly([x, y], obj.getPoints() );
                 this.objColisionType = this.POLYGON;
            }
            else{
                r = y > obj.getMinY() && y < obj.getMaxY() && x > obj.getMinX() && x < obj.getMaxX();
                this.objColisionType = this.RECT;
            } 
            
            if(r){
                this.lastColisioned = true;
                if(!f){ 
                    i-=this.speed/div;
                    div=50;
                    f = true;
                    r = false;
                }else this.point = i;
            }
        }
        
        
        for (var i = 0; i < this.linesRemoving.length; i++) {
            if(!this.linesRemoving[i].colision){
                var r2 = false;
                if(obj instanceof Circle || obj instanceof Player) r2 = PHY.getDistanceBetween(this.linesRemoving[i].xD, this.linesRemoving[i].yD, obj.getX(), obj.getY()) < obj.getRadio();
                else if(obj instanceof Polygon) r2 = PHY.insidepPoly([this.linesRemoving[i].xD, this.linesRemoving[i].yD], obj.getPoints() );
                else r2 = this.linesRemoving[i].yD > obj.getMinY() && this.linesRemoving[i].yD < obj.getMaxY() && this.linesRemoving[i].xD > obj.getMinX() && this.linesRemoving[i].xD < obj.getMaxX();    
                
                if(r2){
                    this.linesRemoving[i].colision = true;
                } 

            }else{                
                if(PHY.getDistanceBetween(this.linesRemoving[i].x, this.linesRemoving[i].y, this.linesRemoving[i].xD, this.linesRemoving[i].yD) < 100){
                    this.linesRemoving.splice(i,1);
                }
            
            }
            
        }

        if( r ){
            this.iteration_has_colision = true;
            var volume =  ((130 - (this.point*100))/1000);
            if (volume < 0.03) volume = 0.03;
            if (volume > 0.09) volume = 0.09;
            
            this.sounds.colision.setVolume(volume);

            if(obj instanceof Player && !shieldProtect && this.mainPlayer){
                sendDamageTo(obj.getId());
            }

        } 

        
        

        return r;
    }
 
















    public draw(ctx, x, y){

        ctx.lineJoin = "round";
        if(this.point > 0){
            var vd;
            if(this.controllerData.fixedPoint !== undefined){
                vd = PHY.getVDirector(UMI.screenXUMI(x), UMI.screenYUMI(y), UMI.screenXUMI(this.controllerData.fixedPoint[0]), UMI.screenYUMI(this.controllerData.fixedPoint[1]));
            }else{
                vd = this.last_vd;
            }
            
            
            this.np1 = PHY.nextPointByK(this.point, x, -vd[0]);
            this.np2 = PHY.nextPointByK(this.point, y, -vd[1]);
            
            ctx.globalAlpha = Math.random()+0.7;
            ctx.beginPath();
            ctx.moveTo(UMI.screenX(x), UMI.screenY(y));
            ctx.lineTo(UMI.screenX(this.np1), UMI.screenY(this.np2));
            ctx.closePath();

            ctx.shadowBlur = 7;
            ctx.lineWidth = 6;
            ctx.shadowColor = this.color;
            ctx.strokeStyle= this.color;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(UMI.screenX(this.np1), UMI.screenY(this.np2));
            for (var i = 0; i < this.colisionEffect.length; i++) {
                ctx.lineTo(UMI.screenX(this.np1+this.colisionEffect[i][0]), UMI.screenY(this.np2+this.colisionEffect[i][1]));
            }
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(UMI.screenX(x), UMI.screenY(y));
            ctx.lineTo(UMI.screenX(this.np1), UMI.screenY(this.np2));
            ctx.closePath();

            ctx.globalAlpha = Math.random()+0.3;
            ctx.shadowBlur = 10;
            ctx.lineWidth = 2;
            ctx.shadowColor = "rgba(255,255,255,0.3)";
            ctx.strokeStyle= "rgba(255,255,255,0.3)";
            ctx.stroke();

            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(UMI.screenX(this.np1), UMI.screenY(this.np2));
            for (var i = 0; i < this.colisionEffect.length; i++) {
                ctx.lineTo(UMI.screenX(this.np1+this.colisionEffect[i][0]), UMI.screenY(this.np2+this.colisionEffect[i][1]));
            }
            ctx.closePath();
            ctx.stroke();


            var lastnp1 = x;
            var lastnp2 = y;

            

        }


        
        for (var i = 0; i < this.colisionLines.length; i++) {
            

            if(this.colisionLines[i].status < this.colisionLines[i].limit/2){
                var speedA = this.speed;
                var speedB = -this.speed/10;
            }else{
                var speedA = this.speed/10;
                var speedB = -this.speed;
            }
            
            this.colisionLines[i].status+= this.linesSpeed;
            this.colisionLines[i].distance+= speedA;
            if(this.colisionLines[i].status < this.colisionLines[i].limit){
                ctx.lineWidth = 3;

                ctx.shadowColor = this.color;
                ctx.strokeStyle= this.color;

                
                var p = PHY.createRectWithAngle([this.colisionLines[i].x, this.colisionLines[i].y], this.colisionLines[i].distance, this.colisionLines[i].angle/57.2957795);

                this.colisionLines[i].x = PHY.nextPointByK(speedB, this.colisionLines[i].x, this.colisionLines[i].vd[0]);
                this.colisionLines[i].y = PHY.nextPointByK(speedB, this.colisionLines[i].y, this.colisionLines[i].vd[1]);


                ctx.beginPath();    
                ctx.moveTo(UMI.screenX(this.colisionLines[i].x), UMI.screenY(this.colisionLines[i].y));
                ctx.lineTo(UMI.screenX(p[0]), UMI.screenY(p[1]));
                ctx.closePath();
                ctx.stroke();
                
                ctx.lineWidth = 2;
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2;
                ctx.shadowColor = "rgba(255,255,255,0.3)";
                ctx.strokeStyle= "rgba(255,255,255,0.3)";

                
                ctx.beginPath();    
                ctx.moveTo(UMI.screenX(this.colisionLines[i].x), UMI.screenY(this.colisionLines[i].y));
                ctx.lineTo(UMI.screenX(p[0]), UMI.screenY(p[1]));
                ctx.closePath();
                ctx.stroke();
            }else{
                this.colisionLines.splice(i, 1);
            }
        }

        for (var i = 0; i < this.linesRemoving.length; i++) {

            if(!this.linesRemoving[i].colisionB && this.linesRemoving[i].status < 500){
                this.linesRemoving[i].status += this.removeSpeed;
                this.linesRemoving[i].x = PHY.nextPointByK(this.speed, this.linesRemoving[i].x, -this.linesRemoving[i].vd[0]);
                this.linesRemoving[i].y = PHY.nextPointByK(this.speed, this.linesRemoving[i].y, -this.linesRemoving[i].vd[1]);
                
                if(!this.linesRemoving[i].colision){
                    this.linesRemoving[i].xD = PHY.nextPointByK(this.speed, this.linesRemoving[i].xD, -this.linesRemoving[i].vd[0]);
                    this.linesRemoving[i].yD = PHY.nextPointByK(this.speed, this.linesRemoving[i].yD, -this.linesRemoving[i].vd[1]);
                }
                
                
                ctx.shadowBlur = 7;
                ctx.lineWidth = 6;
                ctx.shadowColor = this.color;
                ctx.strokeStyle= this.color;

                ctx.beginPath();    
                ctx.moveTo(UMI.screenX(this.linesRemoving[i].x), UMI.screenY(this.linesRemoving[i].y));
                ctx.lineTo(UMI.screenX(this.linesRemoving[i].xD), UMI.screenY(this.linesRemoving[i].yD));
                ctx.closePath();
                ctx.stroke();
                
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 10;
                ctx.shadowColor = "rgba(255,255,255,0.8)";
                ctx.strokeStyle= "rgba(255,255,255,0.8)";
                ctx.fillStyle = ctx.strokeStyle;

                ctx.beginPath();    
                ctx.lineTo(UMI.screenX(this.linesRemoving[i].x), UMI.screenY(this.linesRemoving[i].y));
                ctx.moveTo(UMI.screenX(this.linesRemoving[i].xD), UMI.screenY(this.linesRemoving[i].yD));
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                
            }else{
                this.linesRemoving.splice(i,1);
            }
        }


        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.lineJoin = "miter";

        


              
    }


}
