import { GameElement } from '../Element/GameElement.js';
import { Circle } from '../Element/Circle.js';
import { Rect } from '../Element/Rect.js';
import { Polygon } from '../Element/Polygon.js';
import { UMI } from '../Logic/UMI.js';
import { PHY } from '../Logic/PHY.js';
import { UserEvents } from './UserEvents.js';
import { Player } from './Player.js';

export class ViewField extends GameElement {

    private angle: number = 40 * Math.PI / 180;
    private currentAngle: number = 40 * Math.PI / 180;
    private readonly RADIANSOF180 = 180 * Math.PI / 180;
    private readonly RADIANSOF90 = 90 * Math.PI / 180;
    private shadows;
    private pellet_x:number;
    private pellet_y:number;
    private color = "rgba(66, 134, 244, 0.3)";
    private miniumAngle = 0;

    private angleDesviations1:Array<number> = new Array();
    private angleDesviations2:Array<number> = new Array();

    private not_player_shadows = new Array();
    private showShadow = new Array();

    constructor() {
        super(0, 0);
    }

    public action() {
        if (UserEvents.clickOn() && this.currentAngle > 0.05) {
            if (this.currentAngle > 0.55) {
                this.currentAngle -= 0.0025;
            } else if (this.currentAngle > 0.50) {
                this.currentAngle -= 0.002;
            } else {
                this.currentAngle -= 0.001;
            }


        } else if (UserEvents.clickOn() == false && this.currentAngle != this.angle) {
            if (this.currentAngle < 0.20) {
                this.currentAngle += 0.004;
            } else if (this.currentAngle < 0.30) {
                this.currentAngle += 0.003;
            } else if (this.currentAngle < 0.40) {
                this.currentAngle += 0.002;
            } else if (this.currentAngle < 0.50) {
                this.currentAngle += 0.001;
            } else if (this.currentAngle < 0.35) {
                this.currentAngle += 0.0005;
            } else {
                this.currentAngle += 0.001;
            }

            if (this.currentAngle > this.angle) this.currentAngle = this.angle;
        }

    }

    public cleanShadows() {
        this.angleDesviations1 = [];
        this.angleDesviations2 = [];
        this.shadows = [];
        this.not_player_shadows = [];
        this.showShadow = [];
    }

    public updateViewShadow(obj: any, x:number, y:number) {
        this.pellet_x = x;
        this.pellet_y = y;
        var added:boolean = false;
        if (obj instanceof Rect) {
            this.shadows.push(this.getRectCutPoints(obj, x, y));
            this.not_player_shadows.push(true);
            added = true;
            this.showShadow.push(true);
        } else if (obj instanceof Circle || obj instanceof Player && this.iSee(obj)) {
            
            this.shadows.push(this.getCircleCutPoints(obj, x, y));
            added = true;
            this.not_player_shadows.push(!(obj instanceof Player));
            this.showShadow.push(true);
        }else if (obj instanceof Polygon) {
            if(this.objOnView(obj, x, y) || true){ 
                this.shadows.push(this.getPolygonCutPoints(obj, x, y));
                added = true;
                this.not_player_shadows.push(true);
                this.showShadow.push(true);
            }
        }

        

    }

    public objOnView(obj,x, y):boolean{
        var a = Math.atan2(this.getY() - UserEvents.getCY(), this.getX() - UserEvents.getCX())*57.2957795;
        
        var points = obj.getPoints();
        var r = false;
        for (var i = 0;!r && i < points.length; i++) {
            var aP = Math.atan2(this.getY() - points[i][1], this.getX() - points[i][0])*57.2957795;
            if(PHY.angleDifference(Math.abs(aP), Math.abs(a)) < 60) r = true;
        }
        return r;
    }


    public setCurrentAngle(a){
        if(a > this.miniumAngle){
            this.currentAngle = a;
        }        
    }

    public getCurrentAngle(){
        return this.currentAngle;
    }


    public getPolygonCutPoints(obj: any, x:number, y:number) {
        var a = -Math.atan2(this.getY() - UserEvents.getCY(), this.getX() - UserEvents.getCX()) + this.RADIANSOF180;
        var r1 = PHY.rotatePoint(this.getX(), this.getY(), UMI.getUMIsOutOfRange(), UMI.getUMIsOutOfRange(), a + UMI.RADIANSOF90);
        var r2 = PHY.rotatePoint(this.getX(), this.getY(), UMI.getUMIsOutOfRange(), UMI.getUMIsOutOfRange(), a - UMI.RADIANSOF90);
        var r = PHY.getTangencialPointsOfPolygonByRect(obj.getPoints(), [[x, y, UserEvents.ca], r1, r2]);
        
        return r;
    }

