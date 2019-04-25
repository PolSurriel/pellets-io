import { PHY } from '../Logic/PHY.js';
import { ViewField } from './ViewField.js';
import { Laser } from './Laser.js';
import { Circle } from '../Element/Circle.js';
import { Rect } from '../Element/Rect.js';
import { Polygon } from '../Element/Polygon.js';
import { Colisionable } from '../../interfaces/Colisionable.js';
import { Visible } from '../../interfaces/Visible.js';
import { UMI } from '../Logic/UMI.js';
import { IndHability } from '../GUI/IndHability.js';
import { UI } from '../GUI/UI.js';

import { Sonar } from './Abilities/Sonar.js';
import { Shield } from './Abilities/Shield.js';
import { Teleport } from './Abilities/Teleport.js';
import { Blind } from './Abilities/Blind.js';
import { Player } from './Player.js';
import { Sound } from '../Element/Sound.js';



export class Pellet extends Circle implements Colisionable, Visible {

    private sounds = {
        plop: new Sound('../js/sounds/plop.wav'),
        killBonus: new Sound('../js/sounds/killBonus.wav')

    };

    private laser: any;
    private readonly speed = UMI.getSpeed(4.25);
    public colisionReact: (obj: any) => void;
    private prev_col_x: number = 0;
    private prev_col_Y: number = 0;
    private laser_color = '#db3097';
    private points: Array<Array<number>> = [];

    public sonarOpacity;

    private controllerData;

    private habilityInc = UMI.getSpeed(4);
    private habilityCount = 3;
    private restablishHabilityCount = 0;
    private focus = false;

    private hab1 = new Teleport();
    public teleporting(){ return this.hab1.doing(); }
    private hab2 = new Sonar();
    private hab3 = new Blind();
    public getBlind = function(){ return this.hab3.getBlind() }
    private hab4 = new Shield();

    public viewField = null;

    private currentRadio;
    private damageCount;
    private maxDamage = 200;
    private damageSpeed = UMI.getSpeed(1);

    private alive = true;
        
    constructor(x: number, y: number, color: string, img?: HTMLElement) {
        super(x, y, 25, color, img);
        this.currentRadio = 25;
        this.laser = new Laser(this.laser_color);
        var point = [this.getRadio(), 0];
        this.points.push(point);
        for (var i = 0; i < 360; i += 5) {
            point = PHY.rotatePoint(0, 0, point[0], point[1], i * Math.PI / 180);
            this.points.push(point);
        }
        
    }

    public sonarActive(){
        return this.hab2.doing();
    }

    public setMainPlayer(r){
        this.hab4.setMainPlayer(r);
    }

    public getPoints(){}

    public colision(obj): boolean {

        this.laser.colision(obj, this.getX(), this.getY());

        var r: boolean;
        if (obj instanceof Rect) {
            r = this.colisionRect(obj);
            if (r) this.colisionReact = this.colisionReactRect;
        } else if (obj instanceof Circle || obj instanceof Player) {
            r = this.colisionCircle(obj, this.getX(), this.getY());
            if (r) this.colisionReact = this.colisionReactCircle;
        } else if (obj instanceof Polygon) {
            r = this.colisionRect(obj);
            if (!r) r = this.colisionPolygon(obj);
            if (r) this.colisionReact = this.colisionReactPolygon;
        }

        if(this.teleporting()){
            this.colisionReact = this.teleportingColisionReact;
        }
        

        return r;
    }

    public setBlinded(){
        this.hab3.setBlinded();
    }

    public blinded(){
        return this.hab3.getBlinded();
    }

