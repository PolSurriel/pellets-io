import { UMI } from "../../Logic/UMI.js";
import { PHY } from "../../Logic/PHY.js";
import { Sound } from "../../Element/Sound.js";

export class Shield {

    private shield = false;
    private shieldLive = 100;
    private shieldDamage = 0;
    private shieldMinus = UMI.getSpeed(2);
    private shieldCont = 0;
    private shieldSpeed = UMI.getSpeed(2);
    private shieldGrade = 0;
    private shieldInc = 0;
    private shieldFinalInc = 1.3;

    private color = '#4286f4';
    private countdownSound = new Sound("../js/sounds/countdown.wav");
    private shieldSound = new Sound("../js/sounds/shield.wav");
    private movementSound = new Sound("../js/sounds/shield-movement.wav", 0.06);
    private endingSound = new Sound("../js/sounds/laser-colision.wav", 0.2)

    private removeSpeed = UMI.getSpeed(5)

    private colisionEffect;
    private colisionLines:Array<any> = new Array();
    private rangeColision = 22;
    private linesSpeed = UMI.getSpeed(1);
    private lastColisioned = false;
    private linesAngleVariation = 50;
    private lastVd;

    private last_py = 0;
    private last_px = 0

    private pointInit;
    private pointEnd;
    private currentAngle;

    private mainPlayer = false;

    private initialGrade;
    
    private firstFinished = false;

    constructor(){}

    public do(){
        var notDoing = !this.shield;
        if(notDoing){
            this.endingSound.play();
            this.colisionLines = [];
            this.firstFinished = false;
            this.shieldSound.play();
            if(this.mainPlayer) this.movementSound.play();
            this.countdownSound.stop();
            this.countdownSound.play();
            this.shield = true;
            this.shieldGrade = 200;
            this.initialGrade = this.shieldGrade;
        }
        return notDoing;
    }

    public setMainPlayer(r){
        this.mainPlayer = r;
    }

    public doing(){
        return this.shield;
    }

    public updateStatus(obj){
        this.last_px = obj.getX();
        this.last_py = obj.getY();

        if(this.shieldCont < 2340){
            this.shieldCont += this.shieldSpeed;
            this.shieldGrade = PHY.plusAngles(this.shieldGrade, this.shieldSpeed);
            var radians = (this.shieldGrade/57.2957795);
            
            this.pointEnd = PHY.createRectWithAngle([obj.getX(), obj.getY()], 150, -(radians+this.shieldInc));
            this.pointInit = PHY.createRectWithAngle([obj.getX(), obj.getY()], 150, -(radians+(7.2/57.2957795)));

            if(this.shieldCont > 2260){
                if(!this.firstFinished){
                    this.firstFinished = true;
                    this.colisionLines = [];
                    this.endingSound.play();
                }
                
                this.shieldInc -= this.shieldSpeed/60;
                this.addEffect(this.pointEnd, radians);
                

            }else if(this.shieldInc < this.shieldFinalInc){
                this.shieldInc += this.shieldSpeed/60;
                
                this.addEffect(this.pointInit, radians);
            }else{
                this.endingSound.stop();
            }
            
        }else{
            this.movementSound.stop();
            this.endingSound.stop();
            this.shieldCont = 0;
            this.shield = false;           
        }
        
    }

    public addEffect(point, radians){
        this.colisionEffect =  [
            [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
            [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
            [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision],
            [Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision, Math.random() * (this.rangeColision + this.rangeColision) - this.rangeColision]
               ];

        if(this.colisionLines.length < 2 || Math.floor((Math.random() * 4)) == 3){
            
            var a = Math.atan2(point[0] - this.last_px, point[1] - this.last_py) + UMI.RADIANSOF90;
            

            if(point[0] != 0 && point[1] != 0){
                a = PHY.plusAngles((a)*57.2957795, (Math.random() * (50 + 50) -50));
                var p = PHY.createRectWithAngle([point[0], point[1]], 30, a/57.2957795);
                
                this.colisionLines.push({
                    status:0,
                    p:p,
                    distance:0,
                    limit:Math.random() * (60 - 30) + 30,
                    angle: (5+a/57.2957795)+radians,
                    x:point[0],
                    y:point[0],
                    vd:PHY.getVDirector(point[0], point[1], p[0], p[1]),
                    pointToDraw:point
                });
            }
        }
    }

    public draw(ctx, x, y){
        var radians = (this.shieldGrade/57.2957795);

        ctx.lineJoin = "round";
        ctx.globalAlpha = Math.random()+0.3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.strokeStyle= this.color;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(UMI.screenX(x), UMI.screenY(y), UMI.getPX(150), 0+radians, this.shieldInc+radians);
        ctx.stroke(); 
        ctx.globalAlpha = 1;        
        

        
        

        if(this.shieldCont > 2260){
            var i = 0;
            this.colisionLines.forEach(line => {
                var endLine = PHY.createRectWithAngle(line.pointToDraw, line.status,line.angle);
                var initLine = PHY.createRectWithAngle(line.pointToDraw, line.status-12,line.angle);
                
                if(line.status > 60) ctx.globalAlpha = (130 - line.status) / 100;

                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(UMI.screenX(initLine[0]), UMI.screenY(initLine[1]));
                ctx.lineTo(UMI.screenX(endLine[0]), UMI.screenY(endLine[1]));
                ctx.closePath();
                ctx.stroke();
                
            
                line.status += this.removeSpeed;

                if(line.status > 80){
                    this.colisionLines.splice(i, 1);
                }

                i++;
            });

            ctx.globalAlpha= 1;

            

        }else if(this.shieldInc < this.shieldFinalInc){
            var i = 0;
            this.colisionLines.forEach(line => {
                var endLine = PHY.createRectWithAngle(line.pointToDraw, line.status,line.angle+UMI.RADIANSOF90);
                var initLine = PHY.createRectWithAngle(line.pointToDraw, line.status-12,line.angle+UMI.RADIANSOF90);
                
                
                

                if(line.status > 60) ctx.globalAlpha = (130 - line.status) / 100;

                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(UMI.screenX(initLine[0]), UMI.screenY(initLine[1]));
                ctx.lineTo(UMI.screenX(endLine[0]), UMI.screenY(endLine[1]));
                ctx.closePath();
                ctx.stroke();
                             

                line.status += this.removeSpeed;

                if(line.status > 80){
                    this.colisionLines.splice(i, 1);
                }

                i++;
            });

            ctx.globalAlpha= 1;

        }


    }

    public getShieldPoints(){
        return [this.pointInit, this.pointEnd, this.shieldGrade, this.shieldGrade+(this.shieldInc*57.2957795)];
    }
}