    public getCircleCutPoints(obj:any, x:number, y:number) {
        var r = PHY.getTangencialPointsOfCircleByRect(x, y, obj.getX(), obj.getY(), obj.getRadio());
        var aP1 = Math.atan2(y - r[1][1], x - r[1][0])*57.2957795;
        var aP2 = Math.atan2(y - r[0][1], x - r[0][0])*57.2957795;
        return [r[1],r[0], PHY.plusAngles(-aP1, 180)/57.2957795, PHY.plusAngles(-aP2, 180)/57.2957795];
    }

    public getRectCutPoints(obj:any, x:number, y:number): Array<Array <number>> {
        var r = [];

        if(x > obj.getMaxX()){
            if(y > obj.getMaxY()){
                r = [[obj.getMaxX(), obj.getMinY()], [obj.getMinX(), obj.getMaxY()]];
                //console.log('DR');

            }else if(y < obj.getMinY()){
                r = [[obj.getMinX(), obj.getMinY()], [obj.getMaxX(), obj.getMaxY()]];
                //console.log('UR');
            }else{
                r = [[obj.getMaxX(), obj.getMinY()], [obj.getMaxX(), obj.getMaxY()]];
                //console.log('R');
            }
        }else if(x < obj.getMinX()){
            if(y < obj.getMinY()){
                r = [[obj.getMaxX(), obj.getMinY()], [obj.getMinX(), obj.getMaxY()]];
                //console.log('UL');

            }else if(y > obj.getMaxY()){
                r = [[obj.getMinX(), obj.getMinY()], [obj.getMaxX(), obj.getMaxY()]];
                //console.log('DL');    
            }else{
                r = [[obj.getMinX(), obj.getMinY()], [obj.getMinX(), obj.getMaxY()]];
                //console.log('L');
            }
        }else if(y < obj.getMinY()){
            r = [[obj.getMinX(), obj.getMinY()], [obj.getMaxX(), obj.getMinY()]];
            //console.log('U');
        }else if(y > obj.getMaxY()){
            r = [[obj.getMinX(), obj.getMaxY()], [obj.getMaxX(), obj.getMaxY()]];
            //console.log('D')
        }
        var aP1 = Math.atan2(y - r[1][1], x - r[1][0])*57.2957795;
        var aP2 = Math.atan2(y - r[0][1], x - r[0][0])*57.2957795;
        r.push(PHY.plusAngles(-aP2, 180)/57.2957795);
        r.push(PHY.plusAngles(-aP1, 180)/57.2957795);

        return r;

    }

    public draw(ctx) {
        this.drawShadowShapes(ctx);
        this.drawMainShape(ctx);
    }