    public teleportingColisionReact(obj):void{
        var dest = [this.getX(), this.getY()];
        var origin = [this.prev_col_x, this.prev_col_Y];
        var a = (-Math.atan2(dest[1] - origin[1], dest[0] - origin[0])+UMI.RADIANSOF180);
        
        if(obj instanceof Circle){
            var np = PHY.createRectWithAngle([obj.getX(), obj.getY()],obj.getRadio()*1.3,a);
            this.setX(np[0]);
            this.setY(np[1]);
        }else if(obj instanceof Rect){
            this.teleportingColisionReact(new Polygon(obj.getX(), obj.getY(),[ [0, 0], [0+obj.getWidth(), 0], [0+obj.getWidth(), 0+obj.getHeight()],[0, 0+obj.getHeight()]  ], ""));
            //Esto es por un bug... :/
        }else{
            var dist = 1;
            while(this.colisionPolygon(obj)){
                var np = PHY.createRectWithAngle(dest,dist,a);
                this.setX(np[0]);
                this.setY(np[1]);
                dist++;
            }
            
        }
        
    }

    public setFocus(focus){
        this.focus = focus;
    }

    

    public colisionReactRect(obj): void {

        if (this.prev_col_x + this.getRadio() < obj.getX()) {
            this.setX(obj.getX() - this.getRadio() - 1);
        } else if (this.prev_col_x - this.getRadio() > obj.getX() + obj.getWidth()) {
            this.setX(obj.getX() + obj.getWidth() + this.getRadio() + 1);
        } else if (this.prev_col_Y + this.getRadio() < obj.getY()) {
            this.setY(obj.getY() - this.getRadio() - 1);
        } else {
            this.setY(obj.getY() + obj.getHeight() + this.getRadio() + 1);
        }

    }

    public standartColionReact() {
        this.setX(this.prev_col_x);
        this.setY(this.prev_col_Y);
    }

    public colisionReactCircle(obj): void {

        
            var speedy = this.speed / 1.8;
            
            if (this.controllerData.right) {
                if (this.getY() < obj.getY()) {
                    this.setX(this.getX() - speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() - this.speed / 4);
                } else {
                    this.setX(this.getX() - speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() + this.speed / 4);
                }
            } else if (this.controllerData.left) {
                if (this.getY() < obj.getY()) {
                    this.setX(this.getX() + speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() - this.speed / 4);
                } else {
                    this.setX(this.getX() + speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() + this.speed / 4);
                }
            } else if (this.controllerData.down) {
                if (this.getX() > obj.getX()) {
                    this.setX(this.getX() + speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() - this.speed / 4);
                } else {
                    this.setX(this.getX() - speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() - this.speed / 4);
                }
            } else {
                if (this.getX() > obj.getX()) {
                    this.setX(this.getX() + speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() + this.speed / 4);
                } else {
                    this.setX(this.getX() - speedy);
                    while (this.colisionCircle(obj, this.getX(), this.getY())) this.setY(this.getY() + this.speed / 4);
                }
            }
    }

    public colisionReactPolygon(obj): void {
        
        var speedy = this.speed / 1.8;
        var minusSpeed = this.speed/1.1;

        if (this.controllerData.right) {
            this.setX(this.getX()-minusSpeed);
            this.setY(this.getY()-speedy);

            if(this.colision(obj)){
                this.setY(this.getY()+(speedy*2));
            }

            
        } else if (this.controllerData.left) {
            this.setX(this.getX()+minusSpeed);
            this.setY(this.getY()-speedy);
            if(this.colision(obj)){
                this.setY(this.getY()+(speedy*2));
            }
            
        } else if (this.controllerData.down) {
            this.setY(this.getY()-minusSpeed);
            this.setX(this.getX()-speedy);
            if(this.colision(obj)){
                this.setX(this.getX()+(speedy*2));
            }

        } else {
            this.setY(this.getY()+minusSpeed);
            this.setX(this.getX()-speedy);
            if(this.colision(obj)){
                this.setX(this.getX()+(speedy*2));
            }
        }


        if(this.colision(obj)){
            this.standartColionReact();
        }
    }

