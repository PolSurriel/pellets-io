import { UMI } from "../../Logic/UMI.js";
import { Sound } from "../../Element/Sound.js";

export class Sonar {

    private sonarActive = false;
    private sonarSpeed = UMI.getSpeed(20);
    private currentSonarSpeed = UMI.getSpeed(20);
    private sonarRadious = 0;
    private sonarOpacity = 0.8;

    private sound =  new Sound("../js/sounds/sonar.wav", 0.5);

    constructor(){}

    public do(){
        this.sound.stop();
        this.sound.play();
        this.sonarActive = true;
        return true;
    }

    public doing(){
        return this.sonarActive;
    }

    public updateStatus(obj){
        obj.sonarOpacity = this.sonarOpacity;
        this.sonarRadious += this.currentSonarSpeed;
        this.currentSonarSpeed -= this.sonarSpeed/45;
        this.sonarOpacity -= this.sonarSpeed/1800;
        if(this.currentSonarSpeed <= 0.5){
            this.sonarActive = false;
            this.currentSonarSpeed = this.sonarSpeed;
            this.sonarRadious = 0;
            this.sonarOpacity = 0.8;
        }
    }

    

    public draw(ctx, x, y){
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0, 196, 91,'+this.sonarOpacity;+')';
        ctx.beginPath();
        ctx.arc(UMI.screenX(x),UMI.screenY(y),UMI.getPX(this.sonarRadious),0,2*Math.PI);
        ctx.stroke();
    }
}