    public drawMainShape(ctx){
        ctx.shadowBlur = 0;
        
        //this.color = "rgba(66, 134, 244, 0.2)";
        //ctx.shadowColor = 'rgba(66, 134, 244, 1)';

        var grd=ctx.createRadialGradient(UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(500),UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(1500));
        grd.addColorStop(0,this.color);
        grd.addColorStop(1,"rgba(0, 0, 0, 0.8)");
        
        // Fill with gradient
        
        var a = -Math.atan2(UMI.screenYUMI(this.getY()) - UserEvents.getCY(), UMI.screenXUMI(this.getX()) - UserEvents.getCX()) + this.RADIANSOF180;
        
        var r1 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle);
        var r2 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a - this.currentAngle);

        ctx.beginPath();
        ctx.moveTo(UMI.screenX(this.getX()), UMI.screenY(this.getY()));
        ctx.lineTo(UMI.getPX(r1[0]), UMI.getPX(r1[1]));
        ctx.lineTo(UMI.getPX(r2[0]), UMI.getPX(r2[1]));
        ctx.closePath();

        ctx.fillStyle=grd;
        ctx.fill();
    }

    public iSee(obj){
        var r = this.iSeeInMainShape(obj);
        for (let i = 0; r && i < this.shadows.length; i++) {
            if(this.not_player_shadows[i]){

                var a1 = this.shadows[i][2];
                var a2 = this.shadows[i][3];

                var pOut1 = PHY.createRectWithAngle(this.shadows[i][0], UMI.getUMIsOutOfRange(), a1);
                var pOut2 = PHY.createRectWithAngle(this.shadows[i][1], UMI.getUMIsOutOfRange(), a2);

                r = !PHY.insidepPoly( [obj.getX(), obj.getY()], [this.shadows[i][0],  pOut1, pOut2, this.shadows[i][1]] );

                
            }

        }

        return r;

    }

    public iSeeInMainShape(obj){
        var a = -Math.atan2(UMI.screenYUMI(this.getY()) - UserEvents.getCY(), UMI.screenXUMI(this.getX()) - UserEvents.getCX()) * 57.2957795;
        var a2 = -Math.atan2(this.getY() - obj.getY(), this.getX() - obj.getX()) * 57.2957795;
        return PHY.littlePathAngles(a, a2) < 5+(this.currentAngle* 57.2957795);

    }

    public drawShadowShapes(ctx) {
        
        //ctx.globalCompositeOperation = 'destination-out';
        //ctx.fillStyle = 'black'; //need a full alpha color to get it fully out
        ctx.globalCompositeOperation = 'xor';    
        ctx.fillStyle="rgba(0,0,0,0.5)";
        var grd=ctx.createRadialGradient(UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(100),UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(1500));
        
        
        var i = 0;
        this.shadows.forEach(shadow => {
            if(this.showShadow[i]){
                var pOut1 = PHY.createRectWithAngle(shadow[0], UMI.getUMIsOutOfRange()*2, shadow[2]);
                var pOut2 = PHY.createRectWithAngle(shadow[1], UMI.getUMIsOutOfRange()*2, shadow[3]);

                ctx.beginPath();       
                    ctx.moveTo(UMI.screenX(shadow[0][0]), UMI.screenY(shadow[0][1]));
                    
                    ctx.lineTo(UMI.screenX(pOut1[0]), UMI.screenY(pOut1[1]));
                    ctx.lineTo(UMI.screenX(pOut2[0]), UMI.screenY(pOut2[1]));
                    
                    ctx.lineTo(UMI.screenX(shadow[1][0]), UMI.screenY(shadow[1][1]));

                    var first:boolean = true, minusSecond:boolean = true;
                    shadow.forEach(unionPoints => {
                        if(minusSecond) if (first) first = false; else minusSecond = false;
                        else ctx.lineTo(UMI.screenX(unionPoints[0]), UMI.screenY(unionPoints[1]));
                    });
                ctx.closePath(); 
                ctx.fill();
            }
            i++;  
        
            /*
            ctx.globalCompositeOperation = 'source-over'; 
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(UMI.screenX(shadow[0][0]),UMI.screenY(shadow[0][1]),5,0,2*Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.arc(UMI.screenX(shadow[1][0]),UMI.screenY(shadow[1][1]),5,0,2*Math.PI);
            ctx.fill();
            ctx.globalCompositeOperation = 'destination-out';
            */
            
        });

        ctx.globalCompositeOperation = 'source-over';    
        this.drawRestFieldDelete(ctx) ;      
    }



    public drawRestField(ctx){
        var grd=ctx.createRadialGradient(UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(100),UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(1500));
        grd.addColorStop(0,"rgba(0, 0, 0, 0.8)");
        grd.addColorStop(1,"rgba(0, 0, 0, 0.95)");
        
        var a = -Math.atan2(UMI.screenYUMI(this.getY()) - UserEvents.getCY(), UMI.screenXUMI(this.getX()) - UserEvents.getCX()) + this.RADIANSOF180;
        
        var r1 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle);
        var r1e = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF90);
        var r1e2 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF180);
        var r1e3 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF180 + UMI.RADIANSOF90);
        
        var r2 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a - this.currentAngle);

        //ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.moveTo(UMI.screenX(this.getX()), UMI.screenY(this.getY()));
        ctx.lineTo(UMI.getPX(r1[0]), UMI.getPX(r1[1]));

        ctx.lineTo(UMI.getPX(r1e[0]), UMI.getPX(r1e[1]));
        ctx.lineTo(UMI.getPX(r1e2[0]), UMI.getPX(r1e2[1]));
        ctx.lineTo(UMI.getPX(r1e3[0]), UMI.getPX(r1e3[1]));
        
        
        ctx.lineTo(UMI.getPX(r2[0]), UMI.getPX(r2[1]));
        ctx.closePath();

        //ctx.fillStyle="rgba(0,0,0,0.8)";
        ctx.fillStyle=grd;
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

    }

    public drawRestFieldDelete(ctx){
        var a = -Math.atan2(UMI.screenYUMI(this.getY()) - UserEvents.getCY(), UMI.screenXUMI(this.getX()) - UserEvents.getCX()) + this.RADIANSOF180;
        
        var r1 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle);
        var r1e = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF90);
        var r1e2 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF180);
        var r1e3 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a + this.currentAngle + UMI.RADIANSOF180 + UMI.RADIANSOF90);

        var r2 = PHY.rotatePoint(UMI.screenXUMI(this.getX()), UMI.screenYUMI(this.getY()), UMI.getUMIsWidth()*4, UMI.getUMIsWidth()*4, a - this.currentAngle);

        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.moveTo(UMI.screenX(this.getX()), UMI.screenY(this.getY()));
        ctx.lineTo(UMI.getPX(r1[0]), UMI.getPX(r1[1]));

        ctx.lineTo(UMI.getPX(r1e[0]), UMI.getPX(r1e[1]));
        ctx.lineTo(UMI.getPX(r1e2[0]), UMI.getPX(r1e2[1]));
        ctx.lineTo(UMI.getPX(r1e3[0]), UMI.getPX(r1e3[1]));
        
        
        ctx.lineTo(UMI.getPX(r2[0]), UMI.getPX(r2[1]));
        ctx.closePath();

        ctx.fillStyle="black";
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

    }


}