    private colisionRect(obj): boolean {
        var x = this.getX();
        var y = this.getY();
        return (x + this.getRadio() > obj.getX())
            &&
            (x - this.getRadio() < obj.getX() + obj.getWidth())
            &&
            (y + this.getRadio() > obj.getY())
            &&
            (y - this.getRadio() < obj.getY() + obj.getHeight());
    }
    private colisionCircle(obj, x, y): boolean {
        return PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) - this.getRadio() < obj.getRadio();
    }
    private colisionPolygon(obj: any): boolean {
        var conditions: Array<boolean> = [];
        var r = false;
        var x = this.getX();
        var y = this.getY();

        for (var i = 0; !r && i < this.points.length; i++) {
            r = PHY.insidepPoly([x + this.points[i][0], y + this.points[i][1]], obj.getPoints());
        }

        return r;
    }
    private colisionComplex(obj): boolean {
        return true;
    }

    public damage(){
        var r = false;
        if(this.getRadio() < 30)this.setRadio(this.getRadio()+this.damageSpeed*8);
        else if(this.getRadio() < 40)this.setRadio(this.getRadio()+this.damageSpeed*4);
        else this.setRadio(this.getRadio()+this.damageSpeed*1.25);
        if(this.controllerData.MainPlayer) UI.incDamage();
        if(this.getRadio() > 100 && this.alive){
            this.die();
            r = !this.controllerData.MainPlayer;
        }

        return r;
    }

    public inShield(){
        return this.hab4.doing();
    }

    public die(){
        this.alive = false;
        this.sounds.plop.play();
        if(!this.controllerData.MainPlayer) this.sounds.killBonus.play();
        this.setX(10000);
        this.setY(10000);
        if(this.controllerData.MainPlayer) UI.siwtchDeathScreen();

    }

    public getShieldPoints(){
        return this.hab4.getShieldPoints();
    }

    public action(controllerData) {

        if(this.getRadio() > 25){
            if(this.getRadio() < 50) this.setRadio(this.getRadio()-this.damageSpeed/3.5);
            else this.setRadio(this.getRadio()-this.damageSpeed/1.7);
            
        }

        UI.decDamage();
        
        
        this.controllerData = controllerData;

        this.doAbilities();
        this.move();
        if(!this.teleporting()) this.laser.action(controllerData);

        if(this.hab1.doing()) this.hab1.updateStatus(this);
        if(this.hab2.doing()) this.hab2.updateStatus(this);
        if(this.hab3.doing()) this.hab3.updateStatus(this);
        if(this.hab4.doing()) this.hab4.updateStatus(this);

    }

    public littleAction(controllerData) {
        
        this.controllerData = controllerData;

        this.laser.action(controllerData);
        
        if(this.hab1.doing()) this.hab1.updateStatus(this);
        if(this.hab2.doing()) this.hab2.updateStatus(this);
        if(this.hab3.doing()) this.hab3.updateStatus(this);
        if(this.hab4.doing()) this.hab4.updateStatus(this);

        if(this.habilityCount < 3){
            if(this.restablishHabilityCount < 1000) this.restablishHabilityCount+= this.habilityInc;
            else{
                this.habilityCount++;
                this.restablishHabilityCount = 0;
            }
        }

    }

    public doAbilities(){
        
            if(this.habilityCount > 0){
                if(this.controllerData.hab1){  
                    if (this.hab1.do()) this.habilityCount--;
                } 
                
            }
            if(this.habilityCount > 2){
                if(this.controllerData.hab2){
                    if (this.hab2.do()) this.habilityCount-=2;
                } 

                
            }
            if(this.habilityCount > 1){
                if(this.controllerData.hab4){
                    if(this.hab4.do()) this.habilityCount -= 2;
                }
                if(this.controllerData.hab3){
                    if (this.hab3.do()) this.habilityCount-=2;
                } 
            }


            if(this.habilityCount < 3){
                if(this.restablishHabilityCount < 1000) this.restablishHabilityCount+= this.habilityInc;
                else{
                    this.habilityCount++;
                    this.restablishHabilityCount = 0;
                }
            }
        /*
        if(this.controllerData.MainPlayer){
        }else{
            
            if(this.controllerData.hab1) this.hab1.do();
            if(this.controllerData.hab3) this.hab3.do();
            if(this.controllerData.hab2) this.hab2.do();
            if(this.controllerData.hab4) this.hab4.do();
            
        }*/
        
    }

    public isAlive(){
        return this.alive;
    }

    public getFX(){
        return this.controllerData;
    }
   
    public reborn(){
        this.alive = true;
    }

    public move(): void {
        this.prev_col_x = this.getX();
        this.prev_col_Y = this.getY();

        if (this.controllerData.up && !this.controllerData.nega_up)
            if (this.controllerData.left || this.controllerData.right) {
                this.setY(this.getY() - (this.speed / 1.4));

            } else {
                this.setY(this.getY() - this.speed);

            }
        if (this.controllerData.down && !this.controllerData.nega_down)
            if (this.controllerData.left || this.controllerData.right) {
                this.setY(this.getY() + (this.speed / 1.4));

            } else {
                this.setY(this.getY() + this.speed);

            }
        if (this.controllerData.left && !this.controllerData.nega_left)
            if (this.controllerData.up || this.controllerData.down) {
                this.setX(this.getX() - (this.speed / 1.4));

            } else {
                this.setX(this.getX() - this.speed);

            }
        if (this.controllerData.right && !this.controllerData.nega_right)
            if (this.controllerData.up || this.controllerData.down) {
                this.setX(this.getX() + (this.speed / 1.4));

            } else {
                this.setX(this.getX() + this.speed);

            }

    }

    public drawBlind(ctxFG, w, h){
        if(this.alive) this.hab3.drawBlind(ctxFG, w, h);
    }

    public drawBlinded(ctxFG, w, h){
        if(this.alive) this.hab3.drawBlinded(ctxFG, w, h);
    }

    public setViewField(vf){
        this.viewField = vf;
    }

    public getPrevX(){
        return this.prev_col_x;
    }

    public getPrevY(){
        return this.prev_col_Y;
        
    }

    public draw(ctx) {
        if(this.alive){
            if(this.hab3.doing()) this.hab3.draw(ctx, this.getX(), this.getY());
            
            this.laser.draw(ctx, this.getX(), this.getY());
            this.drawShape(ctx);

            if(this.hab2.doing()) this.hab2.draw(ctx, this.getX(), this.getY());
            if(this.hab4.doing()){
                this.hab4.draw(ctx, this.getX(), this.getY());
                if(!this.controllerData.MainPlayer){
                    ctx.shadowBlur = 0;
                }
            } 
        }
        
    }

    public drawAbilities(ctx){
        if(this.alive){
            if(this.hab3.doing()) this.hab3.draw(ctx, this.getX(), this.getY());
            if(this.hab2.doing()) this.hab2.draw(ctx, this.getX(), this.getY());
            if(this.hab4.doing()){
                this.hab4.draw(ctx, this.getX(), this.getY());
                if(!this.controllerData.MainPlayer){
                    ctx.shadowBlur = 0;
                }
            } 
        }
    }


    public getAbilityCount(){
        return this.habilityCount;
    }
    
    public getRestablishAbilityCount(){
        return this.restablishHabilityCount;
    }

    drawShape = function (ctx) {
        if(this.alive){
            if( this.hab4.doing() ){
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#4286f4";
                ctx.strokeStyle= "#4286f4";
                ctx.lineWidth = 6;
                
            }

            ctx.lineWidth = 10;
            ctx.strokeStyle = this.color;
            ctx.beginPath();                
            ctx.stroke();
            ctx.arc(UMI.screenX(this.getX()),UMI.screenY(this.getY()),UMI.getPX(this.radio),0,this.eAngle);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    public drawRestField(ctx){
        if( this.hab4.doing() ){
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#4286f4";
            ctx.strokeStyle= "#4286f4";
            ctx.lineWidth = 6;
            
        }
        if(this.alive) this.viewField.drawRestField(ctx);
    }

    public drawBySonar(ctx, op){
        ctx.globalAlpha=op;
        this.drawShape(ctx);
        ctx.globalAlpha=1;
        

    }

}

