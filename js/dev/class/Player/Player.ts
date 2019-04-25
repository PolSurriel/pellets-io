import { Pellet } from "./Pellet.js";
import { ViewField } from "./ViewField.js";
import { PHY } from "../Logic/PHY.js";
import { UMI } from "../Logic/UMI.js";
import { Teleport } from "./Abilities/Teleport.js";
import { IndHability } from "../GUI/IndHability.js";
import { Sound } from "../Element/Sound.js";
import { kill } from "../EventListeners/Socket.js";

export class Player {

    private sounds = {
        respawn: new Sound('../js/sounds/respawn.wav', 0.1)
    };

    private pellet:Pellet;
    public viewField:ViewField;
    private controllerData;
    private id = 0;


    constructor(controllerData, x: number, y: number, color: string, img?: HTMLElement) {
        this.pellet = new Pellet (x, y, color, img);
        if(controllerData.MainPlayer){
            this.viewField = new ViewField();
            this.pellet.viewField = this.viewField;
        } 
        this.controllerData = controllerData;
        this.pellet.setMainPlayer(controllerData.MainPlayer);
    }

    public drawAbilities(ctx){
        this.pellet.drawAbilities(ctx);
    }

    public cleanShadows() {
        this.viewField.cleanShadows();
    }

    public colision(obj){
        
        return this.pellet.colision(obj);
    }

    public sonarActive(){
        return this.pellet.sonarActive();
    }

    public getBlind(){
        return this.pellet.getBlind();
    }

    public setId(id){
        this.id = id;
    }

    public updateShadow(obj: any) {
        this.viewField.updateViewShadow(obj, this.pellet.getCenterX(), this.pellet.getCenterY());
    }

    public viewShadows(ctx) {
        this.viewField.drawShadowShapes(ctx);
    }

    public getId(){
        return this.id;
    }

    public action(){
        
        if(this.controllerData.MainPlayer){
            this.controllerData.ca = Math.atan2(UMI.screenYUMI(this.getY()) - this.controllerData.getCY(), UMI.screenXUMI(this.getX()) - this.controllerData.getCX()) + UMI.RADIANSOF180;
            this.controllerData.fixedPoint = PHY.createRectWithAngle([this.pellet.getX(),this.pellet.getY()],Teleport.teleportDistance, -this.controllerData.ca);
        }
        
        
        
        if(!this.controllerData.MainPlayer || this.controllerData.MainPlayer && !this.controllerData.onChat){
            this.pellet.action(this.controllerData);
        }else{
            this.pellet.littleAction(this.controllerData);
        }

        if(this.controllerData.MainPlayer){
            this.viewField.setX(this.pellet.getX());
            this.viewField.setY(this.pellet.getY());
            this.viewField.action();
        }
        
        
        
        
        this.controllerData.hab1 = false;
        this.controllerData.hab2 = false;
        this.controllerData.hab3 = false;
        this.controllerData.hab4 = false;   

        if(this.controllerData.MainPlayer) IndHability.setCount(this.pellet.getAbilityCount(), this.pellet.getRestablishAbilityCount());
    }

    public getPrevX(){
        return this.pellet.getPrevX();
    }

    public getPrevY(){
        return this.pellet.getPrevY();
        
    }

    public draw(ctx){
        if(this.controllerData.MainPlayer && this.pellet.isAlive()) this.viewField.draw(ctx);
        this.pellet.draw(ctx);

        /*
        ctx.beginPath();
        ctx.arc(UMI.screenX(this.controllerData.fixedPoint[0]),UMI.screenY(this.controllerData.fixedPoint[1]),10,0,2*Math.PI);
        ctx.fill();
        */

    }

    public teleporting(){
        return this.pellet.teleporting();
    }

    public setX(x:number){
        this.pellet.setX(x);
    }

    public setY(y:number){
        this.pellet.setY(y);
    }

    public getX(){
        return this.pellet.getX();
    }

    public getY(){
        return this.pellet.getY();
    }

    public blinded(){
        return this.pellet.blinded();
    }

    public setBlinded(){
        this.pellet.setBlinded();
    }

    public drawBlind(ctxFG, w, h){
        this.pellet.drawBlind(ctxFG, w, h);
    }

    public drawBlinded(ctxFG, w, h){
        this.pellet.drawBlinded(ctxFG, w, h);
    }

    public colisionReact(obj){
        this.pellet.colisionReact(obj);
    }

    public inShield(){
        return this.pellet.inShield();
    }

    public getRadio(){
        return this.pellet.getRadio();
    }

    public getDataController(){
        return this.controllerData;
    }

    public enemyOnFieldOfView(enemy){
        
    }

    public drawShape(ctx){
        this.pellet.drawShape(ctx);
    }


    public drawRestField(ctx){
        this.pellet.drawRestField(ctx);
    }
    
    public damage(){
        if(this.pellet.isAlive()){
            if(this.pellet.damage()){
                kill(this.id);
            }
        }
        
    }

    public getShieldPoints(){
        return this.pellet.getShieldPoints();
    }

    public respawn(x, y){
        this.pellet.setX(x);
        this.pellet.setY(y);
        this.sounds.respawn.play()
        this.pellet.reborn();
    }

    public iSee(obj){
        return this.viewField.iSee(obj);
    }

    public drawBySonar(ctx, op){
        this.pellet.drawBySonar(ctx, op);
    }

    public getSonarOpacity(){
        return (this.pellet.sonarOpacity >= 0) ? this.pellet.sonarOpacity : 0 ;
    }
}